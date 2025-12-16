import React from 'react';
import { CurrencyCode } from '../types';
import { CURRENCY_DETAILS } from '../constants';
import { formatCurrency } from '../utils/formatters';
import { DollarSign, IndianRupee, Coins } from 'lucide-react';

interface ResultCardProps {
  currency: CurrencyCode;
  amount: number;
  rate: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ currency, amount, rate }) => {
  const config = CURRENCY_DETAILS[currency];
  
  let Icon = Coins;
  let variantClass = 'default';

  if (currency === CurrencyCode.INR) {
    Icon = IndianRupee;
    variantClass = 'inr';
  } else if (currency === CurrencyCode.USD) {
    Icon = DollarSign;
    variantClass = 'usd';
  }

  return (
    <div className={`result-card ${variantClass}`}>
      <div className="rc-left">
        <div className="rc-icon-box">
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="rc-name">{config.name}</p>
          <h3 className="rc-value">
            {formatCurrency(amount, config)}
          </h3>
        </div>
      </div>
      <div className="rc-right">
         <span className="rate-badge">
           Rate: {rate.toLocaleString(undefined, { maximumFractionDigits: 5 })}
         </span>
         <span className="currency-code-small">
            {config.code}
         </span>
      </div>
    </div>
  );
};