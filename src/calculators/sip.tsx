export function calculateSip(
  monthlyInvestment: number,
  annualRate: number,
  years: number,
) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  const maturity =
    monthlyInvestment *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));

  return Math.round(maturity);
}
