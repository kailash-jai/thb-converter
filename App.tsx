import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { ResultCard } from './components/ResultCard';
import { RateSettings } from './components/RateSettings';
import { ConversionResult, CurrencyCode } from './types';
import { CONVERSION_RATES, MAX_INPUT_VALUE, MIN_INPUT_VALUE } from './constants';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputCurrency, setInputCurrency] = useState<CurrencyCode>(CurrencyCode.THB);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const [rates, setRates] = useState(CONVERSION_RATES);
  const [customRates, setCustomRates] = useState({
    [CurrencyCode.INR]: CONVERSION_RATES[CurrencyCode.INR].toString(),
    [CurrencyCode.USD]: CONVERSION_RATES[CurrencyCode.USD].toString(),
  });

  const validateInput = (val: number): boolean => {
    if (isNaN(val)) {
      setError('Please enter a valid number.');
      return false;
    }
    if (val < MIN_INPUT_VALUE) {
      setError(`Value cannot be less than ${MIN_INPUT_VALUE}.`);
      return false;
    }
    if (val > MAX_INPUT_VALUE) {
      setError(`Value cannot exceed ${MAX_INPUT_VALUE}.`);
      return false;
    }
    return true;
  };

  const calculateResults = (val: number, currentRates: typeof rates, inputCurr: CurrencyCode): ConversionResult => {
    let thbValue = 0;

    if (inputCurr === CurrencyCode.THB) {
      thbValue = val;
    } else if (inputCurr === CurrencyCode.INR) {
      thbValue = val / currentRates[CurrencyCode.INR];
    } else if (inputCurr === CurrencyCode.USD) {
      thbValue = val / currentRates[CurrencyCode.USD];
    }

    return {
      [CurrencyCode.THB]: thbValue,
      [CurrencyCode.INR]: thbValue * currentRates[CurrencyCode.INR],
      [CurrencyCode.USD]: thbValue * currentRates[CurrencyCode.USD],
    };
  };

  const handleCalculate = () => {
    setError(null);
    if (!inputValue.trim()) {
      setError('Please enter an amount.');
      setResult(null);
      return;
    }

    const numericValue = parseFloat(inputValue);

    if (validateInput(numericValue)) {
      setResult(calculateResults(numericValue, rates, inputCurrency));
    } else {
      setResult(null);
    }
  };

  const handleApplyRates = () => {
    const newInr = parseFloat(customRates[CurrencyCode.INR]);
    const newUsd = parseFloat(customRates[CurrencyCode.USD]);

    if (!isNaN(newInr) && !isNaN(newUsd)) {
      const newRates = {
        [CurrencyCode.INR]: newInr,
        [CurrencyCode.USD]: newUsd,
      };
      setRates(newRates);
      
      if (inputValue && !error) {
         const numericValue = parseFloat(inputValue);
         if (!isNaN(numericValue) && validateInput(numericValue)) {
             setResult(calculateResults(numericValue, newRates, inputCurrency));
         }
      }
    }
  };

  const handleReset = () => {
    setInputValue('');
    setInputCurrency(CurrencyCode.THB);
    setResult(null);
    setError(null);
    setRates(CONVERSION_RATES);
    setCustomRates({
        [CurrencyCode.INR]: CONVERSION_RATES[CurrencyCode.INR].toString(),
        [CurrencyCode.USD]: CONVERSION_RATES[CurrencyCode.USD].toString(),
    });
  };

  const getDisplayRate = (targetCode: CurrencyCode): number => {
    if (!result) return 0;
    if (inputCurrency === CurrencyCode.THB) {
        return targetCode === CurrencyCode.INR ? rates[CurrencyCode.INR] : rates[CurrencyCode.USD];
    }
    if (inputCurrency === targetCode) return 1;
    const inputVal = parseFloat(inputValue);
    if (inputVal === 0) return 0;
    return result[targetCode] / inputVal;
  };

  return (
    <div className="app-container">
      <div className="main-card">
        
        <div className="header-section">
          <div className="header-decor-1"></div>
          <div className="header-decor-2"></div>
          
          <div className="header-content">
            <h1 className="header-title">Currency Calculator</h1>
            <p className="header-subtitle">Convert between USD, INR and THB</p>
          </div>
        </div>

        <div className="card-body">
          <InputSection 
            value={inputValue} 
            currency={inputCurrency}
            onChange={setInputValue} 
            onCurrencyChange={(code) => {
              setInputCurrency(code);
              setResult(null);
            }}
            error={error}
            onEnter={handleCalculate}
          />

          <div className="action-buttons">
            <button
              onClick={handleCalculate}
              className="btn-primary"
            >
              <Calculator size={20} className="btn-icon-hover" />
              <span>Calculate</span>
            </button>
            
            <button
              onClick={handleReset}
              className="btn-reset"
              aria-label="Reset"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          <div className={`results-container ${result ? 'results-visible' : 'results-hidden'}`}>
            {result && (
              <>
                <div className="divider">
                  <div className="divider-line"></div>
                  <span className="divider-text">Conversion Results</span>
                  <div className="divider-line"></div>
                </div>

                {Object.values(CurrencyCode)
                  .filter(code => code !== inputCurrency)
                  .map(code => (
                    <ResultCard 
                      key={code}
                      currency={code} 
                      amount={result[code]} 
                      rate={getDisplayRate(code)} 
                    />
                ))}
              </>
            )}
          </div>

          <RateSettings
            inrRate={customRates[CurrencyCode.INR]}
            usdRate={customRates[CurrencyCode.USD]}
            onInrChange={(val) => setCustomRates(prev => ({ ...prev, [CurrencyCode.INR]: val }))}
            onUsdChange={(val) => setCustomRates(prev => ({ ...prev, [CurrencyCode.USD]: val }))}
            onApply={handleApplyRates}
          />
        </div>

        <div className="footer">
            <p className="footer-text">
                Current Base: 1 THB = {rates[CurrencyCode.INR]} INR / {rates[CurrencyCode.USD]} USD
            </p>
        </div>
      </div>
    </div>
  );
};

export default App;