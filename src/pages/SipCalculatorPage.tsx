import { useState } from "react";
import { calculateSip } from "../calculators/sip";

export default function SipCalculatorPage() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(20);

  const result = calculateSip(amount, rate, years);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">SIP Calculator</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Card */}

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Investment Details</h2>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Monthly Investment (₹)
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Expected Return (%)
            </label>

            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Investment Period (Years)
            </label>

            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
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
                ₹{Math.round(result.investedAmount).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Estimated Returns</p>

              <p className="text-2xl font-bold text-green-600">
                ₹{Math.round(result.estimatedReturns).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Maturity Value</p>

              <p className="text-3xl font-bold text-blue-600">
                ₹{Math.round(result.maturityValue).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
