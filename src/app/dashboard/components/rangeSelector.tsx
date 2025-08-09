import { Button } from "@/components/ui/button";

const rangeOptions = ["1d", "5d", "1mo", "3mo"];

export function RangeSelector({ rangeSelected, onSelect }: 
  { rangeSelected :string, onSelect: (range: string) => void }) {

  const handleClick = (range: string) => {
    onSelect(range);
  };

  return (
    <div className="flex items-center gap-1 overflow-x-auto p-2 border rounded-md bg-muted">
      {rangeOptions.map((range) => (
        <Button
          key={range}
          variant="ghost" 
          onClick={() => handleClick(range)}
          className={`text-xs px-2 py-1 rounded-sm transition-colors ${
            rangeSelected === range
              ? "bg-white text-black shadow-md"
              : "text-muted-foreground hover:bg-accent"
          }`}
        >
          {range}
        </Button>
      ))}
    </div>
  );
}
