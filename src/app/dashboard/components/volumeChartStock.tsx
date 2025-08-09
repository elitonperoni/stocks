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
import { StockDetail } from "@/models/response/stockDetailResponse";
import { formatRangeToText } from "@/utils/formatRangeToText";

type BarhartStockProps = {
  stockData: StockDetail | null; 
  range: string;
};

export default function VolumeChartStock({ stockData, range } : BarhartStockProps) {

const chartData = stockData?.historicalDataPrice.map((item) => ({
  date: new Date(item.date * 1000).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }),
  close: item.close,
  volume: item.volume,
}));

  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Volume de negociações - Intervalo de {formatRangeToText(range)}</CardTitle>
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


