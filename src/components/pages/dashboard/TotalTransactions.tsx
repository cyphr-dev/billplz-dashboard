import BPBentoCard from "@/components/BPBentoCard";
import BPButton from "@/components/BPButton";
import BPTrend from "@/components/BPTrend";
import { BPLineChart } from "@/components/charts/BPLineChart";
import { useQuery } from "@tanstack/react-query";
import { TransactionData } from "@/types/transactions";
import { format } from "date-fns";
import { fetchApi } from "@/lib/api";

interface TotalTransactionsData {
  count: number;
  totalValue: number;
  trend: string;
  chartData: Array<{
    month: string;
    value: number;
    label: string;
  }>;
}

// Fetch transactions from our API route
const fetchTotalTransactions = async (): Promise<TotalTransactionsData> => {
  const data = await fetchApi<TransactionData[]>("/api/total-transactions");

  // Process the data to calculate stats
  const count = data.length;
  const totalValue = data.reduce(
    (sum, transaction) => sum + parseFloat(transaction.value),
    0
  );

  // Calculate chart data based on actual dates from API
  const monthsData: Array<{ month: string; value: number; label: string }> = [];

  // Group transactions by month and create chart data points
  const monthlyGroups = new Map<string, { date: Date; value: number }>();

  data.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const monthKey = format(transactionDate, "yyyy-MM");

    if (!monthlyGroups.has(monthKey)) {
      monthlyGroups.set(monthKey, {
        date: transactionDate, // Use actual date instead of startOfMonth
        value: 0,
      });
    }

    const group = monthlyGroups.get(monthKey)!;
    group.value += parseFloat(transaction.value);
  });

  // Sort by date in reverse order (most recent first)
  const sortedMonths = Array.from(monthlyGroups.values()).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  sortedMonths.forEach(({ date, value }) => {
    const dateLabel = format(date, "d MMM");
    monthsData.push({
      month: dateLabel,
      value: value,
      label: `[${dateLabel}: ${value.toFixed(2)}]`, // For tooltip
    });
  });

  // Calculate trend (comparing current month vs previous month)
  const currentMonthValue = monthsData[monthsData.length - 1]?.value || 0;
  const previousMonthValue = monthsData[monthsData.length - 2]?.value || 0;

  let trend = "0";
  if (previousMonthValue > 0) {
    const trendPercent =
      ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;
    trend =
      trendPercent > 0
        ? `+${trendPercent.toFixed(1)}`
        : trendPercent.toFixed(1);
  }

  return {
    count,
    totalValue,
    trend,
    chartData: monthsData,
  };
};

export default function TotalTransactions({
  className,
}: {
  className?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["totalTransactions"],
    queryFn: fetchTotalTransactions,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const errorMessage =
    error instanceof Error ? error.message : "Failed to load transactions data";

  return (
    <BPBentoCard
      className={className}
      title="Total Transactions"
      actionButton={
        <BPButton variant="link" size="link" className="text-[12px]">
          View all
        </BPButton>
      }
      isLoading={isLoading}
      isError={!!error}
      errorTitle="Unable to load transactions"
      errorDescription={errorMessage}
    >
      {data && (
        <>
          <div className="flex flex-row gap-2 mb-4">
            <p className="text-2xl font-semibold">
              {data.count.toLocaleString()}
            </p>
            <BPTrend value={data.trend} />
          </div>
          <BPLineChart
            data={data.chartData}
            config={{
              value: {
                label: "Transactions",
                color: "var(--chart-1)",
              },
            }}
            dataKeys={["value"]}
            xAxisKey="month"
          />
        </>
      )}
    </BPBentoCard>
  );
}
