import BPBentoCard from "@/components/BPBentoCard";
import { BPPieChart } from "@/components/Charts/BPPieChart";
import { useQuery } from "@tanstack/react-query";

interface PaymentMethodData {
  fpx: number;
  card: number;
  wallet: number;
  others: number;
}

// Mock API function - replace with real API call later
const fetchPaymentMethods = async (): Promise<PaymentMethodData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 160));

  return {
    fpx: 45,
    card: 30,
    wallet: 20,
    others: 5,
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
  });

  if (isLoading) {
    return (
      <BPBentoCard className={className} title="Collections by Payment Methods">
        <div className="flex justify-center items-center h-32">
          <div className="w-24 h-24 bg-muted animate-pulse rounded-full"></div>
        </div>
      </BPBentoCard>
    );
  }

  if (error) {
    return (
      <BPBentoCard className={className} title="Collections by Payment Methods">
        <div className="text-destructive">Failed to load data</div>
      </BPBentoCard>
    );
  }

  return (
    <BPBentoCard className={className} title="Collections by Payment Methods">
      <BPPieChart />
      {/* You can add data summary here if needed */}
      <div className="mt-2 text-xs text-muted-foreground grid grid-cols-2 gap-1">
        <div>FPX: {data?.fpx}%</div>
        <div>Card: {data?.card}%</div>
        <div>Wallet: {data?.wallet}%</div>
        <div>Others: {data?.others}%</div>
      </div>
    </BPBentoCard>
  );
}
