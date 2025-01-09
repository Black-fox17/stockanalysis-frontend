import { StockData } from '../types/stock';

export class WebSocketService {
  private socket: WebSocket | null = null;
  private readonly url: string;

  constructor(baseUrl: string) {
    this.url = baseUrl;
  }

  connect(symbol: string, onData: (data: StockData) => void): void {
    // Close existing connection if any
    this.disconnect();

    // Connect to WebSocket
    this.socket = new WebSocket(`${this.url}/ws`);

    this.socket.onopen = () => {
      console.log(`Connected to WebSocket for ${symbol}`);
      // Send ticker symbol once connected
      this.sendTicker(symbol);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.error) {
          console.error('WebSocket Error:', data.error);
          return;
        }
        onData(data);
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    this.socket.onclose = () => {
      console.log(`Disconnected from WebSocket for ${symbol}`);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  private sendTicker(symbol: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ ticker: symbol }));
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// Create a singleton instance - replace with your FastAPI server URL
export const websocketService = new WebSocketService('ws://localhost:8000');