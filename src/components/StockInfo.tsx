import React from 'react';
import { StockMetadata } from '../types/stock';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockInfoProps {
  metadata: StockMetadata;
}

export function StockInfo({ metadata }: StockInfoProps) {
  const isPositive = metadata.change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{metadata.symbol}</h2>
          <p className="text-gray-600">{metadata.companyName}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">
            ${metadata.currentPrice?.toFixed(2) || '0.00'}
          </div>
          <div className={`flex items-center justify-end ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">
              {isPositive ? '+' : ''}{metadata.change?.toFixed(2) || '0.00'} ({metadata.changePercent?.toFixed(2) || '0.00'}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}