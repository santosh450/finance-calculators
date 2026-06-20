export function calculateStepUpSip(
  monthlySip: number,
  annualReturn: number,
  years: number,
  stepUpPercent: number
) {
  const monthlyRate = annualReturn / 12 / 100;

  let currentSip = monthlySip;
  let investedAmount = 0;
  let corpus = 0;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      corpus = (corpus + currentSip) * (1 + monthlyRate);
      investedAmount += currentSip;
    }

    currentSip *= 1 + stepUpPercent / 100;
  }

  const maturityValue = corpus;
  const estimatedReturns = maturityValue - investedAmount;

  return {
    investedAmount,
    estimatedReturns,
    maturityValue,
  };
}