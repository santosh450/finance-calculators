import { useState } from "react";
import { calculateSip } from "../calculators/sip";
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
import BreakdownBar from "../components/BreakdownBar";

export default function SipCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [amount, setAmount] = useState(
    Number(searchParams.get("amount")) || 10000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 12);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 10);

  useEffect(() => {
    setSearchParams({
      amount: amount.toString(),
      rate: rate.toString(),
      years: years.toString(),
    });
  }, [amount, rate, years, setSearchParams]);

  const result = calculateSip(amount, rate, years);

  return (
    <>
      <Helmet>
        <title>SIP Calculator - Calculate SIP Returns Online</title>

        <meta
          name="description"
          content="Free SIP Calculator. Calculate SIP returns and future wealth instantly."
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://finance-calculators-five.vercel.app/sip-calculator"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="SIP Calculator - Calculate SIP Returns Online"
        />

        <meta
          property="og:description"
          content="Free SIP Calculator. Calculate SIP returns and future wealth instantly."
        />

        <meta
          property="og:url"
          content="https://finance-calculators-five.vercel.app/sip-calculator"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://finance-calculators-five.vercel.app/og-image.png"
        />
      </Helmet>
      <CalculatorLayout title="SIP Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <CalculatorInput
              label="Monthly Investment"
              value={amount}
              onChange={setAmount}
              min={500}
              max={150000}
              step={500}
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

          <div className="border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Results</h2>

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ResultCard
                  label="Invested Amount"
                  value={formatCurrency(result.investedAmount)}
                />

                <ResultCard
                  label="Estimated Returns"
                  value={formatCurrency(result.estimatedReturns)}
                  valueClassName="text-green-600"
                />
              </div>

              <ResultCard
                label="Maturity Value"
                value={formatCurrency(result.maturityValue)}
                valueClassName="text-blue-600 text-3xl"
              />
            </div>
            <BreakdownBar
              items={[
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
        </div>

        <ExplanationSection
          title="What is a SIP?"
          content="A Systematic Investment Plan (SIP) allows investors to invest a fixed amount regularly into mutual funds. SIPs help build wealth"
        />

        <FaqSection
          faqs={[
            {
              question: "Is SIP better than FD?",
              answer:
                "SIPs generally offer higher long-term growth potential, while FDs provide fixed and predictable returns.",
            },
            {
              question: "How much should I invest in SIP?",
              answer:
                "The amount depends on your goals, risk tolerance and investment horizon.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
