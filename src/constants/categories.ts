export const categories = [
  { id: "All", icon: "✨", color: "bg-gray-100" },
  { id: "Investment", icon: "📈", color: "bg-blue-100" },
  { id: "Loan", icon: "💳", color: "bg-green-100" },
  { id: "Deposit", icon: "🏦", color: "bg-yellow-100" },
  { id: "Retirement", icon: "🎯", color: "bg-purple-100" },
  { id: "Tax", icon: "📄", color: "bg-red-100" },
] as const;

export type CalculatorCategory =
  (typeof categories)[number]["id"];