import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { calculateRd } from "../calculators/rd";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import CalculatorResults from "../components/CalculatorResults";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";

export default function RdCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [monthlyDeposit, setMonthlyDeposit] = useState(
    Number(searchParams.get("monthlyDeposit")) || 10000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 7);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 3);

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

          <CalculatorResults
            results={[
              {
                label: "Total Deposits",
                value: formatCurrency(result.investedAmount),
              },
              {
                label: "Interest Earned",
                value: formatCurrency(result.interestEarned),
                valueClassName: "text-green-600",
              },
              {
                label: "Maturity Amount",
                value: formatCurrency(result.maturityAmount),
                valueClassName: "text-blue-600 text-3xl",
              },
            ]}
            breakdownItems={[
              {
                label: "Deposits",
                value: result.investedAmount,
                color: "bg-black",
              },
              {
                label: "Interest",
                value: result.interestEarned,
                color: "bg-green-600",
              },
              {
                label: "Maturity Amount",
                value: result.maturityAmount,
                color: "bg-blue-600",
              },
            ]}
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
