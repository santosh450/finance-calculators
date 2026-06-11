import { useState } from "react";
import { calculateCagr } from "../calculators/cagr";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ResultCard from "../components/ResultCard";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import FaqSection from "../components/FaqSection";
import ExplanationSection from "../components/ExplanationSection";

export default function CagrCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [initialValue, setInitialValue] = useState(
    Number(searchParams.get("initialValue")) || 100000,
  );

  const [finalValue, setFinalValue] = useState(
    Number(searchParams.get("finalValue")) || 12,
  );

  const [years, setYears] = useState(Number(searchParams.get("years")) || 10);

  useEffect(() => {
    setSearchParams({
      initialValue: initialValue.toString(),
      finalValue: finalValue.toString(),
      years: years.toString(),
    });
  }, [initialValue, finalValue, years, setSearchParams]);

  const cagr = calculateCagr(initialValue, finalValue, years);

  return (
    <>
      <Helmet>
        <title>Lumpsum Calculator - Calculate Future Value</title>

        <meta
          name="description"
          content="Free Lumpsum Calculator. Calculate the future value of your one-time investment instantly."
        />
      </Helmet>
      <CalculatorLayout title="Lumpsum Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <CalculatorInput
              label="Initial Investment"
              value={initialValue}
              onChange={setInitialValue}
              min={1000}
              max={10000000}
              step={1000}
              prefix="₹"
            />

            <CalculatorInput
              label="Final Value"
              value={finalValue}
              onChange={setFinalValue}
              min={1000}
              max={50000000}
              step={1000}
              prefix="₹"
            />

            <CalculatorInput
              label="Investment Period"
              value={years}
              onChange={setYears}
              min={1}
              max={40}
              step={1}
              suffix=" Years"
            />
          </div>

          {/* Results Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Results</h2>

            <div className="space-y-4">
              <ResultCard
                label="CAGR"
                value={`${cagr.toFixed(2)}%`}
                valueClassName="text-blue-600 text-3xl"
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);

                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {copied ? "Copied!" : "Copy Share Link"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Investment Breakdown</h2>

          {/* <BreakdownPieChart
            investedAmount={result.investedAmount}
            estimatedReturns={result.estimatedReturns}
          /> */}
        </div>

        <ExplanationSection
          title="What is CAGR?"
          content="CAGR (Compound Annual Growth Rate) represents the average annual growth rate of an investment over a period of time, assuming profits are reinvested every year. It helps investors compare different investments consistently."
        />

        <FaqSection
          faqs={[
            {
              question: "What is CAGR?",
              answer:
                "CAGR is the average annual growth rate of an investment over a period of time.",
            },
            {
              question: "Why is CAGR useful?",
              answer:
                "CAGR allows investors to compare investments with different time periods.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
