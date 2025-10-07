"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BPPerformanceBarChartProps {
  data: {
    name: string;
    value: number;
    percentage: number;
    displayValue: string;
  };
  maxValue: number;
}

const chartConfig = {
  value: {
    label: "Collection Total",
    color: "var(--chart-1)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function BPPerformanceBarChart({
  data,
  maxValue,
}: BPPerformanceBarChartProps) {
  const chartData = [
    {
      name: data.name,
      value: data.value,
      percentage: data.percentage,
      displayValue: data.displayValue,
      maxValue,
    },
  ];

  return (
    <ChartContainer config={chartConfig} className="w-full h-7">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <XAxis dataKey="value" type="number" hide domain={[0, maxValue]} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="value"
          layout="vertical"
          fill="var(--color-value)"
          barSize={25}
        >
          <LabelList
            dataKey="displayValue"
            position="insideLeft"
            offset={8}
            className="font-medium fill-white"
            fontSize={11}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
