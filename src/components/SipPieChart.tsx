import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  investedAmount: number;
  estimatedReturns: number;
}

export default function SipPieChart({
  investedAmount,
  estimatedReturns,
}: Props) {
  const data = [
    {
      name: "Invested Amount",
      value: investedAmount,
    },
    {
      name: "Returns",
      value: estimatedReturns,
    },
  ];

  const COLORS = ["#2563eb", "#16a34a"];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={120} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
