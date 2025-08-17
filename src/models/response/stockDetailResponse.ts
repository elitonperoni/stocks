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
  marketCap?: number
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
  earningsPerShare?: number
  priceEarnings?: number
  symbol: string
  logoUrl: string
  usedInterval: string
  usedRange: string
  historicalDataPrice: HistoricalDataPrice[]
  linksNews?: LinksNews[]
  linksNewsCount?: number
}

interface LinksNews{
  title: string
  source?: Source
  date: string
  link: string
  thumbnail?: string
  subtitle?: string
}

interface Source {
  name: string;
  url: string;
}


//  public string Title { get; set; }
//  public string Link { get; set; }
//  public string Thumbnail { get; set; }
//  public string Thumbnail_small { get; set; }
//  public string? Date { get; set; } // vem em string do JSON
//  public DateTime? ParsedDate { get; set; } // campo convertido
//  public Source Source { get; set; }