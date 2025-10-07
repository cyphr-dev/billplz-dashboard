// ===========================================
// BPPieChart Usage Examples and Documentation
// ===========================================

import { useState, useEffect } from "react";
import { BPPieChart, PieChartDataItem } from "@/components/charts/BPPieChart";

/**
 * BASIC USAGE PATTERNS
 *
 * The BPPieChart component is designed to be highly reusable.
 * Just provide an array of data with 'name' and 'value' properties.
 */

// ===========================================
// 1. MINIMAL USAGE (Required props only)
// ===========================================

const minimalExample = () => {
  const data: PieChartDataItem[] = [
    { name: "success", value: 85 },
    { name: "failed", value: 15 },
  ];

  return <BPPieChart data={data} />;
};

// ===========================================
// 2. BASIC USAGE WITH LABELS
// ===========================================

const basicExample = () => {
  const data: PieChartDataItem[] = [
    { name: "active", value: 65, label: "Active Collections" },
    { name: "inactive", value: 35, label: "Inactive Collections" },
  ];

  return (
    <BPPieChart
      data={data}
      title="Collections Status"
      description="Overview of active vs inactive collections"
    />
  );
};

// ===========================================
// 3. ADVANCED USAGE WITH ALL OPTIONS
// ===========================================

const advancedExample = () => {
  const data: PieChartDataItem[] = [
    { name: "fpx", value: 45, label: "FPX Banking" },
    { name: "card", value: 30, label: "Credit/Debit Card" },
    { name: "wallet", value: 20, label: "E-Wallet" },
    { name: "others", value: 5, label: "Others" },
  ];

  return (
    <BPPieChart
      data={data}
      title="Payment Methods Distribution"
      description="Breakdown of collections by payment method"
      trend="up" // Shows green trending up icon
      chartHeight={300} // Custom height
      showValues={false} // Show percentages instead of raw values
      hideLegend={false} // Show legend
      hideLabels={false} // Show labels on chart
      className="my-4" // Custom styling
    />
  );
};

// ===========================================
// 4. CUSTOM COLORS EXAMPLE
// ===========================================

const customColorsExample = () => {
  const data: PieChartDataItem[] = [
    {
      name: "high",
      value: 30,
      label: "High Priority",
      color: "hsl(0, 70%, 50%)",
    },
    {
      name: "medium",
      value: 50,
      label: "Medium Priority",
      color: "hsl(45, 70%, 50%)",
    },
    {
      name: "low",
      value: 20,
      label: "Low Priority",
      color: "hsl(120, 70%, 50%)",
    },
  ];

  return (
    <BPPieChart
      data={data}
      title="Task Priority Distribution"
      trend="neutral"
    />
  );
};

// ===========================================
// 5. LARGE DATASET EXAMPLE
// ===========================================

const largeDatasetExample = () => {
  const data: PieChartDataItem[] = [
    { name: "malaysia", value: 35, label: "Malaysia" },
    { name: "singapore", value: 20, label: "Singapore" },
    { name: "thailand", value: 15, label: "Thailand" },
    { name: "indonesia", value: 12, label: "Indonesia" },
    { name: "philippines", value: 8, label: "Philippines" },
    { name: "vietnam", value: 5, label: "Vietnam" },
    { name: "others", value: 5, label: "Others" },
  ];

  return (
    <BPPieChart
      data={data}
      title="Revenue by Country"
      description="Geographic distribution of revenue"
      chartHeight={350}
      showValues={true} // Show actual values instead of percentages
    />
  );
};

// ===========================================
// 6. COMPACT VERSION (No title/description)
// ===========================================

const compactExample = () => {
  const data: PieChartDataItem[] = [
    { name: "completed", value: 75, label: "Completed" },
    { name: "pending", value: 20, label: "Pending" },
    { name: "failed", value: 5, label: "Failed" },
  ];

  return <BPPieChart data={data} chartHeight={200} />;
};

