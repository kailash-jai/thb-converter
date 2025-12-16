import { CurrencyCode, CurrencyConfig } from './types';

export const CONVERSION_RATES = {
  [CurrencyCode.INR]: 2.9,
  [CurrencyCode.USD]: 0.032,
};

export const MAX_INPUT_VALUE = 99999;
export const MIN_INPUT_VALUE = 0;

export const CURRENCY_DETAILS: Record<CurrencyCode, CurrencyConfig> = {
  [CurrencyCode.THB]: {
    code: 'THB',
    name: 'Thai Baht',
    symbol: '฿',
    locale: 'th-TH'
  },
  [CurrencyCode.INR]: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    locale: 'en-IN'
  },
  [CurrencyCode.USD]: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    locale: 'en-US'
  }
};