import { useState } from "react";
import { calculateFd } from "../calculators/fd";
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

export default function FdCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [depositAmount, setDepositAmount] = useState(
    Number(searchParams.get("principal")) || 100000,
  );

  const [interestRate, setInterestRate] = useState(
    Number(searchParams.get("rate")) || 12,
  );

  const [tenure, setTenure] = useState(Number(searchParams.get("years")) || 10);

  useEffect(() => {
    setSearchParams({
      principal: depositAmount.toString(),
      rate: interestRate.toString(),
      years: tenure.toString(),
    });
  }, [depositAmount, interestRate, tenure, setSearchParams]);

  const result = calculateFd(depositAmount, interestRate, tenure);

  return (
    <>
      <Helmet>
        <title>FD Calculator - Calculate Fixed Deposit Returns</title>

        <meta
          name="description"
          content="Free FD Calculator. Calculate fixed deposit maturity amount and interest earned instantly."
        />
      </Helmet>
      <CalculatorLayout title="FD Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <CalculatorInput
              label="Monthly Investment"
              value={depositAmount}
              onChange={setDepositAmount}
              min={1000}
              max={10000000}
              step={1000}
              prefix="₹"
            />

            <CalculatorInput
              label="Expected Return"
              value={interestRate}
              onChange={setInterestRate}
              min={1}
              max={30}
              step={0.5}
              suffix="%"
            />

            <CalculatorInput
              label="Investment Period"
              value={tenure}
              onChange={setTenure}
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
                label="Deposit Amount"
                value={formatCurrency(result.investedAmount)}
              />

              <ResultCard
                label="Interest Earned"
                value={formatCurrency(result.interestEarned)}
                valueClassName="text-green-600"
              />

              <ResultCard
                label="Maturity Amount"
                value={formatCurrency(result.maturityValue)}
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

          <BreakdownPieChart
            investedAmount={result.investedAmount}
            estimatedReturns={result.interestEarned}
          />
        </div>

        <ExplanationSection
          title="What is an FD?"
          content="FD stands for Fixed Deposit. It is a financial instrument offered by banks and post offices where you lock in a lump sum amount for a"
        />

        <FaqSection
          faqs={[
            {
              question: "Is FD better than SIP/Lumpsum?",
              answer:
                "FD is better if your primary goal is absolute capital protection and guaranteed returns. Unlike market-linked mutual funds (SIP/Lumpsum), FDs carry zero market risk and are unaffected by market crashes.",
            },
            {
              question: "How much should I invest in an FD?",
              answer:
                "You should invest your emergency funds (typically 3 to 6 months of living expenses), short-term goals (under 3 years), or any corpus you cannot afford to risk losing in the stock market.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
