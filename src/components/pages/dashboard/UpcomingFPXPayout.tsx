import BPBentoCard from "@/components/BPBentoCard";
import BPButton from "@/components/BPButton";
import { useQuery } from "@tanstack/react-query";
import { FPXPayoutData, ProcessedFPXPayoutData } from "@/types/transactions";
import { fetchApi } from "@/lib/api";
import { format, addMonths, setDate } from "date-fns";

// Fetch FPX payout data from our API route
const fetchFPXPayoutData = async (): Promise<ProcessedFPXPayoutData> => {
  const data = await fetchApi<FPXPayoutData[]>("/api/upcoming-fpx-payout");

  // Calculate total amount
  const totalAmount = data.reduce(
    (sum, payout) => sum + parseFloat(payout.value),
    0
  );

  // Calculate expected date (12th of next month)
  const now = new Date();
  const nextMonth = addMonths(now, 1);
  const expectedDate = setDate(nextMonth, 12);

  // Process collections data
  const collections = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: format(new Date(item.date), "d MMMM yyyy"),
      amount: `RM${parseFloat(item.value).toFixed(2)}`,
    }));

  return {
    totalAmount,
    expectedDate: format(expectedDate, "d MMM yyyy"),
    collections,
  };
};

export default function UpcomingFPXPayout({
  className,
}: {
  className?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["upcomingFPXPayout"],
    queryFn: fetchFPXPayoutData,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const errorMessage =
    error instanceof Error ? error.message : "Failed to load FPX payout data";

  return (
    <BPBentoCard
      className={className}
      title={"Upcoming FPX Payout"}
      actionButton={
        <BPButton variant="link" size="link" className="text-[12px]">
          See details
        </BPButton>
      }
      explanationTooltip="This shows the upcoming FPX payout details including amount, fee, and net amount."
      isLoading={isLoading}
      isError={!!error}
      errorTitle="Unable to load FPX payout data"
      errorDescription={errorMessage}
    >
      {data && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">
              RM
              {data.totalAmount.toLocaleString("en-MY", {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="body1">
              Expected to reach your bank account on {data.expectedDate}
            </p>
          </div>
          <hr className="custom-dashed-border" />
          <div>
            <p className="capitalize body1-bold">COLLECTION DATE</p>
            <table className="w-full">
              <tbody>
                {data.collections.map((item, index) => (
                  <tr key={index}>
                    <td className="py-1 body2">{item.date}</td>
                    <td className="font-medium text-right">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </BPBentoCard>
  );
}
