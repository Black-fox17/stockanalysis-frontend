import React from 'react';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';

interface AIInsightsProps {
  stockSymbol: string;
  companyName: string;
  currentPrice: number;
  predictedPrice: number;
}

export function Insights({ stockSymbol, companyName, currentPrice, predictedPrice }: AIInsightsProps) {
  // Calculate simple metrics for the example
  const priceDifference = predictedPrice - currentPrice;
  const percentageChange = ((priceDifference) / currentPrice) * 100;
  const sentiment = percentageChange >= 0 ? 'positive' : 'negative';

  // Generate example insights based on the data
  const getInsightMessage = () => {
    const timeframe = "next 5 days";
    const direction = percentageChange >= 0 ? "upward" : "downward";
    const strength = Math.abs(percentageChange) > 5 ? "strong" : "moderate";
    
    return `Based on our analysis of ${companyName} (${stockSymbol}), we're observing a ${strength} ${direction} trend for the ${timeframe}. The AI model predicts a ${Math.abs(percentageChange).toFixed(2)}% ${percentageChange >= 0 ? 'increase' : 'decrease'} from the current price of $${currentPrice.toFixed(2)}.`;
  };

  const getRecommendation = () => {
    if (percentageChange > 5) {
      return "Consider this a potential buying opportunity, as technical indicators and market sentiment align favorably.";
    } else if (percentageChange < -5) {
      return "Consider reducing exposure or implementing hedging strategies to protect against potential downside risks.";
    } else {
      return "The current recommendation is to hold and monitor, as the price movement suggests relative stability.";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <Brain className="text-indigo-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">AI Market Insights</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          sentiment === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {sentiment === 'positive' ? 'Bullish' : 'Bearish'} Outlook
        </span>
      </div>

      <div className="space-y-4">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="text-indigo-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Market Analysis</h3>
              <p className="text-gray-700 leading-relaxed">
                {getInsightMessage()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-amber-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Recommendation</h3>
              <p className="text-gray-700 leading-relaxed">
                {getRecommendation()}
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-4">
          <p className="italic">
            Note: This is AI-generated analysis based on historical data and predictions. 
            Always conduct your own research and consult with financial advisors before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}