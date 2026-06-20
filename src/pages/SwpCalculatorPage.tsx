import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { calculateSwp } from "../calculators/swp";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import CalculatorResults from "../components/CalculatorResults";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";

export default function SipCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [amount, setAmount] = useState(
    Number(searchParams.get("amount")) || 2000000,
  );

  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(
    Number(searchParams.get("monthlyWithdrawal")) || 15000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 10);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 20);

  useEffect(() => {
    setSearchParams({
      amount: amount.toString(),
      rate: rate.toString(),
      years: years.toString(),
      monthlyWithdrawal: monthlyWithdrawal.toString(),
    });
  }, [amount, rate, years, monthlyWithdrawal, setSearchParams]);

  const result = calculateSwp(amount, monthlyWithdrawal, rate, years);

  return (
    <>
      <Helmet>
        <title>SWP Calculator - Calculate SWP Returns Online</title>

        <meta
          name="description"
          content="Free SWP Calculator. Calculate SWP returns and future wealth instantly."
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://finance-calculators-five.vercel.app/swp-calculator"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="SWP Calculator - Calculate SWP Returns Online"
        />

        <meta
          property="og:description"
          content="Free SWP Calculator. Calculate SWP returns and future wealth instantly."
        />

        <meta
          property="og:url"
          content="https://finance-calculators-five.vercel.app/swp-calculator"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://finance-calculators-five.vercel.app/og-image.png"
        />
      </Helmet>
      <CalculatorLayout title="SWP Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <CalculatorInput
              label="Initial Investment"
              value={amount}
              onChange={setAmount}
              min={100000}
              max={10000000}
              step={100000}
              prefix="₹"
            />

            <CalculatorInput
              label="Monthly Withdrawal"
              value={monthlyWithdrawal}
              onChange={setMonthlyWithdrawal}
              min={1000}
              max={100000}
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
                label: "Initial Investment",
                value: formatCurrency(amount),
              },
              {
                label: "Total Withdrawals",
                value: formatCurrency(result.totalWithdrawals),
                valueClassName: "text-red-400",
              },
              {
                label: "Total Growth",
                value: formatCurrency(result.totalGrowth),
                valueClassName: "text-green-600",
              },
              {
                label: "Remaining Corpus",
                value: formatCurrency(result.remainingCorpus),
                valueClassName: "text-blue-600 text-3xl",
              },
            ]}
            breakdownItems={[
              {
                label: "Initial Investment",
                value: amount,
                color: "bg-black",
              },
              {
                label: "Total Withdrawals",
                value: result.totalWithdrawals,
                color: "bg-red-400",
              },
              {
                label: "Total Growth",
                value: result.totalGrowth,
                color: "bg-green-600",
              },
              {
                label: "Remaining Corpus",
                value: result.remainingCorpus,
                color: "bg-blue-600",
              },
            ]}
          />
        </div>

        <ExplanationSection
          title="What is a SWP?"
          content="A Systematic Withdrawal Plan (SWP) allows investors to withdraw a fixed amount regularly from their mutual fund investments. SWPs provide a steady income stream."
        />

        <FaqSection
          faqs={[
            {
              question: "SWP vs FD: Which is better?",
              answer:
                "SWPs generally offer more flexibility and potential for higher returns, while FDs provide fixed and predictable returns.",
            },
            {
              question: "How much should I invest in SWP?",
              answer:
                "The amount depends on your goals, risk tolerance and investment horizon.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
