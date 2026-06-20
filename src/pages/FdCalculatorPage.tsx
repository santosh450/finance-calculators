import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { calculateFd } from "../calculators/fd";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";
import CalculatorResults from "../components/CalculatorResults";

export default function FdCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [depositAmount, setDepositAmount] = useState(
    Number(searchParams.get("principal")) || 100000,
  );

  const [interestRate, setInterestRate] = useState(
    Number(searchParams.get("rate")) || 7,
  );

  const [tenure, setTenure] = useState(Number(searchParams.get("years")) || 3);

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
              label="Deposit Amount"
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

          <CalculatorResults
            results={[
              {
                label: "Deposit  Amount",
                value: formatCurrency(result.investedAmount),
              },
              {
                label: "Interest Earned",
                value: formatCurrency(result.interestEarned),
                valueClassName: "text-green-600",
              },
              {
                label: "Maturity Amount",
                value: formatCurrency(result.maturityValue),
                valueClassName: "text-blue-600 text-3xl",
              },
            ]}
            breakdownItems={[
              { label: "Deposit", value: depositAmount, color: "bg-black" },
              {
                label: "Interest",
                value: result.interestEarned,
                color: "bg-green-600",
              },
              {
                label: "Maturity Amount",
                value: result.maturityValue,
                color: "bg-blue-600",
              },
            ]}
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
