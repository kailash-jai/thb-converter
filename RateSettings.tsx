import React, { useState } from 'react';
import { Settings, Save, ChevronDown } from 'lucide-react';

interface RateSettingsProps {
  inrRate: string;
  usdRate: string;
  onInrChange: (val: string) => void;
  onUsdChange: (val: string) => void;
  onApply: () => void;
}

export const RateSettings: React.FC<RateSettingsProps> = ({
  inrRate,
  usdRate,
  onInrChange,
  onUsdChange,
  onApply
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="settings-section">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="settings-toggle"
      >
        <div className="st-left">
          <div className="st-icon">
            <Settings size={16} />
          </div>
          <span className="st-text">Base Configuration (1 THB)</span>
        </div>
        <ChevronDown 
          size={18} 
          className={`st-arrow ${isOpen ? 'open' : ''}`} 
        />
      </button>
      
      <div className={`settings-panel ${isOpen ? 'open' : 'closed'}`}>
        <div className="sp-inner">
          <div className="sp-content">
            <div className="settings-grid">
              <div className="setting-field">
                 <label>THB to INR</label>
                 <input
                   type="number"
                   inputMode="decimal"
                   step="0.1"
                   value={inrRate}
                   onChange={(e) => onInrChange(e.target.value)}
                   className="setting-input"
                 />
              </div>
              <div className="setting-field">
                 <label>THB to USD</label>
                 <input
                   type="number"
                   inputMode="decimal"
                   step="0.001"
                   value={usdRate}
                   onChange={(e) => onUsdChange(e.target.value)}
                   className="setting-input"
                 />
              </div>
            </div>
            
            <button
              onClick={() => {
                onApply();
                setIsOpen(false);
              }}
              className="btn-save"
            >
              <Save size={16} />
              <span>Save & Apply Rates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};