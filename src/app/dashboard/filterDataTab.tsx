"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Form, FormField } from "@/components/ui/form";
import {  Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { stockApi } from "@/api";
interface FilterFormValues {
  setor: string;
  codigo: string;
  tipo: string;
}

interface FilterDataTabProps {
  readonly filterData: any;
  readonly onSetFilterData: (data: FilterDataTabProps["filterData"]) => unknown;
  readonly onSearchStocks: (data: any) => unknown;
}

export default function FilterDataTab({
  filterData,
  onSetFilterData,
  onSearchStocks
}: FilterDataTabProps) {
  const form = useForm<FilterFormValues>({
    defaultValues: {
      setor: "",
      codigo: "",
      tipo: "",
    },
  });
  const [open, setOpen] = useState(false);
 
  const onSubmit: SubmitHandler<FilterFormValues> = async (data) => {
    const newData = {
      setor: data.setor,
      codigo: data.codigo,
      tipo: data.tipo,
    }

    onSetFilterData(newData);
    onSearchStocks({ ...newData});

    setOpen(false);
  };

  const handleClear = () => {
    form.reset(); 
  };

  return (
    <div className="flex gap-4">
      <div className="p-6 rounded-xl shadow-md">
        <Input placeholder="Busca geral..." />
      </div>
      <div className="p-6 rounded-xl shadow-md">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Abrir Filtros</Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filtro</h4>
                    <p className="text-sm text-muted-foreground">
                      Selecione filtros de busca rápida de ativos.
                    </p>
                  </div>

                  {/* Filtro de Código */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="codigo">Código</Label>
                    <FormField
                      name="codigo"
                      control={form.control}
                      render={({ field }) => (
                        <Combobox
                          data={stocks}
                          value={field.value}
                          onValueChange={field.onChange}
                          className="col-span-2"
                        />
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    {/* Filtro de Setor */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="setor">Setor</Label>
                      <FormField
                        name="setor"
                        control={form.control}
                        render={({ field }) => (
                          <Combobox
                            data={options}
                            value={field.value}
                            onValueChange={field.onChange}
                            className="col-span-2"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    {/* Filtro de Setor */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="setor">Tipo</Label>
                      <FormField
                        name="tipo"
                        control={form.control}
                        render={({ field }) => (
                          <Combobox
                            data={availableStockTypes}
                            value={field.value}
                            onValueChange={field.onChange}
                            className="col-span-2"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      type="button"
                      onClick={handleClear}
                      className="flex items-center justify-center w-10"
                      style={{ cursor: "pointer" }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1"
                      style={{ cursor: "pointer" }}
                    >
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

const options = [
  {
    value: "",
    label: "Todos os Setores",
  },
  {
    value: "Retail Trade",
    label: "Comércio Varejista",
  },
  {
    value: "Energy Minerals",
    label: "Minerais Energéticos",
  },
  {
    value: "Health Services",
    label: "Serviços de Saúde",
  },
  {
    value: "Utilities",
    label: "Serviços Públicos",
  },
  {
    value: "Finance",
    label: "Finanças",
  },
  {
    value: "Consumer Services",
    label: "Serviços ao Consumidor",
  },
  {
    value: "Consumer Non-Durables",
    label: "Bens de Consumo Não Duráveis",
  },
  {
    value: "Non-Energy Minerals",
    label: "Minerais Não Energéticos",
  },
  {
    value: "Commercial Services",
    label: "Serviços Comerciais",
  },
  {
    value: "Distribution Services",
    label: "Serviços de Distribuição",
  },
  {
    value: "Transportation",
    label: "Transporte",
  },
  {
    value: "Technology Services",
    label: "Serviços de Tecnologia",
  },
  {
    value: "Process Industries",
    label: "Indústrias de Processamento",
  },
  {
    value: "Communications",
    label: "Comunicações",
  },
  {
    value: "Producer Manufacturing",
    label: "Fabricação de Produtos",
  },
  {
    value: "Miscellaneous",
    label: "Diversos",
  },
  {
    value: "Electronic Technology",
    label: "Tecnologia Eletrônica",
  },
  {
    value: "Industrial Services",
    label: "Serviços Industriais",
  },
  {
    value: "Health Technology",
    label: "Tecnologia da Saúde",
  },
  {
    value: "Consumer Durables",
    label: "Bens de Consumo Duráveis",
  },
];

const stocks = [
  {
    value: "",
    label: "Todos os Ativos",
  },
  {
    value: "B3SA3",
    label: "B3SA3",
  },
  {
    value: "PETR4",
    label: "PETR4",
  },
  {
    value: "BBDC4",
    label: "BBDC4",
  },
  {
    value: "BBAS3",
    label: "BBAS3",
  },
  {
    value: "ITSA4",
    label: "ITSA4",
  },
  {
    value: "AZUL4",
    label: "AZUL4",
  },
  {
    value: "ITUB4",
    label: "ITUB4",
  },
  {
    value: "COGN3",
    label: "COGN3",
  },
  {
    value: "CSAN3",
    label: "CSAN3",
  },
  {
    value: "CSNA3",
    label: "CSNA3",
  },
  {
    value: "CYRE3",
    label: "CYRE3",
  },
  {
    value: "DXCO3",
    label: "DXCO3",
  },
  {
    value: "ECOR3",
    label: "ECOR3",
  },
  {
    value: "EGIE3",
    label: "EGIE3",
  },
  {
    value: "ELET3",
    label: "ELET3",
  },
  {
    value: "ELET6",
    label: "ELET6",
  },
  {
    value: "EMBR3",
    label: "EMBR3",
  },
  {
    value: "ENBR3",
    label: "ENBR3",
  },
  {
    value: "ENEV3",
    label: "ENEV3",
  },
  {
    value: "ENGI11",
    label: "ENGI11",
  },
  {
    value: "EQTL3",
    label: "EQTL3",
  },
  {
    value: "EZTC3",
    label: "EZTC3",
  },
  {
    value: "FLRY3",
    label: "FLRY3",
  },
  {
    value: "GGBR4",
    label: "GGBR4",
  },
  {
    value: "GOAU4",
    label: "GOAU4",
  },
  {
    value: "GOLL4",
    label: "GOLL4",
  },
  {
    value: "HAPV3",
    label: "HAPV3",
  },
  {
    value: "HGTX3",
    label: "HGTX3",
  },
  {
    value: "HYPE3",
    label: "HYPE3",
  },
  {
    value: "IGTI11",
    label: "IGTI11",
  },
  {
    value: "IRBR3",
    label: "IRBR3",
  },
  {
    value: "ITUB3",
    label: "ITUB3",
  },
  {
    value: "JBSS3",
    label: "JBSS3",
  },
  {
    value: "KLBN11",
    label: "KLBN11",
  },
  {
    value: "LAME4",
    label: "LAME4",
  },
  {
    value: "LCAM3",
    label: "LCAM3",
  },
  {
    value: "LREN3",
    label: "LREN3",
  },
  {
    value: "MGLU3",
    label: "MGLU3",
  },
  {
    value: "MRFG3",
    label: "MRFG3",
  },
  {
    value: "MRVE3",
    label: "MRVE3",
  },
  {
    value: "MULT3",
    label: "MULT3",
  },
  {
    value: "NTCO3",
    label: "NTCO3",
  },
  {
    value: "PCAR3",
    label: "PCAR3",
  },
  {
    value: "PETR3",
    label: "PETR3",
  },
  {
    value: "PRIO3",
    label: "PRIO3",
  },
  {
    value: "QUAL3",
    label: "QUAL3",
  },
  {
    value: "RADL3",
    label: "RADL3",
  },
  {
    value: "RAIL3",
    label: "RAIL3",
  },
  {
    value: "RENT3",
    label: "RENT3",
  },
  {
    value: "SANB11",
    label: "SANB11",
  },
  {
    value: "SBSP3",
    label: "SBSP3",
  },
  {
    value: "SULA11",
    label: "SULA11",
  },
  {
    value: "SUZB3",
    label: "SUZB3",
  },
  {
    value: "TAEE11",
    label: "TAEE11",
  },
  {
    value: "TIMS3",
    label: "TIMS3",
  },
  {
    value: "TOTS3",
    label: "TOTS3",
  },
  {
    value: "UGPA3",
    label: "UGPA3",
  },
  {
    value: "USIM5",
    label: "USIM5",
  },
  {
    value: "VALE3",
    label: "VALE3",
  },
  {
    value: "VIVT3",
    label: "VIVT3",
  },
  {
    value: "WEGE3",
    label: "WEGE3",
  },
];

const availableStockTypes = [
  {
    value: "stock",
    label: "Ações",
  },
  {
    value: "fund",
    label: "Fundos",
  },
  {
    value: "bdr",
    label: "BDRs",
  },
];
