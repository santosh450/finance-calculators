import {
  TrendingUp,
  PiggyBank,
  Landmark,
  CreditCard,
} from "lucide-react";
import type { Calculator } from "../types/calculator";


export const calculators: Calculator[] = [
  {
    title: "SIP",
    description: "Calculate SIP returns and future wealth.",
    path: "/sip-calculator",
    icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    category: "Investment",

  },
  {
    title: "Lumpsum",
    description: "Calculate one-time investment growth.",
    path: "/lumpsum-calculator",
    icon: PiggyBank,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    category: "Investment",
  },
  {
    title: "EMI",
    description: "Calculate loan EMI instantly.",
    path: "/emi-calculator",
    icon: CreditCard,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    category: "Loan",
  },
  {
    title: "FD",
    description: "Calculate fixed deposit maturity value.",
    path: "/fd-calculator",
    icon: Landmark,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    category: "Deposit",
  },
  {
    title: "CAGR",
    description: "Calculate compound annual growth rate.",
    path: "/cagr-calculator",
    icon: TrendingUp,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    category: "Investment",
  },
  {
    title: "RD",
    description:
      "Calculate recurring deposit maturity value.",
    path: "/rd-calculator",
    icon: Landmark,
    iconBg: "bg-yellow-100",
  iconColor: "text-yellow-600",
  category: "Deposit",
},
{
  title: "PPF",
  description: "Calculate Public Provident Fund maturity value.",
  path: "/ppf-calculator",
  icon: Landmark,
  iconBg: "bg-yellow-100",
  iconColor: "text-yellow-600",
  category: "Deposit",
}
];