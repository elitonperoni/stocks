"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";


export const description = "An area chart with gradient fill"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// Função para formatar valores em BRL
const formatBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
  
}

// Função para formatar números grandes
const formatLargeNumber = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  }
  return value.toString()
}

const stockData = {
  currency: "BRL",
  marketCap: 4662018016,
  shortName: "MAGAZ LUIZA ON      NM",
  longName: "Magazine Luiza S.A.",
  regularMarketChange: 0.16,
  regularMarketChangePercent: 2.266,
  regularMarketTime: "2025-08-01T20:07:34.000Z",
  regularMarketPrice: 7.22,
  regularMarketDayHigh: 7.4,
  regularMarketDayRange: "7.18 - 7.4",
  regularMarketDayLow: 7.18,
  regularMarketVolume: 25343600,
  regularMarketPreviousClose: 7.06,
  regularMarketOpen: 7.49,
  fiftyTwoWeekRange: "5.71 - 14.08",
  fiftyTwoWeekLow: 5.71,
  fiftyTwoWeekHigh: 14.08,
  symbol: "MGLU3",
  logourl: "https://icons.brapi.dev/icons/MGLU3.svg",
  priceEarnings: 12.512750765045904,
  earningsPerShare: 0.5889904,
  historicalDataPrice: [
    {
      date: 1753707600,
      open: 7.48,
      high: 7.55,
      low: 7.17,
      close: 7.18,
      volume: 16183200,
      adjustedClose: 7.18,
    },
    {
      date: 1753794000,
      open: 7.25,
      high: 7.25,
      low: 6.95,
      close: 6.98,
      volume: 21144500,
      adjustedClose: 6.98,
    },
    {
      date: 1753880400,
      open: 6.94,
      high: 7.48,
      low: 6.92,
      close: 7.34,
      volume: 28283200,
      adjustedClose: 7.34,
    },
    {
      date: 1753966800,
      open: 7.08,
      high: 7.15,
      low: 6.97,
      close: 7.06,
      volume: 20433800,
      adjustedClose: 7.06,
    },
    {
      date: 1754053200,
      open: 7.27,
      high: 7.4,
      low: 7.18,
      close: 7.22,
      volume: 25396900,
      adjustedClose: 7.22,
    },
  ],
}

export function LineChartCustom() {
  return (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Histórico de Preços - Últimos 5 Dias</CardTitle>
            <CardDescription className="text-gray-400">
              Evolução do preço de fechamento da ação {stockData.symbol}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                close: {
                  label: "Preço de Fechamento",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9CA3AF" }} tickLine={{ stroke: "#6B7280" }} />
                  <YAxis
                    domain={["dataMin - 0.1", "dataMax + 0.1"]}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    tickLine={{ stroke: "#6B7280" }}
                    tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg shadow-xl">
                            <div className="border-b border-gray-600 pb-2 mb-3">
                              <p className="font-semibold text-white text-lg">{data.day}</p>
                              <p className="text-sm text-gray-400">{data.fullDate}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">Fechamento:</span>
                                  <span className="text-sm font-semibold text-blue-400">{formatBRL(data.close)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">Abertura:</span>
                                  <span className="text-sm text-gray-200">{formatBRL(data.open)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">Volume:</span>
                                  <span className="text-sm text-gray-200">{formatLargeNumber(data.volume)}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">Máxima:</span>
                                  <span className="text-sm text-green-400">{formatBRL(data.high)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">Mínima:</span>
                                  <span className="text-sm text-red-400">{formatBRL(data.low)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-400">Variação:</span>
                                  <span className="text-sm text-gray-200">
                                    {(((data.close - data.open) / data.open) * 100).toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
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
  )
}
