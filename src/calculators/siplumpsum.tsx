export function calculateSipLumpsum(
  monthlyInvestment: number,
  annualRate: number,
  years: number,
  lumpsumInvestment: number,
) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  const maturitySIP =
    monthlyInvestment *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));

  const maturityLumpsum = lumpsumInvestment * Math.pow(1 + monthlyRate, months);

  const maturity = maturitySIP + maturityLumpsum;

  const investedAmount = monthlyInvestment * months + lumpsumInvestment;

  const estimatedReturns = maturity - investedAmount;

  return {
    investedAmount,
    estimatedReturns,
    maturityValue: maturity,
  };
}
