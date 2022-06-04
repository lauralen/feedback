export const capitalizeEveryWord = (string: string): string =>
  string.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
