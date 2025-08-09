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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" style={{ cursor: "pointer" }}>Abrir Filtros</Button>
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
    "value": "PETR4",
    "label": "PETR4"
  },
  {
    "value": "COGN3",
    "label": "COGN3"
  },
  {
    "value": "FNAM11",
    "label": "FNAM11"
  },
  {
    "value": "ASAI3",
    "label": "ASAI3"
  },
  {
    "value": "BBAS3",
    "label": "BBAS3"
  },
  {
    "value": "LREN3",
    "label": "LREN3"
  },
  {
    "value": "RAIL3",
    "label": "RAIL3"
  },
  {
    "value": "PETR3",
    "label": "PETR3"
  },
  {
    "value": "MGLU3",
    "label": "MGLU3"
  },
  {
    "value": "B3SA3",
    "label": "B3SA3"
  },
  {
    "value": "BBDC4",
    "label": "BBDC4"
  },
  {
    "value": "VALE3",
    "label": "VALE3"
  },
  {
    "value": "ABEV3",
    "label": "ABEV3"
  },
  {
    "value": "PETZ3",
    "label": "PETZ3"
  },
  {
    "value": "RAIZ4",
    "label": "RAIZ4"
  },
  {
    "value": "AZUL4",
    "label": "AZUL4"
  },
  {
    "value": "ITUB4",
    "label": "ITUB4"
  },
  {
    "value": "MOVI3",
    "label": "MOVI3"
  },
  {
    "value": "RADL3",
    "label": "RADL3"
  },
  {
    "value": "POMO4",
    "label": "POMO4"
  },
  {
    "value": "CSAN3",
    "label": "CSAN3"
  },
  {
    "value": "ELET3",
    "label": "ELET3"
  },
  {
    "value": "ITSA4",
    "label": "ITSA4"
  },
  {
    "value": "BRKM5",
    "label": "BRKM5"
  },
  {
    "value": "CPLE6",
    "label": "CPLE6"
  },
  {
    "value": "VAMO3",
    "label": "VAMO3"
  },
  {
    "value": "CBAV3",
    "label": "CBAV3"
  },
  {
    "value": "BPAC11",
    "label": "BPAC11"
  },
  {
    "value": "RENT3",
    "label": "RENT3"
  },
  {
    "value": "USIM5",
    "label": "USIM5"
  },
  {
    "value": "CMIG4",
    "label": "CMIG4"
  },
  {
    "value": "BEEF3",
    "label": "BEEF3"
  },
  {
    "value": "ENEV3",
    "label": "ENEV3"
  },
  {
    "value": "VBBR3",
    "label": "VBBR3"
  },
  {
    "value": "GGBR4",
    "label": "GGBR4"
  },
  {
    "value": "UGPA3",
    "label": "UGPA3"
  },
  {
    "value": "ANIM3",
    "label": "ANIM3"
  },
  {
    "value": "PRIO3",
    "label": "PRIO3"
  },
  {
    "value": "BRAV3",
    "label": "BRAV3"
  },
  {
    "value": "RAPT4",
    "label": "RAPT4"
  },
  {
    "value": "MRVE3",
    "label": "MRVE3"
  },
  {
    "value": "PCAR3",
    "label": "PCAR3"
  },
  {
    "value": "EQTL3",
    "label": "EQTL3"
  },
  {
    "value": "CVCB3",
    "label": "CVCB3"
  },
  {
    "value": "AZZA3",
    "label": "AZZA3"
  },
  {
    "value": "WEGE3",
    "label": "WEGE3"
  },
  {
    "value": "BHIA3",
    "label": "BHIA3"
  },
  {
    "value": "TEND3",
    "label": "TEND3"
  },
  {
    "value": "CPLE3",
    "label": "CPLE3"
  },
  {
    "value": "GOAU4",
    "label": "GOAU4"
  },
  {
    "value": "BBSE3",
    "label": "BBSE3"
  },
  {
    "value": "CSNA3",
    "label": "CSNA3"
  },
  {
    "value": "AURE3",
    "label": "AURE3"
  },
  {
    "value": "ELET6",
    "label": "ELET6"
  },
  {
    "value": "NATU3",
    "label": "NATU3"
  },
  {
    "value": "HYPE3",
    "label": "HYPE3"
  },
  {
    "value": "SIMH3",
    "label": "SIMH3"
  },
  {
    "value": "VIVA3",
    "label": "VIVA3"
  },
  {
    "value": "ALOS3",
    "label": "ALOS3"
  },
  {
    "value": "MRFG3",
    "label": "MRFG3"
  },
  {
    "value": "BBDC3",
    "label": "BBDC3"
  },
  {
    "value": "CYRE3",
    "label": "CYRE3"
  },
  {
    "value": "SMFT3",
    "label": "SMFT3"
  },
  {
    "value": "SUZB3",
    "label": "SUZB3"
  },
  {
    "value": "MOTV3",
    "label": "MOTV3"
  },
  {
    "value": "ALPA4",
    "label": "ALPA4"
  },
  {
    "value": "CASH3",
    "label": "CASH3"
  },
  {
    "value": "CMIN3",
    "label": "CMIN3"
  },
  {
    "value": "BRFS3",
    "label": "BRFS3"
  },
  {
    "value": "CURY3",
    "label": "CURY3"
  },
  {
    "value": "VIVT3",
    "label": "VIVT3"
  },
  {
    "value": "YDUQ3",
    "label": "YDUQ3"
  },
  {
    "value": "TIMS3",
    "label": "TIMS3"
  },
  {
    "value": "CEAB3",
    "label": "CEAB3"
  },
  {
    "value": "RCSL4",
    "label": "RCSL4"
  },
  {
    "value": "RDOR3",
    "label": "RDOR3"
  },
  {
    "value": "BOVA11",
    "label": "BOVA11"
  },
  {
    "value": "MULT3",
    "label": "MULT3"
  },
  {
    "value": "NVDC34",
    "label": "NVDC34"
  },
  {
    "value": "LWSA3",
    "label": "LWSA3"
  },
  {
    "value": "CPFE3",
    "label": "CPFE3"
  },
  {
    "value": "EMBR3",
    "label": "EMBR3"
  },
  {
    "value": "BRAP4",
    "label": "BRAP4"
  },
  {
    "value": "GRND3",
    "label": "GRND3"
  },
  {
    "value": "KLBN11",
    "label": "KLBN11"
  },
  {
    "value": "SBSP3",
    "label": "SBSP3"
  },
  {
    "value": "ODPV3",
    "label": "ODPV3"
  },
  {
    "value": "CSMG3",
    "label": "CSMG3"
  },
  {
    "value": "CXSE3",
    "label": "CXSE3"
  },
  {
    "value": "SRNA3",
    "label": "SRNA3"
  },
  {
    "value": "ENGI11",
    "label": "ENGI11"
  },
  {
    "value": "TOTS3",
    "label": "TOTS3"
  },
  {
    "value": "QUAL3",
    "label": "QUAL3"
  },
  {
    "value": "HAPV3",
    "label": "HAPV3"
  },
  {
    "value": "SAPR11",
    "label": "SAPR11"
  },
  {
    "value": "AZTE3",
    "label": "AZTE3"
  },
  {
    "value": "KEPL3",
    "label": "KEPL3"
  },
  {
    "value": "RECV3",
    "label": "RECV3"
  },
  {
    "value": "PSSA3",
    "label": "PSSA3"
  },
  {
    "value": "PORT3",
    "label": "PORT3"
  },
  {
    "value": "EZTC3",
    "label": "EZTC3"
  },
  {
    "value": "SMAL11",
    "label": "SMAL11"
  },
  {
    "value": "STBP3",
    "label": "STBP3"
  },
  {
    "value": "INTB3",
    "label": "INTB3"
  },
  {
    "value": "JHSF3",
    "label": "JHSF3"
  },
  {
    "value": "FLRY3",
    "label": "FLRY3"
  },
  {
    "value": "HBSA3",
    "label": "HBSA3"
  },
  {
    "value": "GMAT3",
    "label": "GMAT3"
  },
  {
    "value": "JBSS32",
    "label": "JBSS32"
  },
  {
    "value": "SAPR4",
    "label": "SAPR4"
  },
  {
    "value": "AMER3",
    "label": "AMER3"
  },
  {
    "value": "PLPL3",
    "label": "PLPL3"
  },
  {
    "value": "KLBN4",
    "label": "KLBN4"
  },
  {
    "value": "GGPS3",
    "label": "GGPS3"
  },
  {
    "value": "MTRE3",
    "label": "MTRE3"
  },
  {
    "value": "ISAE4",
    "label": "ISAE4"
  },
  {
    "value": "SBFG3",
    "label": "SBFG3"
  },
  {
    "value": "DIRR3",
    "label": "DIRR3"
  },
  {
    "value": "LJQQ3",
    "label": "LJQQ3"
  },
  {
    "value": "DXCO3",
    "label": "DXCO3"
  },
  {
    "value": "PDGR3",
    "label": "PDGR3"
  },
  {
    "value": "ROXO34",
    "label": "ROXO34"
  },
  {
    "value": "TSLA34",
    "label": "TSLA34"
  },
  {
    "value": "ECOR3",
    "label": "ECOR3"
  },
  {
    "value": "IGTI11",
    "label": "IGTI11"
  },
  {
    "value": "TAEE11",
    "label": "TAEE11"
  },
  {
    "value": "SLCE3",
    "label": "SLCE3"
  },
  {
    "value": "VVEO3",
    "label": "VVEO3"
  },
  {
    "value": "SMTO3",
    "label": "SMTO3"
  },
  {
    "value": "NEOE3",
    "label": "NEOE3"
  },
  {
    "value": "HBOR3",
    "label": "HBOR3"
  },
  {
    "value": "NASD11",
    "label": "NASD11"
  },
  {
    "value": "FRAS3",
    "label": "FRAS3"
  },
  {
    "value": "INBR32",
    "label": "INBR32"
  },
  {
    "value": "EGIE3",
    "label": "EGIE3"
  },
  {
    "value": "VULC3",
    "label": "VULC3"
  },
  {
    "value": "LIGT3",
    "label": "LIGT3"
  },
  {
    "value": "OIBR3",
    "label": "OIBR3"
  },
  {
    "value": "SANB11",
    "label": "SANB11"
  },
  {
    "value": "GARE11",
    "label": "GARE11"
  },
  {
    "value": "CAML3",
    "label": "CAML3"
  },
  {
    "value": "WIZC3",
    "label": "WIZC3"
  },
  {
    "value": "GOLD11",
    "label": "GOLD11"
  },
  {
    "value": "BRSR6",
    "label": "BRSR6"
  },
  {
    "value": "M2ST34",
    "label": "M2ST34"
  },
  {
    "value": "GUAR3",
    "label": "GUAR3"
  },
  {
    "value": "MXRF11",
    "label": "MXRF11"
  },
  {
    "value": "TFCO4",
    "label": "TFCO4"
  },
  {
    "value": "AZEV4",
    "label": "AZEV4"
  },
  {
    "value": "TTEN3",
    "label": "TTEN3"
  },
  {
    "value": "MILS3",
    "label": "MILS3"
  },
  {
    "value": "MYPK3",
    "label": "MYPK3"
  },
  {
    "value": "ALUP11",
    "label": "ALUP11"
  },
  {
    "value": "TOKY3",
    "label": "TOKY3"
  },
  {
    "value": "MDNE3",
    "label": "MDNE3"
  },
  {
    "value": "DASA3",
    "label": "DASA3"
  },
  {
    "value": "AZEV3",
    "label": "AZEV3"
  },
  {
    "value": "BPAN4",
    "label": "BPAN4"
  },
  {
    "value": "LAVV3",
    "label": "LAVV3"
  },
  {
    "value": "ZAMP3",
    "label": "ZAMP3"
  },
  {
    "value": "USIM3",
    "label": "USIM3"
  },
  {
    "value": "TRIS3",
    "label": "TRIS3"
  },
  {
    "value": "PGMN3",
    "label": "PGMN3"
  },
  {
    "value": "SOJA3",
    "label": "SOJA3"
  },
  {
    "value": "PTBL3",
    "label": "PTBL3"
  },
  {
    "value": "VLID3",
    "label": "VLID3"
  },
  {
    "value": "ONCO3",
    "label": "ONCO3"
  },
  {
    "value": "PETR4F",
    "label": "PETR4F"
  },
  {
    "value": "BOVV11",
    "label": "BOVV11"
  },
  {
    "value": "ESPA3",
    "label": "ESPA3"
  },
  {
    "value": "JALL3",
    "label": "JALL3"
  },
  {
    "value": "KNSC11",
    "label": "KNSC11"
  },
  {
    "value": "JSLG3",
    "label": "JSLG3"
  },
  {
    "value": "CPTS11",
    "label": "CPTS11"
  },
  {
    "value": "ENJU3",
    "label": "ENJU3"
  },
  {
    "value": "TASA4",
    "label": "TASA4"
  },
  {
    "value": "BBAS3F",
    "label": "BBAS3F"
  },
  {
    "value": "PNVL3",
    "label": "PNVL3"
  },
  {
    "value": "POSI3",
    "label": "POSI3"
  },
  {
    "value": "ETHE11",
    "label": "ETHE11"
  },
  {
    "value": "GGRC11",
    "label": "GGRC11"
  },
  {
    "value": "VGIR11",
    "label": "VGIR11"
  },
  {
    "value": "ARML3",
    "label": "ARML3"
  },
  {
    "value": "MLAS3",
    "label": "MLAS3"
  },
  {
    "value": "IRBR3",
    "label": "IRBR3"
  },
  {
    "value": "AMBP3",
    "label": "AMBP3"
  },
  {
    "value": "AAPL34",
    "label": "AAPL34"
  },
  {
    "value": "FESA4",
    "label": "FESA4"
  },
  {
    "value": "BOVX11",
    "label": "BOVX11"
  },
  {
    "value": "LOGG3",
    "label": "LOGG3"
  },
  {
    "value": "UNIP6",
    "label": "UNIP6"
  },
  {
    "value": "RANI3",
    "label": "RANI3"
  },
  {
    "value": "ITUB3",
    "label": "ITUB3"
  },
  {
    "value": "MDIA3",
    "label": "MDIA3"
  },
  {
    "value": "TGMA3",
    "label": "TGMA3"
  },
  {
    "value": "STOC34",
    "label": "STOC34"
  },
  {
    "value": "SHUL4",
    "label": "SHUL4"
  },
  {
    "value": "OPCT3",
    "label": "OPCT3"
  },
  {
    "value": "T2TD34",
    "label": "T2TD34"
  },
  {
    "value": "BIAU39",
    "label": "BIAU39"
  },
  {
    "value": "AMAR3",
    "label": "AMAR3"
  },
  {
    "value": "EVEN3",
    "label": "EVEN3"
  },
  {
    "value": "KLBN3",
    "label": "KLBN3"
  },
  {
    "value": "TUPY3",
    "label": "TUPY3"
  },
  {
    "value": "BABA34",
    "label": "BABA34"
  },
  {
    "value": "SEER3",
    "label": "SEER3"
  },
  {
    "value": "GFSA3",
    "label": "GFSA3"
  },
  {
    "value": "ORVR3",
    "label": "ORVR3"
  },
  {
    "value": "AURA33",
    "label": "AURA33"
  },
  {
    "value": "SAPR3",
    "label": "SAPR3"
  },
  {
    "value": "BMOB3",
    "label": "BMOB3"
  },
  {
    "value": "VGHF11",
    "label": "VGHF11"
  },
  {
    "value": "LEVE3",
    "label": "LEVE3"
  },
  {
    "value": "FIQE3",
    "label": "FIQE3"
  },
  {
    "value": "BMGB4",
    "label": "BMGB4"
  },
  {
    "value": "MELI34",
    "label": "MELI34"
  },
  {
    "value": "QBTC11",
    "label": "QBTC11"
  },
  {
    "value": "TCSA3",
    "label": "TCSA3"
  },
  {
    "value": "IFCM3",
    "label": "IFCM3"
  },
  {
    "value": "QETH11",
    "label": "QETH11"
  },
  {
    "value": "SYNE3",
    "label": "SYNE3"
  },
  {
    "value": "BLAU3",
    "label": "BLAU3"
  },
  {
    "value": "POMO3",
    "label": "POMO3"
  },
  {
    "value": "PRNR3",
    "label": "PRNR3"
  },
  {
    "value": "RCSL3",
    "label": "RCSL3"
  },
  {
    "value": "HBRE3",
    "label": "HBRE3"
  },
  {
    "value": "ABCB4",
    "label": "ABCB4"
  },
  {
    "value": "BTHF11",
    "label": "BTHF11"
  },
  {
    "value": "BQUA39",
    "label": "BQUA39"
  },
  {
    "value": "HASH11",
    "label": "HASH11"
  },
  {
    "value": "CSED3",
    "label": "CSED3"
  },
  {
    "value": "ITLC34",
    "label": "ITLC34"
  },
  {
    "value": "RBVA11",
    "label": "RBVA11"
  },
  {
    "value": "GOGL34",
    "label": "GOGL34"
  },
  {
    "value": "QSOL11",
    "label": "QSOL11"
  },
  {
    "value": "RURA11",
    "label": "RURA11"
  },
  {
    "value": "BRBI11",
    "label": "BRBI11"
  },
  {
    "value": "XPBR31",
    "label": "XPBR31"
  },
  {
    "value": "RBRF11",
    "label": "RBRF11"
  },
  {
    "value": "S2GM34",
    "label": "S2GM34"
  },
  {
    "value": "MCRE11",
    "label": "MCRE11"
  },
  {
    "value": "VGIA11",
    "label": "VGIA11"
  },
  {
    "value": "SEQL3",
    "label": "SEQL3"
  },
  {
    "value": "MELK3",
    "label": "MELK3"
  },
  {
    "value": "PMAM3",
    "label": "PMAM3"
  },
  {
    "value": "VTRU3",
    "label": "VTRU3"
  },
  {
    "value": "DEBB11",
    "label": "DEBB11"
  },
  {
    "value": "MEAL3",
    "label": "MEAL3"
  },
  {
    "value": "BTCI11",
    "label": "BTCI11"
  },
  {
    "value": "BURT39",
    "label": "BURT39"
  },
  {
    "value": "USAL11",
    "label": "USAL11"
  },
  {
    "value": "BRST3",
    "label": "BRST3"
  },
  {
    "value": "JSAF11",
    "label": "JSAF11"
  },
  {
    "value": "TAEE4",
    "label": "TAEE4"
  },
  {
    "value": "LFTB11",
    "label": "LFTB11"
  },
  {
    "value": "IMAB11",
    "label": "IMAB11"
  },
  {
    "value": "GOLL54F",
    "label": "GOLL54F"
  },
  {
    "value": "SNAG11",
    "label": "SNAG11"
  },
  {
    "value": "VSLH11",
    "label": "VSLH11"
  },
  {
    "value": "ALPK3",
    "label": "ALPK3"
  },
  {
    "value": "AMZO34",
    "label": "AMZO34"
  },
  {
    "value": "RAPT3",
    "label": "RAPT3"
  },
  {
    "value": "BODB11",
    "label": "BODB11"
  },
  {
    "value": "FGAA11",
    "label": "FGAA11"
  },
  {
    "value": "XINA11",
    "label": "XINA11"
  },
  {
    "value": "BACW39",
    "label": "BACW39"
  },
  {
    "value": "ALLD3",
    "label": "ALLD3"
  },
  {
    "value": "PAGS34",
    "label": "PAGS34"
  },
  {
    "value": "BBSE3F",
    "label": "BBSE3F"
  },
  {
    "value": "AVGO34",
    "label": "AVGO34"
  },
  {
    "value": "ETER3",
    "label": "ETER3"
  },
  {
    "value": "KNCR11",
    "label": "KNCR11"
  },
  {
    "value": "PINE4",
    "label": "PINE4"
  },
  {
    "value": "DIVO11",
    "label": "DIVO11"
  },
  {
    "value": "S2ED34",
    "label": "S2ED34"
  },
  {
    "value": "LFTS11",
    "label": "LFTS11"
  },
  {
    "value": "ALZR11",
    "label": "ALZR11"
  },
  {
    "value": "DEXP3",
    "label": "DEXP3"
  },
  {
    "value": "BBIG11",
    "label": "BBIG11"
  },
  {
    "value": "PFRM3",
    "label": "PFRM3"
  },
  {
    "value": "IVVB11",
    "label": "IVVB11"
  },
  {
    "value": "SNEL11",
    "label": "SNEL11"
  },
  {
    "value": "NFLX34",
    "label": "NFLX34"
  },
  {
    "value": "ROMI3",
    "label": "ROMI3"
  },
  {
    "value": "XPML11",
    "label": "XPML11"
  },
  {
    "value": "MANA11",
    "label": "MANA11"
  },
  {
    "value": "AGRO3",
    "label": "AGRO3"
  },
  {
    "value": "XPSF11",
    "label": "XPSF11"
  },
  {
    "value": "DOLA11",
    "label": "DOLA11"
  },
  {
    "value": "HGBS11",
    "label": "HGBS11"
  },
  {
    "value": "KLBN4F",
    "label": "KLBN4F"
  },
  {
    "value": "XRPH11",
    "label": "XRPH11"
  },
  {
    "value": "CXSE3F",
    "label": "CXSE3F"
  },
  {
    "value": "M1TA34",
    "label": "M1TA34"
  },
  {
    "value": "VCRI11",
    "label": "VCRI11"
  },
  {
    "value": "RZAG11",
    "label": "RZAG11"
  },
  {
    "value": "AMOB3",
    "label": "AMOB3"
  },
  {
    "value": "VINO11",
    "label": "VINO11"
  },
  {
    "value": "USTK11",
    "label": "USTK11"
  },
  {
    "value": "CMIG3",
    "label": "CMIG3"
  },
  {
    "value": "AALR3",
    "label": "AALR3"
  },
  {
    "value": "HFOF11",
    "label": "HFOF11"
  },
  {
    "value": "BOVB11",
    "label": "BOVB11"
  },
  {
    "value": "TECK11",
    "label": "TECK11"
  },
  {
    "value": "CACR11",
    "label": "CACR11"
  },
  {
    "value": "DEVA11",
    "label": "DEVA11"
  },
  {
    "value": "ITSA3",
    "label": "ITSA3"
  },
  {
    "value": "N1VO34",
    "label": "N1VO34"
  },
  {
    "value": "MATD3",
    "label": "MATD3"
  },
  {
    "value": "GRUL11",
    "label": "GRUL11"
  },
  {
    "value": "VALE3F",
    "label": "VALE3F"
  },
  {
    "value": "DMVF3",
    "label": "DMVF3"
  },
  {
    "value": "IMBB11",
    "label": "IMBB11"
  },
  {
    "value": "C2OI34",
    "label": "C2OI34"
  },
  {
    "value": "BRKM3F",
    "label": "BRKM3F"
  },
  {
    "value": "KISU11",
    "label": "KISU11"
  },
  {
    "value": "PETR3F",
    "label": "PETR3F"
  },
  {
    "value": "SOLH11",
    "label": "SOLH11"
  },
  {
    "value": "DESK3",
    "label": "DESK3"
  },
  {
    "value": "VGRI11",
    "label": "VGRI11"
  },
  {
    "value": "UCAS3",
    "label": "UCAS3"
  },
  {
    "value": "BITH11",
    "label": "BITH11"
  },
  {
    "value": "A1MD34",
    "label": "A1MD34"
  },
  {
    "value": "SAPR4F",
    "label": "SAPR4F"
  },
  {
    "value": "VITT3",
    "label": "VITT3"
  },
  {
    "value": "KNIP11",
    "label": "KNIP11"
  },
  {
    "value": "PORD11",
    "label": "PORD11"
  },
  {
    "value": "LUPA3",
    "label": "LUPA3"
  },
  {
    "value": "TAEE3",
    "label": "TAEE3"
  },
  {
    "value": "UNHH34",
    "label": "UNHH34"
  },
  {
    "value": "CMIG4F",
    "label": "CMIG4F"
  },
  {
    "value": "HOFC11",
    "label": "HOFC11"
  },
  {
    "value": "RAIZ4F",
    "label": "RAIZ4F"
  },
  {
    "value": "BTLG11",
    "label": "BTLG11"
  },
  {
    "value": "MSFT34",
    "label": "MSFT34"
  },
  {
    "value": "ITSA4F",
    "label": "ITSA4F"
  },
  {
    "value": "IRDM11",
    "label": "IRDM11"
  },
  {
    "value": "P2IN34",
    "label": "P2IN34"
  },
  {
    "value": "WEGE3F",
    "label": "WEGE3F"
  },
  {
    "value": "WHRL4",
    "label": "WHRL4"
  },
  {
    "value": "OIBR4",
    "label": "OIBR4"
  },
  {
    "value": "RIFF11",
    "label": "RIFF11"
  },
  {
    "value": "BRKM5F",
    "label": "BRKM5F"
  },
  {
    "value": "AERI3",
    "label": "AERI3"
  },
  {
    "value": "XPCA11",
    "label": "XPCA11"
  },
  {
    "value": "BIVB39",
    "label": "BIVB39"
  },
  {
    "value": "TRXF11",
    "label": "TRXF11"
  },
  {
    "value": "HCTR11",
    "label": "HCTR11"
  },
  {
    "value": "KNHF11",
    "label": "KNHF11"
  },
  {
    "value": "TPIS3",
    "label": "TPIS3"
  },
  {
    "value": "AZPL11",
    "label": "AZPL11"
  },
  {
    "value": "ALPA3",
    "label": "ALPA3"
  },
  {
    "value": "RNEW4",
    "label": "RNEW4"
  },
  {
    "value": "CAMB3",
    "label": "CAMB3"
  },
  {
    "value": "ITUB4F",
    "label": "ITUB4F"
  },
  {
    "value": "BBDC4F",
    "label": "BBDC4F"
  },
  {
    "value": "KNHY11",
    "label": "KNHY11"
  },
  {
    "value": "EUCA4",
    "label": "EUCA4"
  },
  {
    "value": "V2TX34",
    "label": "V2TX34"
  },
  {
    "value": "HGCR11",
    "label": "HGCR11"
  },
  {
    "value": "BOAC34",
    "label": "BOAC34"
  },
  {
    "value": "HGLG11",
    "label": "HGLG11"
  },
  {
    "value": "CSUD3",
    "label": "CSUD3"
  },
  {
    "value": "SANB3",
    "label": "SANB3"
  },
  {
    "value": "MGLU3F",
    "label": "MGLU3F"
  },
  {
    "value": "LPSB3",
    "label": "LPSB3"
  },
  {
    "value": "LILY34",
    "label": "LILY34"
  },
  {
    "value": "COIN11",
    "label": "COIN11"
  },
  {
    "value": "TECN3",
    "label": "TECN3"
  },
  {
    "value": "BOEF39",
    "label": "BOEF39"
  },
  {
    "value": "KORE11",
    "label": "KORE11"
  },
  {
    "value": "LVBI11",
    "label": "LVBI11"
  },
  {
    "value": "ISEN11",
    "label": "ISEN11"
  },
  {
    "value": "LAND3",
    "label": "LAND3"
  },
  {
    "value": "KEPL3F",
    "label": "KEPL3F"
  },
  {
    "value": "SAPI11",
    "label": "SAPI11"
  },
  {
    "value": "LIFE11",
    "label": "LIFE11"
  },
  {
    "value": "IGTI3",
    "label": "IGTI3"
  },
  {
    "value": "CPSH11",
    "label": "CPSH11"
  },
  {
    "value": "CMIN3F",
    "label": "CMIN3F"
  },
  {
    "value": "B5P211",
    "label": "B5P211"
  },
  {
    "value": "SARE11",
    "label": "SARE11"
  },
  {
    "value": "TGAR11",
    "label": "TGAR11"
  },
  {
    "value": "AAZQ11",
    "label": "AAZQ11"
  },
  {
    "value": "RZTR11",
    "label": "RZTR11"
  },
  {
    "value": "S2NW34",
    "label": "S2NW34"
  },
  {
    "value": "EPAR3",
    "label": "EPAR3"
  },
  {
    "value": "SPXR11",
    "label": "SPXR11"
  },
  {
    "value": "CBAV3F",
    "label": "CBAV3F"
  },
  {
    "value": "SANB4",
    "label": "SANB4"
  },
  {
    "value": "PMIS11",
    "label": "PMIS11"
  },
  {
    "value": "EQIR11",
    "label": "EQIR11"
  },
  {
    "value": "JSCR11",
    "label": "JSCR11"
  },
  {
    "value": "BBOV11",
    "label": "BBOV11"
  },
  {
    "value": "GOAU3",
    "label": "GOAU3"
  },
  {
    "value": "UTEC11",
    "label": "UTEC11"
  },
  {
    "value": "Q2SC34",
    "label": "Q2SC34"
  },
  {
    "value": "PVBI11",
    "label": "PVBI11"
  },
  {
    "value": "COGN3F",
    "label": "COGN3F"
  },
  {
    "value": "BERK34",
    "label": "BERK34"
  },
  {
    "value": "PYPL34",
    "label": "PYPL34"
  },
  {
    "value": "RAIL3F",
    "label": "RAIL3F"
  },
  {
    "value": "BDIF11",
    "label": "BDIF11"
  },
  {
    "value": "VIUR11",
    "label": "VIUR11"
  },
  {
    "value": "PDTC3",
    "label": "PDTC3"
  },
  {
    "value": "PRIO3F",
    "label": "PRIO3F"
  },
  {
    "value": "ALPK3F",
    "label": "ALPK3F"
  },
  {
    "value": "BRAP3",
    "label": "BRAP3"
  },
  {
    "value": "LREN3F",
    "label": "LREN3F"
  },
  {
    "value": "G2DI33",
    "label": "G2DI33"
  },
  {
    "value": "LOGN3",
    "label": "LOGN3"
  },
  {
    "value": "VISC11",
    "label": "VISC11"
  },
  {
    "value": "ACWI11",
    "label": "ACWI11"
  },
  {
    "value": "MTRE3F",
    "label": "MTRE3F"
  },
  {
    "value": "BRKM3",
    "label": "BRKM3"
  },
  {
    "value": "ETHA39",
    "label": "ETHA39"
  },
  {
    "value": "KLBN11F",
    "label": "KLBN11F"
  },
  {
    "value": "DISB34",
    "label": "DISB34"
  },
  {
    "value": "EGIE3F",
    "label": "EGIE3F"
  },
  {
    "value": "RBRR11",
    "label": "RBRR11"
  },
  {
    "value": "HGRU11",
    "label": "HGRU11"
  },
  {
    "value": "SNLG11",
    "label": "SNLG11"
  },
  {
    "value": "CYCR11",
    "label": "CYCR11"
  },
  {
    "value": "TAEE11F",
    "label": "TAEE11F"
  },
  {
    "value": "ELET3F",
    "label": "ELET3F"
  },
  {
    "value": "CDII11",
    "label": "CDII11"
  },
  {
    "value": "ISAE4F",
    "label": "ISAE4F"
  },
  {
    "value": "XPIE11",
    "label": "XPIE11"
  },
  {
    "value": "RAPT4F",
    "label": "RAPT4F"
  },
  {
    "value": "AURE3F",
    "label": "AURE3F"
  },
  {
    "value": "B3SA3F",
    "label": "B3SA3F"
  },
  {
    "value": "VCJR11",
    "label": "VCJR11"
  },
  {
    "value": "B2YN34",
    "label": "B2YN34"
  },
  {
    "value": "RECV3F",
    "label": "RECV3F"
  },
  {
    "value": "S1RP34",
    "label": "S1RP34"
  },
  {
    "value": "E2ST34",
    "label": "E2ST34"
  },
  {
    "value": "HREC11",
    "label": "HREC11"
  },
  {
    "value": "AZZA3F",
    "label": "AZZA3F"
  },
  {
    "value": "SPXS11",
    "label": "SPXS11"
  },
  {
    "value": "CPLE6F",
    "label": "CPLE6F"
  },
  {
    "value": "RBRX11",
    "label": "RBRX11"
  },
  {
    "value": "UNIP3",
    "label": "UNIP3"
  },
  {
    "value": "KNCA11",
    "label": "KNCA11"
  },
  {
    "value": "PSSA3F",
    "label": "PSSA3F"
  },
  {
    "value": "VIVR3",
    "label": "VIVR3"
  },
  {
    "value": "KLBN3F",
    "label": "KLBN3F"
  },
  {
    "value": "AIRB34",
    "label": "AIRB34"
  },
  {
    "value": "CSAN3F",
    "label": "CSAN3F"
  },
  {
    "value": "RSID3",
    "label": "RSID3"
  },
  {
    "value": "JURO11",
    "label": "JURO11"
  },
  {
    "value": "CORN11",
    "label": "CORN11"
  },
  {
    "value": "RECR11",
    "label": "RECR11"
  },
  {
    "value": "EMBR3F",
    "label": "EMBR3F"
  },
  {
    "value": "URPR11",
    "label": "URPR11"
  },
  {
    "value": "RCRB11",
    "label": "RCRB11"
  },
  {
    "value": "T1WL34",
    "label": "T1WL34"
  },
  {
    "value": "KNUQ11",
    "label": "KNUQ11"
  },
  {
    "value": "WRLD11",
    "label": "WRLD11"
  },
  {
    "value": "KNRI11",
    "label": "KNRI11"
  },
  {
    "value": "TASA4F",
    "label": "TASA4F"
  },
  {
    "value": "KNRE11",
    "label": "KNRE11"
  },
  {
    "value": "HSML11",
    "label": "HSML11"
  },
  {
    "value": "XPLG11",
    "label": "XPLG11"
  },
  {
    "value": "BRAV3F",
    "label": "BRAV3F"
  },
  {
    "value": "RBRY11",
    "label": "RBRY11"
  },
  {
    "value": "SAPR11F",
    "label": "SAPR11F"
  },
  {
    "value": "KDIF11",
    "label": "KDIF11"
  },
  {
    "value": "AZUL4F",
    "label": "AZUL4F"
  },
  {
    "value": "MCCI11",
    "label": "MCCI11"
  },
  {
    "value": "BRCR11",
    "label": "BRCR11"
  },
  {
    "value": "ARRI11",
    "label": "ARRI11"
  },
  {
    "value": "CPFE3F",
    "label": "CPFE3F"
  },
  {
    "value": "UNIP6F",
    "label": "UNIP6F"
  },
  {
    "value": "SSFO34",
    "label": "SSFO34"
  },
  {
    "value": "SNFZ11",
    "label": "SNFZ11"
  },
  {
    "value": "GGBR4F",
    "label": "GGBR4F"
  },
  {
    "value": "SUZB3F",
    "label": "SUZB3F"
  },
  {
    "value": "VRTM11",
    "label": "VRTM11"
  },
  {
    "value": "WALM34",
    "label": "WALM34"
  },
  {
    "value": "JSRE11",
    "label": "JSRE11"
  },
  {
    "value": "COCA34",
    "label": "COCA34"
  },
  {
    "value": "SHOW3",
    "label": "SHOW3"
  },
  {
    "value": "CPTI11",
    "label": "CPTI11"
  },
  {
    "value": "MTSA4",
    "label": "MTSA4"
  },
  {
    "value": "M1TC34",
    "label": "M1TC34"
  },
  {
    "value": "PETZ3F",
    "label": "PETZ3F"
  },
  {
    "value": "CPTR11",
    "label": "CPTR11"
  },
  {
    "value": "VIVT3F",
    "label": "VIVT3F"
  },
  {
    "value": "CHVX34",
    "label": "CHVX34"
  },
  {
    "value": "ALZC11",
    "label": "ALZC11"
  },
  {
    "value": "P2LT34",
    "label": "P2LT34"
  },
  {
    "value": "AGXY3",
    "label": "AGXY3"
  },
  {
    "value": "RADL3F",
    "label": "RADL3F"
  },
  {
    "value": "ENGI4",
    "label": "ENGI4"
  },
  {
    "value": "FNOR11",
    "label": "FNOR11"
  },
  {
    "value": "TSMC34",
    "label": "TSMC34"
  },
  {
    "value": "DEFI11",
    "label": "DEFI11"
  },
  {
    "value": "RANI3F",
    "label": "RANI3F"
  },
  {
    "value": "CVBI11",
    "label": "CVBI11"
  },
  {
    "value": "BBDC3F",
    "label": "BBDC3F"
  },
  {
    "value": "KCRE11",
    "label": "KCRE11"
  },
  {
    "value": "CASH3F",
    "label": "CASH3F"
  },
  {
    "value": "WHRL4F",
    "label": "WHRL4F"
  },
  {
    "value": "VILG11",
    "label": "VILG11"
  },
  {
    "value": "GOAU4F",
    "label": "GOAU4F"
  },
  {
    "value": "FATN11",
    "label": "FATN11"
  },
  {
    "value": "VBBR3F",
    "label": "VBBR3F"
  },
  {
    "value": "FLRY3F",
    "label": "FLRY3F"
  },
  {
    "value": "RNEW3",
    "label": "RNEW3"
  },
  {
    "value": "HAGA4",
    "label": "HAGA4"
  },
  {
    "value": "BHIA3F",
    "label": "BHIA3F"
  },
  {
    "value": "LEVE3F",
    "label": "LEVE3F"
  },
  {
    "value": "JPMC34",
    "label": "JPMC34"
  },
  {
    "value": "VAMO3F",
    "label": "VAMO3F"
  },
  {
    "value": "TAEE4F",
    "label": "TAEE4F"
  },
  {
    "value": "FCXO34",
    "label": "FCXO34"
  },
  {
    "value": "BLCA11",
    "label": "BLCA11"
  },
  {
    "value": "MOVI3F",
    "label": "MOVI3F"
  },
  {
    "value": "SMAC11",
    "label": "SMAC11"
  },
  {
    "value": "LAFI11",
    "label": "LAFI11"
  },
  {
    "value": "UGPA3F",
    "label": "UGPA3F"
  },
  {
    "value": "POMO4F",
    "label": "POMO4F"
  },
  {
    "value": "XPCI11",
    "label": "XPCI11"
  },
  {
    "value": "BROF11",
    "label": "BROF11"
  },
  {
    "value": "AMBP3F",
    "label": "AMBP3F"
  },
  {
    "value": "NIKE34",
    "label": "NIKE34"
  },
  {
    "value": "ARGT39",
    "label": "ARGT39"
  },
  {
    "value": "GGBR3",
    "label": "GGBR3"
  },
  {
    "value": "EWBZ11",
    "label": "EWBZ11"
  },
  {
    "value": "JHSF3F",
    "label": "JHSF3F"
  },
  {
    "value": "WIZC3F",
    "label": "WIZC3F"
  },
  {
    "value": "QCOM34",
    "label": "QCOM34"
  },
  {
    "value": "LUXM4",
    "label": "LUXM4"
  },
  {
    "value": "AGRX11",
    "label": "AGRX11"
  },
  {
    "value": "VIVA3F",
    "label": "VIVA3F"
  },
  {
    "value": "VISA34",
    "label": "VISA34"
  },
  {
    "value": "CSNA3F",
    "label": "CSNA3F"
  },
  {
    "value": "ASAI3F",
    "label": "ASAI3F"
  },
  {
    "value": "BMEB4",
    "label": "BMEB4"
  },
  {
    "value": "EXXO34",
    "label": "EXXO34"
  },
  {
    "value": "GAME11",
    "label": "GAME11"
  },
  {
    "value": "EZTC3F",
    "label": "EZTC3F"
  },
  {
    "value": "SIMH3F",
    "label": "SIMH3F"
  },
  {
    "value": "VGIP11",
    "label": "VGIP11"
  },
  {
    "value": "CSMG3F",
    "label": "CSMG3F"
  },
  {
    "value": "EQTL3F",
    "label": "EQTL3F"
  },
  {
    "value": "B2MB34",
    "label": "B2MB34"
  },
  {
    "value": "GPUS11",
    "label": "GPUS11"
  },
  {
    "value": "KFOF11",
    "label": "KFOF11"
  },
  {
    "value": "BEEF3F",
    "label": "BEEF3F"
  },
  {
    "value": "OFSA3",
    "label": "OFSA3"
  },
  {
    "value": "ABEV3F",
    "label": "ABEV3F"
  },
  {
    "value": "VRTA11",
    "label": "VRTA11"
  },
  {
    "value": "RBRP11",
    "label": "RBRP11"
  },
  {
    "value": "PMLL11",
    "label": "PMLL11"
  },
  {
    "value": "RZAK11",
    "label": "RZAK11"
  },
  {
    "value": "HGRE11",
    "label": "HGRE11"
  },
  {
    "value": "AJFI11",
    "label": "AJFI11"
  },
  {
    "value": "BBOI11",
    "label": "BBOI11"
  },
  {
    "value": "BPAC11F",
    "label": "BPAC11F"
  },
  {
    "value": "DIRR3F",
    "label": "DIRR3F"
  },
  {
    "value": "BRAP4F",
    "label": "BRAP4F"
  },
  {
    "value": "RIGG34",
    "label": "RIGG34"
  },
  {
    "value": "ELET6F",
    "label": "ELET6F"
  },
  {
    "value": "BRCO11",
    "label": "BRCO11"
  },
  {
    "value": "SPYI11",
    "label": "SPYI11"
  },
  {
    "value": "USIM5F",
    "label": "USIM5F"
  },
  {
    "value": "ITUB3F",
    "label": "ITUB3F"
  },
  {
    "value": "CURY3F",
    "label": "CURY3F"
  },
  {
    "value": "GRND3F",
    "label": "GRND3F"
  },
  {
    "value": "IFRI11",
    "label": "IFRI11"
  },
  {
    "value": "BOBR4",
    "label": "BOBR4"
  },
  {
    "value": "SOJA3F",
    "label": "SOJA3F"
  },
  {
    "value": "BMGB4F",
    "label": "BMGB4F"
  },
  {
    "value": "S2EA34",
    "label": "S2EA34"
  },
  {
    "value": "PCAR3F",
    "label": "PCAR3F"
  },
  {
    "value": "SPXB11",
    "label": "SPXB11"
  },
  {
    "value": "BRFS3F",
    "label": "BRFS3F"
  },
  {
    "value": "SLCE3F",
    "label": "SLCE3F"
  },
  {
    "value": "VCRA11",
    "label": "VCRA11"
  },
  {
    "value": "MRVE3F",
    "label": "MRVE3F"
  },
  {
    "value": "PFIN11",
    "label": "PFIN11"
  },
  {
    "value": "CVCB3F",
    "label": "CVCB3F"
  },
  {
    "value": "CEAB3F",
    "label": "CEAB3F"
  },
  {
    "value": "GZIT11",
    "label": "GZIT11"
  },
  {
    "value": "OIAG11",
    "label": "OIAG11"
  },
  {
    "value": "TEND3F",
    "label": "TEND3F"
  },
  {
    "value": "M1RN34",
    "label": "M1RN34"
  },
  {
    "value": "SBSP3F",
    "label": "SBSP3F"
  },
  {
    "value": "IFRA11",
    "label": "IFRA11"
  },
  {
    "value": "LVTC3",
    "label": "LVTC3"
  },
  {
    "value": "TRAD3",
    "label": "TRAD3"
  },
  {
    "value": "ABBV34",
    "label": "ABBV34"
  },
  {
    "value": "BRBI11F",
    "label": "BRBI11F"
  },
  {
    "value": "SANB11F",
    "label": "SANB11F"
  },
  {
    "value": "RVBI11",
    "label": "RVBI11"
  },
  {
    "value": "DIVD11",
    "label": "DIVD11"
  },
  {
    "value": "HGFF11",
    "label": "HGFF11"
  },
  {
    "value": "INTB3F",
    "label": "INTB3F"
  },
  {
    "value": "COCE11",
    "label": "COCE11"
  },
  {
    "value": "CGRA4",
    "label": "CGRA4"
  },
  {
    "value": "SNID11",
    "label": "SNID11"
  },
  {
    "value": "JMBI11",
    "label": "JMBI11"
  },
  {
    "value": "TASA3",
    "label": "TASA3"
  },
  {
    "value": "BRSR6F",
    "label": "BRSR6F"
  },
  {
    "value": "MRFG3F",
    "label": "MRFG3F"
  },
  {
    "value": "OIBR4F",
    "label": "OIBR4F"
  },
  {
    "value": "QDFI11",
    "label": "QDFI11"
  },
  {
    "value": "GDXB39",
    "label": "GDXB39"
  },
  {
    "value": "ALPA4F",
    "label": "ALPA4F"
  },
  {
    "value": "RDOR3F",
    "label": "RDOR3F"
  },
  {
    "value": "SYNE3F",
    "label": "SYNE3F"
  },
  {
    "value": "MUTC34",
    "label": "MUTC34"
  },
  {
    "value": "FIQE3F",
    "label": "FIQE3F"
  },
  {
    "value": "SMTO3F",
    "label": "SMTO3F"
  },
  {
    "value": "CLIN11",
    "label": "CLIN11"
  },
  {
    "value": "HYPE3F",
    "label": "HYPE3F"
  },
  {
    "value": "RENT3F",
    "label": "RENT3F"
  },
  {
    "value": "TAEE3F",
    "label": "TAEE3F"
  },
  {
    "value": "CYRE3F",
    "label": "CYRE3F"
  },
  {
    "value": "AGRO3F",
    "label": "AGRO3F"
  },
  {
    "value": "GBTC11",
    "label": "GBTC11"
  },
  {
    "value": "KNOX11",
    "label": "KNOX11"
  },
  {
    "value": "BIWM39",
    "label": "BIWM39"
  },
  {
    "value": "AMER3F",
    "label": "AMER3F"
  },
  {
    "value": "MCDC34",
    "label": "MCDC34"
  },
  {
    "value": "ALUP11F",
    "label": "ALUP11F"
  },
  {
    "value": "NGRD3",
    "label": "NGRD3"
  },
  {
    "value": "PLPL3F",
    "label": "PLPL3F"
  },
  {
    "value": "CNES11",
    "label": "CNES11"
  },
  {
    "value": "BPAC5",
    "label": "BPAC5"
  },
  {
    "value": "TRIG11",
    "label": "TRIG11"
  },
  {
    "value": "ASML34",
    "label": "ASML34"
  },
  {
    "value": "ABCB4F",
    "label": "ABCB4F"
  },
  {
    "value": "VSTE3",
    "label": "VSTE3"
  },
  {
    "value": "POSI3F",
    "label": "POSI3F"
  },
  {
    "value": "ENGI3",
    "label": "ENGI3"
  },
  {
    "value": "RECT11",
    "label": "RECT11"
  },
  {
    "value": "TIMS3F",
    "label": "TIMS3F"
  },
  {
    "value": "WEB311",
    "label": "WEB311"
  },
  {
    "value": "ITSA3F",
    "label": "ITSA3F"
  },
  {
    "value": "BEES3",
    "label": "BEES3"
  },
  {
    "value": "EALT4",
    "label": "EALT4"
  },
  {
    "value": "IAAG11",
    "label": "IAAG11"
  },
  {
    "value": "NEOE3F",
    "label": "NEOE3F"
  },
  {
    "value": "SPXI11",
    "label": "SPXI11"
  },
  {
    "value": "CMIG3F",
    "label": "CMIG3F"
  },
  {
    "value": "TRBL11",
    "label": "TRBL11"
  },
  {
    "value": "IRBR3F",
    "label": "IRBR3F"
  },
  {
    "value": "FESA4F",
    "label": "FESA4F"
  },
  {
    "value": "DOTZ3",
    "label": "DOTZ3"
  },
  {
    "value": "HLOG11",
    "label": "HLOG11"
  },
  {
    "value": "ODPV3F",
    "label": "ODPV3F"
  },
  {
    "value": "ALUP4",
    "label": "ALUP4"
  },
  {
    "value": "IBIT39",
    "label": "IBIT39"
  },
  {
    "value": "VULC3F",
    "label": "VULC3F"
  },
  {
    "value": "VIGT11",
    "label": "VIGT11"
  },
  {
    "value": "WHGR11",
    "label": "WHGR11"
  },
  {
    "value": "MOTV3F",
    "label": "MOTV3F"
  },
  {
    "value": "R2BL34",
    "label": "R2BL34"
  },
  {
    "value": "REDE3",
    "label": "REDE3"
  },
  {
    "value": "GFSA3F",
    "label": "GFSA3F"
  },
  {
    "value": "CAML3F",
    "label": "CAML3F"
  },
  {
    "value": "HAPV3F",
    "label": "HAPV3F"
  },
  {
    "value": "U2PS34",
    "label": "U2PS34"
  },
  {
    "value": "TUPY3F",
    "label": "TUPY3F"
  },
  {
    "value": "AMOB3F",
    "label": "AMOB3F"
  },
  {
    "value": "PFIZ34",
    "label": "PFIZ34"
  },
  {
    "value": "ALOS3F",
    "label": "ALOS3F"
  },
  {
    "value": "AALL34",
    "label": "AALL34"
  },
  {
    "value": "SAPR3F",
    "label": "SAPR3F"
  },
  {
    "value": "CLOV34",
    "label": "CLOV34"
  },
  {
    "value": "MFII11",
    "label": "MFII11"
  },
  {
    "value": "TRAD3F",
    "label": "TRAD3F"
  },
  {
    "value": "TOTS3F",
    "label": "TOTS3F"
  },
  {
    "value": "XFIX11",
    "label": "XFIX11"
  },
  {
    "value": "FSRF11",
    "label": "FSRF11"
  },
  {
    "value": "SPG211",
    "label": "SPG211"
  },
  {
    "value": "SANB4F",
    "label": "SANB4F"
  },
  {
    "value": "ENGI11F",
    "label": "ENGI11F"
  },
  {
    "value": "CXCO11",
    "label": "CXCO11"
  },
  {
    "value": "CCME11",
    "label": "CCME11"
  },
  {
    "value": "CPLE3F",
    "label": "CPLE3F"
  },
  {
    "value": "BSLI3",
    "label": "BSLI3"
  },
  {
    "value": "SCAR3",
    "label": "SCAR3"
  },
  {
    "value": "TEPP11",
    "label": "TEPP11"
  },
  {
    "value": "SHUL4F",
    "label": "SHUL4F"
  },
  {
    "value": "ALUG11",
    "label": "ALUG11"
  },
  {
    "value": "BEWJ39",
    "label": "BEWJ39"
  },
  {
    "value": "ANIM3F",
    "label": "ANIM3F"
  },
  {
    "value": "GENB11",
    "label": "GENB11"
  },
  {
    "value": "S2HO34",
    "label": "S2HO34"
  },
  {
    "value": "NATU3F",
    "label": "NATU3F"
  },
  {
    "value": "ITRI11",
    "label": "ITRI11"
  },
  {
    "value": "HOOT4",
    "label": "HOOT4"
  },
  {
    "value": "IRFM11",
    "label": "IRFM11"
  },
  {
    "value": "TOPP11",
    "label": "TOPP11"
  },
  {
    "value": "FYTO11",
    "label": "FYTO11"
  },
  {
    "value": "TTEN3F",
    "label": "TTEN3F"
  },
  {
    "value": "AZIN11",
    "label": "AZIN11"
  },
  {
    "value": "AZTE3F",
    "label": "AZTE3F"
  },
  {
    "value": "BIYT39",
    "label": "BIYT39"
  },
  {
    "value": "USDB11",
    "label": "USDB11"
  },
  {
    "value": "TELB4",
    "label": "TELB4"
  },
  {
    "value": "JALL3F",
    "label": "JALL3F"
  },
  {
    "value": "VLID3F",
    "label": "VLID3F"
  },
  {
    "value": "YDUQ3F",
    "label": "YDUQ3F"
  },
  {
    "value": "OIBR3F",
    "label": "OIBR3F"
  },
  {
    "value": "ADBE34",
    "label": "ADBE34"
  },
  {
    "value": "BCIC11",
    "label": "BCIC11"
  },
  {
    "value": "ROMI3F",
    "label": "ROMI3F"
  },
  {
    "value": "HABT11",
    "label": "HABT11"
  },
  {
    "value": "ENEV3F",
    "label": "ENEV3F"
  },
  {
    "value": "TMPS11",
    "label": "TMPS11"
  },
  {
    "value": "FIVN11",
    "label": "FIVN11"
  },
  {
    "value": "TELB3",
    "label": "TELB3"
  },
  {
    "value": "RZAT11",
    "label": "RZAT11"
  },
  {
    "value": "SNEC34",
    "label": "SNEC34"
  },
  {
    "value": "AFHI11",
    "label": "AFHI11"
  },
  {
    "value": "XPIN11",
    "label": "XPIN11"
  },
  {
    "value": "ARXD11",
    "label": "ARXD11"
  },
  {
    "value": "BPFF11",
    "label": "BPFF11"
  },
  {
    "value": "BURA39",
    "label": "BURA39"
  },
  {
    "value": "AIEC11",
    "label": "AIEC11"
  },
  {
    "value": "L1RC34",
    "label": "L1RC34"
  },
  {
    "value": "AFHF11",
    "label": "AFHF11"
  },
  {
    "value": "BLMG11",
    "label": "BLMG11"
  },
  {
    "value": "OXYP34",
    "label": "OXYP34"
  },
  {
    "value": "A1NE34",
    "label": "A1NE34"
  },
  {
    "value": "BKNG34",
    "label": "BKNG34"
  },
  {
    "value": "T2ND34",
    "label": "T2ND34"
  },
  {
    "value": "BIYK39",
    "label": "BIYK39"
  },
  {
    "value": "HSAF11",
    "label": "HSAF11"
  },
  {
    "value": "PNVL3F",
    "label": "PNVL3F"
  },
  {
    "value": "RVEE3",
    "label": "RVEE3"
  },
  {
    "value": "AALR3F",
    "label": "AALR3F"
  },
  {
    "value": "SMFT3F",
    "label": "SMFT3F"
  },
  {
    "value": "T2DH34",
    "label": "T2DH34"
  },
  {
    "value": "BINC11",
    "label": "BINC11"
  },
  {
    "value": "D2AS34",
    "label": "D2AS34"
  },
  {
    "value": "GUAR3F",
    "label": "GUAR3F"
  },
  {
    "value": "INEP3",
    "label": "INEP3"
  },
  {
    "value": "SNCI11",
    "label": "SNCI11"
  },
  {
    "value": "PATL11",
    "label": "PATL11"
  },
  {
    "value": "TORD11",
    "label": "TORD11"
  },
  {
    "value": "F2NV34",
    "label": "F2NV34"
  },
  {
    "value": "IDKA11",
    "label": "IDKA11"
  },
  {
    "value": "CAPE11",
    "label": "CAPE11"
  },
  {
    "value": "SNFF11",
    "label": "SNFF11"
  },
  {
    "value": "UPSS34",
    "label": "UPSS34"
  },
  {
    "value": "BEWH39",
    "label": "BEWH39"
  },
  {
    "value": "SMRE11",
    "label": "SMRE11"
  },
  {
    "value": "BPML11",
    "label": "BPML11"
  },
  {
    "value": "BAZA3",
    "label": "BAZA3"
  },
  {
    "value": "DCRA11",
    "label": "DCRA11"
  },
  {
    "value": "SANB3F",
    "label": "SANB3F"
  },
  {
    "value": "MATB11",
    "label": "MATB11"
  },
  {
    "value": "WEST3",
    "label": "WEST3"
  },
  {
    "value": "QQQI11",
    "label": "QQQI11"
  },
  {
    "value": "BRAX11",
    "label": "BRAX11"
  },
  {
    "value": "A1MT34",
    "label": "A1MT34"
  },
  {
    "value": "RSUL4",
    "label": "RSUL4"
  },
  {
    "value": "WHRL3",
    "label": "WHRL3"
  },
  {
    "value": "TGMA3F",
    "label": "TGMA3F"
  },
  {
    "value": "B2HI34",
    "label": "B2HI34"
  },
  {
    "value": "META11",
    "label": "META11"
  },
  {
    "value": "BPAC3",
    "label": "BPAC3"
  },
  {
    "value": "JFEN3",
    "label": "JFEN3"
  },
  {
    "value": "U1BE34",
    "label": "U1BE34"
  },
  {
    "value": "KNDI11",
    "label": "KNDI11"
  },
  {
    "value": "BRZP11",
    "label": "BRZP11"
  },
  {
    "value": "IGTI11F",
    "label": "IGTI11F"
  },
  {
    "value": "ALLD3F",
    "label": "ALLD3F"
  },
  {
    "value": "MULT3F",
    "label": "MULT3F"
  },
  {
    "value": "UNIP3F",
    "label": "UNIP3F"
  },
  {
    "value": "BTAL11",
    "label": "BTAL11"
  },
  {
    "value": "BIEU39",
    "label": "BIEU39"
  },
  {
    "value": "MYPK3F",
    "label": "MYPK3F"
  },
  {
    "value": "BLAU3F",
    "label": "BLAU3F"
  },
  {
    "value": "GCRA11",
    "label": "GCRA11"
  },
  {
    "value": "PTNT3",
    "label": "PTNT3"
  },
  {
    "value": "W1BO34",
    "label": "W1BO34"
  },
  {
    "value": "GOGL35",
    "label": "GOGL35"
  },
  {
    "value": "BDIV11",
    "label": "BDIV11"
  },
  {
    "value": "PEPB34",
    "label": "PEPB34"
  },
  {
    "value": "ICRI11",
    "label": "ICRI11"
  },
  {
    "value": "U2ST34",
    "label": "U2ST34"
  },
  {
    "value": "FHER3",
    "label": "FHER3"
  },
  {
    "value": "CLSC4",
    "label": "CLSC4"
  },
  {
    "value": "GTWR11",
    "label": "GTWR11"
  },
  {
    "value": "CRAA11",
    "label": "CRAA11"
  },
  {
    "value": "MDNE3F",
    "label": "MDNE3F"
  },
  {
    "value": "QUAL3F",
    "label": "QUAL3F"
  },
  {
    "value": "MDIA3F",
    "label": "MDIA3F"
  },
  {
    "value": "RNGO11",
    "label": "RNGO11"
  },
  {
    "value": "JDCO34",
    "label": "JDCO34"
  },
  {
    "value": "NTNS11",
    "label": "NTNS11"
  },
  {
    "value": "OUJP11",
    "label": "OUJP11"
  },
  {
    "value": "IFCM3F",
    "label": "IFCM3F"
  },
  {
    "value": "SADI11",
    "label": "SADI11"
  },
  {
    "value": "CXAG11",
    "label": "CXAG11"
  },
  {
    "value": "BNDX11",
    "label": "BNDX11"
  },
  {
    "value": "HGBL11",
    "label": "HGBL11"
  },
  {
    "value": "BEPP39",
    "label": "BEPP39"
  },
  {
    "value": "BCIA11",
    "label": "BCIA11"
  },
  {
    "value": "PDGR3F",
    "label": "PDGR3F"
  },
  {
    "value": "CEBR3",
    "label": "CEBR3"
  },
  {
    "value": "BTLT39",
    "label": "BTLT39"
  },
  {
    "value": "COPN11",
    "label": "COPN11"
  },
  {
    "value": "GPIV33",
    "label": "GPIV33"
  },
  {
    "value": "E1CO34",
    "label": "E1CO34"
  },
  {
    "value": "M2PM34",
    "label": "M2PM34"
  },
  {
    "value": "INEP4",
    "label": "INEP4"
  },
  {
    "value": "DXCO3F",
    "label": "DXCO3F"
  },
  {
    "value": "RBRL11",
    "label": "RBRL11"
  },
  {
    "value": "BIYW39",
    "label": "BIYW39"
  },
  {
    "value": "ECOR3F",
    "label": "ECOR3F"
  },
  {
    "value": "MELK3F",
    "label": "MELK3F"
  },
  {
    "value": "FOMO11",
    "label": "FOMO11"
  },
  {
    "value": "LAVV3F",
    "label": "LAVV3F"
  },
  {
    "value": "NUCL11",
    "label": "NUCL11"
  },
  {
    "value": "PLAG11",
    "label": "PLAG11"
  },
  {
    "value": "ORCL34",
    "label": "ORCL34"
  },
  {
    "value": "K2CG34",
    "label": "K2CG34"
  },
  {
    "value": "HSLG11",
    "label": "HSLG11"
  },
  {
    "value": "RBHG11",
    "label": "RBHG11"
  },
  {
    "value": "HODL11",
    "label": "HODL11"
  },
  {
    "value": "HBSA3F",
    "label": "HBSA3F"
  },
  {
    "value": "D1OC34",
    "label": "D1OC34"
  },
  {
    "value": "RELG11",
    "label": "RELG11"
  },
  {
    "value": "FICT3",
    "label": "FICT3"
  },
  {
    "value": "T1DG34",
    "label": "T1DG34"
  },
  {
    "value": "LIGT3F",
    "label": "LIGT3F"
  },
  {
    "value": "IB5M11",
    "label": "IB5M11"
  },
  {
    "value": "JNJB34",
    "label": "JNJB34"
  },
  {
    "value": "BBFO11",
    "label": "BBFO11"
  },
  {
    "value": "BPAN4F",
    "label": "BPAN4F"
  },
  {
    "value": "BRXC11",
    "label": "BRXC11"
  },
  {
    "value": "ATED3",
    "label": "ATED3"
  },
  {
    "value": "BEWG39",
    "label": "BEWG39"
  },
  {
    "value": "S1BS34",
    "label": "S1BS34"
  },
  {
    "value": "XPID11",
    "label": "XPID11"
  },
  {
    "value": "ALUP3",
    "label": "ALUP3"
  },
  {
    "value": "TASA3F",
    "label": "TASA3F"
  },
  {
    "value": "ORVR3F",
    "label": "ORVR3F"
  },
  {
    "value": "ABTT34",
    "label": "ABTT34"
  },
  {
    "value": "HTMX11",
    "label": "HTMX11"
  },
  {
    "value": "VCRR11",
    "label": "VCRR11"
  },
  {
    "value": "BIXN39",
    "label": "BIXN39"
  },
  {
    "value": "P2AN34",
    "label": "P2AN34"
  },
  {
    "value": "LOGG3F",
    "label": "LOGG3F"
  },
  {
    "value": "VVEO3F",
    "label": "VVEO3F"
  },
  {
    "value": "REAG3",
    "label": "REAG3"
  },
  {
    "value": "ARML3F",
    "label": "ARML3F"
  },
  {
    "value": "GMAT3F",
    "label": "GMAT3F"
  },
  {
    "value": "FSRF11F",
    "label": "FSRF11F"
  },
  {
    "value": "LJQQ3F",
    "label": "LJQQ3F"
  },
  {
    "value": "BCHI39",
    "label": "BCHI39"
  },
  {
    "value": "LWSA3F",
    "label": "LWSA3F"
  },
  {
    "value": "SBFG3F",
    "label": "SBFG3F"
  },
  {
    "value": "JSLG3F",
    "label": "JSLG3F"
  },
  {
    "value": "ISAE3",
    "label": "ISAE3"
  },
  {
    "value": "POMO3F",
    "label": "POMO3F"
  },
  {
    "value": "LASC11",
    "label": "LASC11"
  },
  {
    "value": "GPRO34",
    "label": "GPRO34"
  },
  {
    "value": "C2RW34",
    "label": "C2RW34"
  },
  {
    "value": "ENJU3F",
    "label": "ENJU3F"
  },
  {
    "value": "BBVH11",
    "label": "BBVH11"
  },
  {
    "value": "GOAU3F",
    "label": "GOAU3F"
  },
  {
    "value": "PGMN3F",
    "label": "PGMN3F"
  },
  {
    "value": "TVRI11",
    "label": "TVRI11"
  },
  {
    "value": "KIVO11",
    "label": "KIVO11"
  },
  {
    "value": "BFDN39",
    "label": "BFDN39"
  },
  {
    "value": "RAPT3F",
    "label": "RAPT3F"
  },
  {
    "value": "IBCR11",
    "label": "IBCR11"
  },
  {
    "value": "GGBR3F",
    "label": "GGBR3F"
  },
  {
    "value": "GROP31",
    "label": "GROP31"
  },
  {
    "value": "MILS3F",
    "label": "MILS3F"
  },
  {
    "value": "AGXY3F",
    "label": "AGXY3F"
  },
  {
    "value": "BBGO11",
    "label": "BBGO11"
  },
  {
    "value": "VPPR11",
    "label": "VPPR11"
  },
  {
    "value": "FTCA11",
    "label": "FTCA11"
  },
  {
    "value": "MDLZ34",
    "label": "MDLZ34"
  },
  {
    "value": "CEBR6",
    "label": "CEBR6"
  },
  {
    "value": "EALT3",
    "label": "EALT3"
  },
  {
    "value": "CRPG5",
    "label": "CRPG5"
  },
  {
    "value": "AVLL3",
    "label": "AVLL3"
  },
  {
    "value": "NSDV11",
    "label": "NSDV11"
  },
  {
    "value": "PACB11",
    "label": "PACB11"
  },
  {
    "value": "BIOM3",
    "label": "BIOM3"
  },
  {
    "value": "HBOR3F",
    "label": "HBOR3F"
  },
  {
    "value": "PULV11",
    "label": "PULV11"
  },
  {
    "value": "BCRI11",
    "label": "BCRI11"
  },
  {
    "value": "FRAS3F",
    "label": "FRAS3F"
  },
  {
    "value": "AMAR3F",
    "label": "AMAR3F"
  },
  {
    "value": "D1OW34",
    "label": "D1OW34"
  },
  {
    "value": "B2UR34",
    "label": "B2UR34"
  },
  {
    "value": "IBMB34",
    "label": "IBMB34"
  },
  {
    "value": "BIVE39",
    "label": "BIVE39"
  },
  {
    "value": "IRIF11",
    "label": "IRIF11"
  },
  {
    "value": "BEES4",
    "label": "BEES4"
  },
  {
    "value": "IBOB11",
    "label": "IBOB11"
  },
  {
    "value": "LFTT11",
    "label": "LFTT11"
  },
  {
    "value": "SCPF11",
    "label": "SCPF11"
  },
  {
    "value": "MLAS3F",
    "label": "MLAS3F"
  },
  {
    "value": "IAGR11",
    "label": "IAGR11"
  },
  {
    "value": "AUVP11",
    "label": "AUVP11"
  },
  {
    "value": "CSCO34",
    "label": "CSCO34"
  },
  {
    "value": "BCSA34",
    "label": "BCSA34"
  },
  {
    "value": "RBHY11",
    "label": "RBHY11"
  },
  {
    "value": "EGAF11",
    "label": "EGAF11"
  },
  {
    "value": "BIDU34",
    "label": "BIDU34"
  },
  {
    "value": "ALUP4F",
    "label": "ALUP4F"
  },
  {
    "value": "BIVW39",
    "label": "BIVW39"
  },
  {
    "value": "JGPX11",
    "label": "JGPX11"
  },
  {
    "value": "BAER39",
    "label": "BAER39"
  },
  {
    "value": "BRAP3F",
    "label": "BRAP3F"
  },
  {
    "value": "TCSA3F",
    "label": "TCSA3F"
  },
  {
    "value": "NDIV11",
    "label": "NDIV11"
  },
  {
    "value": "MMMC34",
    "label": "MMMC34"
  },
  {
    "value": "PIBB11",
    "label": "PIBB11"
  },
  {
    "value": "PTBL3F",
    "label": "PTBL3F"
  },
  {
    "value": "DAYM11",
    "label": "DAYM11"
  },
  {
    "value": "CXCI11",
    "label": "CXCI11"
  },
  {
    "value": "CCTY3",
    "label": "CCTY3"
  },
  {
    "value": "BRSR3",
    "label": "BRSR3"
  },
  {
    "value": "MARG11",
    "label": "MARG11"
  },
  {
    "value": "ISUS11",
    "label": "ISUS11"
  },
  {
    "value": "MSCD34",
    "label": "MSCD34"
  },
  {
    "value": "BTRA11",
    "label": "BTRA11"
  },
  {
    "value": "AZEV4F",
    "label": "AZEV4F"
  },
  {
    "value": "M2RV34",
    "label": "M2RV34"
  },
  {
    "value": "R2PD34",
    "label": "R2PD34"
  },
  {
    "value": "G1LO34",
    "label": "G1LO34"
  },
  {
    "value": "TRIS3F",
    "label": "TRIS3F"
  },
  {
    "value": "ONDV11",
    "label": "ONDV11"
  },
  {
    "value": "IWMI11",
    "label": "IWMI11"
  },
  {
    "value": "COCE5",
    "label": "COCE5"
  },
  {
    "value": "STBP3F",
    "label": "STBP3F"
  },
  {
    "value": "USIM3F",
    "label": "USIM3F"
  },
  {
    "value": "DESK3F",
    "label": "DESK3F"
  },
  {
    "value": "PICE11",
    "label": "PICE11"
  },
  {
    "value": "RBFF11",
    "label": "RBFF11"
  },
  {
    "value": "GGPS3F",
    "label": "GGPS3F"
  },
  {
    "value": "DASA3F",
    "label": "DASA3F"
  },
  {
    "value": "OULG11",
    "label": "OULG11"
  },
  {
    "value": "ETER3F",
    "label": "ETER3F"
  },
  {
    "value": "FIXA11",
    "label": "FIXA11"
  },
  {
    "value": "BIME11",
    "label": "BIME11"
  },
  {
    "value": "BEES3F",
    "label": "BEES3F"
  },
  {
    "value": "CGRA3",
    "label": "CGRA3"
  },
  {
    "value": "AROA11",
    "label": "AROA11"
  },
  {
    "value": "CASA11",
    "label": "CASA11"
  },
  {
    "value": "RRCI11",
    "label": "RRCI11"
  },
  {
    "value": "GCRI11",
    "label": "GCRI11"
  },
  {
    "value": "AZEV3F",
    "label": "AZEV3F"
  },
  {
    "value": "BIDB11",
    "label": "BIDB11"
  },
  {
    "value": "BSLV39",
    "label": "BSLV39"
  },
  {
    "value": "B1TI34",
    "label": "B1TI34"
  },
  {
    "value": "PLCA11",
    "label": "PLCA11"
  },
  {
    "value": "SNME11",
    "label": "SNME11"
  },
  {
    "value": "J2AZ34",
    "label": "J2AZ34"
  },
  {
    "value": "CGAS5",
    "label": "CGAS5"
  },
  {
    "value": "TECX11",
    "label": "TECX11"
  },
  {
    "value": "SEER3F",
    "label": "SEER3F"
  },
  {
    "value": "RFOF11",
    "label": "RFOF11"
  },
  {
    "value": "XPCM11",
    "label": "XPCM11"
  },
  {
    "value": "BOVS11",
    "label": "BOVS11"
  },
  {
    "value": "PINE4F",
    "label": "PINE4F"
  },
  {
    "value": "SEQL3F",
    "label": "SEQL3F"
  },
  {
    "value": "BSHV39",
    "label": "BSHV39"
  },
  {
    "value": "ZAMP3F",
    "label": "ZAMP3F"
  },
  {
    "value": "H1SB34",
    "label": "H1SB34"
  },
  {
    "value": "NEXP3",
    "label": "NEXP3"
  },
  {
    "value": "BBRC11",
    "label": "BBRC11"
  },
  {
    "value": "AERI3F",
    "label": "AERI3F"
  },
  {
    "value": "L1MN34",
    "label": "L1MN34"
  },
  {
    "value": "BDVY39",
    "label": "BDVY39"
  },
  {
    "value": "PORT3F",
    "label": "PORT3F"
  },
  {
    "value": "BMEB4F",
    "label": "BMEB4F"
  },
  {
    "value": "RBIR11",
    "label": "RBIR11"
  },
  {
    "value": "UCAS3F",
    "label": "UCAS3F"
  },
  {
    "value": "DVFF11",
    "label": "DVFF11"
  },
  {
    "value": "FIIP11",
    "label": "FIIP11"
  },
  {
    "value": "BITI11",
    "label": "BITI11"
  },
  {
    "value": "ABCP11",
    "label": "ABCP11"
  },
  {
    "value": "BSIL39",
    "label": "BSIL39"
  },
  {
    "value": "CMDB11",
    "label": "CMDB11"
  },
  {
    "value": "WLMM4",
    "label": "WLMM4"
  },
  {
    "value": "RNEW11",
    "label": "RNEW11"
  },
  {
    "value": "A1ZN34",
    "label": "A1ZN34"
  },
  {
    "value": "NUTR3",
    "label": "NUTR3"
  },
  {
    "value": "DOLB11",
    "label": "DOLB11"
  },
  {
    "value": "ENGI3F",
    "label": "ENGI3F"
  },
  {
    "value": "F1TN34",
    "label": "F1TN34"
  },
  {
    "value": "PRNR3F",
    "label": "PRNR3F"
  },
  {
    "value": "BMOB3F",
    "label": "BMOB3F"
  },
  {
    "value": "PMAM3F",
    "label": "PMAM3F"
  },
  {
    "value": "PKIN11",
    "label": "PKIN11"
  },
  {
    "value": "APXM11",
    "label": "APXM11"
  },
  {
    "value": "GSFI11",
    "label": "GSFI11"
  },
  {
    "value": "CAMB3F",
    "label": "CAMB3F"
  },
  {
    "value": "LBRD34",
    "label": "LBRD34"
  },
  {
    "value": "U1AI34",
    "label": "U1AI34"
  },
  {
    "value": "PINE3",
    "label": "PINE3"
  },
  {
    "value": "RPMG3",
    "label": "RPMG3"
  },
  {
    "value": "A1PP34",
    "label": "A1PP34"
  },
  {
    "value": "HIGH11",
    "label": "HIGH11"
  },
  {
    "value": "G1DS34",
    "label": "G1DS34"
  },
  {
    "value": "BIXU39",
    "label": "BIXU39"
  },
  {
    "value": "RICO11",
    "label": "RICO11"
  },
  {
    "value": "CARE11",
    "label": "CARE11"
  },
  {
    "value": "RGTI34",
    "label": "RGTI34"
  },
  {
    "value": "CATP34",
    "label": "CATP34"
  },
  {
    "value": "KDOL11",
    "label": "KDOL11"
  },
  {
    "value": "ITIT11",
    "label": "ITIT11"
  },
  {
    "value": "BKXI39",
    "label": "BKXI39"
  },
  {
    "value": "OGIN11",
    "label": "OGIN11"
  },
  {
    "value": "BRFT11",
    "label": "BRFT11"
  },
  {
    "value": "PATC11",
    "label": "PATC11"
  },
  {
    "value": "ALPA3F",
    "label": "ALPA3F"
  },
  {
    "value": "DGCO34",
    "label": "DGCO34"
  },
  {
    "value": "BRST3F",
    "label": "BRST3F"
  },
  {
    "value": "CRPT11",
    "label": "CRPT11"
  },
  {
    "value": "R2NG34",
    "label": "R2NG34"
  },
  {
    "value": "EVEN3F",
    "label": "EVEN3F"
  },
  {
    "value": "CSUD3F",
    "label": "CSUD3F"
  },
  {
    "value": "BLAK34",
    "label": "BLAK34"
  },
  {
    "value": "BTHI11",
    "label": "BTHI11"
  },
  {
    "value": "ENDD11",
    "label": "ENDD11"
  },
  {
    "value": "BNFS11",
    "label": "BNFS11"
  },
  {
    "value": "CEOC11",
    "label": "CEOC11"
  },
  {
    "value": "OSXB3",
    "label": "OSXB3"
  },
  {
    "value": "UNIP5",
    "label": "UNIP5"
  },
  {
    "value": "TOKY3F",
    "label": "TOKY3F"
  },
  {
    "value": "REDE3F",
    "label": "REDE3F"
  },
  {
    "value": "RCSL3F",
    "label": "RCSL3F"
  },
  {
    "value": "U1RI34",
    "label": "U1RI34"
  },
  {
    "value": "NAVT11",
    "label": "NAVT11"
  },
  {
    "value": "E1QN34",
    "label": "E1QN34"
  },
  {
    "value": "RCSL4F",
    "label": "RCSL4F"
  },
  {
    "value": "T1AM34",
    "label": "T1AM34"
  },
  {
    "value": "DMVF3F",
    "label": "DMVF3F"
  },
  {
    "value": "WSEC11",
    "label": "WSEC11"
  },
  {
    "value": "FDES11F",
    "label": "FDES11F"
  },
  {
    "value": "SEQR11",
    "label": "SEQR11"
  },
  {
    "value": "PFRM3F",
    "label": "PFRM3F"
  },
  {
    "value": "SPTW11",
    "label": "SPTW11"
  },
  {
    "value": "ESPA3F",
    "label": "ESPA3F"
  },
  {
    "value": "BEWQ39",
    "label": "BEWQ39"
  },
  {
    "value": "BEWC39",
    "label": "BEWC39"
  },
  {
    "value": "RDNI3",
    "label": "RDNI3"
  },
  {
    "value": "PTNT4",
    "label": "PTNT4"
  },
  {
    "value": "MNPR3",
    "label": "MNPR3"
  },
  {
    "value": "BALM4",
    "label": "BALM4"
  },
  {
    "value": "FSPE11",
    "label": "FSPE11"
  },
  {
    "value": "NUIF11",
    "label": "NUIF11"
  },
  {
    "value": "BIEF39",
    "label": "BIEF39"
  },
  {
    "value": "N1BI34",
    "label": "N1BI34"
  },
  {
    "value": "E2NP34",
    "label": "E2NP34"
  },
  {
    "value": "N1OW34",
    "label": "N1OW34"
  },
  {
    "value": "LSAG11",
    "label": "LSAG11"
  },
  {
    "value": "BIZD11",
    "label": "BIZD11"
  },
  {
    "value": "G1FI34",
    "label": "G1FI34"
  },
  {
    "value": "TFCO4F",
    "label": "TFCO4F"
  },
  {
    "value": "ELAS11",
    "label": "ELAS11"
  },
  {
    "value": "SPUB11",
    "label": "SPUB11"
  },
  {
    "value": "CTSA4",
    "label": "CTSA4"
  },
  {
    "value": "FIEI3",
    "label": "FIEI3"
  },
  {
    "value": "SPVT11",
    "label": "SPVT11"
  },
  {
    "value": "DEXP3F",
    "label": "DEXP3F"
  },
  {
    "value": "A1LL34",
    "label": "A1LL34"
  },
  {
    "value": "APTO11",
    "label": "APTO11"
  },
  {
    "value": "COPH34",
    "label": "COPH34"
  },
  {
    "value": "NGRD3F",
    "label": "NGRD3F"
  },
  {
    "value": "SRNA3F",
    "label": "SRNA3F"
  },
  {
    "value": "BEES4F",
    "label": "BEES4F"
  },
  {
    "value": "ONCO3F",
    "label": "ONCO3F"
  },
  {
    "value": "DAMA11",
    "label": "DAMA11"
  },
  {
    "value": "BKCH39",
    "label": "BKCH39"
  },
  {
    "value": "ISAE3F",
    "label": "ISAE3F"
  },
  {
    "value": "B1PP34",
    "label": "B1PP34"
  },
  {
    "value": "TMOS34",
    "label": "TMOS34"
  },
  {
    "value": "OPCT3F",
    "label": "OPCT3F"
  },
  {
    "value": "ENGI4F",
    "label": "ENGI4F"
  },
  {
    "value": "GPRK34",
    "label": "GPRK34"
  },
  {
    "value": "AMGN34",
    "label": "AMGN34"
  },
  {
    "value": "RYTT34",
    "label": "RYTT34"
  },
  {
    "value": "SVAL11",
    "label": "SVAL11"
  },
  {
    "value": "GOAT11",
    "label": "GOAT11"
  },
  {
    "value": "NFTS11",
    "label": "NFTS11"
  },
  {
    "value": "BHEW39",
    "label": "BHEW39"
  },
  {
    "value": "LVOL11",
    "label": "LVOL11"
  },
  {
    "value": "CTGP34",
    "label": "CTGP34"
  },
  {
    "value": "BIPC39",
    "label": "BIPC39"
  },
  {
    "value": "BPAC3F",
    "label": "BPAC3F"
  },
  {
    "value": "TPIS3F",
    "label": "TPIS3F"
  },
  {
    "value": "ZAVC11",
    "label": "ZAVC11"
  },
  {
    "value": "EUCA4F",
    "label": "EUCA4F"
  },
  {
    "value": "A1ES34",
    "label": "A1ES34"
  },
  {
    "value": "S2FM34",
    "label": "S2FM34"
  },
  {
    "value": "P2AT34",
    "label": "P2AT34"
  },
  {
    "value": "FIND11",
    "label": "FIND11"
  },
  {
    "value": "TMCO34",
    "label": "TMCO34"
  },
  {
    "value": "RNEW4F",
    "label": "RNEW4F"
  },
  {
    "value": "CEBR5",
    "label": "CEBR5"
  },
  {
    "value": "GSGI34",
    "label": "GSGI34"
  },
  {
    "value": "SCHW34",
    "label": "SCHW34"
  },
  {
    "value": "BRSR3F",
    "label": "BRSR3F"
  },
  {
    "value": "PPEI11",
    "label": "PPEI11"
  },
  {
    "value": "GLDX11",
    "label": "GLDX11"
  },
  {
    "value": "MEAL3F",
    "label": "MEAL3F"
  },
  {
    "value": "PDTC3F",
    "label": "PDTC3F"
  },
  {
    "value": "EPAR3F",
    "label": "EPAR3F"
  },
  {
    "value": "EALT4F",
    "label": "EALT4F"
  },
  {
    "value": "DIVS11",
    "label": "DIVS11"
  },
  {
    "value": "COCE11F",
    "label": "COCE11F"
  },
  {
    "value": "BHYG39",
    "label": "BHYG39"
  },
  {
    "value": "RPRI11",
    "label": "RPRI11"
  },
  {
    "value": "BPAC5F",
    "label": "BPAC5F"
  },
  {
    "value": "C1MG34",
    "label": "C1MG34"
  },
  {
    "value": "SMAB11",
    "label": "SMAB11"
  },
  {
    "value": "C2RS34",
    "label": "C2RS34"
  },
  {
    "value": "INLG11",
    "label": "INLG11"
  },
  {
    "value": "GILD34",
    "label": "GILD34"
  },
  {
    "value": "M2PR34",
    "label": "M2PR34"
  },
  {
    "value": "BTAG11",
    "label": "BTAG11"
  },
  {
    "value": "N1WG34",
    "label": "N1WG34"
  },
  {
    "value": "SNSY3",
    "label": "SNSY3"
  },
  {
    "value": "ALUP3F",
    "label": "ALUP3F"
  },
  {
    "value": "A1LB34",
    "label": "A1LB34"
  },
  {
    "value": "D1EL34",
    "label": "D1EL34"
  },
  {
    "value": "DEEC34",
    "label": "DEEC34"
  },
  {
    "value": "VSHO11",
    "label": "VSHO11"
  },
  {
    "value": "MAXR11",
    "label": "MAXR11"
  },
  {
    "value": "BSLT11",
    "label": "BSLT11"
  },
  {
    "value": "BGRT39",
    "label": "BGRT39"
  },
  {
    "value": "F1MC34",
    "label": "F1MC34"
  },
  {
    "value": "TECN3F",
    "label": "TECN3F"
  },
  {
    "value": "JFLL11",
    "label": "JFLL11"
  },
  {
    "value": "CPLG11",
    "label": "CPLG11"
  },
  {
    "value": "T1OW34",
    "label": "T1OW34"
  },
  {
    "value": "S1NP34",
    "label": "S1NP34"
  },
  {
    "value": "B1CS34",
    "label": "B1CS34"
  },
  {
    "value": "BAZA3F",
    "label": "BAZA3F"
  },
  {
    "value": "RINV11",
    "label": "RINV11"
  },
  {
    "value": "RBIF11",
    "label": "RBIF11"
  },
  {
    "value": "C1DN34",
    "label": "C1DN34"
  },
  {
    "value": "BSOX39",
    "label": "BSOX39"
  },
  {
    "value": "L2AZ34",
    "label": "L2AZ34"
  },
  {
    "value": "B5MB11",
    "label": "B5MB11"
  },
  {
    "value": "INTU34",
    "label": "INTU34"
  },
  {
    "value": "CEEB3",
    "label": "CEEB3"
  },
  {
    "value": "ADMF3",
    "label": "ADMF3"
  },
  {
    "value": "BMEB3",
    "label": "BMEB3"
  },
  {
    "value": "CEDO4",
    "label": "CEDO4"
  },
  {
    "value": "BCIR39",
    "label": "BCIR39"
  },
  {
    "value": "GEPA4",
    "label": "GEPA4"
  },
  {
    "value": "HBRE3F",
    "label": "HBRE3F"
  },
  {
    "value": "FCFL11",
    "label": "FCFL11"
  },
  {
    "value": "MSBR34",
    "label": "MSBR34"
  },
  {
    "value": "G2EV34",
    "label": "G2EV34"
  },
  {
    "value": "VERZ34",
    "label": "VERZ34"
  },
  {
    "value": "BAAX39",
    "label": "BAAX39"
  },
  {
    "value": "CPUR11",
    "label": "CPUR11"
  },
  {
    "value": "CSED3F",
    "label": "CSED3F"
  },
  {
    "value": "FIGS11",
    "label": "FIGS11"
  },
  {
    "value": "PHIP11",
    "label": "PHIP11"
  },
  {
    "value": "BSLI3F",
    "label": "BSLI3F"
  },
  {
    "value": "VITT3F",
    "label": "VITT3F"
  },
  {
    "value": "GMCO34",
    "label": "GMCO34"
  },
  {
    "value": "CCTY3F",
    "label": "CCTY3F"
  },
  {
    "value": "ORLY34",
    "label": "ORLY34"
  },
  {
    "value": "ITIP11",
    "label": "ITIP11"
  },
  {
    "value": "ATTB34",
    "label": "ATTB34"
  },
  {
    "value": "N1TA34",
    "label": "N1TA34"
  },
  {
    "value": "IGTI3F",
    "label": "IGTI3F"
  },
  {
    "value": "MILL11",
    "label": "MILL11"
  },
  {
    "value": "NEWL11",
    "label": "NEWL11"
  },
  {
    "value": "CHIP11",
    "label": "CHIP11"
  },
  {
    "value": "MRCK34",
    "label": "MRCK34"
  },
  {
    "value": "SHOW3F",
    "label": "SHOW3F"
  },
  {
    "value": "LOGN3F",
    "label": "LOGN3F"
  },
  {
    "value": "L1YB34",
    "label": "L1YB34"
  },
  {
    "value": "WHRL3F",
    "label": "WHRL3F"
  },
  {
    "value": "RSID3F",
    "label": "RSID3F"
  },
  {
    "value": "EXES11",
    "label": "EXES11"
  },
  {
    "value": "EMAE4",
    "label": "EMAE4"
  },
  {
    "value": "TKNO4",
    "label": "TKNO4"
  },
  {
    "value": "BGIP4",
    "label": "BGIP4"
  },
  {
    "value": "O1KT34",
    "label": "O1KT34"
  },
  {
    "value": "BSLI4F",
    "label": "BSLI4F"
  },
  {
    "value": "RCFA11",
    "label": "RCFA11"
  },
  {
    "value": "B1MR34",
    "label": "B1MR34"
  },
  {
    "value": "T1TW34",
    "label": "T1TW34"
  },
  {
    "value": "CGRA4F",
    "label": "CGRA4F"
  },
  {
    "value": "UNIP5F",
    "label": "UNIP5F"
  },
  {
    "value": "N1VS34",
    "label": "N1VS34"
  },
  {
    "value": "MGHT11",
    "label": "MGHT11"
  },
  {
    "value": "NBOV11",
    "label": "NBOV11"
  },
  {
    "value": "W1BD34",
    "label": "W1BD34"
  },
  {
    "value": "BIOM3F",
    "label": "BIOM3F"
  },
  {
    "value": "MATD3F",
    "label": "MATD3F"
  },
  {
    "value": "JOGO11",
    "label": "JOGO11"
  },
  {
    "value": "LAND3F",
    "label": "LAND3F"
  },
  {
    "value": "JPPA11",
    "label": "JPPA11"
  },
  {
    "value": "CEBR6F",
    "label": "CEBR6F"
  },
  {
    "value": "HTEK11",
    "label": "HTEK11"
  },
  {
    "value": "GLOG11",
    "label": "GLOG11"
  },
  {
    "value": "FVPQ11",
    "label": "FVPQ11"
  },
  {
    "value": "W1IX34",
    "label": "W1IX34"
  },
  {
    "value": "BICL39",
    "label": "BICL39"
  },
  {
    "value": "BDOM11",
    "label": "BDOM11"
  },
  {
    "value": "B1AM34",
    "label": "B1AM34"
  },
  {
    "value": "HPQB34",
    "label": "HPQB34"
  },
  {
    "value": "VIVR3F",
    "label": "VIVR3F"
  },
  {
    "value": "LPSB3F",
    "label": "LPSB3F"
  },
  {
    "value": "L1YG34",
    "label": "L1YG34"
  },
  {
    "value": "C1CL34",
    "label": "C1CL34"
  },
  {
    "value": "L2RN34",
    "label": "L2RN34"
  },
  {
    "value": "CEBR3F",
    "label": "CEBR3F"
  },
  {
    "value": "NSLU11",
    "label": "NSLU11"
  },
  {
    "value": "KOPA11",
    "label": "KOPA11"
  },
  {
    "value": "HGPO11",
    "label": "HGPO11"
  },
  {
    "value": "FIIB11",
    "label": "FIIB11"
  },
  {
    "value": "AAGR11",
    "label": "AAGR11"
  },
  {
    "value": "OCRE11",
    "label": "OCRE11"
  },
  {
    "value": "ENMT4",
    "label": "ENMT4"
  },
  {
    "value": "NORD3",
    "label": "NORD3"
  },
  {
    "value": "PATI3",
    "label": "PATI3"
  },
  {
    "value": "AXPB34",
    "label": "AXPB34"
  },
  {
    "value": "DEXP4",
    "label": "DEXP4"
  },
  {
    "value": "BSLI4",
    "label": "BSLI4"
  },
  {
    "value": "ISET11",
    "label": "ISET11"
  },
  {
    "value": "PACG11",
    "label": "PACG11"
  },
  {
    "value": "N1EM34",
    "label": "N1EM34"
  },
  {
    "value": "D2OC34",
    "label": "D2OC34"
  },
  {
    "value": "K1LA34",
    "label": "K1LA34"
  },
  {
    "value": "EQPA3F",
    "label": "EQPA3F"
  },
  {
    "value": "C1AB34",
    "label": "C1AB34"
  },
  {
    "value": "INEP3F",
    "label": "INEP3F"
  },
  {
    "value": "BGIP4F",
    "label": "BGIP4F"
  },
  {
    "value": "WEST3F",
    "label": "WEST3F"
  },
  {
    "value": "W1PP34",
    "label": "W1PP34"
  },
  {
    "value": "NEWU11",
    "label": "NEWU11"
  },
  {
    "value": "BNDA39",
    "label": "BNDA39"
  },
  {
    "value": "RBRD11",
    "label": "RBRD11"
  },
  {
    "value": "ABGD39",
    "label": "ABGD39"
  },
  {
    "value": "Z1OM34",
    "label": "Z1OM34"
  },
  {
    "value": "RNEW3F",
    "label": "RNEW3F"
  },
  {
    "value": "SCVB11",
    "label": "SCVB11"
  },
  {
    "value": "FLCR11",
    "label": "FLCR11"
  },
  {
    "value": "PINE3F",
    "label": "PINE3F"
  },
  {
    "value": "WFCO34",
    "label": "WFCO34"
  },
  {
    "value": "BREW11",
    "label": "BREW11"
  },
  {
    "value": "FSTU11F",
    "label": "FSTU11F"
  },
  {
    "value": "NEXT34",
    "label": "NEXT34"
  },
  {
    "value": "FLRP11",
    "label": "FLRP11"
  },
  {
    "value": "DBAG34",
    "label": "DBAG34"
  },
  {
    "value": "RCRI11",
    "label": "RCRI11"
  },
  {
    "value": "EDGA11",
    "label": "EDGA11"
  },
  {
    "value": "RMAI11",
    "label": "RMAI11"
  },
  {
    "value": "RVEE3F",
    "label": "RVEE3F"
  },
  {
    "value": "TELB3F",
    "label": "TELB3F"
  },
  {
    "value": "PTNT3F",
    "label": "PTNT3F"
  },
  {
    "value": "D2TC34",
    "label": "D2TC34"
  },
  {
    "value": "RSUL4F",
    "label": "RSUL4F"
  },
  {
    "value": "NEXP3F",
    "label": "NEXP3F"
  },
  {
    "value": "F2IC34",
    "label": "F2IC34"
  },
  {
    "value": "BOTZ39",
    "label": "BOTZ39"
  },
  {
    "value": "ELCI34",
    "label": "ELCI34"
  },
  {
    "value": "BMMT11",
    "label": "BMMT11"
  },
  {
    "value": "OFSA3F",
    "label": "OFSA3F"
  },
  {
    "value": "GOVE11",
    "label": "GOVE11"
  },
  {
    "value": "DVER11",
    "label": "DVER11"
  },
  {
    "value": "V1OD34",
    "label": "V1OD34"
  },
  {
    "value": "GEPA4F",
    "label": "GEPA4F"
  },
  {
    "value": "SBUB34",
    "label": "SBUB34"
  },
  {
    "value": "COWC34",
    "label": "COWC34"
  },
  {
    "value": "PGCO34",
    "label": "PGCO34"
  },
  {
    "value": "EALT3F",
    "label": "EALT3F"
  },
  {
    "value": "CBOP11",
    "label": "CBOP11"
  },
  {
    "value": "BMLC11",
    "label": "BMLC11"
  },
  {
    "value": "E1MN34",
    "label": "E1MN34"
  },
  {
    "value": "G1AR34",
    "label": "G1AR34"
  },
  {
    "value": "BOBR4F",
    "label": "BOBR4F"
  },
  {
    "value": "REVE11",
    "label": "REVE11"
  },
  {
    "value": "R1OK34",
    "label": "R1OK34"
  },
  {
    "value": "EKTR4",
    "label": "EKTR4"
  },
  {
    "value": "DDNB34",
    "label": "DDNB34"
  },
  {
    "value": "I1LM34",
    "label": "I1LM34"
  },
  {
    "value": "SOND5",
    "label": "SOND5"
  },
  {
    "value": "FESA3",
    "label": "FESA3"
  },
  {
    "value": "CPLE5",
    "label": "CPLE5"
  },
  {
    "value": "SOND6",
    "label": "SOND6"
  },
  {
    "value": "O2NS34",
    "label": "O2NS34"
  },
  {
    "value": "NCRI11",
    "label": "NCRI11"
  },
  {
    "value": "C1TV34",
    "label": "C1TV34"
  },
  {
    "value": "ESTR4",
    "label": "ESTR4"
  },
  {
    "value": "M1MC34",
    "label": "M1MC34"
  },
  {
    "value": "F2RS34",
    "label": "F2RS34"
  },
  {
    "value": "HAGA3",
    "label": "HAGA3"
  },
  {
    "value": "TEXA34",
    "label": "TEXA34"
  },
  {
    "value": "TRXY11",
    "label": "TRXY11"
  },
  {
    "value": "FHER3F",
    "label": "FHER3F"
  },
  {
    "value": "VVCR11",
    "label": "VVCR11"
  },
  {
    "value": "EQIX34",
    "label": "EQIX34"
  },
  {
    "value": "CTXT11",
    "label": "CTXT11"
  },
  {
    "value": "DEXP4F",
    "label": "DEXP4F"
  },
  {
    "value": "AFLT3F",
    "label": "AFLT3F"
  },
  {
    "value": "ZAVI11",
    "label": "ZAVI11"
  },
  {
    "value": "CGAS5F",
    "label": "CGAS5F"
  },
  {
    "value": "GLPF11",
    "label": "GLPF11"
  },
  {
    "value": "CEBR5F",
    "label": "CEBR5F"
  },
  {
    "value": "VTLT11",
    "label": "VTLT11"
  },
  {
    "value": "PEVC11",
    "label": "PEVC11"
  },
  {
    "value": "N1DA34",
    "label": "N1DA34"
  },
  {
    "value": "DOTZ3F",
    "label": "DOTZ3F"
  },
  {
    "value": "VRTX34",
    "label": "VRTX34"
  },
  {
    "value": "S1PO34",
    "label": "S1PO34"
  },
  {
    "value": "P1LD34",
    "label": "P1LD34"
  },
  {
    "value": "SCAR3F",
    "label": "SCAR3F"
  },
  {
    "value": "IRIM11",
    "label": "IRIM11"
  },
  {
    "value": "BTIP39",
    "label": "BTIP39"
  },
  {
    "value": "MOSC34",
    "label": "MOSC34"
  },
  {
    "value": "AGRI11",
    "label": "AGRI11"
  },
  {
    "value": "GCDL11",
    "label": "GCDL11"
  },
  {
    "value": "FSPE11F",
    "label": "FSPE11F"
  },
  {
    "value": "A2XO34",
    "label": "A2XO34"
  },
  {
    "value": "HOMS11",
    "label": "HOMS11"
  },
  {
    "value": "PPLA11",
    "label": "PPLA11"
  },
  {
    "value": "UBSG34",
    "label": "UBSG34"
  },
  {
    "value": "N2ET34",
    "label": "N2ET34"
  },
  {
    "value": "M1NS34",
    "label": "M1NS34"
  },
  {
    "value": "VTRU3F",
    "label": "VTRU3F"
  },
  {
    "value": "Z2SC34",
    "label": "Z2SC34"
  },
  {
    "value": "BDEF11",
    "label": "BDEF11"
  },
  {
    "value": "VVMR11",
    "label": "VVMR11"
  },
  {
    "value": "LVTC3F",
    "label": "LVTC3F"
  },
  {
    "value": "BEFA39",
    "label": "BEFA39"
  },
  {
    "value": "RDNI3F",
    "label": "RDNI3F"
  },
  {
    "value": "BLQD39",
    "label": "BLQD39"
  },
  {
    "value": "CRPG5F",
    "label": "CRPG5F"
  },
  {
    "value": "BITO39",
    "label": "BITO39"
  },
  {
    "value": "GRWA11",
    "label": "GRWA11"
  },
  {
    "value": "EVTC31",
    "label": "EVTC31"
  },
  {
    "value": "ATED3F",
    "label": "ATED3F"
  },
  {
    "value": "BIHI39",
    "label": "BIHI39"
  },
  {
    "value": "C2OL34",
    "label": "C2OL34"
  },
  {
    "value": "BCLO39",
    "label": "BCLO39"
  },
  {
    "value": "BXPO11",
    "label": "BXPO11"
  },
  {
    "value": "BLOK11",
    "label": "BLOK11"
  },
  {
    "value": "Y2PF34",
    "label": "Y2PF34"
  },
  {
    "value": "A1KA34",
    "label": "A1KA34"
  },
  {
    "value": "D1DG34",
    "label": "D1DG34"
  },
  {
    "value": "FIXX11",
    "label": "FIXX11"
  },
  {
    "value": "RIOT34",
    "label": "RIOT34"
  },
  {
    "value": "M2PW34",
    "label": "M2PW34"
  },
  {
    "value": "FAED11",
    "label": "FAED11"
  },
  {
    "value": "JFEN3F",
    "label": "JFEN3F"
  },
  {
    "value": "CGRA3F",
    "label": "CGRA3F"
  },
  {
    "value": "E2XA34",
    "label": "E2XA34"
  },
  {
    "value": "PACC11",
    "label": "PACC11"
  },
  {
    "value": "BBSD11",
    "label": "BBSD11"
  },
  {
    "value": "ARNC34",
    "label": "ARNC34"
  },
  {
    "value": "ECOO11",
    "label": "ECOO11"
  },
  {
    "value": "RPMG3F",
    "label": "RPMG3F"
  },
  {
    "value": "RNEW11F",
    "label": "RNEW11F"
  },
  {
    "value": "TJKB11",
    "label": "TJKB11"
  },
  {
    "value": "P2AX34",
    "label": "P2AX34"
  },
  {
    "value": "SOND5F",
    "label": "SOND5F"
  },
  {
    "value": "BUSR39",
    "label": "BUSR39"
  },
  {
    "value": "CXRI11",
    "label": "CXRI11"
  },
  {
    "value": "CPLE5F",
    "label": "CPLE5F"
  },
  {
    "value": "COCE5F",
    "label": "COCE5F"
  },
  {
    "value": "DBOA11",
    "label": "DBOA11"
  },
  {
    "value": "INRD11",
    "label": "INRD11"
  },
  {
    "value": "ENMT3",
    "label": "ENMT3"
  },
  {
    "value": "GEPA3",
    "label": "GEPA3"
  },
  {
    "value": "CEDO3",
    "label": "CEDO3"
  },
  {
    "value": "EQPA3",
    "label": "EQPA3"
  },
  {
    "value": "A1PH34",
    "label": "A1PH34"
  },
  {
    "value": "W1RB34",
    "label": "W1RB34"
  },
  {
    "value": "RDLI11",
    "label": "RDLI11"
  },
  {
    "value": "W1DC34",
    "label": "W1DC34"
  },
  {
    "value": "BMIN3",
    "label": "BMIN3"
  },
  {
    "value": "CRPG3",
    "label": "CRPG3"
  },
  {
    "value": "MOAR3",
    "label": "MOAR3"
  },
  {
    "value": "BLBT39",
    "label": "BLBT39"
  },
  {
    "value": "A2MB34",
    "label": "A2MB34"
  },
  {
    "value": "GFDL11",
    "label": "GFDL11"
  },
  {
    "value": "QQQQ11",
    "label": "QQQQ11"
  },
  {
    "value": "R1CL34",
    "label": "R1CL34"
  },
  {
    "value": "LUPA3F",
    "label": "LUPA3F"
  },
  {
    "value": "CEEB3F",
    "label": "CEEB3F"
  },
  {
    "value": "JPPC11",
    "label": "JPPC11"
  },
  {
    "value": "WUNI34",
    "label": "WUNI34"
  },
  {
    "value": "FLMA11",
    "label": "FLMA11"
  },
  {
    "value": "PATA11",
    "label": "PATA11"
  },
  {
    "value": "P1DD34",
    "label": "P1DD34"
  },
  {
    "value": "S1HW34",
    "label": "S1HW34"
  },
  {
    "value": "BBFI11",
    "label": "BBFI11"
  },
  {
    "value": "F2VR34",
    "label": "F2VR34"
  },
  {
    "value": "EXGR34",
    "label": "EXGR34"
  },
  {
    "value": "FICT3F",
    "label": "FICT3F"
  },
  {
    "value": "R1IN34",
    "label": "R1IN34"
  },
  {
    "value": "PLRI11",
    "label": "PLRI11"
  },
  {
    "value": "VVCO11",
    "label": "VVCO11"
  },
  {
    "value": "S1YF34",
    "label": "S1YF34"
  },
  {
    "value": "SIMN34",
    "label": "SIMN34"
  },
  {
    "value": "GEOO34",
    "label": "GEOO34"
  },
  {
    "value": "B1IL34",
    "label": "B1IL34"
  },
  {
    "value": "X1YZ34",
    "label": "X1YZ34"
  },
  {
    "value": "VSTE3F",
    "label": "VSTE3F"
  },
  {
    "value": "LLFT11",
    "label": "LLFT11"
  },
  {
    "value": "N1IS34",
    "label": "N1IS34"
  },
  {
    "value": "SLBG34",
    "label": "SLBG34"
  },
  {
    "value": "N1CL34",
    "label": "N1CL34"
  },
  {
    "value": "BGOV39",
    "label": "BGOV39"
  },
  {
    "value": "ESGB11",
    "label": "ESGB11"
  },
  {
    "value": "HOSI11",
    "label": "HOSI11"
  },
  {
    "value": "ULEV34",
    "label": "ULEV34"
  },
  {
    "value": "SHPH11",
    "label": "SHPH11"
  },
  {
    "value": "FESA3F",
    "label": "FESA3F"
  },
  {
    "value": "HOME34",
    "label": "HOME34"
  },
  {
    "value": "U1AL34",
    "label": "U1AL34"
  },
  {
    "value": "HGAG11",
    "label": "HGAG11"
  },
  {
    "value": "CRPG3F",
    "label": "CRPG3F"
  },
  {
    "value": "PTNT4F",
    "label": "PTNT4F"
  },
  {
    "value": "INEP4F",
    "label": "INEP4F"
  },
  {
    "value": "BEZU39",
    "label": "BEZU39"
  },
  {
    "value": "BMIN3F",
    "label": "BMIN3F"
  },
  {
    "value": "BMEB3F",
    "label": "BMEB3F"
  },
  {
    "value": "USBC34",
    "label": "USBC34"
  },
  {
    "value": "BIJS39",
    "label": "BIJS39"
  },
  {
    "value": "BRSR5F",
    "label": "BRSR5F"
  },
  {
    "value": "BIEM39",
    "label": "BIEM39"
  },
  {
    "value": "C2AC34",
    "label": "C2AC34"
  },
  {
    "value": "CEED3F",
    "label": "CEED3F"
  },
  {
    "value": "M1KT34",
    "label": "M1KT34"
  },
  {
    "value": "N1WL34",
    "label": "N1WL34"
  },
  {
    "value": "C1NS34",
    "label": "C1NS34"
  },
  {
    "value": "CVSH34",
    "label": "CVSH34"
  },
  {
    "value": "EBIT11",
    "label": "EBIT11"
  },
  {
    "value": "KHCB34",
    "label": "KHCB34"
  },
  {
    "value": "HAGA4F",
    "label": "HAGA4F"
  },
  {
    "value": "CHCM34",
    "label": "CHCM34"
  },
  {
    "value": "ESTR4F",
    "label": "ESTR4F"
  },
  {
    "value": "ADMF3F",
    "label": "ADMF3F"
  },
  {
    "value": "ENMT3F",
    "label": "ENMT3F"
  },
  {
    "value": "S2RE34",
    "label": "S2RE34"
  },
  {
    "value": "B3BR11",
    "label": "B3BR11"
  },
  {
    "value": "A1LG34",
    "label": "A1LG34"
  },
  {
    "value": "CXCE11",
    "label": "CXCE11"
  },
  {
    "value": "D2KN34",
    "label": "D2KN34"
  },
  {
    "value": "S1TX34",
    "label": "S1TX34"
  },
  {
    "value": "P1RG34",
    "label": "P1RG34"
  },
  {
    "value": "L1HX34",
    "label": "L1HX34"
  },
  {
    "value": "BSHY39",
    "label": "BSHY39"
  },
  {
    "value": "DLTR34",
    "label": "DLTR34"
  },
  {
    "value": "C1NC34",
    "label": "C1NC34"
  },
  {
    "value": "HGIC11",
    "label": "HGIC11"
  },
  {
    "value": "RBOP11",
    "label": "RBOP11"
  },
  {
    "value": "BIYF39",
    "label": "BIYF39"
  },
  {
    "value": "BEWZ39",
    "label": "BEWZ39"
  },
  {
    "value": "CLSC4F",
    "label": "CLSC4F"
  },
  {
    "value": "RECM11",
    "label": "RECM11"
  },
  {
    "value": "J1EF34",
    "label": "J1EF34"
  },
  {
    "value": "MTSA4F",
    "label": "MTSA4F"
  },
  {
    "value": "BTYU11",
    "label": "BTYU11"
  },
  {
    "value": "MOAR3F",
    "label": "MOAR3F"
  },
  {
    "value": "L1UL34",
    "label": "L1UL34"
  },
  {
    "value": "CMCS34",
    "label": "CMCS34"
  },
  {
    "value": "BRIM11",
    "label": "BRIM11"
  },
  {
    "value": "A1PA34",
    "label": "A1PA34"
  },
  {
    "value": "M1DB34",
    "label": "M1DB34"
  },
  {
    "value": "W2YF34",
    "label": "W2YF34"
  },
  {
    "value": "BAIQ39",
    "label": "BAIQ39"
  },
  {
    "value": "S2NA34",
    "label": "S2NA34"
  },
  {
    "value": "I1QY34",
    "label": "I1QY34"
  },
  {
    "value": "C1BO34",
    "label": "C1BO34"
  },
  {
    "value": "B1NT34",
    "label": "B1NT34"
  },
  {
    "value": "OSXB3F",
    "label": "OSXB3F"
  },
  {
    "value": "STYI11",
    "label": "STYI11"
  },
  {
    "value": "CTSA4F",
    "label": "CTSA4F"
  },
  {
    "value": "NORD3F",
    "label": "NORD3F"
  },
  {
    "value": "A1RE34",
    "label": "A1RE34"
  },
  {
    "value": "MAPT4F",
    "label": "MAPT4F"
  },
  {
    "value": "BALM4F",
    "label": "BALM4F"
  },
  {
    "value": "Q1RV34",
    "label": "Q1RV34"
  },
  {
    "value": "BIYE39",
    "label": "BIYE39"
  },
  {
    "value": "N1RG34",
    "label": "N1RG34"
  },
  {
    "value": "S2UI34",
    "label": "S2UI34"
  },
  {
    "value": "DAMT11",
    "label": "DAMT11"
  },
  {
    "value": "K1RC34",
    "label": "K1RC34"
  },
  {
    "value": "M2AS34",
    "label": "M2AS34"
  },
  {
    "value": "LUXM4F",
    "label": "LUXM4F"
  },
  {
    "value": "S2TA34",
    "label": "S2TA34"
  },
  {
    "value": "EGDB11",
    "label": "EGDB11"
  },
  {
    "value": "BCOM39",
    "label": "BCOM39"
  },
  {
    "value": "VXXV11",
    "label": "VXXV11"
  },
  {
    "value": "U2PW34",
    "label": "U2PW34"
  },
  {
    "value": "BQYL39",
    "label": "BQYL39"
  },
  {
    "value": "CNIC34",
    "label": "CNIC34"
  },
  {
    "value": "NUTR3F",
    "label": "NUTR3F"
  },
  {
    "value": "BNBR3F",
    "label": "BNBR3F"
  },
  {
    "value": "BIEI39",
    "label": "BIEI39"
  },
  {
    "value": "HOND34",
    "label": "HOND34"
  },
  {
    "value": "BGIP3F",
    "label": "BGIP3F"
  },
  {
    "value": "EGYR11",
    "label": "EGYR11"
  },
  {
    "value": "W1EC34",
    "label": "W1EC34"
  },
  {
    "value": "EUCA3F",
    "label": "EUCA3F"
  },
  {
    "value": "BMKS3",
    "label": "BMKS3"
  },
  {
    "value": "HAGA3F",
    "label": "HAGA3F"
  },
  {
    "value": "SNSY3F",
    "label": "SNSY3F"
  },
  {
    "value": "SAPP34",
    "label": "SAPP34"
  },
  {
    "value": "I1EX34",
    "label": "I1EX34"
  },
  {
    "value": "BMIN4F",
    "label": "BMIN4F"
  },
  {
    "value": "COLG34",
    "label": "COLG34"
  },
  {
    "value": "RBRS11",
    "label": "RBRS11"
  },
  {
    "value": "PRSV11",
    "label": "PRSV11"
  },
  {
    "value": "BKSA39",
    "label": "BKSA39"
  },
  {
    "value": "BEFV39",
    "label": "BEFV39"
  },
  {
    "value": "PATI3F",
    "label": "PATI3F"
  },
  {
    "value": "HCRI11",
    "label": "HCRI11"
  },
  {
    "value": "BEWT39",
    "label": "BEWT39"
  },
  {
    "value": "CRFF11",
    "label": "CRFF11"
  },
  {
    "value": "G1LW34",
    "label": "G1LW34"
  },
  {
    "value": "CBEE3F",
    "label": "CBEE3F"
  },
  {
    "value": "LMTB34",
    "label": "LMTB34"
  },
  {
    "value": "BSDV39",
    "label": "BSDV39"
  },
  {
    "value": "B1SX34",
    "label": "B1SX34"
  },
  {
    "value": "LOWC34",
    "label": "LOWC34"
  },
  {
    "value": "BBUG39",
    "label": "BBUG39"
  },
  {
    "value": "D1RI34",
    "label": "D1RI34"
  },
  {
    "value": "H1AS34",
    "label": "H1AS34"
  },
  {
    "value": "HCHG11",
    "label": "HCHG11"
  },
  {
    "value": "BEWW39",
    "label": "BEWW39"
  },
  {
    "value": "BOEI34",
    "label": "BOEI34"
  },
  {
    "value": "IBBP11",
    "label": "IBBP11"
  },
  {
    "value": "A1LK34",
    "label": "A1LK34"
  },
  {
    "value": "ZAGH11",
    "label": "ZAGH11"
  },
  {
    "value": "F1IS34",
    "label": "F1IS34"
  },
  {
    "value": "FRIO3F",
    "label": "FRIO3F"
  },
  {
    "value": "PHMO34",
    "label": "PHMO34"
  },
  {
    "value": "EMAE4F",
    "label": "EMAE4F"
  },
  {
    "value": "O2LE34",
    "label": "O2LE34"
  },
  {
    "value": "W1MB34",
    "label": "W1MB34"
  },
  {
    "value": "HERT11",
    "label": "HERT11"
  },
  {
    "value": "V1NO34",
    "label": "V1NO34"
  },
  {
    "value": "HSRE11",
    "label": "HSRE11"
  },
  {
    "value": "P1EG34",
    "label": "P1EG34"
  },
  {
    "value": "GDBR34",
    "label": "GDBR34"
  },
  {
    "value": "WTSP11",
    "label": "WTSP11"
  },
  {
    "value": "FDMO34",
    "label": "FDMO34"
  },
  {
    "value": "RECD11",
    "label": "RECD11"
  },
  {
    "value": "B1KR34",
    "label": "B1KR34"
  },
  {
    "value": "WPLZ11",
    "label": "WPLZ11"
  },
  {
    "value": "CEDO4F",
    "label": "CEDO4F"
  },
  {
    "value": "P2TC34",
    "label": "P2TC34"
  },
  {
    "value": "PQAG11",
    "label": "PQAG11"
  },
  {
    "value": "EKTR4F",
    "label": "EKTR4F"
  },
  {
    "value": "F2IV34",
    "label": "F2IV34"
  },
  {
    "value": "H1UM34",
    "label": "H1UM34"
  },
  {
    "value": "C1AG34",
    "label": "C1AG34"
  },
  {
    "value": "H1EI34",
    "label": "H1EI34"
  },
  {
    "value": "TIRB11",
    "label": "TIRB11"
  },
  {
    "value": "DEOP34",
    "label": "DEOP34"
  },
  {
    "value": "CGAS3F",
    "label": "CGAS3F"
  },
  {
    "value": "EKTR3F",
    "label": "EKTR3F"
  },
  {
    "value": "I1DX34",
    "label": "I1DX34"
  },
  {
    "value": "USIM6F",
    "label": "USIM6F"
  },
  {
    "value": "N2LY34",
    "label": "N2LY34"
  },
  {
    "value": "A1TH34",
    "label": "A1TH34"
  },
  {
    "value": "MACY34",
    "label": "MACY34"
  },
  {
    "value": "E2XE34",
    "label": "E2XE34"
  },
  {
    "value": "HOOT4F",
    "label": "HOOT4F"
  },
  {
    "value": "BONY34",
    "label": "BONY34"
  },
  {
    "value": "CRPG6F",
    "label": "CRPG6F"
  },
  {
    "value": "G1SK34",
    "label": "G1SK34"
  },
  {
    "value": "B2AP34",
    "label": "B2AP34"
  },
  {
    "value": "LTNB11",
    "label": "LTNB11"
  },
  {
    "value": "BILB34",
    "label": "BILB34"
  },
  {
    "value": "NOKI34",
    "label": "NOKI34"
  },
  {
    "value": "BEWL39",
    "label": "BEWL39"
  },
  {
    "value": "EURO11",
    "label": "EURO11"
  },
  {
    "value": "SPGI34",
    "label": "SPGI34"
  },
  {
    "value": "E1TN34",
    "label": "E1TN34"
  },
  {
    "value": "B1AX34",
    "label": "B1AX34"
  },
  {
    "value": "CHME34",
    "label": "CHME34"
  },
  {
    "value": "XBOV11",
    "label": "XBOV11"
  },
  {
    "value": "DPRO11",
    "label": "DPRO11"
  },
  {
    "value": "C2RN34",
    "label": "C2RN34"
  },
  {
    "value": "DOHL4F",
    "label": "DOHL4F"
  },
  {
    "value": "BBER39",
    "label": "BBER39"
  },
  {
    "value": "BQQW39",
    "label": "BQQW39"
  },
  {
    "value": "BEGU39",
    "label": "BEGU39"
  },
  {
    "value": "Q1UA34",
    "label": "Q1UA34"
  },
  {
    "value": "BAGG39",
    "label": "BAGG39"
  },
  {
    "value": "A1IV34",
    "label": "A1IV34"
  },
  {
    "value": "EXIF11",
    "label": "EXIF11"
  },
  {
    "value": "BEEM39",
    "label": "BEEM39"
  },
  {
    "value": "BSTI39",
    "label": "BSTI39"
  },
  {
    "value": "BEWU39",
    "label": "BEWU39"
  },
  {
    "value": "C1RH34",
    "label": "C1RH34"
  },
  {
    "value": "BRIP11",
    "label": "BRIP11"
  },
  {
    "value": "BRAZ11",
    "label": "BRAZ11"
  },
  {
    "value": "YDRO11",
    "label": "YDRO11"
  },
  {
    "value": "BIXJ39",
    "label": "BIXJ39"
  },
  {
    "value": "U1LT34",
    "label": "U1LT34"
  },
  {
    "value": "G2ME34",
    "label": "G2ME34"
  },
  {
    "value": "BCHQ39",
    "label": "BCHQ39"
  },
  {
    "value": "S1RE34",
    "label": "S1RE34"
  },
  {
    "value": "BLOG11",
    "label": "BLOG11"
  },
  {
    "value": "EMET11",
    "label": "EMET11"
  },
  {
    "value": "L2PL34",
    "label": "L2PL34"
  },
  {
    "value": "MNPR3F",
    "label": "MNPR3F"
  },
  {
    "value": "BLPA39",
    "label": "BLPA39"
  },
  {
    "value": "CRIN34",
    "label": "CRIN34"
  },
  {
    "value": "TLNC34",
    "label": "TLNC34"
  },
  {
    "value": "PQDP11",
    "label": "PQDP11"
  },
  {
    "value": "A1UT34",
    "label": "A1UT34"
  },
  {
    "value": "ZIFI11",
    "label": "ZIFI11"
  },
  {
    "value": "RPAD6F",
    "label": "RPAD6F"
  },
  {
    "value": "I1VZ34",
    "label": "I1VZ34"
  },
  {
    "value": "BMYB34",
    "label": "BMYB34"
  },
  {
    "value": "XRXB34",
    "label": "XRXB34"
  },
  {
    "value": "CLSC3F",
    "label": "CLSC3F"
  },
  {
    "value": "GEPA3F",
    "label": "GEPA3F"
  },
  {
    "value": "B2RK34",
    "label": "B2RK34"
  },
  {
    "value": "N1UE34",
    "label": "N1UE34"
  },
  {
    "value": "BDVD39",
    "label": "BDVD39"
  },
  {
    "value": "P1GR34",
    "label": "P1GR34"
  },
  {
    "value": "E2EF34",
    "label": "E2EF34"
  },
  {
    "value": "BHER39",
    "label": "BHER39"
  },
  {
    "value": "D2NL34",
    "label": "D2NL34"
  },
  {
    "value": "HUCG11",
    "label": "HUCG11"
  },
  {
    "value": "FMOF11",
    "label": "FMOF11"
  },
  {
    "value": "SJAU11",
    "label": "SJAU11"
  },
  {
    "value": "M1SI34",
    "label": "M1SI34"
  },
  {
    "value": "Z1TS34",
    "label": "Z1TS34"
  },
  {
    "value": "AZOI34",
    "label": "AZOI34"
  },
  {
    "value": "A1VB34",
    "label": "A1VB34"
  },
  {
    "value": "D2PZ34",
    "label": "D2PZ34"
  },
  {
    "value": "ARMT34",
    "label": "ARMT34"
  },
  {
    "value": "P1SA34",
    "label": "P1SA34"
  },
  {
    "value": "BILF39",
    "label": "BILF39"
  },
  {
    "value": "BIGO39",
    "label": "BIGO39"
  },
  {
    "value": "FSLR34",
    "label": "FSLR34"
  },
  {
    "value": "A1SN34",
    "label": "A1SN34"
  },
  {
    "value": "N2TN34",
    "label": "N2TN34"
  },
  {
    "value": "HBTS5F",
    "label": "HBTS5F"
  },
  {
    "value": "FDXB34",
    "label": "FDXB34"
  },
  {
    "value": "PRIF11",
    "label": "PRIF11"
  },
  {
    "value": "WLMM4F",
    "label": "WLMM4F"
  },
  {
    "value": "NOCG34",
    "label": "NOCG34"
  },
  {
    "value": "E1DU34",
    "label": "E1DU34"
  },
  {
    "value": "K1EY34",
    "label": "K1EY34"
  },
  {
    "value": "L1EN34",
    "label": "L1EN34"
  },
  {
    "value": "PHGN34",
    "label": "PHGN34"
  },
  {
    "value": "FPAB11",
    "label": "FPAB11"
  },
  {
    "value": "ENMT4F",
    "label": "ENMT4F"
  },
  {
    "value": "RPAD3F",
    "label": "RPAD3F"
  },
  {
    "value": "PATI4F",
    "label": "PATI4F"
  },
  {
    "value": "MOOO34",
    "label": "MOOO34"
  },
  {
    "value": "G1LP34",
    "label": "G1LP34"
  },
  {
    "value": "TKNO4F",
    "label": "TKNO4F"
  },
  {
    "value": "CTSA3F",
    "label": "CTSA3F"
  },
  {
    "value": "A2FY34",
    "label": "A2FY34"
  },
  {
    "value": "TRXB11",
    "label": "TRXB11"
  },
  {
    "value": "TELB4F",
    "label": "TELB4F"
  },
  {
    "value": "H1CA34",
    "label": "H1CA34"
  },
  {
    "value": "T1LK34",
    "label": "T1LK34"
  },
  {
    "value": "S2TW34",
    "label": "S2TW34"
  },
  {
    "value": "BKWB39",
    "label": "BKWB39"
  },
  {
    "value": "CXTL11",
    "label": "CXTL11"
  },
  {
    "value": "L1DO34",
    "label": "L1DO34"
  },
  {
    "value": "T1EC34",
    "label": "T1EC34"
  },
  {
    "value": "EBAY34",
    "label": "EBAY34"
  },
  {
    "value": "P1EA34",
    "label": "P1EA34"
  },
  {
    "value": "HAAA11",
    "label": "HAAA11"
  },
  {
    "value": "E1WL34",
    "label": "E1WL34"
  },
  {
    "value": "B1RF34",
    "label": "B1RF34"
  },
  {
    "value": "T1AL34",
    "label": "T1AL34"
  },
  {
    "value": "C2OU34",
    "label": "C2OU34"
  },
  {
    "value": "C1PR34",
    "label": "C1PR34"
  },
  {
    "value": "DTCR39",
    "label": "DTCR39"
  },
  {
    "value": "R2AR34",
    "label": "R2AR34"
  },
  {
    "value": "BIGS39",
    "label": "BIGS39"
  },
  {
    "value": "BFXI39",
    "label": "BFXI39"
  },
  {
    "value": "AVLL3F",
    "label": "AVLL3F"
  },
  {
    "value": "EDFO11",
    "label": "EDFO11"
  },
  {
    "value": "NVHO11",
    "label": "NVHO11"
  },
  {
    "value": "M1TT34",
    "label": "M1TT34"
  },
  {
    "value": "TRNT11",
    "label": "TRNT11"
  },
  {
    "value": "R1YA34",
    "label": "R1YA34"
  },
  {
    "value": "BIXG39",
    "label": "BIXG39"
  },
  {
    "value": "MCLO11",
    "label": "MCLO11"
  },
  {
    "value": "HUSC11",
    "label": "HUSC11"
  },
  {
    "value": "R1KU34",
    "label": "R1KU34"
  },
  {
    "value": "CTAX3F",
    "label": "CTAX3F"
  },
  {
    "value": "K1BF34",
    "label": "K1BF34"
  },
  {
    "value": "A2RE34",
    "label": "A2RE34"
  },
  {
    "value": "SOND6F",
    "label": "SOND6F"
  },
  {
    "value": "WATC34",
    "label": "WATC34"
  },
  {
    "value": "STMN34",
    "label": "STMN34"
  },
  {
    "value": "K1SS34",
    "label": "K1SS34"
  },
  {
    "value": "E1IX34",
    "label": "E1IX34"
  },
  {
    "value": "RBRI11",
    "label": "RBRI11"
  },
  {
    "value": "INGG34",
    "label": "INGG34"
  },
  {
    "value": "LPLP11",
    "label": "LPLP11"
  },
  {
    "value": "W1EL34",
    "label": "W1EL34"
  },
  {
    "value": "BFNX39",
    "label": "BFNX39"
  },
  {
    "value": "REAG3F",
    "label": "REAG3F"
  },
  {
    "value": "DOHL3F",
    "label": "DOHL3F"
  },
  {
    "value": "BALM3F",
    "label": "BALM3F"
  },
  {
    "value": "VVRI11",
    "label": "VVRI11"
  },
  {
    "value": "VRSN34",
    "label": "VRSN34"
  },
  {
    "value": "D1EX34",
    "label": "D1EX34"
  },
  {
    "value": "MDTC34",
    "label": "MDTC34"
  },
  {
    "value": "E2PA34",
    "label": "E2PA34"
  },
  {
    "value": "P1SX34",
    "label": "P1SX34"
  },
  {
    "value": "W1HR34",
    "label": "W1HR34"
  },
  {
    "value": "H2UB34",
    "label": "H2UB34"
  },
  {
    "value": "L1CA34",
    "label": "L1CA34"
  },
  {
    "value": "C2HP34",
    "label": "C2HP34"
  },
  {
    "value": "EAIN34",
    "label": "EAIN34"
  },
  {
    "value": "HPDP11",
    "label": "HPDP11"
  },
  {
    "value": "ACNB34",
    "label": "ACNB34"
  },
  {
    "value": "A1MP34",
    "label": "A1MP34"
  },
  {
    "value": "HETA4F",
    "label": "HETA4F"
  },
  {
    "value": "D2OX34",
    "label": "D2OX34"
  },
  {
    "value": "RPAD5F",
    "label": "RPAD5F"
  },
  {
    "value": "C1BR34",
    "label": "C1BR34"
  },
  {
    "value": "W1MC34",
    "label": "W1MC34"
  },
  {
    "value": "W1AB34",
    "label": "W1AB34"
  },
  {
    "value": "FASL34",
    "label": "FASL34"
  },
  {
    "value": "H1OG34",
    "label": "H1OG34"
  },
  {
    "value": "TXRX4F",
    "label": "TXRX4F"
  },
  {
    "value": "C1IC34",
    "label": "C1IC34"
  },
  {
    "value": "BIEV39",
    "label": "BIEV39"
  },
  {
    "value": "NMRH34",
    "label": "NMRH34"
  },
  {
    "value": "FAMB11",
    "label": "FAMB11"
  },
  {
    "value": "BRKM6F",
    "label": "BRKM6F"
  },
  {
    "value": "ELET5F",
    "label": "ELET5F"
  },
  {
    "value": "FMSC34",
    "label": "FMSC34"
  },
  {
    "value": "A2ZT34",
    "label": "A2ZT34"
  },
  {
    "value": "VOTS11",
    "label": "VOTS11"
  },
  {
    "value": "STZB34",
    "label": "STZB34"
  },
  {
    "value": "NETE34",
    "label": "NETE34"
  },
  {
    "value": "BDLL3F",
    "label": "BDLL3F"
  },
  {
    "value": "RENV11",
    "label": "RENV11"
  },
  {
    "value": "S1LG34",
    "label": "S1LG34"
  },
  {
    "value": "E1XR34",
    "label": "E1XR34"
  },
  {
    "value": "PACL11",
    "label": "PACL11"
  },
  {
    "value": "M1UF34",
    "label": "M1UF34"
  },
  {
    "value": "BIJH39",
    "label": "BIJH39"
  },
  {
    "value": "A1AP34",
    "label": "A1AP34"
  },
  {
    "value": "BSRE39",
    "label": "BSRE39"
  }
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
