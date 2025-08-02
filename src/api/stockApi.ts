
import { StockRequest } from '@/models/request/stockRequest';
import  api  from './api';
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
}