import CalculatorCard from "../components/CalculatorCard";
import { calculators } from "../data/calculators";

export default function CalculatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">All Calculators</h1>

      <p className="text-gray-600 mb-8">Free online financial calculators.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {calculators.map((calculator) => (
          <CalculatorCard key={calculator.path} {...calculator} />
        ))}
      </div>
    </div>
  );
}
