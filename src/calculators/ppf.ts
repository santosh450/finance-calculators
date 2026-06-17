export function calculatePpf(
  yearlyInvestment: number,
  annualRate: number,
  years: number
) {
  let balance = 0;

  for (let year = 1; year <= years; year++) {
    balance += yearlyInvestment;
    balance *= 1 + annualRate / 100;
  }

  const totalInvestment = yearlyInvestment * years;
  const maturityValue = balance;
  const interestEarned = maturityValue - totalInvestment;

  return {
    totalInvestment,
    interestEarned,
    maturityValue,
  };
}