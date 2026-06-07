interface ResultCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export default function ResultCard({
  label,
  value,
  valueClassName = "",
}: ResultCardProps) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>

      <p className={`text-2xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}
