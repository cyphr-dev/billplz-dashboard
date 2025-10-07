import BPCard from "@/components/BPCard";
import { useQuery } from "@tanstack/react-query";
import { TotalPaidData } from "@/types/transactions";
import { fetchApi } from "@/lib/api";

// Fetch total paid data from our API route
const fetchTotalPaid = async (): Promise<number> => {
  const data = await fetchApi<TotalPaidData[]>("/api/total-paid");

  // Take the first entry as requested
  const firstEntry = data[0];
  if (!firstEntry) {
    return 0;
  }

  return parseFloat(firstEntry.value);
};

export default function TotalPaid({ className }: { className?: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["totalPaid"],
    queryFn: fetchTotalPaid,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const displayValue = () => {
    if (isLoading) return "Loading...";
    if (error || data === undefined) return "Error";
    return `RM${data.toLocaleString("en-MY", { minimumFractionDigits: 2 })}`;
  };

  return (
    <BPCard className={className}>
      <p className="body2">Total Paid</p>
      <h4 className={error ? "text-destructive" : "text-positive"}>
        {displayValue()}
      </h4>
    </BPCard>
  );
}
