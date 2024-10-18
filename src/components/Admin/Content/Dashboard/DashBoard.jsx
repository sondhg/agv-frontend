import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import SpeedLineChart from "./components/SpeedLineChart";
import StatsBox from "./components/StatsBox";

export default function Dashboard() {
  const SOCKET_URL = "wss://stream.binance.com:9443/ws/btcusdt@aggTrade";

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  // throttle the message
  const [throttledJsonMessage, setThrottledJsonMessage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setThrottledJsonMessage(lastJsonMessage);
    }, 200);
    // every 100 milliseconds

    return () => clearInterval(interval);
  }, [lastJsonMessage]);

  const dataSocket = useMemo(() => {
    if (throttledJsonMessage) {
      return {
        speed: throttledJsonMessage?.a || 0,
        battery: throttledJsonMessage?.f || 0,
        obstacle: throttledJsonMessage?.m || false,
        location: throttledJsonMessage?.l || 0,
      };
    } else {
      return {
        speed: 0,
        battery: 0,
        obstacle: false,
        location: 0,
      };
    }
  }, [throttledJsonMessage]);

  const StatsBoxContainer = ({ dataSocket = {} }) => (
    <div className="flex w-full flex-col">
      <div className="card bg-neutral shadow-xl lg:card-side">
        <div className="card-body items-center text-center">
          <StatsBox agv_id={1} dataSocket={dataSocket} />
          <StatsBox agv_id={2} dataSocket={dataSocket} />
        </div>
      </div>
    </div>
  );

  StatsBoxContainer.propTypes = {
    dataSocket: PropTypes.object.isRequired,
  };

  return (
    <div>
      <div className="space-y-10">
        <h2 className="my-1 text-3xl font-bold">Dashboard</h2>
        <StatsBoxContainer dataSocket={dataSocket} />
      </div>
      <div className="mt-10">
        <SpeedLineChart dataSocket={dataSocket} />
      </div>
    </div>
  );
}
