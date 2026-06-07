import type { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  children: ReactNode;
}

export default function CalculatorLayout({
  title,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>

      {children}
    </div>
  );
}
