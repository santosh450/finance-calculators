interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

export default function CalculatorInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
}: CalculatorInputProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">{label}</label>

      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold">
          {prefix}
          {value.toLocaleString("en-IN")}
          {suffix}
        </div>

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-32 border rounded-lg px-3 py-2"
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />
    </div>
  );
}
