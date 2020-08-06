const SYMBOL_RULES = [
  { value: 1, symbol: "" },
  { value: 1E3, symbol: "k" },
  { value: 1E6, symbol: "M" },
  { value: 1E9, symbol: "G" },
  { value: 1E12, symbol: "T" },
  { value: 1E15, symbol: "P" },
  { value: 1E18, symbol: "E" }
];

const NUMBER_TYPE_MATCH = /\.0+$|(\.[0-9]*[1-9])0+$/;

export function largeNumberFormatter(number, digits = 0) {
  let i;
  for (i = SYMBOL_RULES.length - 1; i > 0; i--) {
    if (number >= SYMBOL_RULES[i].value) {
      break;
    }
  }
  return (number / SYMBOL_RULES[i].value)
          .toFixed(digits)
          .replace(NUMBER_TYPE_MATCH, "$1") + SYMBOL_RULES[i].symbol;
}
