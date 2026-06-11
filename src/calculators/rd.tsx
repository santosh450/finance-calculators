export function calculateRd(
  monthlyDeposit: number,
  annualRate: number,
  years: number,
) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  const maturityAmount =
    monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const investedAmount = monthlyDeposit * months;

  const interestEarned = maturityAmount - investedAmount;

  return {
    maturityAmount,
    investedAmount,
    interestEarned,
  };
}
