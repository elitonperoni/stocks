import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RangeSelector } from "./rangeSelector";
import { ChartContainer } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { useState } from "react";
import { formatBRL, formatLargeNumber } from "@/utils/formt";
import { StockDetail } from "@/models/response/stockDetailResponse";
import { formatRangeToText } from "@/utils/formatRangeToText";

type LineChartStockProps = {
  stockData: StockDetail | null; 
  range: string;
};

export default function LineChartStock( { stockData, range } : LineChartStockProps ) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  // Preparar dados para o gráfico
  const chartData = stockData?.historicalDataPrice.map((item, index) => ({
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

  return (
    <Card className="w-full h-full bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">
          Histórico de Preços - Intervalo de {formatRangeToText(range)}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Evolução do preço de fechamento da ação {stockData?.symbol}
        </CardDescription>

       
      </CardHeader>
      <CardContent className="w-full  h-full">
        <ChartContainer
          config={{
            close: {
              label: "Preço de Fechamento",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[250px] w-full "
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              onMouseMove={(state: any) => {
                if (state && typeof state.activeTooltipIndex === "number") {
                  setActiveIndex(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
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
              {activeIndex !== null && chartData && chartData[activeIndex] && (
                <ReferenceLine
                  x={chartData[activeIndex].date}
                  stroke="#60A5FA"
                  strokeDasharray="3 3"
                  strokeWidth={1.5}
                />
              )}
              <Area
                type="monotone"
                dataKey="close"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#colorPrice)"
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
