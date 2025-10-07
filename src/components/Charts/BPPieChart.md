# BPPieChart - Reusable Pie Chart Component 🥧

A highly reusable and flexible pie chart component with automatic configuration, color assignment, and legend generation.

## ✨ Features

- **Auto-Generated Configuration**: No manual chart config needed
- **Automatic Color Assignment**: Uses predefined color palette with 16+ colors
- **Smart Labels**: Auto-generates labels from data names or uses custom labels
- **Dynamic Legend**: Shows colored dots with percentages or values
- **Trend Indicators**: Optional trend icons (up/down/neutral)
- **Empty State Handling**: Graceful handling of empty or invalid data
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Highly Customizable**: Multiple props for fine-tuning appearance

## 🚀 Quick Start

```tsx
import { BPPieChart, PieChartDataItem } from "@/components/charts/BPPieChart";

const data: PieChartDataItem[] = [
  { name: "active", value: 65, label: "Active Collections" },
  { name: "inactive", value: 35, label: "Inactive Collections" },
];

<BPPieChart data={data} />;
```

## 📊 Data Structure

### Required Properties

```tsx
interface PieChartDataItem {
  name: string; // Unique identifier (required)
  value: number; // Numeric value (required)
  label?: string; // Display label (optional)
  color?: string; // Custom color (optional)
}
```

### Example Fake Data Patterns

#### 1. **Simple 2-Item Data**

```tsx
const activeInactiveData: PieChartDataItem[] = [
  { name: "active", value: 65, label: "Active Collections" },
  { name: "inactive", value: 35, label: "Inactive Collections" },
];
```

#### 2. **Payment Methods (4 Items)**

```tsx
const paymentMethodsData: PieChartDataItem[] = [
  { name: "fpx", value: 45, label: "FPX Banking" },
  { name: "card", value: 30, label: "Credit/Debit Card" },
  { name: "wallet", value: 20, label: "E-Wallet" },
  { name: "others", value: 5, label: "Others" },
];
```

#### 3. **User Demographics (With Custom Colors)**

```tsx
const userDemographicsData: PieChartDataItem[] = [
  {
    name: "age18to24",
    value: 25,
    label: "18-24 Years",
    color: "hsl(210, 100%, 70%)",
  },
  {
    name: "age25to34",
    value: 35,
    label: "25-34 Years",
    color: "hsl(210, 100%, 60%)",
  },
  {
    name: "age35to44",
    value: 20,
    label: "35-44 Years",
    color: "hsl(210, 100%, 50%)",
  },
  {
    name: "age45to54",
    value: 15,
    label: "45-54 Years",
    color: "hsl(210, 100%, 40%)",
  },
  {
    name: "age55plus",
    value: 5,
    label: "55+ Years",
    color: "hsl(210, 100%, 30%)",
  },
];
```

#### 4. **Revenue Sources (6 Items)**

```tsx
const revenueSourcesData: PieChartDataItem[] = [
  { name: "subscriptions", value: 40, label: "Subscriptions" },
  { name: "oneTimePayments", value: 25, label: "One-time Payments" },
  { name: "commissions", value: 15, label: "Commissions" },
  { name: "fees", value: 10, label: "Processing Fees" },
  { name: "refunds", value: 5, label: "Refunds" },
  { name: "others", value: 5, label: "Other Sources" },
];
```

#### 5. **Large Dataset (10+ Items)**

```tsx
const countriesData: PieChartDataItem[] = [
  { name: "malaysia", value: 35, label: "Malaysia" },
  { name: "singapore", value: 20, label: "Singapore" },
  { name: "thailand", value: 15, label: "Thailand" },
  { name: "indonesia", value: 12, label: "Indonesia" },
  { name: "philippines", value: 8, label: "Philippines" },
  { name: "vietnam", value: 5, label: "Vietnam" },
  { name: "brunei", value: 2, label: "Brunei" },
  { name: "myanmar", value: 1.5, label: "Myanmar" },
  { name: "laos", value: 1, label: "Laos" },
  { name: "cambodia", value: 0.5, label: "Cambodia" },
];
```

#### 6. **Simple Browser Usage (No Labels)**

```tsx
const browserData: PieChartDataItem[] = [
  { name: "chrome", value: 275 }, // Auto-generates label: "Chrome"
  { name: "safari", value: 200 }, // Auto-generates label: "Safari"
  { name: "firefox", value: 187 }, // Auto-generates label: "Firefox"
  { name: "edge", value: 173 }, // Auto-generates label: "Edge"
  { name: "others", value: 90 }, // Auto-generates label: "Others"
];
```

## 🎛️ Component Props

```tsx
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
```

## 💡 Usage Examples

### Basic Usage

```tsx
<BPPieChart
  data={paymentMethodsData}
  title="Payment Methods"
  description="Distribution of payment methods"
/>
```

### Advanced Configuration

```tsx
<BPPieChart
  data={revenueSourcesData}
  title="Revenue Sources"
  description="Breakdown of revenue by source"
  trend="up" // Green trending up icon
  chartHeight={300} // Larger chart
  showValues={true} // Show actual values instead of percentages
  className="my-custom-chart" // Custom styling
/>
```

### Compact Version

```tsx
<BPPieChart
  data={browserData}
  chartHeight={200}
  hideLegend={false}
  hideLabels={true} // Only show legend, no labels on chart
/>
```

### API Integration Example

```tsx
function MyChartComponent() {
  const [data, setData] = useState<PieChartDataItem[]>([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((apiData) => {
        const chartData = apiData.map((item) => ({
          name: item.category,
          value: item.count,
          label: item.displayName,
        }));
        setData(chartData);
      });
  }, []);

  return <BPPieChart data={data} title="Analytics Overview" trend="up" />;
}
```

## 🎨 Color System

The component automatically assigns colors from a predefined palette:

- Primary colors: Uses CSS variables `--chart-1` through `--chart-5`
- Extended colors: Additional HSL colors for larger datasets
- Custom colors: Override with the `color` property in data items
- Auto-cycling: Automatically cycles through colors for large datasets

## 🛡️ Error Handling

- **Empty Data**: Shows "No data available" message
- **Invalid Data**: Gracefully handles missing properties
- **Zero Values**: Correctly calculates percentages as 0%
- **API Errors**: Easy integration with loading and error states

## 📱 Responsive Design

- Automatically scales based on container size
- Maintains aspect ratio across different screen sizes
- Configurable height with `chartHeight` prop
- Mobile-friendly legend layout

## 🔧 TypeScript Support

Full TypeScript support with:

- Strongly typed interfaces
- IntelliSense autocomplete
- Compile-time error checking
- Generic type safety

---

**Ready to use anywhere in your application!** 🎉

Just import, provide data, and you're good to go. The component handles all the configuration, colors, and legend generation automatically.
