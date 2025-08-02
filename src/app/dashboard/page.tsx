"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import FilterDataTab from "./filterDataTab";
import { useEffect, useState } from "react";
import { stockApi } from "@/api";
import { StocksResponse } from "@/models/response/stocksResponse";
import { StockRequest } from "@/models/request/stockRequest";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import StockDashboard from "./components/detailStock";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

  useEffect(() => {
    fetchStocks(filterData);
  }, []);

  async function refetchStocks(data: PageProps ) {    
    await fetchStocks(data);
  }

  async function fetchStocks(data : PageProps) {
    debugger
    try {
      setLoading(true);

      const request : StockRequest = {
        searchTerm: data.codigo,
        sector: data.setor,
        type: data.tipo,
      };
      setStocksData([]); 
      await stockApi.getStocks(request)      
        .then((stocks) => {
         setStocksData(stocks.data as StocksResponse[]); // Ensure the data is typed correctly
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
            {/* <SectionCards /> */}
            {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}

            <div className="flex justify-end pt-4 pb-1 md:gap-1 md:pt-6 md:pb-2">
              <FilterDataTab
                filterData={filterData}
                onSetFilterData={(data) => setFilterData(data)}
                onSearchStocks={refetchStocks}
              />              
            </div>

           {<DataTable 
              data={stocksData} 
              loading={loading} />}    



    {<Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir Dashboard</Button>
      </DrawerTrigger>
<DrawerTitle/>
   <DrawerContent
    className="w-[100vw] max-w-none h-screen p-0"
  >
    <div className="h-full overflow-y-auto p-6">
      <StockDashboard />
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
