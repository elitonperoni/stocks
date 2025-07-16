import { formatCurrency } from "@/utils/formatCurrency";
import { JSX } from "react/jsx-runtime";

export default function labelValuePositiveNegative(value: number): JSX.Element {
  const isPositive = value >= 0;
  return (
    <div
      className={`text-sm font-medium ${
        isPositive
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`}
    >
      {formatCurrency(value * (isPositive ? 1 : -1))}
    </div>
  );
}
