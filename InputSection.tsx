import React from 'react';
import { MAX_INPUT_VALUE, MIN_INPUT_VALUE, CURRENCY_DETAILS } from '../constants';
import { CurrencyCode } from '../types';
import { ChevronDown } from 'lucide-react';

interface InputSectionProps {
  value: string;
  currency: CurrencyCode;
  onChange: (val: string) => void;
  onCurrencyChange: (code: CurrencyCode) => void;
  error: string | null;
  onEnter: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  value, 
  currency, 
  onChange, 
  onCurrencyChange, 
  error, 
  onEnter 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  const currentSymbol = CURRENCY_DETAILS[currency].symbol;

  return (
    <div className="input-section">
      <label htmlFor="currency-input" className="input-label">
        Enter Amount
      </label>
      <div className="input-wrapper">
        <div className="input-field-container">
          <div className="input-symbol">
            <span>{currentSymbol}</span>
          </div>
          <input
            id="currency-input"
            type="number"
            inputMode="decimal"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="0.00"
            className={`amount-input ${error ? 'error' : ''}`}
          />
        </div>
        <div className="currency-select-container">
          <div className="select-icon">
             <ChevronDown size={14} strokeWidth={3} />
          </div>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
            className="currency-select"
          >
            {Object.values(CurrencyCode).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {error && (
        <p className="error-msg">
          {error}
        </p>
      )}
      
      {!error && (
        <p className="info-msg">
          Min: {MIN_INPUT_VALUE} | Max: {MAX_INPUT_VALUE}
        </p>
      )}
    </div>
  );
};