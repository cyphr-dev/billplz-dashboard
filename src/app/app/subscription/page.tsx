import BPCard from "@/components/BPCard";
import BPHeader from "@/components/BPHeader";
import BPTrend from "@/components/BPTrend";

const priceCardContents = [
  {
    title: "Total Collections",
    actionButton: <button>View all</button>,
    content: (
      <>
        <div className="flex flex-row">
          <p className="text-2xl font-semibold">RM1,200.00</p>
          <BPTrend value="2.6" />
        </div>
        <div>Insert chart here</div>
      </>
    ),
  },
  {
    title: "Total Transactions",
    actionButton: <button>View all</button>,
    content: (
      <>
        <div className="flex flex-row">
          <p className="text-2xl font-semibold">39</p>
          <BPTrend value="-3.2" />
        </div>
        <div>Insert chart here</div>
      </>
    ),
  },
  {
    title: "Upcoming FPX Payout",
    actionButton: <button>See details</button>,
    content: (
      <>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">RM1,200.00</p>
          <p className="body">
            Expected to reach your bank account on 12 Sept 2021
          </p>
        </div>
      </>
    ),
  },
];

export default function SubscriptionPage() {
  return (
    <>
      <BPHeader title="Subscription" />
      <div className="grid grid-cols-3 gap-4">
        {priceCardContents.map((card, index) => (
          <BPCard key={index} className="col-span-3 md:col-span-1">
            {card.content}
          </BPCard>
        ))}
      </div>
    </>
  );
}
