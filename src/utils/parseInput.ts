type ParseInput = (input: string) => {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string
}

export const parseInput: ParseInput = (input) => {
  const [amount, base, to, quote] = input.split(' ')

  if (!Number(amount) || !base || !to.match(/to/i) || !quote) {
    throw new Error('Invalid input structure')
  }

  return {
    fromAmount: Number(amount),
    fromCurrency: base.toUpperCase(),
    toCurrency: quote.toUpperCase(),
  };
};
