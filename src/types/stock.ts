export interface StockData {
  timestamp: number;
  price: number;
  volume: number;
}

export interface PredictionData {
  timestamp: number;
  predictedPrice: number;
  confidence: number;
}

export interface StockMetadata {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}