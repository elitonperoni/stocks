
import { StockRequest } from '@/models/request/stockRequest';
import  api  from './api';
import { StockDetail } from '@/models/response/stockDetailResponse';
import { AxiosResponse } from 'axios';
export class StockApi {

  async getStocks(
    request : StockRequest) {
    try {
      return await api.get('/stocks',
        {
          params: request
        }
      );      
    } catch (error) {
      console.error('Error fetching all stocks:', error);
      throw error;
    }
  }

  async getStocksDetail(
    stock : string,
    range?: string) :Promise<AxiosResponse<StockDetail>> {
    try {
      return await api.get(`/stocks/detail?stock=${stock}&range=${range ?? "5d"}`
      );      
    } catch (error) {
      console.error('Error fetching all stocks:', error);
      throw error;
    }
  }
}