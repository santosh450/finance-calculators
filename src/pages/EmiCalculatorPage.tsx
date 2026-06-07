import { useState } from "react";
import BreakdownPieChart from "../components/BreakdownPieChart";
import { formatCurrency } from "../utils/formatCurrency";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { calculateEmi } from "../calculators/emi";
import ResultCard from "../components/ResultCard";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import FaqSection from "../components/FaqSection";

export default function EmiCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [loanAmount, setLoanAmount] = useState(
    Number(searchParams.get("loanAmount")) || 1000000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 8.5);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 20);

  useEffect(() => {
    setSearchParams({
      loanAmount: loanAmount.toString(),
      rate: rate.toString(),
      years: years.toString(),
    });
  }, [loanAmount, rate, years, setSearchParams]);

  const result = calculateEmi(loanAmount, rate, years);

  return (
    <>
      <Helmet>
        <title>EMI Calculator - Calculate Loan EMI</title>

        <meta
          name="description"
          content="Free EMI Calculator. Calculate monthly EMI, total interest and total payment instantly."
        />
      </Helmet>
      <CalculatorLayout title="EMI Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <CalculatorInput
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              min={100000}
              max={10000000}
              step={50000}
              prefix="₹"
            />

            <CalculatorInput
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={1}
              max={20}
              step={0.1}
              suffix="%"
            />

            <CalculatorInput
              label="Loan Tenure"
              value={years}
              onChange={setYears}
              min={1}
              max={30}
              step={1}
              suffix=" Years"
            />
          </div>

          {/* Results Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Results</h2>

            <div className="space-y-4">
              <ResultCard
                label="Monthly EMI"
                value={formatCurrency(result.emi)}
                valueClassName="text-blue-600"
              />

              <ResultCard
                label="Total Interest"
                value={formatCurrency(result.totalInterest)}
                valueClassName="text-green-600"
              />

              <ResultCard
                label="Total Payment"
                value={formatCurrency(result.totalPayment)}
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
            investedAmount={loanAmount}
            estimatedReturns={result.totalInterest}
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">What is an EMI?</h2>

          <p className="text-gray-600 leading-7">
            An EMI, or Equated Monthly Installment, is a fixed payment amount
            made by a borrower to a lender at a specified date each calendar
            month. EMIs are used to fully pay off both interest and principal
            over a set number of years.
          </p>
        </section>

        <FaqSection
          faqs={[
            {
              question: "How is an EMI calculated?",
              answer:
                "An EMI depends on three main factors: the loan amount (principal), the interest rate, and the loan tenure. It balances higher interest payments at the start with higher principal repayments toward the end of the loan.",
            },
            {
              question: "Is a longer loan tenure better for EMIs?",
              answer:
                "A longer tenure reduces your monthly EMI amount, making it easier on your cash flow. However, it significantly increases the total interest amount you will pay back over the lifetime of the loan.",
            },
            {
              question: "Can I change my EMI amount later?",
              answer:
                "Generally, EMIs are fixed. However, you can effectively lower your monthly EMIs or shorten your loan tenure by making a principal prepayment or by refinancing your loan at a lower interest rate.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
