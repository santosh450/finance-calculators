import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { calculateSipLumpsum } from "../calculators/siplumpsum";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import CalculatorResults from "../components/CalculatorResults";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";

export default function SipLumpSumCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sipAmount, setSipAmount] = useState(
    Number(searchParams.get("sipAmount")) || 10000,
  );

  const [lumpsumAmount, setLumpsumAmount] = useState(
    Number(searchParams.get("lumpsumAmount")) || 100000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 12);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 10);

  useEffect(() => {
    setSearchParams({
      sipAmount: sipAmount.toString(),
      lumpsumAmount: lumpsumAmount.toString(),
      rate: rate.toString(),
      years: years.toString(),
    });
  }, [sipAmount, lumpsumAmount, rate, years, setSearchParams]);

  const result = calculateSipLumpsum(sipAmount, rate, years, lumpsumAmount);

  return (
    <>
      <Helmet>
        <title>SIP + Lumpsum Calculator - Calculate Returns Online</title>

        <meta
          name="description"
          content="Free SIP + Lumpsum Calculator. Calculate returns and future wealth instantly."
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://finance-calculators-five.vercel.app/sip-lumpsum-calculator"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="SIP + Lumpsum Calculator - Calculate Returns Online"
        />

        <meta
          property="og:description"
          content="Free SIP + Lumpsum Calculator. Calculate returns and future wealth instantly."
        />

        <meta
          property="og:url"
          content="https://finance-calculators-five.vercel.app/sip-lumpsum-calculator"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://finance-calculators-five.vercel.app/og-image.png"
        />
      </Helmet>
      <CalculatorLayout title="SIP + Lumpsum Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <CalculatorInput
              label="Lumpsum Investment"
              value={lumpsumAmount}
              onChange={setLumpsumAmount}
              min={1000}
              max={10000000}
              step={1000}
              prefix="₹"
            />

            <CalculatorInput
              label="Monthly Investment"
              value={sipAmount}
              onChange={setSipAmount}
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
          title="What is a SIP + Lumpsum Calculator?"
          content="A SIP + Lumpsum Calculator helps you determine the future value of your investments by combining regular SIP contributions with a lumpsum investment."
        />

        <FaqSection
          faqs={[
            {
              question: "Is SIP + Lumpsum better than regular SIP?",
              answer:
                "SIP + Lumpsum can offer higher returns over time due to the combined effect of regular contributions and a lumpsum investment, but they also come with higher risk.",
            },
            {
              question: "How much should I invest in SIP + Lumpsum?",
              answer:
                "The amount depends on your goals, risk tolerance and investment horizon.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
