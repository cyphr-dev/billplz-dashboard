import BPCard from "./BPCard";
import { Separator } from "./ui/separator";

interface BPPriceCardProps {
  title?: string;
  price?: string;
  pricingDescription?: string;
  children?: React.ReactNode;
  className?: string;
  popular?: boolean;
  actionButton?: React.ReactNode;
}

export default function BPPriceCard({
  title,
  price,
  pricingDescription,
  children,
  className,
  popular,
  actionButton,
}: BPPriceCardProps) {
  return (
    <div className="relative w-full md:w-[300px] rounded-lg shadow-xl">
      {popular && (
        <div className="absolute w-full p-2 font-semibold text-center text-white bg-blue-500 rounded-t-lg -top-2">
          <p className="text-white body1-bold">POPULAR</p>
        </div>
      )}
      <BPCard
        className={`p-[30px] flex flex-col justify-between h-full ${className} ${
          popular &&
          "border-2 border-blue-500 rounded-t-none justify-between h-full"
        }`}
      >
        <div className="items-center text-center p-[20px] h-[40%]">
          <p className="font-semibold tracking-widest uppercase">{title}</p>
          <p className="text-[30px] font-bold text-primary">{price}</p>
          <p className="body2 text-primary">{pricingDescription}</p>
        </div>
        <Separator />
        <div className="pt-[20px] flex flex-col justify-between gap-4 h-[60%]">
          {children}
        </div>
        <div className="mt-4">{actionButton}</div>
      </BPCard>
    </div>
  );
}
