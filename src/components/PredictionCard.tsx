import React from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { PredictionData } from '../types/stock';

interface PredictionCardProps {
  latestPrediction: number;
  currentPrice: number;
}

export function PredictionCard({ latestPrediction, currentPrice }: PredictionCardProps) {
  const predictionDiff = latestPrediction- currentPrice;
  const predictionPercent = (predictionDiff / currentPrice) * 100;
  const isPositive = predictionDiff > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Price Prediction</h3>
        <BarChart2 className="text-blue-500" />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Predicted Price</span>
          <span className="text-xl font-bold">
            ${latestPrediction.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Expected Change</span>
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1 font-semibold">
              {predictionPercent.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Confidence</span>
          <div className="w-24 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${latestPrediction.confidence * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}