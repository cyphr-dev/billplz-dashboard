import BPBentoCard from "@/components/BPBentoCard";
import { BPPieChart } from "@/components/charts/BPPieChart";
import { useQuery } from "@tanstack/react-query";
import { PaymentMethodData, PaymentMethodStats } from "@/types/transactions";
import { fetchApi } from "@/lib/api";

// Fetch payment methods data from our API route
const fetchPaymentMethods = async (): Promise<PaymentMethodStats> => {
  const data = await fetchApi<PaymentMethodData[]>(
    "/api/collection-payment-methods"
  );

  // Calculate total value from all payment methods
  const totalValue = data.reduce(
    (sum, method) => sum + parseFloat(method.value),
    0
  );

  // Process the data to calculate percentages and format for display
  const methods = data.map((method) => {
    const value = parseFloat(method.value);
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;

    // Capitalize the method name for display
    const label = method.name.charAt(0).toUpperCase() + method.name.slice(1);

    return {
      name: method.name,
      value,
      percentage,
      label,
    };
  });

  return {
    methods,
    totalValue,
  };
};

export default function PaymentMethodsCollections({
  className,
}: {
  className?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paymentMethodsCollections"],
    queryFn: fetchPaymentMethods,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Failed to load payment methods data";

  const chartData =
    data?.methods.map((method) => ({
      name: method.name,
      value: method.percentage,
      label: `${method.label} (RM${method.value.toFixed(2)})`,
      amount: method.value,
    })) || [];

  return (
    <BPBentoCard
      className={className}
      title="Collections by Payment Methods"
      isLoading={isLoading}
      isError={!!error}
      errorTitle="Unable to load payment methods data"
      errorDescription={errorMessage}
    >
      {data && (
        <>
          <BPPieChart
            data={chartData}
            title="Payment Methods Distribution"
            description="Breakdown of collections by payment method"
          />
        </>
      )}
    </BPBentoCard>
  );
}
