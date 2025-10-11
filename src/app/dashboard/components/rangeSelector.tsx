import * as Tooltip from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";

const rangeOptions = ["2D", "5D", "1MO", "3MO", "6MO", "1Y", "5Y"];

export function RangeSelector({
  rangeSelected,
  onSelect,
}: {
  rangeSelected: string;
  onSelect: (range: string) => void;
}) {
  const handleClick = (range: string) => {
    onSelect(range);
  };

  const rangeDescription: Record<string, string> = {
    "2D": "Últimos 2 dias",
    "5D": "Últimos 5 dias",
    "1MO": "Último mês",
    "3MO": "Últimos 3 meses",
    "6MO": "Últimos 6 meses",
    "1Y": "Último ano",
    "5Y": "Últimos 5 anos"
  };

  return (
   <div className="flex gap-2">
      {rangeOptions.map((range) => (
        <Tooltip.Provider key={range}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button
                variant="ghost"
                onClick={() => onSelect(range)}
                className={`text-xs px-2 py-1 rounded-sm transition-colors ${
                  rangeSelected === range
                    ? "bg-white text-black shadow-md"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {range}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="top"
              align="center"
              className="bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg"
            >
              {rangeDescription[range] || range}
              <Tooltip.Arrow className="fill-gray-700" />
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      ))}
    </div>
  );
}
