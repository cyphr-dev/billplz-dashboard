import BPBentoCard from "@/components/BPBentoCard";
import { BPPieChart } from "@/components/Charts/BPPieChart";
import { useQuery } from "@tanstack/react-query";

interface ActiveInactiveData {
  active: number;
  inactive: number;
  total: number;
}

// Mock API function - replace with real API call later
const fetchActiveInactiveCollections =
  async (): Promise<ActiveInactiveData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 180));

    return {
      active: 65,
      inactive: 35,
      total: 100,
    };
  };

export default function ActiveInactiveCollections({
  className,
}: {
  className?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["activeInactiveCollections"],
    queryFn: fetchActiveInactiveCollections,
  });

  if (isLoading) {
    return (
      <BPBentoCard
        className={className}
        title="Active vs. Inactive Collections"
      >
        <div className="flex items-center justify-center h-32">
          <div className="w-24 h-24 rounded-full bg-muted animate-pulse"></div>
        </div>
      </BPBentoCard>
    );
  }

  if (error) {
    return (
      <BPBentoCard
        className={className}
        title="Active vs. Inactive Collections"
      >
        <div className="text-destructive">Failed to load data</div>
      </BPBentoCard>
    );
  }

  return (
    <BPBentoCard className={className} title="Active vs. Inactive Collections">
      <BPPieChart />
      {/* You can add data summary here if needed */}
      <div className="mt-2 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Active: {data?.active}%</span>
          <span>Inactive: {data?.inactive}%</span>
        </div>
      </div>
    </BPBentoCard>
  );
}
