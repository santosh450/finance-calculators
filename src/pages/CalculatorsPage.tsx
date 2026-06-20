import CalculatorCard from "../components/CalculatorCard";
import { calculators } from "../data/calculators";
import {
  categories,
  type CalculatorCategory as CalculatorCategoryType,
} from "../constants/categories";
import { Link, useSearchParams } from "react-router-dom";

const ALL_CATEGORY = categories[0].id;

export default function CalculatorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory =
    (searchParams.get("category") as CalculatorCategoryType) ?? ALL_CATEGORY;

  const filteredCalculators =
    selectedCategory === ALL_CATEGORY
      ? calculators
      : calculators.filter(
          (calculator) => calculator.category === selectedCategory,
        );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">All Calculators</h1>

      <p className="text-gray-600 mb-8">Free online financial calculators.</p>

      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              if (category.id === ALL_CATEGORY) {
                setSearchParams({});
              } else {
                setSearchParams({
                  category: category.id,
                });
              }
            }}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category.icon} {category.id}
          </button>
        ))}
      </div>

      {selectedCategory === ALL_CATEGORY ? (
        <div className="space-y-8">
          {categories
            .filter((category) => category.id !== ALL_CATEGORY)
            .map((category) => {
              const categoryCalculators = calculators.filter(
                (calc) => calc.category === category.id,
              );

              if (categoryCalculators.length === 0) return null;

              return (
                <div key={category.id}>
                  <h2 className="text-2xl font-semibold mb-4">
                    {category.icon} {category.id}
                  </h2>

                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {categoryCalculators.map((calculator) => (
                      <Link
                        key={calculator.path}
                        to={calculator.path}
                        className="text-blue-600 hover:underline"
                      >
                        {calculator.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCalculators.map((calculator) => (
            <CalculatorCard key={calculator.path} {...calculator} />
          ))}
        </div>
      )}
    </div>
  );
}
