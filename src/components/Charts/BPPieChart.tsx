"use client";

import { useMemo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "A reusable pie chart component with automatic configuration";

// Expanded chart colors array for better variety
const CHART_COLORS = [
  "hsl(221, 83%, 53%)", // Blue
  "hsl(142, 71%, 45%)", // Green
  "hsl(47, 96%, 53%)", // Yellow
  "hsl(339, 82%, 52%)", // Pink/Red
  "hsl(258, 90%, 66%)", // Purple
  "hsl(12, 76%, 61%)", // Red-orange
  "hsl(173, 58%, 39%)", // Teal
  "hsl(197, 37%, 24%)", // Dark blue
  "hsl(43, 74%, 66%)", // Light yellow
  "hsl(27, 87%, 67%)", // Orange
  "hsl(315, 43%, 48%)", // Purple
  "hsl(79, 65%, 35%)", // Green
  "hsl(220, 70%, 50%)", // Blue
  "hsl(340, 75%, 55%)", // Pink
  "hsl(160, 60%, 45%)", // Emerald
  "hsl(280, 65%, 60%)", // Violet
];

// Data structure interface
export interface PieChartDataItem {
  name: string; // Unique identifier (required)
  value: number; // Numeric value (required)
  label?: string; // Display label (optional, falls back to formatted name)
  color?: string; // Custom color (optional, auto-assigned if not provided)
}

// Component props interface
export interface BPPieChartProps {
  /** Array of data items to display in the pie chart */
  data: PieChartDataItem[];

  /** Key to use for values in the data (default: "value") */
  valueKey?: string;

  /** Title text with optional trend indicator */
  title?: string;

  /** Description text below the title */
  description?: string;

  /** Show trend icon next to title ("up" | "down" | "neutral" | "none") */
  trend?: "up" | "down" | "neutral" | "none";

  /** Hide the legend (default: false) */
  hideLegend?: boolean;

  /** Hide labels on pie slices (default: false) */
  hideLabels?: boolean;

  /** Custom height for the chart (default: 250px) */
  chartHeight?: number;

  /** Show values instead of percentages in legend */
  showValues?: boolean;

  /** Custom className for the container */
  className?: string;
}

export function BPPieChart({
  data,
  valueKey = "value",
  trend = "none",
  hideLegend = false,
  hideLabels = false,
  chartHeight = 250,
  showValues = false,
  className = "",
}: BPPieChartProps) {
  // Auto-generate chart config and data with colors
  const { chartConfig, processedData, totalValue } = useMemo(() => {
    // Handle empty data
    if (!data || data.length === 0) {
      return {
        chartConfig: {} as ChartConfig,
        processedData: [],
        totalValue: 0,
      };
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Generate dynamic chart config
    const config: ChartConfig = {
      [valueKey]: {
        label: "Value",
      },
    };

    // Process data and assign colors
    const processed = data.map((item, index) => {
      // Use custom color if provided, otherwise auto-assign
      const color = item.color || CHART_COLORS[index % CHART_COLORS.length];
      config[item.name] = {
        label:
          item.label || item.name.charAt(0).toUpperCase() + item.name.slice(1),
        color: color,
      };

      return {
        ...item,
        fill: color,
      };
    });

    return {
      chartConfig: config,
      processedData: processed,
      totalValue: total,
    };
  }, [data, valueKey]);

  // Calculate percentages for legend
  const legendData = useMemo(() => {
    if (!processedData.length) return [];
    return processedData.map((item) => ({
      name: item.name,
      label: item.label || chartConfig[item.name]?.label || item.name,
      color: item.fill,
      percentage:
        totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : "0",
      value: item.value,
    }));
  }, [processedData, totalValue, chartConfig]);

  // Get trend icon
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "neutral":
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-32 text-muted-foreground ${className}`}
      >
        No data available
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className={`[&_.recharts-text]:fill-background mx-auto aspect-square`}
          style={{ maxHeight: `${chartHeight}px` }}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey={valueKey} hideLabel />}
            />
            <Pie data={processedData} dataKey={valueKey}>
              {!hideLabels && (
                <LabelList
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: number) => {
                    const percentage =
                      totalValue > 0
                        ? ((value / totalValue) * 100).toFixed(1)
                        : "0";
                    return `${percentage}%`;
                  }}
                />
              )}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Stats section */}
      {!hideLegend && (
        <div className="flex-col gap-2 text-sm">
          {/* Legend */}
          {!hideLegend && (
            <div className="space-y-2">
              {legendData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {showValues
                      ? item.value.toLocaleString()
                      : `${item.percentage}%`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
