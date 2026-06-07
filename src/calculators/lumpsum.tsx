export function calculateLumpsum(
  principal: number,
  annualRate: number,
  years: number,
) {
  const maturityValue = principal * Math.pow(1 + annualRate / 100, years);

  const estimatedReturns = maturityValue - principal;

  return {
    investedAmount: principal,
    estimatedReturns,
    maturityValue,
  };
}
