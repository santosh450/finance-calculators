type BreakdownItem = {
  label: string;
  value: number;
  color: string;
};

type BreakdownBarProps = {
  items: BreakdownItem[];
};

export default function BreakdownBar({ items }: BreakdownBarProps) {
  // Get max from items array and use it to calculate percentage of each item
  const maxValue = Math.max(...items.map((item) => item.value));

  return (
    <div className="space-y-5 mt-6">
      {items.map((item) => {
        const percentage = maxValue === 0 ? 0 : (item.value / maxValue) * 100;

        return (
          <div key={item.label}>
            <div className="flex justify-between mb-1">
              <span>{item.label}</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
