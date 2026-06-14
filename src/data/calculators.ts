import {
  TrendingUp,
  PiggyBank,
  Landmark,
  CreditCard,
} from "lucide-react";

export const calculators = [
  {
    title: "SIP Calculator",
    description: "Calculate SIP returns and future wealth.",
    path: "/sip-calculator",
    icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Lumpsum Calculator",
    description: "Calculate one-time investment growth.",
    path: "/lumpsum-calculator",
    icon: PiggyBank,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "EMI Calculator",
    description: "Calculate loan EMI instantly.",
    path: "/emi-calculator",
    icon: CreditCard,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "FD Calculator",
    description: "Calculate fixed deposit maturity value.",
    path: "/fd-calculator",
    icon: Landmark,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "CAGR Calculator",
    description: "Calculate compound annual growth rate.",
    path: "/cagr-calculator",
    icon: TrendingUp,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
  title: "RD Calculator",
  description:
    "Calculate recurring deposit maturity value.",
  path: "/rd-calculator",
  icon: Landmark,
  iconBg: "bg-yellow-100",
  iconColor: "text-yellow-600",
}
];