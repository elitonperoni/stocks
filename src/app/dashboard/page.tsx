"use client";

import { DataTable } from "@/components/data-table";
import FilterDataTab from "./filterDataTab";
import { useEffect, useState } from "react";
import { stockApi } from "@/api";
import { StocksResponse } from "@/models/response/stocksResponse";
import { StockRequest } from "@/models/request/stockRequest";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import StockDashboard from "./components/detailStock";
import { useForm } from "react-hook-form";

interface FilterFormValues {
  setor: string;
  codigo: string;
  tipo: string;
  selectedStock?: string;
}
interface PageProps {
  setor?: string;
  codigo?: string;
  tipo?: string;
  selectedStock?: string;
}

export default function Page() {
  const form = useForm<FilterFormValues>({
    defaultValues: {
      setor: "",
      codigo: "",
      tipo: "",
      selectedStock: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [stocksData, setStocksData] = useState<StocksResponse[]>([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchStocks(form.getValues());
  }, []);

  const selectedStock = form.watch("selectedStock");

  async function refetchStocks(data: PageProps) {
    await fetchStocks(data);
  }

  async function fetchStocks(data: PageProps) {    
    try {
      setLoading(true);
      const request: StockRequest = {
        searchTerm: data.codigo,
        sector: data.setor,
        type: data.tipo,
      };
      setStocksData([]);
      await stockApi
        .getStocks(request)
        .then((stocks) => {
          setStocksData(stocks.data as StocksResponse[]);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col items-start pt-6 pb-2 px-4">
          <div className="flex items-center gap-3 mb-1 ml-4">
            {/* Ícone de gráfico de linha */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17l4-4 4 4 4-8" />
            </svg>
            
            {/* Ícone de notícias */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
              <line x1="7" y1="9" x2="17" y2="9" strokeWidth={2} stroke="currentColor" />
              <line x1="7" y1="13" x2="17" y2="13" strokeWidth={2} stroke="currentColor" />
            </svg>
            <span className="text-4xl font-bold text-white tracking-tight">
              Bolsa de valores do Brasil
            </span>
          </div>
          <span className="text-lg text-gray-400 font-medium mt-1 ml-4">
            Acompanhe cotações, gráficos e notícias dos ativos listados na B3 em
            tempo real.
          </span>
        </div>

        <div className="flex justify-start pt-4 pb-1 md:gap-1 md:pt-6 md:pb-2">
          <FilterDataTab
            filterData={form.getValues()}
            onSetFilterData={(data) =>
              form.setValue("selectedStock", data.selectedStock)
            }
            onSearchStocks={refetchStocks}
          />
        </div>

        {
          <DataTable
            data={stocksData}
            loading={loading}
            onRowClick={(row) => {
              form.setValue("selectedStock", row.stock);
              setIsDashboardOpen(true);
            }}
          />
        }

        {
          <Drawer
            direction="right"
            open={isDashboardOpen}
            onOpenChange={setIsDashboardOpen}
          >
            <DrawerTitle />
            <DrawerContent className="data-[vaul-drawer-direction=right]:!w-[80vw] data-[vaul-drawer-direction=left]:!w-[80vw] sm:!max-w-none">
              <div className="h-full w-full overflow-y-auto p-6">
                {selectedStock && selectedStock !== "" && (
                  <StockDashboard stock={selectedStock} />
                )}
              </div>
            </DrawerContent>
          </Drawer>
        }      
      </div>
    </div>
  );
}
