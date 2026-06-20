import { useState } from "react";
import ResultCard from "./ResultCard";
import BreakdownBar from "./BreakdownBar";

type ResultItem = {
  label: string;
  value: string;
  valueClassName?: string;
};

type BreakdownItem = {
  label: string;
  value: number;
  color: string;
};

type CalculatorResultsProps = {
  results: ResultItem[];
  breakdownItems: BreakdownItem[];
};

export default function CalculatorResults({
  results,
  breakdownItems,
}: CalculatorResultsProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="border rounded-xl p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Results</h2>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);

            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {copied ? "Copied!" : "Copy Share Link"}
        </button>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {results.slice(0, results.length - 1).map((result) => (
              <ResultCard
                key={result.label}
                label={result.label}
                value={result.value}
                valueClassName={result.valueClassName}
              />
            ))}
          </div>

          <ResultCard
            label={results[results.length - 1].label}
            value={results[results.length - 1].value}
            valueClassName={results[results.length - 1].valueClassName}
          />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <BreakdownBar items={breakdownItems} />
      </div>
    </div>
  );
}
