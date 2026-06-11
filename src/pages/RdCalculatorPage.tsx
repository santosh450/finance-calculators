import { useState } from "react";
import BreakdownPieChart from "../components/BreakdownPieChart";
import { formatCurrency } from "../utils/formatCurrency";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ResultCard from "../components/ResultCard";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import FaqSection from "../components/FaqSection";
import ExplanationSection from "../components/ExplanationSection";
import { calculateRd } from "../calculators/rd";

export default function RdCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [monthlyDeposit, setMonthlyDeposit] = useState(
    Number(searchParams.get("monthlyDeposit")) || 10000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 12);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 10);

  useEffect(() => {
    setSearchParams({
      monthlyDeposit: monthlyDeposit.toString(),
      rate: rate.toString(),
      years: years.toString(),
    });
  }, [monthlyDeposit, rate, years, setSearchParams]);

  const result = calculateRd(monthlyDeposit, rate, years);

  return (
    <>
      <Helmet>
        <title>RD Calculator - Calculate RD Returns Online</title>

        <meta
          name="description"
          content="Free RD Calculator. Calculate your recurring deposit returns and future wealth instantly."
        />
      </Helmet>
      <CalculatorLayout title="RD Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <CalculatorInput
              label="Monthly Deposit"
              value={monthlyDeposit}
              onChange={setMonthlyDeposit}
              min={500}
              max={100000}
              step={500}
              prefix="₹"
            />

            <CalculatorInput
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={1}
              max={12}
              step={0.1}
              suffix="%"
            />

            <CalculatorInput
              label="Deposit Period"
              value={years}
              onChange={setYears}
              min={1}
              max={20}
              step={1}
              suffix=" Years"
            />
          </div>

          {/* Results Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Results</h2>

            <div className="space-y-4">
              <ResultCard
                label="Invested Amount"
                value={formatCurrency(result.investedAmount)}
              />

              <ResultCard
                label="Interest Earned"
                value={formatCurrency(result.interestEarned)}
              />

              <ResultCard
                label="Maturity Amount"
                value={formatCurrency(result.maturityAmount)}
                valueClassName="text-green-600"
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

          <BreakdownPieChart
            investedAmount={result.investedAmount}
            estimatedReturns={result.interestEarned}
          />
        </div>

        <ExplanationSection
          title="What is a Recurring Deposit (RD)?"
          content="
A Recurring Deposit (RD) allows investors to deposit a fixed amount every month and earn a fixed rate of interest over a chosen tenure. It is a low-risk savings instrument offered by banks and financial institutions."
        />

        <FaqSection
          faqs={[
            {
              question: "What is an RD account?",
              answer:
                "An RD account allows regular monthly deposits and earns fixed interest.",
            },
            {
              question: "Is RD better than FD?",
              answer:
                "RD is suitable for regular savings, while FD is suitable for one-time investments.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
