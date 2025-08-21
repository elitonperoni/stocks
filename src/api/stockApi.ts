
import { StockRequest } from '@/models/request/stockRequest';
import  api  from './api';
import { LinksNews, StockDetail } from '@/models/response/stockDetailResponse';
import { AxiosResponse } from 'axios';

const baseRoute : string = "stocks"
export class StockApi {
    
  async getStocks(
    request : StockRequest) {
    try {
      return await api.get(`${baseRoute}`,
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
      return await api.get(`${baseRoute}/detail?stock=${stock}&range=${range ?? "5d"}`
      );      
    } catch (error) {
      console.error('Error fetching all stocks:', error);
      throw error;
    }
  }

    async getStocksNews(
    stock : string) :Promise<AxiosResponse<LinksNews[]>> {
    try {
      return await api.get(`${baseRoute}/news?stock=${stock}`
      );      
    } catch (error) {
      console.error('Error fetching all stocks:', error);
      throw error;
    }
  }
}