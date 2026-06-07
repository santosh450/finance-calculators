import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">FinanceCalc</h3>

            <p className="text-gray-600">
              Free financial calculators for investments, loans and deposits.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>

            <ul className="space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/calculators">Calculators</Link>
              </li>

              <li>
                <Link to="/sip-calculator">SIP Calculator</Link>
              </li>

              <li>
                <Link to="/emi-calculator">EMI Calculator</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>

            <ul className="space-y-2">
              <li>About</li>
              <li>Contact</li>
              <li>Blog (Coming Soon)</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} FinanceCalc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
