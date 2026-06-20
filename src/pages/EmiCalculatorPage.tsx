import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { calculateEmi } from "../calculators/emi";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import CalculatorResults from "../components/CalculatorResults";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";

export default function EmiCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

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
            <h2 className="text-2xl font-semibold mb-6">Loan Details</h2>

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

          <CalculatorResults
            results={[
              {
                label: "Total Interest",
                value: formatCurrency(result.totalInterest),
              },
              {
                label: "Total Payment",
                value: formatCurrency(result.totalPayment),
                valueClassName: "text-green-600",
              },
              {
                label: "Monthly EMI",
                value: formatCurrency(result.emi),
                valueClassName: "text-blue-600 text-3xl",
              },
            ]}
            breakdownItems={[
              { label: "Principal", value: loanAmount, color: "bg-red-300" },
              {
                label: "Interest",
                value: result.totalInterest,
                color: "bg-black",
              },
              {
                label: "Total Payment",
                value: result.totalPayment,
                color: "bg-green-600",
              },
            ]}
          />
        </div>

        <ExplanationSection
          title="What is an EMI?"
          content="An EMI, or Equated Monthly Installment, is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to fully pay off both interest and principal over a set number of years."
        />

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
