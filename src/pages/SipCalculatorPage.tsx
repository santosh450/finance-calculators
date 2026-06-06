import { useState } from "react";
import { calculateSip } from "../calculators/sip";

export default function SipCalculatorPage() {
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = calculateSip(amount, rate, years);

  return (
    <div>
      <h1>SIP Calculator</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
      />

      <input
        type="number"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
      />

      <h2>Future Value: ₹{result.toLocaleString()}</h2>
    </div>
  );
}
