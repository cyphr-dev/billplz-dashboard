import BPBentoCard from "@/components/BPBentoCard";
import { BPPieChart } from "@/components/charts/BPPieChart";
import { useQuery } from "@tanstack/react-query";
import {
  ActiveCollectionData,
  ActiveInactiveStats,
} from "@/types/transactions";
import { fetchApi } from "@/lib/api";

// Fetch active collection data from our API route
const fetchActiveInactiveCollections =
  async (): Promise<ActiveInactiveStats> => {
    const data = await fetchApi<ActiveCollectionData[]>(
      "/api/active-collection"
    );

    // Process the data to calculate active vs inactive stats
    let activeCount = 0;
    let inactiveCount = 0;

    data.forEach((item) => {
      if (item.type === true) {
        // true = active collections
        activeCount += item.value;
      } else {
        // false = inactive collections
        inactiveCount += item.value;
      }
    });

    const total = activeCount + inactiveCount;
    const activePercentage = total > 0 ? (activeCount / total) * 100 : 0;
    const inactivePercentage = total > 0 ? (inactiveCount / total) * 100 : 0;

    return {
      active: activeCount,
      inactive: inactiveCount,
      total,
      activePercentage,
      inactivePercentage,
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
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Failed to load active collection data";

  const chartData = data
    ? [
        {
          name: "active",
          value: data.activePercentage,
          label: `Active Collections (${data.active})`,
          count: data.active,
        },
        {
          name: "inactive",
          value: data.inactivePercentage,
          label: `Inactive Collections (${data.inactive})`,
          count: data.inactive,
        },
      ]
    : [];

  return (
    <BPBentoCard
      className={className}
      title="Active vs. Inactive Collections"
      isLoading={isLoading}
      isError={!!error}
      errorTitle="Unable to load collection data"
      errorDescription={errorMessage}
    >
      {data && (
        <>
          <BPPieChart
            data={chartData}
            title="Collections Status Overview"
            description="Active vs. Inactive collections breakdown"
          />
        </>
      )}
    </BPBentoCard>
  );
}
