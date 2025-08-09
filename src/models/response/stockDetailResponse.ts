export interface HistoricalDataPrice {
  date: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  adjustedClose: number
}

export interface StockDetail {
  currency: string
  marketCap: number
  shortName: string
  longName: string
  regularMarketChange: number
  regularMarketChangePercent: number
  regularMarketTime: string
  regularMarketPrice: number
  regularMarketDayHigh: number
  regularMarketDayRange: string
  regularMarketDayLow: number
  regularMarketVolume: number
  regularMarketPreviousClose: number
  regularMarketOpen: number
  fiftyTwoWeekRange: string
  fiftyTwoWeekLow: number
  fiftyTwoWeekHigh: number
  earningsPerShare: number
  priceEarnings: number
  symbol: string
  logoUrl: string
  usedInterval: string
  usedRange: string
  historicalDataPrice: HistoricalDataPrice[]
}


