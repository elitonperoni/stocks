"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { RangeSelector } from "./rangeSelector";

const stockData = {
  currency: "BRL",
  marketCap: 352933931371,
  shortName: "ITAUUNIBANCOPN      N1",
  longName: "Itaú Unibanco Holding S.A.",
  regularMarketChange: -0.2149,
  regularMarketChangePercent: -0.611,
  regularMarketTime: "2025-08-01T20:07:00.000Z",
  regularMarketPrice: 34.93,
  regularMarketDayHigh: 35.76,
  regularMarketDayRange: "34.74 - 35.76",
  regularMarketDayLow: 34.74,
  regularMarketVolume: 15993400,
  regularMarketPreviousClose: 35.1449,
  regularMarketOpen: 35.1,
  fiftyTwoWeekRange: "27.1091 - 38.62",
  fiftyTwoWeekLow: 27.1091,
  fiftyTwoWeekHigh: 38.62,
  earningsPerShare: 0,
  priceEarnings: 0,
  symbol: "ITUB4",
  logourl: "https://icons.brapi.dev/icons/ITUB4.svg",
  usedInterval: "1d",
  usedRange: "5d",
  historicalDataPrice: [
    {
      date: 1746450000,
      open: 35.25,
      high: 35.39,
      low: 34.75,
      close: 34.84,
      volume: 27611800,
      adjustedClose: 34.4701,
    },
    {
      date: 1746536400,
      open: 34.82,
      high: 34.88,
      low: 34.42,
      close: 34.66,
      volume: 17255400,
      adjustedClose: 34.292,
    },
    {
      date: 1746622800,
      open: 34.92,
      high: 35.14,
      low: 34.73,
      close: 35.04,
      volume: 13397900,
      adjustedClose: 34.6679,
    },
    {
      date: 1746709200,
      open: 35.6,
      high: 36,
      low: 35.14,
      close: 35.32,
      volume: 33186100,
      adjustedClose: 34.945,
    },
    {
      date: 1746795600,
      open: 36.4,
      high: 37.25,
      low: 35.79,
      close: 37.23,
      volume: 58004600,
      adjustedClose: 36.8347,
    },
    {
      date: 1747054800,
      open: 37.44,
      high: 37.44,
      low: 36.25,
      close: 36.48,
      volume: 26894900,
      adjustedClose: 36.0926,
    },
    {
      date: 1747141200,
      open: 36.68,
      high: 37.11,
      low: 36.52,
      close: 36.93,
      volume: 24635200,
      adjustedClose: 36.5379,
    },
    {
      date: 1747227600,
      open: 36.94,
      high: 37.34,
      low: 36.81,
      close: 37.18,
      volume: 17869500,
      adjustedClose: 36.7852,
    },
    {
      date: 1747314000,
      open: 37.36,
      high: 37.77,
      low: 37.22,
      close: 37.68,
      volume: 26350700,
      adjustedClose: 37.2799,
    },
    {
      date: 1747400400,
      open: 37.68,
      high: 38,
      low: 37.37,
      close: 37.9,
      volume: 29635800,
      adjustedClose: 37.4976,
    },
    {
      date: 1747659600,
      open: 37.82,
      high: 38.59,
      low: 37.71,
      close: 38.35,
      volume: 24323000,
      adjustedClose: 37.9428,
    },
    {
      date: 1747746000,
      open: 38.38,
      high: 38.38,
      low: 37.86,
      close: 38.3,
      volume: 17978200,
      adjustedClose: 37.8933,
    },
    {
      date: 1747832400,
      open: 38.19,
      high: 38.2,
      low: 37.22,
      close: 37.53,
      volume: 20216400,
      adjustedClose: 37.1315,
    },
    {
      date: 1747918800,
      open: 37.64,
      high: 37.74,
      low: 37.14,
      close: 37.27,
      volume: 22889800,
      adjustedClose: 36.8743,
    },
    {
      date: 1748005200,
      open: 36.6,
      high: 37.72,
      low: 36.36,
      close: 37.72,
      volume: 20125900,
      adjustedClose: 37.3195,
    },
    {
      date: 1748264400,
      open: 37.62,
      high: 38.25,
      low: 37.54,
      close: 37.8,
      volume: 6500400,
      adjustedClose: 37.3986,
    },
    {
      date: 1748350800,
      open: 38.3,
      high: 38.62,
      low: 37.87,
      close: 38.1,
      volume: 14716300,
      adjustedClose: 37.6954,
    },
    {
      date: 1748437200,
      open: 38.08,
      high: 38.15,
      low: 37.7,
      close: 37.79,
      volume: 14548200,
      adjustedClose: 37.3887,
    },
    {
      date: 1748523600,
      open: 37.66,
      high: 37.96,
      low: 37.35,
      close: 37.49,
      volume: 17515300,
      adjustedClose: 37.0919,
    },
    {
      date: 1748610000,
      open: 37.63,
      high: 37.72,
      low: 37.09,
      close: 37.43,
      volume: 31193800,
      adjustedClose: 37.0326,
    },
    {
      date: 1748869200,
      open: 37.67,
      high: 37.76,
      low: 37.03,
      close: 37.15,
      volume: 23075800,
      adjustedClose: 36.7729,
    },
    {
      date: 1748955600,
      open: 37.01,
      high: 37.15,
      low: 36.78,
      close: 37.03,
      volume: 23511000,
      adjustedClose: 36.6541,
    },
    {
      date: 1749042000,
      open: 37.17,
      high: 37.29,
      low: 36.67,
      close: 36.94,
      volume: 17266700,
      adjustedClose: 36.565,
    },
    {
      date: 1749128400,
      open: 37,
      high: 37,
      low: 36.38,
      close: 36.49,
      volume: 24798200,
      adjustedClose: 36.1196,
    },
    {
      date: 1749214800,
      open: 36.47,
      high: 36.75,
      low: 36.3,
      close: 36.58,
      volume: 18187900,
      adjustedClose: 36.2087,
    },
    {
      date: 1749474000,
      open: 36.47,
      high: 36.63,
      low: 35.87,
      close: 36.39,
      volume: 23946500,
      adjustedClose: 36.0206,
    },
    {
      date: 1749560400,
      open: 36.5,
      high: 36.58,
      low: 35.97,
      close: 36,
      volume: 20363600,
      adjustedClose: 35.9647,
    },
    {
      date: 1749646800,
      open: 35.97,
      high: 36.59,
      low: 35.74,
      close: 36.33,
      volume: 16180000,
      adjustedClose: 36.2944,
    },
    {
      date: 1749733200,
      open: 36.09,
      high: 36.83,
      low: 36.06,
      close: 36.61,
      volume: 21869400,
      adjustedClose: 36.5741,
    },
    {
      date: 1749819600,
      open: 36.17,
      high: 36.35,
      low: 35.91,
      close: 36.17,
      volume: 14389900,
      adjustedClose: 36.1346,
    },
    {
      date: 1750078800,
      open: 36.53,
      high: 37.22,
      low: 36.52,
      close: 36.83,
      volume: 17353400,
      adjustedClose: 36.7939,
    },
    {
      date: 1750165200,
      open: 36.99,
      high: 37.09,
      low: 36.77,
      close: 37.05,
      volume: 19547100,
      adjustedClose: 37.0137,
    },
    {
      date: 1750251600,
      open: 36.93,
      high: 37.08,
      low: 36.71,
      close: 36.83,
      volume: 19694400,
      adjustedClose: 36.7939,
    },
    {
      date: 1750424400,
      open: 36.52,
      high: 36.67,
      low: 36.39,
      close: 36.64,
      volume: 21205800,
      adjustedClose: 36.6041,
    },
    {
      date: 1750683600,
      open: 36.64,
      high: 36.64,
      low: 36.15,
      close: 36.56,
      volume: 14282900,
      adjustedClose: 36.5242,
    },
    {
      date: 1750770000,
      open: 36.72,
      high: 37.58,
      low: 36.58,
      close: 37.25,
      volume: 20137900,
      adjustedClose: 37.2135,
    },
    {
      date: 1750856400,
      open: 37.1,
      high: 37.14,
      low: 36.44,
      close: 36.58,
      volume: 19790900,
      adjustedClose: 36.5442,
    },
    {
      date: 1750942800,
      open: 36.63,
      high: 36.79,
      low: 36.2,
      close: 36.31,
      volume: 23026900,
      adjustedClose: 36.2744,
    },
    {
      date: 1751029200,
      open: 36,
      high: 36.36,
      low: 35.94,
      close: 36.27,
      volume: 13825500,
      adjustedClose: 36.2345,
    },
    {
      date: 1751288400,
      open: 36.15,
      high: 36.96,
      low: 35.92,
      close: 36.95,
      volume: 29818100,
      adjustedClose: 36.9138,
    },
    {
      date: 1751374800,
      open: 36.93,
      high: 37.17,
      low: 36.81,
      close: 37.1,
      volume: 18167000,
      adjustedClose: 37.0814,
    },
    {
      date: 1751461200,
      open: 37.1,
      high: 37.28,
      low: 36.55,
      close: 36.8,
      volume: 19739300,
      adjustedClose: 36.7815,
    },
    {
      date: 1751547600,
      open: 36.84,
      high: 37.8,
      low: 36.84,
      close: 37.71,
      volume: 13539000,
      adjustedClose: 37.6911,
    },
    {
      date: 1751634000,
      open: 37.7,
      high: 37.99,
      low: 37.58,
      close: 37.73,
      volume: 7309500,
      adjustedClose: 37.7111,
    },
    {
      date: 1751893200,
      open: 37.74,
      high: 37.78,
      low: 37.15,
      close: 37.23,
      volume: 13480700,
      adjustedClose: 37.2113,
    },
    {
      date: 1751979600,
      open: 37.16,
      high: 37.32,
      low: 36.9,
      close: 37.14,
      volume: 20899600,
      adjustedClose: 37.1214,
    },
    {
      date: 1752066000,
      open: 37.08,
      high: 37.09,
      low: 36.26,
      close: 36.37,
      volume: 15624400,
      adjustedClose: 36.3517,
    },
    {
      date: 1752152400,
      open: 35.9,
      high: 35.9,
      low: 35.24,
      close: 35.25,
      volume: 38419300,
      adjustedClose: 35.2323,
    },
    {
      date: 1752238800,
      open: 35.15,
      high: 35.2,
      low: 34.73,
      close: 34.96,
      volume: 41882800,
      adjustedClose: 34.9424,
    },
    {
      date: 1752498000,
      open: 34.93,
      high: 35.03,
      low: 34.51,
      close: 34.9,
      volume: 25888400,
      adjustedClose: 34.8825,
    },
    {
      date: 1752584400,
      open: 34.9,
      high: 35.22,
      low: 34.69,
      close: 35.02,
      volume: 26559500,
      adjustedClose: 35.0024,
    },
    {
      date: 1752670800,
      open: 35.09,
      high: 35.3,
      low: 34.88,
      close: 35.19,
      volume: 26849800,
      adjustedClose: 35.1723,
    },
    {
      date: 1752757200,
      open: 35.21,
      high: 35.84,
      low: 35.19,
      close: 35.72,
      volume: 24842500,
      adjustedClose: 35.7021,
    },
    {
      date: 1752843600,
      open: 35.42,
      high: 35.72,
      low: 34.99,
      close: 35.07,
      volume: 31288500,
      adjustedClose: 35.0524,
    },
    {
      date: 1753102800,
      open: 35.05,
      high: 35.58,
      low: 35.01,
      close: 35.48,
      volume: 11994700,
      adjustedClose: 35.4622,
    },
    {
      date: 1753189200,
      open: 35.5,
      high: 35.74,
      low: 34.94,
      close: 35,
      volume: 22650800,
      adjustedClose: 34.9824,
    },
    {
      date: 1753275600,
      open: 34.96,
      high: 35.53,
      low: 34.86,
      close: 35.39,
      volume: 12885400,
      adjustedClose: 35.3722,
    },
    {
      date: 1753362000,
      open: 35.27,
      high: 35.27,
      low: 34.85,
      close: 35.06,
      volume: 11126300,
      adjustedClose: 35.0424,
    },
    {
      date: 1753448400,
      open: 35.03,
      high: 35.49,
      low: 35.03,
      close: 35.21,
      volume: 17978700,
      adjustedClose: 35.1923,
    },
    {
      date: 1753707600,
      open: 35.28,
      high: 35.32,
      low: 34.15,
      close: 34.47,
      volume: 17329500,
      adjustedClose: 34.4527,
    },
    {
      date: 1753794000,
      open: 34.44,
      high: 34.86,
      low: 34.37,
      close: 34.67,
      volume: 16170700,
      adjustedClose: 34.6526,
    },
    {
      date: 1753880400,
      open: 34.51,
      high: 35.26,
      low: 34.31,
      close: 35.07,
      volume: 18962900,
      adjustedClose: 35.0524,
    },
    {
      date: 1753966800,
      open: 34.68,
      high: 35.22,
      low: 34.64,
      close: 35.16,
      volume: 21361000,
      adjustedClose: 35.1423,
    },
    {
      date: 1754053200,
      open: 35.6,
      high: 35.76,
      low: 34.74,
      close: 34.93,
      volume: 16018100,
      adjustedClose: 34.93,
    },
  ],
};

