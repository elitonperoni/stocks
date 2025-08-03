import { Button } from "@/components/ui/button";
import { useState } from "react";

//const rangeOptions = ["1D", "2d", "5d", "7d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"];
const rangeOptions = ["1D", "2D", "7D", "1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y", "MAX"];

export function RangeSelector({ onSelect }: { onSelect: (range: string) => void }) {
  const [selected, setSelected] = useState("1d");

  const handleClick = (range: string) => {
    setSelected(range);
    //onSelect(range);
  };

  return (
    <div className="flex items-center gap-1 overflow-x-auto p-2 border rounded-md bg-muted">
      {rangeOptions.map((range) => (
        <Button
          key={range}
          variant="ghost"
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(range)}
          className={`text-xs px-2 py-1 rounded-sm transition-colors ${
            selected === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
          }`}
        >
          {range}
        </Button>
      ))}
    </div>
  );
}
