import { Link } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}

      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">Financial Calculators</h1>

        <p className="text-xl text-gray-600 mb-8">
          Plan your investments, savings, loans and retirement with ease.
        </p>

        <Link
          to="/calculators"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Explore Calculators
        </Link>
      </section>

      {/* CALCULATORS */}

      <section>
        <h2 className="text-3xl font-bold mb-8">Popular Calculators</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* <CalculatorCard
            title="SIP Calculator"
            description="Calculate future value of SIP investments."
            path="/sip-calculator"
          />

          <CalculatorCard
            title="Lumpsum Calculator"
            description="Calculate future value of a one-time investment."
            path="/lumpsum-calculator"
          />

          <CalculatorCard
            title="FD Calculator"
            description="Estimate fixed deposit maturity amount."
            path="/fd-calculator"
          />

          <CalculatorCard
            title="EMI Calculator"
            description="Know your monthly loan repayments."
            path="/emi-calculator"
          />

          <CalculatorCard
            title="CAGR Calculator"
            description="Measure annualized investment growth."
            path="/"
          /> */}
        </div>
      </section>

      {/* BENEFITS */}

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Why Choose CalcWise?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Instant Results</h3>

            <p className="text-gray-600">Get answers immediately.</p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg mb-2">
              Accurate Calculations
            </h3>

            <p className="text-gray-600">Trusted financial formulas.</p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Free Forever</h3>

            <p className="text-gray-600">No signup required.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
