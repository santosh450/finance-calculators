export function calculateSwp(
  initialInvestment: number,
  monthlyWithdrawal: number,
  annualRate: number,
  years: number
) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  let corpus = initialInvestment;

  for (let i = 0; i < months; i++) {
    corpus = corpus * (1 + monthlyRate);
    corpus -= monthlyWithdrawal;

    // if (corpus < 0) {
    //   corpus = 0;
    //   break;
    // }
  }

  const totalWithdrawals =
    monthlyWithdrawal * months;

  const totalGrowth =
    corpus + totalWithdrawals - initialInvestment;

  return {
    totalWithdrawals,
    remainingCorpus: corpus,
    totalGrowth,
  };
}