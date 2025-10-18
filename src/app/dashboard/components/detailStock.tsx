"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatBRL, formatLargeNumber } from "@/utils/formt";
import LineChartStock from "./lineChartStock";
import VolumeChartStock from "./volumeChartStock";
import { LinksNews, StockDetail } from "@/models/response/stockDetailResponse";
import { stockApi } from "@/api";
import { RangeSelector } from "./rangeSelector";
import NewsCard from "./newsCard";

export default function StockDashboard({ stock }: Readonly<{ stock: string }>) {
  const [stocksDetailData, setStocksDetailData] = useState<StockDetail | null>(null);
  const [stocksNews, setStocksNews] = useState<LinksNews[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNews, setLoadingNews] = useState<boolean>(false);
  const [rangeSelected, setRangeSelected] = useState("5D");

  useEffect(() => {    
    if (stock && !loading) {
      fetchStocks(stock, rangeSelected.toLowerCase());
    }
  }, [stock]);

  async function fetchStocks(stock: string, range?: string) {
    try {
      setLoading(true);
      setLoadingNews(true);
      setStocksDetailData(null);
      setStocksNews([]);

      await stockApi.getStocksDetail(stock, range).then((stocks) => {
        setStocksDetailData(stocks.data);      
      })
      .finally(() => { setLoading(false); });

      await stockApi.getStocksNews(stock).then((stocks) => {
        setStocksNews(stocks.data);        
      })
      .finally(() => { setLoadingNews(false); });
    } catch {
      setLoading(false);
      setLoadingNews(false);
    }
  }

  const isPositive = stocksDetailData
    ? stocksDetailData?.regularMarketChange > 0
    : false;

  return (
    <div className="min-h-screen bg-gray-900 p-0">
      <div className="w-full h-full space-y-6 px-4 py-6 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {!loading && stocksDetailData?.logoUrl && (
            <img
              src={stocksDetailData?.logoUrl}
              alt={stocksDetailData?.symbol}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded"
            />
          )}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-white truncate">
              {stocksDetailData?.shortName}
            </h1>
            <p className="text-sm text-gray-400 truncate">
              {stocksDetailData?.shortName}
            </p>
          </div>
        </div>

        {/* Métricas principais */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Preço Atual R$
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {formatBRL(stocksDetailData?.regularMarketPrice ?? 0)}
              </div>
              <div className="flex items-center gap-1 text-xs">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={isPositive ? "text-green-500" : "text-red-500"}
                >
                  {`${stocksDetailData?.regularMarketChangePercent.toFixed(
                    2
                  )}%`}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Volume R$
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {stocksDetailData
                  ? formatLargeNumber(stocksDetailData?.regularMarketVolume)
                  : 0}
              </div>
              <p className="text-xs text-gray-400">Ações negociadas</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Valor de Mercado
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {stocksDetailData
                  ? formatBRL((stocksDetailData?.marketCap ?? 0) / 1000000000) +
                    " B"
                  : 0}
              </div>
              <p className="text-xs text-gray-400">Market Cap</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                P/L
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {stocksDetailData
                  ? stocksDetailData?.priceEarnings?.toFixed(2)
                  : 0}
              </div>
              <p className="text-xs text-gray-400">Preço/Lucro</p>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="w-full space-y-6">
            {/* Skeleton Header */}
            <div className="flex items-center gap-4 mb-8 animate-pulse">
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="h-6 w-40 bg-gray-700 rounded"></div>
                <div className="h-4 w-32 bg-gray-600 rounded"></div>
              </div>
            </div>

            {/* Skeleton Métricas principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card
                  key={i}
                  className="bg-gray-800 border-gray-700 animate-pulse"
                >
                  <CardHeader className="flex justify-between pb-2">
                    <div className="h-4 w-20 bg-gray-700 rounded"></div>
                    <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-20 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-12 bg-gray-600 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skeleton gráficos */}
            <div className="space-y-6">
              <div className="h-64 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Skeleton cards de informações adicionais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <Card
                  key={i}
                  className="bg-gray-800 border-gray-700 animate-pulse"
                >
                  <CardHeader>
                    <div className="h-5 w-32 bg-gray-700 rounded"></div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-4 w-24 bg-gray-600 rounded"></div>
                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Evolução do Preço
            </h2>

            <div className="mt-2 mb-4" style={{ paddingInline: 0 }}>
                <RangeSelector
                  rangeSelected={rangeSelected}
                  onSelect={(range) => {
                    setRangeSelected(range);
                    fetchStocks(
                      stock,
                      range.toLowerCase()
                    );
                  }}
                />
            </div>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              {/* Container rolável para telas muito pequenas */}
              <div className="w-full overflow-x-auto -mx-4 px-4">
                <div className="min-w-[640px]" style={{ paddingInline: 6 }}>
                  <LineChartStock
                    stockData={stocksDetailData}
                    range={rangeSelected}
                  />
                </div>
              </div>
            </Card>

            <div className="mt-4 overflow-x-auto -mx-4 px-4">
              <div className="min-w-[640px]">
                <VolumeChartStock
                  stockData={stocksDetailData}
                  range={rangeSelected}
                />
              </div>
            </div>
          </>
        )}

        {/* Informações adicionais */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Informações da Sessão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Abertura:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketOpen)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  Fechamento Anterior:
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketPreviousClose)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Máxima do Dia:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketDayHigh)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Mínima do Dia:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketDayLow)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  Variação 52 Semanas:
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData ? stocksDetailData?.fiftyTwoWeekRange : 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Métricas Fundamentalistas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  P/L (Preço/Lucro):
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? stocksDetailData.priceEarnings?.toFixed(2)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  LPA (Lucro por Ação):
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData?.earningsPerShare ?? 0)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Valor de Mercado:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(
                        (stocksDetailData?.marketCap ?? 0) / 1000000000
                      ) + " B"
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Moeda:</span>
                <Badge variant="outline">{stocksDetailData?.currency}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Informações da Sessão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Abertura:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketOpen)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  Fechamento Anterior:
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketPreviousClose)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Máxima do Dia:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketDayHigh)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Mínima do Dia:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData.regularMarketDayLow)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  Variação 52 Semanas:
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData ? stocksDetailData?.fiftyTwoWeekRange : 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Métricas Fundamentalistas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  P/L (Preço/Lucro):
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? stocksDetailData.priceEarnings?.toFixed(2)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  LPA (Lucro por Ação):
                </span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(stocksDetailData?.earningsPerShare ?? 0)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Valor de Mercado:</span>
                <span className="font-medium text-white">
                  {stocksDetailData
                    ? formatBRL(
                        (stocksDetailData?.marketCap ?? 0) / 1000000000
                      ) + " B"
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Moeda:</span>
                <Badge variant="outline">{stocksDetailData?.currency}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center py-6 px-0">
          {!loadingNews && stocksNews ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {stocksNews.map((news, index) => (
                <NewsCard
                  key={index}
                  title={news.title}
                  source={news.source?.name || "Fonte desconhecida"}
                  date={news.date}
                  link={news.link}
                  thumbnail={news.thumbnail}
                  subtitle={news.subtitle}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col gap-2 bg-gray-800 rounded-md p-4"
                >
                  <div className="h-32 bg-gray-700 rounded-md w-full" />
                  <div className="h-4 bg-gray-600 rounded w-3/4" />
                  <div className="h-3 bg-gray-600 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
