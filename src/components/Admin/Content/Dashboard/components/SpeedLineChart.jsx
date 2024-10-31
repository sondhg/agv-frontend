"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useRef, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export const description = "A multiple line chart";

const chartConfig = {
  AGV1: {
    label: "AGV1",
    color: "hsl(var(--chart-1))",
  },
  AGV2: {
    label: "AGV2",
    color: "hsl(var(--chart-2))",
  },
  AGV3: {
    label: "AGV3",
    color: "hsl(var(--chart-3))",
  },
  AGV4: {
    label: "AGV4",
    color: "hsl(var(--chart-4))",
  },
};

export default function SpeedLineChart() {
  const [chartData, setChartData] = useState([
    { timestamp: "Start", AGV1: 0, AGV2: 0, AGV3: 0, AGV4: 0 },
  ]);

  const wsRef = useRef(null);
  const lastRecordTimeRef = useRef(Date.now());

  useEffect(() => {
    wsRef.current = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@aggTrade",
    );

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data && data.p) {
        const agv_speed = parseFloat(data.p);
        const now = Date.now();

        // Check if 1 second or 1000 milliseconds has passed since the last recorded timestamp
        if (now - lastRecordTimeRef.current >= 1000) {
          lastRecordTimeRef.current = now;

          // Update chart data directly without debounce
          setChartData((prevData) => [
            ...prevData.slice(-4), // Keep the last 4 points to display the last 5 total
            {
              timestamp: new Date().toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
              AGV1: agv_speed,
              AGV2: agv_speed * 1.1,
              AGV3: agv_speed * 1.2,
              AGV4: agv_speed * 1.3,
            },
          ]);
        }
      }
    };

    // Clean up WebSocket connection on unmount
    return () => wsRef.current.close();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Speed</CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              tickCount={5}
              tickFormatter={(value) => value} // Displays full hh:mm:ss format
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="AGV1"
              type="monotone"
              stroke="var(--color-AGV1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="AGV2"
              type="monotone"
              stroke="var(--color-AGV2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="AGV3"
              type="monotone"
              stroke="var(--color-AGV3)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="AGV4"
              type="monotone"
              stroke="var(--color-AGV4)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
