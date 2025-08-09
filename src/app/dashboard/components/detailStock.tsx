"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatBRL, formatLargeNumber } from "@/utils/formt";
import LineChartStock from "./lineChartStock";
import VolumeChartStock from "./volumeChartStock";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { StockDetail } from "@/models/response/stockDetailResponse";
import { stockApi } from "@/api";
import { RangeSelector } from "./rangeSelector";

export default function StockDashboard({ stock }: { stock: string }) {
  const [stocksDetailData, setStocksDetailData] = useState<StockDetail | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [rangeSelected, setRangeSelected] = useState("5D");

  useEffect(() => {
    if (stock && !loading) {
      fetchStocks(stock, rangeSelected.toLowerCase());
    }
  }, [stock]);

  async function fetchStocks(stock: string, range?: string) {
    try {
      setLoading(true);

      setStocksDetailData(null);
      await stockApi.getStocksDetail(stock, range).then((stocks) => {
        setStocksDetailData(stocks.data);
        setLoading(false);
      });
    } catch (error) {
      console.error("Failed to fetch stock details:", error);
      setLoading(false);
    }
  }

  const isPositive = stocksDetailData
    ? stocksDetailData?.regularMarketChange > 0
    : false;

  return (
    <div className="min-h-screen bg-gray-900 p-0">
      <div className="w-full h-full space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={stocksDetailData?.logoUrl}
            alt={stocksDetailData?.symbol}
            className="w-12 h-12"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {stocksDetailData?.shortName}
            </h1>
            <p className="text-gray-400">{stocksDetailData?.shortName}</p>
          </div>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Preço Atual R$
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
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
              <Volume2 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stocksDetailData
                  ? formatLargeNumber(stocksDetailData.regularMarketVolume)
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
              <div className="text-2xl font-bold text-white">
                {stocksDetailData
                  ? formatBRL(stocksDetailData?.marketCap ?? 0 / 1000000000) + " B"
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
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stocksDetailData
                  ? stocksDetailData.priceEarnings?.toFixed(2)
                  : 0}
              </div>
              <p className="text-xs text-gray-400">Price/Earnings</p>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="w-full py-8">
            <LoadingSpinner text="Carregando dados do ativo..." />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-white">
              Evolução do Preço 
            </h2>

            <div style={{ paddingInline: 0 }}>
              <RangeSelector
                rangeSelected={rangeSelected}
                onSelect={(range) => {
                  setRangeSelected(range);
                  fetchStocks(
                    stocksDetailData?.symbol ?? "",
                    range.toLowerCase()
                  );
                }}
              />
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <div style={{ paddingInline: 10 }}>
                <LineChartStock
                  stockData={stocksDetailData ?? null}
                  range={rangeSelected}
                />
              </div>
            </Card>

            <VolumeChartStock
              stockData={stocksDetailData}
              range={rangeSelected}
            />
          </>
        )}

        {/* Informações adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  P/L (Price/Earnings):
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
                    ? formatBRL(stocksDetailData?.marketCap ?? 0 / 1000000000) + " B"
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
      </div>
    </div>
  );
}
