import { ArrowDown, ArrowUp } from "lucide-react";

interface BPTrendProps {
  value: string;
}

export default function BPTrend({ value }: BPTrendProps) {
  return (
    <div className="flex items-center">
      {value.startsWith("-") ? (
        <ArrowDown color="var(--color-negative)" />
      ) : (
        <ArrowUp color="var(--color-positive)" />
      )}
      <p
        className={`text-2xl font-semibold ${
          value.startsWith("-") ? "text-negative" : "text-positive"
        }`}
      >
        {value.replace("-", "")}%
      </p>
    </div>
  );
}
