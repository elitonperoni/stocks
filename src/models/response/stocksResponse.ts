export interface StocksResponse {
  id: number;
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  logo: string;
  sector?: string;
  type: string;
}
