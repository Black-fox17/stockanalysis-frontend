import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import companiesData from '../data/companies.json';

interface StockSelectorProps {
  onSelectStock: (symbol: string) => void;
}

interface Company {
  name: string;
  sector: string;
}

export function StockSelector({ onSelectStock }: StockSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState<[string, Company][]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter companies based on search term
    const filtered = Object.entries(companiesData).filter(([symbol, company]) =>
      symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCompany = (symbol: string) => {
    onSelectStock(symbol);
    setSearchTerm(symbol);
    setShowDropdown(false);
  };

  return (
    <div className="w-full max-w-md relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search by symbol or company name..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </div>

      {showDropdown && filteredCompanies.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCompanies.map(([symbol, company]) => (
            <button
              key={symbol}
              onClick={() => handleSelectCompany(symbol)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center"
            >
              <div>
                <span className="font-semibold">{symbol}</span>
                <span className="ml-2 text-gray-600">{company.name}</span>
              </div>
              <span className="text-xs text-gray-500">{company.sector}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {Object.entries(companiesData).slice(0, 5).map(([symbol]) => (
          <button
            key={symbol}
            onClick={() => handleSelectCompany(symbol)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
}