export function queryCondition(query: string, queryValue: string, compareValue: any) {
  switch (true) {
    case query.endsWith('_gt'): return +queryValue < +compareValue;
    case query.endsWith('_gte'): return +queryValue <= +compareValue;
    case query.endsWith('_lt'): return +queryValue > +compareValue;
    case query.endsWith('_lte'): return +queryValue >= +compareValue;
    case query.endsWith('_ne'): return queryValue != compareValue;
    default: return queryValue == compareValue;
  }
}

// simple random id generator
export function randomId(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const timestamp: number = new Date().getTime(); // unix timestamp in milliseconds
  const randomIndex = () => Math.floor(Math.random() * alphabet.length);

  return alphabet[randomIndex()] + timestamp + alphabet[randomIndex()];
}
