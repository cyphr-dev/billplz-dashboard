import BPBentoCard from "@/components/BPBentoCard";
import BPButton from "@/components/BPButton";
import BPTrend from "@/components/BPTrend";
import { BPLineChart } from "@/components/Charts/BPLineChart";
import { useQuery } from "@tanstack/react-query";

interface TotalTransactionsData {
  count: number;
  trend: string;
  chartData: Array<{
    month: string;
    desktop: number;
    mobile: number;
    tablet: number;
  }>;
}

// Mock API function - replace with real API call later
const fetchTotalTransactions = async (): Promise<TotalTransactionsData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    count: 39,
    trend: "-3.2",
    chartData: [
      { month: "January", desktop: 45, mobile: 25, tablet: 15 },
      { month: "February", desktop: 52, mobile: 30, tablet: 20 },
      { month: "March", desktop: 48, mobile: 28, tablet: 18 },
      { month: "April", desktop: 39, mobile: 22, tablet: 12 },
      { month: "May", desktop: 42, mobile: 26, tablet: 16 },
      { month: "June", desktop: 46, mobile: 29, tablet: 19 },
    ],
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
  });

  if (isLoading) {
    return (
      <BPBentoCard
        className={className}
        title="Total Transactions"
        actionButton={<button>View all</button>}
      >
        <div className="flex flex-col space-y-2">
          <div className="h-8 rounded bg-muted animate-pulse"></div>
          <div className="h-32 rounded bg-muted animate-pulse"></div>
        </div>
      </BPBentoCard>
    );
  }

  if (error) {
    return (
      <BPBentoCard
        className={className}
        title="Total Transactions"
        actionButton={<button>View all</button>}
      >
        <div className="text-destructive">Failed to load data</div>
      </BPBentoCard>
    );
  }

  return (
    <BPBentoCard
      className={className}
      title="Total Transactions"
      actionButton={<BPButton variant="link">View all</BPButton>}
    >
      <div className="flex flex-row">
        <p className="text-2xl font-semibold">{data?.count}</p>
        <BPTrend value={data?.trend || "0"} />
      </div>
      <BPLineChart data={data?.chartData} />
    </BPBentoCard>
  );
}
