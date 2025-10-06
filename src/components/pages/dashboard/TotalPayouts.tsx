import BPBentoCard from "@/components/BPBentoCard";
import BPButton from "@/components/BPButton";
import BPTrend from "@/components/BPTrend";
import { BPLineChart } from "@/components/Charts/BPLineChart";
import { useQuery } from "@tanstack/react-query";

interface TotalPayoutsData {
  amount: string;
  trend: string;
  chartData: Array<{
    month: string;
    desktop: number;
    mobile: number;
    tablet: number;
  }>;
}

// Mock API function - replace with real API call later
const fetchTotalPayouts = async (): Promise<TotalPayoutsData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    amount: "RM25,000.00",
    trend: "5.6",
    chartData: [
      { month: "January", desktop: 2800, mobile: 1200, tablet: 800 },
      { month: "February", desktop: 3200, mobile: 1500, tablet: 900 },
      { month: "March", desktop: 2950, mobile: 1350, tablet: 850 },
      { month: "April", desktop: 3100, mobile: 1400, tablet: 950 },
      { month: "May", desktop: 2700, mobile: 1250, tablet: 750 },
      { month: "June", desktop: 3300, mobile: 1600, tablet: 1000 },
    ],
  };
};

export default function TotalPayouts({ className }: { className?: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["totalPayouts"],
    queryFn: fetchTotalPayouts,
  });

  if (isLoading) {
    return (
      <BPBentoCard
        className={className}
        title="Total Payouts"
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
        title="Total Payouts"
        actionButton={<button>View all</button>}
      >
        <div className="text-destructive">Failed to load data</div>
      </BPBentoCard>
    );
  }

  return (
    <BPBentoCard
      className={className}
      title="Total Payouts"
      actionButton={<BPButton variant="link">View all</BPButton>}
    >
      <div className="flex flex-row">
        <p className="text-2xl font-semibold">{data?.amount}</p>
        <BPTrend value={data?.trend || "0"} />
      </div>
      <BPLineChart data={data?.chartData} />
    </BPBentoCard>
  );
}
