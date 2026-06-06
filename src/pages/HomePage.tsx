import CalculatorCard from "../components/CalculatorCard";

export default function HomePage() {
  return (
    <div>
      {
        <button
          style={{
            padding: "12px 24px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Explore Calculators
        </button>
      }

      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h1>Finance Calculators</h1>

        <p>Calculate SIP, FD, EMI, CAGR and plan your financial future.</p>
      </section>

      {/* Calculator Cards */}

      <section>
        <h2>Popular Calculators</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <CalculatorCard
            title="SIP Calculator"
            description="Estimate wealth from monthly SIP investments."
            path="/sip-calculator"
          />

          <CalculatorCard
            title="FD Calculator"
            description="Calculate fixed deposit maturity amount."
            path="/"
          />

          <CalculatorCard
            title="EMI Calculator"
            description="Know your monthly loan EMI."
            path="/"
          />

          <CalculatorCard
            title="CAGR Calculator"
            description="Measure annualized investment returns."
            path="/"
          />
        </div>
      </section>

      {/* Benefits */}

      <section
        style={{
          marginTop: "60px",
        }}
      >
        <h2>Why Use Our Calculators?</h2>

        <ul>
          <li>Instant Results</li>
          <li>Accurate Formulas</li>
          <li>Free Forever</li>
          <li>Mobile Friendly</li>
        </ul>
      </section>
    </div>
  );
}
