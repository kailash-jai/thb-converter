export interface ConversionResult {
  [CurrencyCode.THB]: number;
  [CurrencyCode.INR]: number;
  [CurrencyCode.USD]: number;
}

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  locale: string;
}

export enum CurrencyCode {
  THB = 'THB',
  INR = 'INR',
  USD = 'USD'
}