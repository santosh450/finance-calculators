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
  },
  {
    title: "Lumpsum Calculator",
    description: "Calculate one-time investment growth.",
    path: "/lumpsum-calculator",
    icon: PiggyBank,
  },
  {
    title: "EMI Calculator",
    description: "Calculate loan EMI instantly.",
    path: "/emi-calculator",
    icon: CreditCard,
  },
  {
    title: "FD Calculator",
    description: "Calculate fixed deposit maturity value.",
    path: "/fd-calculator",
    icon: Landmark,
  },
];