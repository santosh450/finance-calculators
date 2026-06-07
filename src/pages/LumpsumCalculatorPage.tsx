import { useState } from "react";
import { calculateLumpsum } from "../calculators/lumpsum";
import BreakdownPieChart from "../components/BreakdownPieChart";
import { formatCurrency } from "../utils/formatCurrency";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ResultCard from "../components/ResultCard";

export default function LumpsumCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [principal, setPrincipal] = useState(
    Number(searchParams.get("principal")) || 100000,
  );

  const [rate, setRate] = useState(Number(searchParams.get("rate")) || 12);

  const [years, setYears] = useState(Number(searchParams.get("years")) || 10);

  useEffect(() => {
    setSearchParams({
      principal: principal.toString(),
      rate: rate.toString(),
      years: years.toString(),
    });
  }, [principal, rate, years, setSearchParams]);

  const result = calculateLumpsum(principal, rate, years);

  return (
    <>
      <Helmet>
        <title>Lumpsum Calculator - Calculate Future Value</title>

        <meta
          name="description"
          content="Free Lumpsum Calculator. Calculate the future value of your one-time investment instantly."
        />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Lumpsum Calculator</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Investment Amount
              </label>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold mb-2">
                  ₹{principal.toLocaleString("en-IN")}
                </div>

                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-32 border rounded-lg px-3 py-2"
                />
              </div>

              <input
                type="range"
                min="1000"
                max="10000000"
                step="1000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Expected Return</label>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold mb-2">{rate}%</div>

                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-32 border rounded-lg px-3 py-2"
                />
              </div>

              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Investment Period
              </label>

              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold mb-2">{years} Years</div>

                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-32 border rounded-lg px-3 py-2"
                />
              </div>

              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Results Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Results</h2>

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

              <ResultCard
                label="Maturity Value"
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
            estimatedReturns={result.estimatedReturns}
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            What is a Lumpsum Investment?
          </h2>

          <p className="text-gray-600 leading-7">
            A lumpsum investment is a one-time investment made into a mutual
            fund, stock or other financial instrument. The investment grows
            through the power of compounding over time.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">
                What is a Lumpsum investment?
              </h3>

              <p className="text-gray-600">
                A Lumpsum investment is a one-time deposit of a significant
                amount of money into a mutual fund or financial scheme, rather
                than spreading it out over time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Is Lumpsum better than SIP?
              </h3>

              <p className="text-gray-600">
                Lumpsum is generally better when you have a large cash surplus
                and the market is low or stable, whereas SIP is better for
                investing regular monthly income and averaging out market
                volatility.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                When should I invest in a Lumpsum?
              </h3>

              <p className="text-gray-600">
                The best time to invest in a Lumpsum is when you have a large
                amount of money available and the market conditions are
                favorable, such as during a market downturn or when valuations
                are attractive.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
