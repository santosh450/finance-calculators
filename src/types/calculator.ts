import type { LucideIcon } from "lucide-react";
import type { CalculatorCategory } from "../constants/categories";

export interface Calculator {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  category: CalculatorCategory;
}