// Preparar dados para o gráfico
const chartData = stockData.historicalDataPrice.map((item, index) => ({
  day: `Dia ${index + 1}`,
  date: new Date(item.date * 1000).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }),
  fullDate: new Date(item.date * 1000).toLocaleDateString("pt-BR"),
  close: item.close,
  open: item.open,
  high: item.high,
  low: item.low,
  volume: item.volume,
}));

// Função para formatar valores em BRL
const formatBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Função para formatar números grandes
const formatLargeNumber = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toString();
};

export default function StockDashboard() {
  const isPositive = stockData.regularMarketChange > 0;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={stockData.logourl || "/placeholder.svg"}
            alt={stockData.symbol}
            className="w-12 h-12"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {stockData.symbol}
            </h1>
            <p className="text-gray-400">{stockData.longName}</p>
          </div>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Preço Atual
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatBRL(stockData.regularMarketPrice)}
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
                  {formatBRL(stockData.regularMarketChange)} (
                  {stockData.regularMarketChangePercent.toFixed(2)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Volume
              </CardTitle>
              <Volume2 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatLargeNumber(stockData.regularMarketVolume)}
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
                {formatBRL(stockData.marketCap / 1000000000)}B
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
                {stockData.priceEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-gray-400">Price/Earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de linha */}
        <Card className="w-full bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              Histórico de Preços - Últimos 5 Dias
            </CardTitle>
            <CardDescription className="text-gray-400">
              Evolução do preço de fechamento da ação {stockData.symbol}
            </CardDescription>

            <RangeSelector
              onSelect={(range) => {
                console.log("Selecionado:", range);
                // Atualize a busca dos dados aqui
              }}
            />
          </CardHeader>
          <CardContent className="w-full">
            <ChartContainer
              config={{
                close: {
                  label: "Preço de Fechamento",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3B82F6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    tickLine={{ stroke: "#6B7280" }}
                  />
                  <YAxis
                    domain={["dataMin - 0.1", "dataMax + 0.1"]}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    tickLine={{ stroke: "#6B7280" }}
                    tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg shadow-xl">
                            <div className="border-b border-gray-600 pb-2 mb-3">
                              <p className="font-semibold text-white text-lg">
                                {data.day}
                              </p>
                              <p className="text-sm text-gray-400">
                                {data.fullDate}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">
                                    Fechamento:
                                  </span>
                                  <span className="text-sm font-semibold text-blue-400">
                                    {formatBRL(data.close)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">
                                    Abertura:
                                  </span>
                                  <span className="text-sm text-gray-200">
                                    {formatBRL(data.open)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">
                                    Volume:
                                  </span>
                                  <span className="text-sm text-gray-200">
                                    {formatLargeNumber(data.volume)}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">
                                    Máxima:
                                  </span>
                                  <span className="text-sm text-green-400">
                                    {formatBRL(data.high)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">
                                    Mínima:
                                  </span>
                                  <span className="text-sm text-red-400">
                                    {formatBRL(data.low)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">
                                    Variação:
                                  </span>
                                  <span className="text-sm text-gray-200">
                                    {(
                                      ((data.close - data.open) / data.open) *
                                      100
                                    ).toFixed(2)}
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fill="url(#colorPrice)"
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 5 }}
                    activeDot={{
                      r: 8,
                      stroke: "#3B82F6",
                      strokeWidth: 3,
                      fill: "#1E40AF",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

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
                  {formatBRL(stockData.regularMarketOpen)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  Fechamento Anterior:
                </span>
                <span className="font-medium text-white">
                  {formatBRL(stockData.regularMarketPreviousClose)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Máxima do Dia:</span>
                <span className="font-medium text-white">
                  {formatBRL(stockData.regularMarketDayHigh)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Mínima do Dia:</span>
                <span className="font-medium text-white">
                  {formatBRL(stockData.regularMarketDayLow)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  Variação 52 Semanas:
                </span>
                <span className="font-medium text-white">
                  {stockData.fiftyTwoWeekRange}
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
                  {stockData.priceEarnings.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  LPA (Lucro por Ação):
                </span>
                <span className="font-medium text-white">
                  {formatBRL(stockData.earningsPerShare)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Valor de Mercado:</span>
                <span className="font-medium text-white">
                  {formatBRL(stockData.marketCap / 1000000000)}B
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Moeda:</span>
                <Badge variant="outline">{stockData.currency}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela detalhada */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Detalhes Diários</CardTitle>
            <CardDescription className="text-gray-400">
              Histórico detalhado dos últimos 5 dias de negociação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="text-gray-200">
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Data</TableHead>
                  <TableHead className="text-gray-300">Abertura</TableHead>
                  <TableHead className="text-gray-300">Máxima</TableHead>
                  <TableHead className="text-gray-300">Mínima</TableHead>
                  <TableHead className="text-gray-300">Fechamento</TableHead>
                  <TableHead className="text-gray-300">Volume</TableHead>
                  <TableHead className="text-gray-300">Variação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chartData.map((day, index) => {
                  const variation =
                    index > 0
                      ? ((day.close - chartData[index - 1].close) /
                          chartData[index - 1].close) *
                        100
                      : 0;
                  const isPositiveVar = variation > 0;

                  return (
                    <TableRow key={index} className="border-gray-700">
                      <TableCell className="font-medium text-white">
                        {day.date}
                      </TableCell>
                      <TableCell className="text-gray-200">
                        {formatBRL(day.open)}
                      </TableCell>
                      <TableCell className="text-gray-200">
                        {formatBRL(day.high)}
                      </TableCell>
                      <TableCell className="text-gray-200">
                        {formatBRL(day.low)}
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {formatBRL(day.close)}
                      </TableCell>
                      <TableCell className="text-gray-200">
                        {formatLargeNumber(day.volume)}
                      </TableCell>
                      <TableCell>
                        {index > 0 && (
                          <span
                            className={
                              isPositiveVar ? "text-green-400" : "text-red-400"
                            }
                          >
                            {isPositiveVar ? "+" : ""}
                            {variation.toFixed(2)}%
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