// ===========================================
// 7. MINIMAL LEGEND VERSION
// ===========================================

const minimalLegendExample = () => {
  const data: PieChartDataItem[] = [
    { name: "desktop", value: 60, label: "Desktop" },
    { name: "mobile", value: 35, label: "Mobile" },
    { name: "tablet", value: 5, label: "Tablet" },
  ];

  return (
    <BPPieChart
      data={data}
      title="Device Usage"
      hideLabels={true} // Hide labels on chart slices
    />
  );
};

// ===========================================
// 8. EMPTY STATE HANDLING
// ===========================================

const emptyStateExample = () => {
  const emptyData: PieChartDataItem[] = [];

  return (
    <BPPieChart
      data={emptyData}
      title="No Data Available"
      description="This shows how empty state is handled"
    />
  );
};

// ===========================================
// 9. REAL-WORLD API INTEGRATION EXAMPLE
// ===========================================

const ApiIntegrationExample = () => {
  // Example of how to integrate with API data
  const [chartData, setChartData] = useState<PieChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your API call here
        const response = await fetch("/api/payment-methods");
        const apiData = await response.json();

        // Transform API data to chart format
        interface ApiItem {
          method: string;
          count: number;
          displayName?: string;
        }

        const transformedData: PieChartDataItem[] = apiData.map(
          (item: ApiItem) => ({
            name: item.method,
            value: item.count,
            label: item.displayName || item.method,
          })
        );

        setChartData(transformedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
        setChartData([]); // Shows empty state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="h-32 bg-muted animate-pulse rounded" />;
  }

  return (
    <BPPieChart
      data={chartData}
      title="Payment Methods"
      description="Distribution of payment methods used"
      trend="up"
    />
  );
};

// ===========================================
// DATA STRUCTURE REQUIREMENTS
// ===========================================

/*
Required Data Structure:

interface PieChartDataItem {
  name: string;           // Unique identifier (required)
  value: number;          // Numeric value (required)  
  label?: string;         // Display label (optional, falls back to formatted name)
  color?: string;         // Custom color (optional, auto-assigned if not provided)
}

Examples of valid data:

✅ Minimal:
[
  { name: "success", value: 85 },
  { name: "failed", value: 15 }
]

✅ With labels:
[
  { name: "fpx", value: 45, label: "FPX Banking" },
  { name: "card", value: 30, label: "Credit/Debit Card" }
]

✅ With custom colors:
[
  { name: "high", value: 30, label: "High Priority", color: "hsl(0, 70%, 50%)" },
  { name: "low", value: 70, label: "Low Priority", color: "hsl(120, 70%, 50%)" }
]

❌ Invalid (missing required properties):
[
  { value: 85 },                    // Missing 'name'
  { name: "test" },                 // Missing 'value'  
  { name: "test", value: "85" }     // 'value' must be number, not string
]
*/

// ===========================================
// PROP REFERENCE
// ===========================================

/*
All Available Props:

<BPPieChart 
  data={PieChartDataItem[]}        // Required: Array of data items
  valueKey="value"                 // Optional: Key for values (default: "value")
  nameKey="name"                   // Optional: Key for names (default: "name")
  title="Chart Title"              // Optional: Title text
  description="Chart description"  // Optional: Description text
  trend="up|down|neutral|none"     // Optional: Trend indicator (default: "none")
  hideLegend={false}              // Optional: Hide legend (default: false)
  hideLabels={false}              // Optional: Hide chart labels (default: false)
  chartHeight={250}               // Optional: Chart height in px (default: 250)
  showValues={false}              // Optional: Show values vs percentages (default: false)
  className="custom-class"        // Optional: Custom CSS classes
/>
*/

export {
  minimalExample,
  basicExample,
  advancedExample,
  customColorsExample,
  largeDatasetExample,
  compactExample,
  minimalLegendExample,
  emptyStateExample,
  ApiIntegrationExample,
};
