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

interface PageProps {
  setor?: string;
  codigo?: string;
  tipo?: string;
}

export default function Page() {
  const [filterData, setFilterData] = useState<PageProps>({
    setor: "",
    codigo: "",
    tipo: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [stocksData, setStocksData] = useState<StocksResponse[]>([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  useEffect(() => {
    fetchStocks(filterData);
  }, []);

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
                filterData={filterData}
                onSetFilterData={(data) => setFilterData(data)}
                onSearchStocks={refetchStocks}
              />
            </div>

            {
              <DataTable
                data={stocksData}
                loading={loading}
                onRowClick={(row) => {
                  setSelectedStock(row.stock);
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
                    <StockDashboard stock={selectedStock || ""} />
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
