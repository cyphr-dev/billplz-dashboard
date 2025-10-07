import BPBentoCard from "@/components/BPBentoCard";
import { BPPerformanceBarChart } from "@/components/charts/BPPerformanceBarChart";
import { useQuery } from "@tanstack/react-query";
import {
  BillingTotalPaidData,
  TopPerformingCollectionsStats,
} from "@/types/transactions";
import { fetchApi } from "@/lib/api";

// Fetch billing data from our API route
const fetchTopPerformingCollections =
  async (): Promise<TopPerformingCollectionsStats> => {
    const data = await fetchApi<BillingTotalPaidData[]>(
      "/api/billing-total-paid"
    );

    // Calculate total sum of all collections
    const totalSum = data.reduce(
      (sum, item) => sum + parseFloat(item.collectionTotal),
      0
    );

    // Sort by collectionTotal in descending order and take top 5
    const sortedData = data
      .sort(
        (a, b) => parseFloat(b.collectionTotal) - parseFloat(a.collectionTotal)
      )
      .slice(0, 5);

    // Process the data to calculate percentages
    const collections = sortedData.map((item) => {
      const value = parseFloat(item.collectionTotal);
      const percentage = totalSum > 0 ? (value / totalSum) * 100 : 0;

      return {
        name: item.companyName,
        value,
        percentage,
        displayValue: `RM${value.toFixed(2)}`,
      };
    });

    return {
      collections,
      totalSum,
    };
  };

export default function TopPerformingCollections({
  className,
}: {
  className?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topPerformingCollections"],
    queryFn: fetchTopPerformingCollections,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Failed to load top performing collections data";

  const maxValue = data ? Math.max(...data.collections.map((c) => c.value)) : 0;

  return (
    <BPBentoCard
      className={className}
      title="Top 5 Performing Collections"
      isLoading={isLoading}
      isError={!!error}
      errorTitle="Unable to load top collections"
      errorDescription={errorMessage}
    >
      {data && (
        <>
          <div className="flex flex-col gap-4">
            {data.collections.map((collection, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="flex-1 mr-2 uppercase truncate body1">
                    {collection.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-6.5 bg-gray-200">
                    <BPPerformanceBarChart
                      data={collection}
                      maxValue={maxValue}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium min-w-[45px] text-right">
                    {collection.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </BPBentoCard>
  );
}
