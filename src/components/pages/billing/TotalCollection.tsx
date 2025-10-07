import BPCard from "@/components/BPCard";
import { useQuery } from "@tanstack/react-query";
import { TotalNumCollectionsData } from "@/types/transactions";
import { fetchApi } from "@/lib/api";

// Fetch total num collections data from our API route
const fetchTotalNumCollections = async (): Promise<number> => {
  const data = await fetchApi<TotalNumCollectionsData[]>(
    "/api/total-num-collections"
  );

  // Return the length of the data array
  return data.length;
};

export default function TotalCollection({ className }: { className?: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["totalNumCollections"],
    queryFn: fetchTotalNumCollections,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const displayValue = () => {
    if (isLoading) return "Loading...";
    if (error || data === undefined) return "Error";
    return data.toLocaleString();
  };

  return (
    <BPCard className={`${className}`}>
      <p className="body2">Total Collections</p>
      <h4 className={error ? "text-destructive" : undefined}>
        {displayValue()}
      </h4>
    </BPCard>
  );
}
