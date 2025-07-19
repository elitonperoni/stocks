"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils" // Utilitário para mesclar classes do Tailwind
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// 1. Interface de props mais robusta
interface ComboboxProps {
  data: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string; // Para permitir customização de estilo
}

export function Combobox({ data, value, onValueChange, className }: ComboboxProps) {
  // O estado de 'open' continua sendo interno, o que é correto.
  const [open, setOpen] = React.useState(false)

  // 2. O estado interno 'value' foi REMOVIDO.
  // O componente agora depende da prop 'value'.

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // Usando 'cn' para mesclar a classe padrão com a que vem via props
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : "Selecione"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pesquisa..." />
          <CommandList>
            <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    // 3. Em vez de 'setValue', chamamos 'onValueChange'.
                    // Isso notifica o react-hook-form sobre a mudança.
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}