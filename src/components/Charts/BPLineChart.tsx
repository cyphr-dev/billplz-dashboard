"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear line chart";

const defaultChartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 120 },
  { month: "February", desktop: 305, mobile: 200, tablet: 150 },
  { month: "March", desktop: 237, mobile: 120, tablet: 110 },
  { month: "April", desktop: 73, mobile: 190, tablet: 160 },
  { month: "May", desktop: 209, mobile: 130, tablet: 140 },
  { month: "June", desktop: 214, mobile: 140, tablet: 180 },
];

const defaultChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface BPLineChartProps {
  data?: Record<string, string | number>[];
  config?: ChartConfig;
  dataKeys?: string[];
  xAxisKey?: string;
  className?: string;
}

export function BPLineChart({
  data = defaultChartData,
  config = defaultChartConfig,
  dataKeys = ["desktop", "mobile", "tablet"],
  xAxisKey = "month",
  className,
}: BPLineChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <ChartContainer config={config}>
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={35} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          {dataKeys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              type="linear"
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
}
