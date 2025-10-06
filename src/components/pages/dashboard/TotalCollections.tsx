import BPBentoCard from "@/components/BPBentoCard";
import BPButton from "@/components/BPButton";
import BPTrend from "@/components/BPTrend";
import { BPLineChart } from "@/components/Charts/BPLineChart";
import { useQuery } from "@tanstack/react-query";

interface TotalCollectionsData {
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
const fetchTotalCollections = async (): Promise<TotalCollectionsData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    amount: "RM1,200.00",
    trend: "2.6",
    chartData: [
      { month: "January", desktop: 186, mobile: 80, tablet: 120 },
      { month: "February", desktop: 305, mobile: 200, tablet: 150 },
      { month: "March", desktop: 237, mobile: 120, tablet: 110 },
      { month: "April", desktop: 73, mobile: 190, tablet: 160 },
      { month: "May", desktop: 209, mobile: 130, tablet: 140 },
      { month: "June", desktop: 214, mobile: 140, tablet: 180 },
    ],
  };
};

export default function TotalCollections({
  className,
}: {
  className?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["totalCollections"],
    queryFn: fetchTotalCollections,
  });

  if (isLoading) {
    return (
      <BPBentoCard
        className={className}
        title="Total Collections"
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
        title="Total Collections"
        actionButton={<button>View all</button>}
      >
        <div className="text-destructive">Failed to load data</div>
      </BPBentoCard>
    );
  }

  return (
    <BPBentoCard
      className={className}
      title="Total Collections"
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
