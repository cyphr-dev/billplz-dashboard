import BPBentoCard from "@/components/BPBentoCard";
import { BPBarChart } from "@/components/Charts/BPBarChart";
import { useQuery } from "@tanstack/react-query";

interface PerformingCollection {
  name: string;
  value: number;
  maximum: number;
}

interface TopPerformingCollectionsData {
  collections: PerformingCollection[];
}

// Mock API function - replace with real API call later
const fetchTopPerformingCollections =
  async (): Promise<TopPerformingCollectionsData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 120));

    return {
      collections: [
        { name: "Tuition Center A (Monthly)", value: 300, maximum: 400 },
        { name: "Food", value: 200, maximum: 400 },
        { name: "Transport", value: 100, maximum: 400 },
        { name: "Shopping", value: 400, maximum: 400 },
        { name: "Others", value: 150, maximum: 400 },
      ],
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
  });

  if (isLoading) {
    return (
      <BPBentoCard className={className} title="Top 5 Performing Collections">
        <div className="flex flex-col space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="w-3/4 h-4 rounded bg-muted animate-pulse"></div>
              <div className="h-6 rounded bg-muted animate-pulse"></div>
            </div>
          ))}
        </div>
      </BPBentoCard>
    );
  }

  if (error) {
    return (
      <BPBentoCard className={className} title="Top 5 Performing Collections">
        <div className="text-destructive">Failed to load data</div>
      </BPBentoCard>
    );
  }

  return (
    <BPBentoCard className={className} title="Top 5 Performing Collections">
      {data?.collections.map((collection, index) => (
        <div key={index} className="flex flex-col justify-between">
          <p className="mb-1 text-sm">{collection.name}</p>
          <BPBarChart />
        </div>
      ))}
    </BPBentoCard>
  );
}
