import CalculatorCard from "../components/CalculatorCard";
import { calculators } from "../data/Calculators";

export default function CalculatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">All Calculators</h1>

      <p className="text-gray-600 mb-8">Free online financial calculators.</p>

      <div className="flex gap-3 mb-8 flex-wrap">
        <span className="px-4 py-2 bg-blue-100 rounded-full">Investment</span>

        <span className="px-4 py-2 bg-green-100 rounded-full">Loans</span>

        <span className="px-4 py-2 bg-yellow-100 rounded-full">Deposits</span>
      </div>

      {/* <div className="grid md:grid-cols-2 gap-6"> */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <CalculatorCard key={calculator.path} {...calculator} />
        ))}
      </div>
    </div>
  );
}
