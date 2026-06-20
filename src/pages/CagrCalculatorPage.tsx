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
import CalculatorResults from "../components/CalculatorResults";
import { formatCurrency } from "../utils/formatCurrency";

export default function CagrCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [initialValue, setInitialValue] = useState(
    Number(searchParams.get("initialValue")) || 100000,
  );

  const [finalValue, setFinalValue] = useState(
    Number(searchParams.get("finalValue")) || 310584.82,
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

  const resultColorClass = cagr >= 0 ? "text-green-600" : "text-red-600";

  return (
    <>
      <Helmet>
        <title>CAGR Calculator - Calculate Compound Annual Growth Rate</title>

        <meta
          name="description"
          content="Free CAGR Calculator. Calculate the compound annual growth rate of your investment instantly."
        />
      </Helmet>
      <CalculatorLayout title="CAGR Calculator">
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

          <CalculatorResults
            results={[
              {
                label: "Initial Investment",
                value: formatCurrency(initialValue),
              },
              {
                label: "Final Value",
                value: formatCurrency(finalValue),
                valueClassName: "text-blue-600",
              },
              {
                label: "CAGR",
                value: `${cagr.toFixed(2)}%`,
                valueClassName: `${resultColorClass} text-3xl`,
              },
            ]}
            breakdownItems={[
              {
                label: "Initial Investment",
                value: initialValue,
                color: "bg-black",
              },
              {
                label: "Final Value",
                value: finalValue,
                color: "bg-blue-600",
              },
            ]}
          />
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
