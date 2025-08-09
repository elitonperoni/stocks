"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  CartesianGrid,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatBRL, formatLargeNumber } from "@/utils/formt";

const stockData = {
  historicalDataPrice: [
    { date: 1746450000, open: 35.25, high: 35.39, low: 34.75, close: 34.84, volume: 27611800 },
    { date: 1746536400, open: 34.82, high: 34.88, low: 34.42, close: 34.66, volume: 17255400 },
    { date: 1746622800, open: 34.92, high: 35.14, low: 34.73, close: 35.04, volume: 13397900 },
    { date: 1746709200, open: 35.6, high: 36, low: 35.14, close: 35.32, volume: 33186100 },
    { date: 1746795600, open: 36.4, high: 37.25, low: 35.79, close: 37.23, volume: 58004600 },
    { date: 1747054800, open: 37.44, high: 37.44, low: 36.25, close: 36.48, volume: 26894900 },
    { date: 1747141200, open: 36.68, high: 37.11, low: 36.52, close: 36.93, volume: 24635200 },
    { date: 1747227600, open: 36.94, high: 37.34, low: 36.81, close: 37.18, volume: 17869500 },
    { date: 1747314000, open: 37.36, high: 37.77, low: 37.22, close: 37.68, volume: 26350700 },
    { date: 1747400400, open: 37.68, high: 38, low: 37.37, close: 37.9, volume: 29635800 },
    { date: 1747659600, open: 37.82, high: 38.59, low: 37.71, close: 38.35, volume: 24323000 },
    { date: 1747746000, open: 38.38, high: 38.38, low: 37.86, close: 38.3, volume: 17978200 },
    { date: 1747832400, open: 38.19, high: 38.2, low: 37.22, close: 37.53, volume: 20216400 },
    { date: 1747918800, open: 37.64, high: 37.74, low: 37.14, close: 37.27, volume: 22889800 },
    { date: 1748005200, open: 36.6, high: 37.72, low: 36.36, close: 37.72, volume: 20125900 },
  ],
};

const chartData = stockData.historicalDataPrice.map((item) => ({
  date: new Date(item.date * 1000).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }),
  close: item.close,
  volume: item.volume,
}));

export default function VolumeChartStock() {
  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Análise de Volume</CardTitle>
        <CardDescription className="text-gray-400">
          Volume negociado e preço de fechamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            volume: { label: "Volume", color: "#93C5FD" },
            close: { label: "Fechamento", color: "hsl(var(--chart-1))" },
          }}
          className="h-[280px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                tickFormatter={(v) => formatLargeNumber(Number(v))}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                tickFormatter={(v) => formatBRL(Number(v))}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload.reduce(
                    (acc: any, cur: any) => ({ ...acc, [cur.dataKey]: cur.value }),
                    {}
                  );
                  const data = payload[0].payload as any;
                  return (
                    <div className="bg-gray-800 p-3 border border-gray-600 rounded-md">
                      <div className="text-white text-sm">{data.date}</div>
                      <div className="text-gray-300 text-xs">Volume: {formatLargeNumber(p.volume)}</div>
                      <div className="text-gray-300 text-xs">Fechamento: {formatBRL(p.close)}</div>
                    </div>
                  );
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="volume"
                fill="var(--color-volume)"
                radius={[4, 4, 0, 0]}
                fillOpacity={0.9}
              />
              <Line yAxisId="right" type="monotone" dataKey="close" stroke="var(--color-close)" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


