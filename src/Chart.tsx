import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
const data = [
  { year: 2017, ideal: 4000, projected: 2400 },
  { year: 2018, ideal: 3000, projected: 1398 },
  { year: 2019, ideal: 2000, projected: 9800 },
  { year: 2020, ideal: 2780, projected: 3908 },
  { year: 2021, ideal: 1890, projected: 4800 },
  { year: 2022, ideal: 2390, projected: 3800 },
  { year: 2023, ideal: 3490, projected: 4300 },
];
function Chart() {
  return (
    <div className="flex place-items-center place-content-center h-screen">
      <AreaChart
        width={1000}
        height={600}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorIdeal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" /> <YAxis />{" "}
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="ideal"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorIdeal)"
        />
        <Area
          type="monotone"
          dataKey="projected"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorProjected)"
        />
      </AreaChart>
    </div>
  );
}
export default Chart;
