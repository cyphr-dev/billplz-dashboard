import BPCard from "./BPCard";
import BPEmptyErrorState from "./BPEmptyErrorState";
import { AlertCircle, Loader2 } from "lucide-react";

interface BPBentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actionButton?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorTitle?: string;
  errorDescription?: string;
}

export default function BPBentoCard({
  children,
  className,
  title,
  actionButton,
  isLoading = false,
  isError = false,
  errorTitle = "Something went wrong",
  errorDescription = "Unable to load data. Please try again.",
}: BPBentoCardProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (isError) {
      return (
        <BPEmptyErrorState
          icon={<AlertCircle className="w-12 h-12 text-destructive" />}
          title={errorTitle}
          description={errorDescription}
        />
      );
    }

    return children;
  };

  return (
    <BPCard className={`${className}`}>
      <div className="flex flex-row items-center justify-between mb-2">
        <p className="font-semibold">{title}</p>
        <div>{actionButton}</div>
      </div>
      {renderContent()}
    </BPCard>
  );
}
