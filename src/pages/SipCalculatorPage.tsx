import { useState } from "react";
import { calculateSip } from "../calculators/sip";
import BreakdownPieChart from "../components/BreakdownPieChart";
import { formatCurrency } from "../utils/formatCurrency";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

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
          content="Free SIP Calculator. Calculate your mutual fund SIP returns and future wealth instantly."
        />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">SIP Calculator</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Monthly Investment
              </label>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold mb-2">
                  ₹{amount.toLocaleString("en-IN")}
                </div>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-32 border rounded-lg px-3 py-2"
                />
              </div>

              <input
                type="range"
                min="500"
                max="150000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
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
              <div>
                <p className="text-gray-500">Invested Amount</p>

                <p className="text-2xl font-bold">
                  {formatCurrency(result.investedAmount)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Estimated Returns</p>

                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.estimatedReturns)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Maturity Value</p>

                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(result.maturityValue)}
                </p>
              </div>
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
          <h2 className="text-2xl font-bold mb-4">What is a SIP?</h2>

          <p className="text-gray-600 leading-7">
            A Systematic Investment Plan (SIP) allows investors to invest a
            fixed amount regularly into mutual funds. SIPs help build wealth
            through disciplined investing and the power of compounding over the
            long term.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">What is SIP?</h3>

              <p className="text-gray-600">
                SIP stands for Systematic Investment Plan. It allows you to
                invest a fixed amount regularly in mutual funds.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Is SIP better than FD?</h3>

              <p className="text-gray-600">
                SIPs generally offer higher long-term growth potential, while
                FDs provide fixed and predictable returns.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How much should I invest in SIP?
              </h3>

              <p className="text-gray-600">
                The amount depends on your goals, risk tolerance and investment
                horizon.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
