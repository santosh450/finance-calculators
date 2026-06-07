import { Link } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";
import { calculators } from "../data/Calculators";
import { Search } from "lucide-react";
import { Calculator, BadgeCheck, Zap, Clock3 } from "lucide-react";
import { blogs } from "../data/blogs";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}

      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Financial Calculators Made Easy
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Calculate SIP returns, EMI payments, FD maturity amounts, and
          investment growth with our free financial calculators.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/calculators"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Explore Calculators
          </Link>

          <Link
            to="/sip-calculator"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Try SIP Calculator
          </Link>
        </div>
      </section>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-16">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search calculators..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* CALCULATORS */}

      <section className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Calculators</h2>

          <Link to="/calculators" className="text-blue-600 font-medium">
            View All →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {calculators.slice(0, 4).map((calculator) => (
            <CalculatorCard key={calculator.path} {...calculator} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">📈 Investment</h3>

            <ul className="space-y-2 text-gray-600">
              <li>SIP Calculator</li>
              <li>Lumpsum Calculator</li>
            </ul>
          </div>

          <div className="border rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">💳 Loans</h3>

            <ul className="space-y-2 text-gray-600">
              <li>EMI Calculator</li>
            </ul>
          </div>

          <div className="border rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">🏦 Deposits</h3>

            <ul className="space-y-2 text-gray-600">
              <li>FD Calculator</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Use Our Calculators?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border rounded-2xl p-6 text-center">
            <Calculator className="mx-auto mb-3 text-blue-600" size={32} />
            <div className="text-3xl font-bold">{calculators.length}+</div>
            <p className="text-gray-600">Calculators</p>
          </div>

          <div className="border rounded-2xl p-6 text-center">
            <BadgeCheck className="mx-auto mb-3 text-green-600" size={32} />
            <div className="text-3xl font-bold">100%</div>
            <p className="text-gray-600">Free</p>
          </div>

          <div className="border rounded-2xl p-6 text-center">
            <Zap className="mx-auto mb-3 text-yellow-500" size={32} />
            <div className="text-3xl font-bold">Instant</div>
            <p className="text-gray-600">Results</p>
          </div>

          <div className="border rounded-2xl p-6 text-center">
            <Clock3 className="mx-auto mb-3 text-purple-600" size={32} />
            <div className="text-3xl font-bold">24/7</div>
            <p className="text-gray-600">Available</p>
          </div>
        </div>
      </section>

      {/* BLOGS */}

      <section className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>

          <span className="text-blue-600 font-medium">Coming Soon</span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="border rounded-2xl p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>

              <p className="text-gray-600 mb-4">{blog.description}</p>

              <span className="text-blue-600 font-medium">Read More →</span>
            </div>
          ))}
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
