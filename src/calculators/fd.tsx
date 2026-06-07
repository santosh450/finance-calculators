export function calculateFd(principal: number, rate: number, years: number) {
  const maturityValue = principal * Math.pow(1 + rate / 100, years);

  const interestEarned = maturityValue - principal;

  return {
    investedAmount: principal,
    interestEarned,
    maturityValue,
  };
}
