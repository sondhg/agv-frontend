import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SpeedLineChart = ({ dataSocket = {} }) => {
  const [speedData, setSpeedData] = useState([]);

  useEffect(() => {
    if (dataSocket.speed) {
      const currentTime = new Date();
      setSpeedData((prevData) => [
        ...prevData,
        { time: currentTime, speed: dataSocket.speed },
      ]);
    }
  }, [dataSocket.speed]);

  // Filter data to include only the most recent 10 seconds
  const filteredSpeedData = speedData.filter((d) => {
    const currentTime = new Date();
    return currentTime - new Date(d.time) <= 10000;
  });

  // Calculate the min and max speed values
  const minSpeed = Math.min(...filteredSpeedData.map((d) => d.speed));
  const maxSpeed = Math.max(...filteredSpeedData.map((d) => d.speed));

  return (
    <div data-aos="fade-up" className="card bg-neutral shadow-xl lg:card-side">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Speed change in real time</h2>

        <LineChart
          width={700}
          height={400}
          data={filteredSpeedData}
          margin={{ top: 20, right: 100, left: 20, bottom: 40 }} // Adjust right margin for legend
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="time"
            stroke="#ccc"
            tickFormatter={(time) =>
              new Date(time).toLocaleTimeString("vi-VN", { hour12: false })
            }
          >
            <Label
              value="Time (s)"
              offset={-30}
              position="insideBottom"
              fill="#ccc"
            />
          </XAxis>
          <YAxis
            stroke="#ccc"
            domain={[
              minSpeed - (maxSpeed - minSpeed) * 0.1,
              maxSpeed + (maxSpeed - minSpeed) * 0.1,
            ]}
          >
            <Label
              value="Speed (m/s)"
              angle={-90}
              position="insideLeft"
              fill="#ccc"
            />
          </YAxis>
          <Tooltip
            labelFormatter={(time) =>
              new Date(time).toLocaleTimeString("vi-VN", { hour12: false })
            }
          />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#8884d8"
            strokeWidth={3} // Thicker line
            animationDuration={500} // Shorter duration for smoother transitions
            animationEasing="linear" // Smoother easing function
            isAnimationActive={true} // Ensure animation is active
          />
        </LineChart>
      </div>
    </div>
  );
};

SpeedLineChart.propTypes = {
  dataSocket: PropTypes.shape({
    speed: PropTypes.number,
  }).isRequired,
};

export default SpeedLineChart;
