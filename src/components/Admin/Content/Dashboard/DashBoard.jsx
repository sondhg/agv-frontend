import SpeedLineChart from "./components/SpeedLineChart";

export default function Dashboard() {
  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <SpeedLineChart />
      </div>
    </div>
  );
}
