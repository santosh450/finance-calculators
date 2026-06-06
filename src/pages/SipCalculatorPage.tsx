import { useState } from "react";
import { calculateSip } from "../calculators/sip";

export default function SipCalculatorPage() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(20);

  const result = calculateSip(amount, rate, years);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">SIP Calculator</h1>

      {/* Form and Results coming next */}
    </div>
  );
}
