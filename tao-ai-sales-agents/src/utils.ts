export const usd0 = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`;
