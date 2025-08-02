"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Calendar, DollarSign, BarChart3, Volume2 } from "lucide-react"

const stockData = {
  currency: "USD",
  marketCap: null,
  shortName: "Oracle Corporation",
  longName: "Oracle Corporation", // removi a aspa dupla aqui
  regularMarketChange: -9.35,
  regularMarketChangePercent: -3.6839999999999997,
  regularMarketTime: "2025-08-01T20:00:02.000Z",
  regularMarketPrice: 244.42,
  regularMarketDayHigh: 248.41,
  regularMarketDayRange: "242 - 248.41",
  regularMarketDayLow: 242,
  regularMarketVolume: 12496075,
  regularMarketPreviousClose: 253.77,
  regularMarketOpen: 245.09,
  fiftyTwoWeekRange: "118.86 - 260.87",
  fiftyTwoWeekLow: 118.86,
  fiftyTwoWeekHigh: 260.87,
  priceEarnings: 0,
  earningsPerShare: 0,
  symbol: "ORCL",
  logourl: "https://icons.brapi.dev/icons/BRAPI.svg",
  usedInterval: "1d",
  usedRange: "5d",
  historicalDataPrice: [
    {
        date: 1753709400,
        open: 246,
        high: 247.78,
        low: 243.42,
        close: 247.71,
        volume: 6756800,
        adjustedClose: 247.71
    },
    {
        date: 1753795800,
        open: 248.7,
        high: 253.07,
        low: 246.59,
        close: 249.98,
        volume: 8415300,
        adjustedClose: 249.98
    },
    {
        date: 1753882200,
        open: 248.64,
        high: 251.05,
        low: 245.6,
        close: 250.6,
        volume: 8441400,
        adjustedClose: 250.6
    },
    {
        date: 1753968600,
        open: 255.77,
        high: 260.87,
        low: 253.32,
        close: 253.77,
        volume: 15548700,
        adjustedClose: 253.77
    },
    {
        date: 1754055000,
        open: 247.83,
        high: 248.41,
        low: 242,
        close: 244.42,
        volume: 12709900,
        adjustedClose: 244.42
    }
  ],
}

// Preparar dados para o gráfico
const chartData = stockData.historicalDataPrice.map((item, index) => ({
  day: `Dia ${index + 1}`,
  date: new Date(item.date * 1000).toLocaleDateString("pt-BR"),
  close: item.close,
  open: item.open,
  high: item.high,
  low: item.low,
  volume: item.volume,
}))

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

export default function StockDashboard() {
  const isPositive = stockData.regularMarketChange > 0

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img src={stockData.logourl || "/placeholder.svg"} alt={stockData.symbol} className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold text-white">{stockData.symbol}</h1>
            <p className="text-gray-400">{stockData.longName}</p>
          </div>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Preço Atual</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatBRL(stockData.regularMarketPrice)}</div>
              <div className="flex items-center gap-1 text-xs">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={isPositive ? "text-green-500" : "text-red-500"}>
                  {formatBRL(stockData.regularMarketChange)} ({stockData.regularMarketChangePercent.toFixed(2)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Volume</CardTitle>
              <Volume2 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatLargeNumber(stockData.regularMarketVolume)}</div>
              <p className="text-xs text-gray-400">Ações negociadas</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Valor de Mercado</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatBRL(stockData.marketCap / 1000000000)}B</div>
              <p className="text-xs text-gray-400">Market Cap</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">P/L</CardTitle>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stockData.priceEarnings.toFixed(2)}</div>
              <p className="text-xs text-gray-400">Price/Earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de linha */}
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
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                  <YAxis
                    domain={["dataMin - 0.1", "dataMax + 0.1"]}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-gray-800 p-3 border border-gray-600 rounded-lg shadow-lg">
                            <p className="font-semibold text-white">{label}</p>
                            <p className="text-sm text-gray-400">{data.date}</p>
                            <div className="space-y-1 mt-2">
                              <p className="text-sm text-gray-200">
                                <span className="font-medium">Fechamento:</span> {formatBRL(data.close)}
                              </p>
                              <p className="text-sm text-gray-200">
                                <span className="font-medium">Abertura:</span> {formatBRL(data.open)}
                              </p>
                              <p className="text-sm text-gray-200">
                                <span className="font-medium">Máxima:</span> {formatBRL(data.high)}
                              </p>
                              <p className="text-sm text-gray-200">
                                <span className="font-medium">Mínima:</span> {formatBRL(data.low)}
                              </p>
                              <p className="text-sm text-gray-200">
                                <span className="font-medium">Volume:</span> {formatLargeNumber(data.volume)}
                              </p>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Informações adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Informações da Sessão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Abertura:</span>
                <span className="font-medium text-white">{formatBRL(stockData.regularMarketOpen)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Fechamento Anterior:</span>
                <span className="font-medium text-white">{formatBRL(stockData.regularMarketPreviousClose)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Máxima do Dia:</span>
                <span className="font-medium text-white">{formatBRL(stockData.regularMarketDayHigh)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Mínima do Dia:</span>
                <span className="font-medium text-white">{formatBRL(stockData.regularMarketDayLow)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Variação 52 Semanas:</span>
                <span className="font-medium text-white">{stockData.fiftyTwoWeekRange}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Métricas Fundamentalistas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">P/L (Price/Earnings):</span>
                <span className="font-medium text-white">{stockData.priceEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">LPA (Lucro por Ação):</span>
                <span className="font-medium text-white">{formatBRL(stockData.earningsPerShare)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Valor de Mercado:</span>
                <span className="font-medium text-white">{formatBRL(stockData.marketCap / 1000000000)}B</span>
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
                    index > 0 ? ((day.close - chartData[index - 1].close) / chartData[index - 1].close) * 100 : 0
                  const isPositiveVar = variation > 0

                  return (
                    <TableRow key={index} className="border-gray-700">
                      <TableCell className="font-medium text-white">{day.date}</TableCell>
                      <TableCell className="text-gray-200">{formatBRL(day.open)}</TableCell>
                      <TableCell className="text-gray-200">{formatBRL(day.high)}</TableCell>
                      <TableCell className="text-gray-200">{formatBRL(day.low)}</TableCell>
                      <TableCell className="font-medium text-white">{formatBRL(day.close)}</TableCell>
                      <TableCell className="text-gray-200">{formatLargeNumber(day.volume)}</TableCell>
                      <TableCell>
                        {index > 0 && (
                          <span className={isPositiveVar ? "text-green-400" : "text-red-400"}>
                            {isPositiveVar ? "+" : ""}
                            {variation.toFixed(2)}%
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
