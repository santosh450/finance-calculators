import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import CalculatorResults from "../components/CalculatorResults";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";
import { calculateStepUpSip } from "../calculators/stepupsip";

export default function StepUpSipCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [amount, setAmount] = useState(
    Number(searchParams.get("amount")) || 10000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 12);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 10);

  const [stepUp, setStepUp] = useState(
    Number(searchParams.get("stepUp")) || 10,
  );

  useEffect(() => {
    setSearchParams({
      amount: amount.toString(),
      rate: rate.toString(),
      years: years.toString(),
      stepUp: stepUp.toString(),
    });
  }, [amount, rate, years, stepUp, setSearchParams]);

  const result = calculateStepUpSip(amount, rate, years, stepUp);

  return (
    <>
      <Helmet>
        <title>Step-Up SIP Calculator - Calculate SIP Returns Online</title>

        <meta
          name="description"
          content="Free Step-Up SIP Calculator. Calculate SIP returns and future wealth instantly."
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://finance-calculators-five.vercel.app/step-up-sip-calculator"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Step-Up SIP Calculator - Calculate SIP Returns Online"
        />

        <meta
          property="og:description"
          content="Free Step-Up SIP Calculator. Calculate SIP returns and future wealth instantly."
        />

        <meta
          property="og:url"
          content="https://finance-calculators-five.vercel.app/step-up-sip-calculator"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://finance-calculators-five.vercel.app/og-image.png"
        />
      </Helmet>
      <CalculatorLayout title="Step-Up SIP Calculator">
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

            <CalculatorInput
              label={`Annual Step-Up (%) - ₹${((amount * stepUp) / 100).toFixed(2)}`}
              value={stepUp}
              onChange={setStepUp}
              min={0}
              max={50}
              step={0.5}
              suffix="%"
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
          title="What is a Step-Up SIP?"
          content="A Step-Up SIP allows investors to increase their investment amount annually, helping to combat inflation and build wealth over time."
        />

        <FaqSection
          faqs={[
            {
              question: "Is Step-Up SIP better than regular SIP?",
              answer:
                "Step-Up SIPs can offer higher returns over time due to the increasing investment amount, but they also come with higher risk.",
            },
            {
              question: "How much should I invest in Step-Up SIP?",
              answer:
                "The amount depends on your goals, risk tolerance and investment horizon.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
