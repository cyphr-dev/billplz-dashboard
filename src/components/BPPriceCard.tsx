import BPCard from "./BPCard";
import { Separator } from "./ui/separator";

interface BPPriceCardProps {
  title?: string;
  price?: string;
  pricingDescription?: string;
  children?: React.ReactNode;
  className?: string;
  popular?: boolean;
}

export default function BPPriceCard({
  title,
  price,
  pricingDescription,
  children,
  className,
  popular,
}: BPPriceCardProps) {
  return (
    <div className="relative">
      {popular && (
        <div className="absolute w-full p-1 font-semibold text-center text-white bg-blue-500 rounded-t-lg -top-2">
          <p>POPULAR</p>
        </div>
      )}
      <BPCard
        className={`p-[30px] ${className} ${
          popular && "border-2 border-blue-500 rounded-t-none"
        }`}
      >
        <div className="items-center text-center p-[20px]">
          <p className="font-semibold tracking-widest uppercase">{title}</p>
          <p className="text-[30px] font-bold text-primary">{price}</p>
          <p>{pricingDescription}</p>
        </div>
        <Separator />
        <div className="py-[20px]">{children}</div>
      </BPCard>
    </div>
  );
}
