import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { calculatePpf } from "../calculators/ppf";
import CalculatorInput from "../components/CalculatorInput";
import CalculatorLayout from "../components/CalculatorLayout";
import CalculatorResults from "../components/CalculatorResults";
import ExplanationSection from "../components/ExplanationSection";
import FaqSection from "../components/FaqSection";
import { formatCurrency } from "../utils/formatCurrency";

export default function PpfCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [yearlyInvestment, setYearlyInvestment] = useState(
    Number(searchParams.get("yearlyInvestment")) || 150000,
  );
  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 7.1);
  const [years, setYears] = useState(Number(searchParams.get("years")) || 15);

  useEffect(() => {
    setSearchParams({
      yearlyInvestment: yearlyInvestment.toString(),
      rate: rate.toString(),
      years: years.toString(),
    });
  }, [yearlyInvestment, rate, years, setSearchParams]);

  const result = calculatePpf(yearlyInvestment, rate, years);

  return (
    <>
      <Helmet>
        <title>PPF Calculator - Calculate PPF Returns Online</title>
        <meta
          name="description"
          content="Calculate your Public Provident Fund (PPF) returns online with our easy-to-use PPF calculator. Plan your investments and see how much you can earn!"
        />
      </Helmet>
      <CalculatorLayout title="PPF Calculator">
        <div className="grid md:grid-cols-2 gap-8">
          {/* INPUTS */}
          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>
            <CalculatorInput
              label="Yearly Investment"
              value={yearlyInvestment}
              onChange={setYearlyInvestment}
              min={500}
              max={150000}
              step={500}
              prefix="₹"
            />

            <CalculatorInput
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={1}
              max={15}
              step={0.1}
              suffix="%"
            />

            <CalculatorInput
              label="Investment Period"
              value={years}
              onChange={setYears}
              min={15}
              max={50}
              step={1}
              suffix=" Years"
            />
          </div>

          {/* RESULTS */}
          <CalculatorResults
            results={[
              {
                label: "Total Investment",
                value: formatCurrency(result.totalInvestment),
              },
              {
                label: "Total Interest",
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
              {
                label: "Deposits",
                value: result.totalInvestment,
                color: "bg-black",
              },
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
          title="What is PPF?"
          content="Public Provident Fund (PPF) is a government-backed long-term savings scheme in India. It offers guaranteed returns, tax benefits under Section 80C, and tax-free maturity proceeds."
        />

        <FaqSection
          faqs={[
            {
              question: "What is the lock-in period for PPF?",
              answer:
                "PPF has a mandatory lock-in period of 15 years, which can be extended in blocks of 5 years.",
            },
            {
              question: "What is the maximum PPF investment per year?",
              answer:
                "The maximum investment allowed in a PPF account is ₹1.5 lakh per financial year.",
            },
            {
              question: "Is PPF interest taxable?",
              answer:
                "No. PPF falls under the EEE category, meaning investment, interest earned, and maturity amount are all tax-free.",
            },
            {
              question: "Can I withdraw money before maturity?",
              answer:
                "Partial withdrawals are allowed after specific conditions are met, typically from the 7th financial year onwards.",
            },
          ]}
        />
      </CalculatorLayout>
    </>
  );
}
