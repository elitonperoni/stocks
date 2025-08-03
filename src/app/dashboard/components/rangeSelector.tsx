import { Button } from "@/components/ui/button";
import { useState } from "react";

const rangeOptions = ["1d", "2d", "5d", "7d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"];

export function RangeSelector({ onSelect }: { onSelect: (range: string) => void }) {
  const [selected, setSelected] = useState("1d");

  const handleClick = (range: string) => {
    setSelected(range);
    onSelect(range);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {rangeOptions.map((range) => (
        <Button
          key={range}
          variant={selected === range ? "default" : "outline"}
          onClick={() => handleClick(range)}
          className="text-xs px-3 py-1"
        >
          {range}
        </Button>
      ))}
    </div>
  );
}
