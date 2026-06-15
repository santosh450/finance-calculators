import { Link } from "react-router-dom";
import { useState } from "react";
import CalculatorCard from "../components/CalculatorCard";
import { calculators } from "../data/calculators";
import { Search } from "lucide-react";
// import { Calculator, BadgeCheck, Zap, Clock3 } from "lucide-react";
import { blogs } from "../data/blogs";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../constants/categories";
import { Calculator, BadgeCheck, User, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const filteredCalculators = calculators.filter((calculator) =>
    calculator.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* HERO */}

      <section className="text-center py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white rounded-3xl mb-1">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Financial Calculators Made Easy
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Calculate SIP returns, EMI payments, FD maturity amounts, and
          investment growth with our free financial calculators.
        </p>

        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search calculators..."
            className="w-full pl-12 pr-4 py-4 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {search && (
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-white border rounded-2xl shadow-lg overflow-hidden">
            {filteredCalculators.length > 0 ? (
              filteredCalculators.map((calculator) => (
                <Link
                  key={calculator.path}
                  to={calculator.path}
                  className="block px-5 py-4 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div className="font-medium">{calculator.title}</div>

                  <div className="text-sm text-gray-500">
                    {calculator.description}
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-gray-500">No calculators found</div>
            )}
          </div>
        </div>
      )}

      {/* CALCULATORS */}

      <section className="mb-20 bg-gray-50 py-12 px-6 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Calculators</h2>

          <Link to="/calculators" className="text-blue-600 font-medium">
            View All →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {calculators.slice(0, 5).map((calculator) => (
            <CalculatorCard key={calculator.path} {...calculator} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories
            .filter((category) => category.id !== "All")
            .map((category) => (
              <CategoryCard
                key={category.id}
                title={category.id}
                icon={category.icon}
                color={category.color}
                count={
                  calculators.filter((calc) => calc.category === category.id)
                    .length
                }
              />
            ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="mb-20 bg-gray-50 py-12 px-6 rounded-3xl">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x">
            <div className="flex items-center justify-center gap-3 p-5">
              <Calculator className="text-blue-600" size={22} />
              <div>
                <div className="font-bold text-lg">{calculators.length}+</div>
                <p className="text-sm text-gray-600">Calculators</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-5">
              <BadgeCheck className="text-blue-600" size={22} />
              <div>
                <div className="font-bold text-lg">100%</div>
                <p className="text-sm text-gray-600">Free to Use</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-5">
              <User className="text-blue-600" size={22} />
              <div>
                <div className="font-bold text-lg">No Login</div>
                <p className="text-sm text-gray-600">Required</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-5">
              <ShieldCheck className="text-blue-600" size={22} />
              <div>
                <div className="font-bold text-lg">Trusted</div>
                <p className="text-sm text-gray-600">by 100K+ Users</p>
              </div>
            </div>
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
              className="bg-white border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>

              <p className="text-gray-600 mb-4">{blog.description}</p>

              <span className="text-blue-600 font-medium">Read More →</span>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}

      <section className="mt-20 bg-gray-50 py-12 px-6 rounded-3xl">
        <h2 className="text-3xl font-bold mb-8">Why Choose CalcWise?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Instant Results</h3>

            <p className="text-gray-600">Get answers immediately.</p>
          </div>

          <div className="p-6 bg-white border rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">
              Accurate Calculations
            </h3>

            <p className="text-gray-600">Trusted financial formulas.</p>
          </div>

          <div className="p-6 bg-white border rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Free Forever</h3>

            <p className="text-gray-600">No signup required.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
