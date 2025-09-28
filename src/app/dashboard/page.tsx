"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import FilterDataTab, { availableStockTypes } from "./filterDataTab";
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
    debugger;
    try {
      setLoading(true);

      const request: StockRequest = {
        searchTerm: data.codigo,
        sector: data.setor,
        type: data.tipo,
      };
      setStocksData([]);
      await stockApi.getStocks(request).then((stocks) => {
        setStocksData(stocks.data as StocksResponse[]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Erro ao filtrar dados:", error);
    }
    setLoading(false);
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <h2 className="flex justify-start pt-4 pb-1 md:gap-1 md:pt-6 md:pb-2 text-3xl font-semibold tracking-tight first:mt-0 ml-4">
              Busque por ativos listados na B3
            </h2>

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
            {/* <div className="px-4 lg:px-6">
                <ChartLineInteractive />
              </div>              */}
            {/* <div className="px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="h-full min-h-[300px] flex flex-col">
                  <CardContent className="flex-1">
                    <ChartPieInteractive />
                  </CardContent>
                </Card>
                <Card className="h-full min-h-[300px] flex flex-col">
                  <CardContent className="flex-1">
                    <ChartRadialText />
                  </CardContent>
                </Card>
                <Card className="h-full min-h-[300px] flex flex-col">
                  <CardContent className="flex-1">
                    <ChartTooltipDefault />
                  </CardContent>
                </Card>
                <Card className="h-full min-h-[300px] flex flex-col">
                  <CardContent className="flex-1">
                    <ChartBarMultiple />
                  </CardContent>
                </Card>
              </div>              */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
