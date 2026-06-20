import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { calculateLumpsum } from "../calculators/lumpsum";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import CalculatorResults from "../components/CalculatorResults";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";

export default function LumpsumCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [principal, setPrincipal] = useState(
    Number(searchParams.get("principal")) || 100000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 12);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 10);

  useEffect(() => {
    setSearchParams({
      principal: principal.toString(),
      rate: rate.toString(),
      years: years.toString(),
    });
  }, [principal, rate, years, setSearchParams]);

  const result = calculateLumpsum(principal, rate, years);

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
              label="Investment Amount"
              value={principal}
              onChange={setPrincipal}
              min={1000}
              max={10000000}
              step={1000}
              prefix="₹"
            />

            <CalculatorInput
              label="Expected Return"
              value={rate}
              onChange={setRate}
              min={1}
              max={30}
              step={0.5}
              suffix="%"
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
                label: "Invested Amount",
                value: formatCurrency(result.investedAmount),
              },
              {
                label: "Estimated Returns",
                value: formatCurrency(result.estimatedReturns),
                valueClassName: "text-green-600",
              },
              {
                label: "Maturity Value",
                value: formatCurrency(result.maturityValue),
                valueClassName: "text-blue-600 text-3xl",
              },
            ]}
            breakdownItems={[
              {
                label: "Invested Amount",
                value: result.investedAmount,
                color: "bg-black",
              },
              {
                label: "Estimated Returns",
                value: result.estimatedReturns,
                color: "bg-green-600",
              },
              {
                label: "Maturity Value",
                value: result.maturityValue,
                color: "bg-blue-600",
              },
            ]}
          />
        </div>
        <ExplanationSection
          title="What is a Lumpsum Investment?"
          content="A lumpsum investment is a one-time investment made into a mutual fund, stock or other financial instrument. The investment grows through the power of compounding over time."
        />

        <FaqSection
          faqs={[
            {
              question: "What is a Lumpsum investment?",
              answer:
                "A Lumpsum investment is a one-time deposit of a significant amount of money into a mutual fund or financial scheme, rather than spreading it out over time.",
            },
            {
              question: "Is Lumpsum better than SIP?",
              answer:
                "Lumpsum is generally better when you have a large cash surplus and the market is low or stable, whereas SIP is better for investing regular monthly income and averaging out market volatility.",
            },
            {
              question: "When should I invest in a Lumpsum?",
              answer:
                "The best time to invest in a Lumpsum is when you have a large amount of money available and the market conditions are favorable, such as during a market downturn or when valuations are attractive.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
