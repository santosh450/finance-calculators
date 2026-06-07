import { useState } from "react";
import { calculateFd } from "../calculators/fd";
import BreakdownPieChart from "../components/BreakdownPieChart";
import { formatCurrency } from "../utils/formatCurrency";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function FdCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [depositAmount, setDepositAmount] = useState(
    Number(searchParams.get("principal")) || 100000,
  );

  const [interestRate, setInterestRate] = useState(
    Number(searchParams.get("rate")) || 12,
  );

  const [tenure, setTenure] = useState(Number(searchParams.get("years")) || 10);

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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">FD Calculator</h1>

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
                  ₹{depositAmount.toLocaleString("en-IN")}
                </div>

                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-32 border rounded-lg px-3 py-2"
                />
              </div>

              <input
                type="range"
                min="1000"
                max="10000000"
                step="1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Expected Return</label>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold mb-2">
                  {interestRate}%
                </div>

                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-32 border rounded-lg px-3 py-2"
                />
              </div>

              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Investment Period
              </label>

              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold mb-2">{tenure} Years</div>

                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-32 border rounded-lg px-3 py-2"
                />
              </div>

              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Results Card */}

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Results</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Deposit Amount</p>

                <p className="text-2xl font-bold">
                  {formatCurrency(result.investedAmount)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Interest Earned</p>

                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.interestEarned)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Maturity Amount</p>

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
            estimatedReturns={result.interestEarned}
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">What is an FD?</h2>

          <p className="text-gray-600 leading-7">
            FD stands for Fixed Deposit. It is a financial instrument offered by
            banks and post offices where you lock in a lump sum amount for a
            specific tenure at a guaranteed, fixed interest rate.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">
                Is FD better than SIP/Lumpsum?
              </h3>

              <p className="text-gray-600">
                FD is better if your primary goal is absolute capital protection
                and guaranteed returns. Unlike market-linked mutual funds
                (SIP/Lumpsum), FDs carry zero market risk and are unaffected by
                market crashes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How much should I invest in an FD?
              </h3>

              <p className="text-gray-600">
                You should invest your emergency funds (typically 3 to 6 months
                of living expenses), short-term goals (under 3 years), or any
                corpus you cannot afford to risk losing in the stock market.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
