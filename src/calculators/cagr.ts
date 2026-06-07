export function calculateCagr(
  initialValue: number,
  finalValue: number,
  years: number
) {
  const cagr =
    (Math.pow(
      finalValue / initialValue,
      1 / years
    ) -
      1) *
    100;

  return cagr;
}