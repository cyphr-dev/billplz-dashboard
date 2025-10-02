import BPCard from "@/components/BPBentoCard";
import BPHeader from "@/components/BPHeader";
import BPTrend from "@/components/BPTrend";

const cardContents = [
  {
    title: "Total Paid",
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
    title: "Top 5 Performing Collections",
    content: <>Insert Bar Chart Here</>,
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
  {
    title: "Total Payouts",
    actionButton: <button>View all</button>,
    content: (
      <>
        <div className="flex flex-row">
          <p className="text-2xl font-semibold">RM25,000.00</p>
          <BPTrend value="5.6" />
        </div>
        <div>Insert line graph here</div>
      </>
    ),
  },
  {
    title: "Active vs. Inactive Collections",
    content: <>Insert Pie Chart Here</>,
  },
  {
    title: "Collections by Payment Methods",
    content: <>Insert Pie Chart Here</>,
  },
];

export default function BillingPage() {
  return (
    <>
      <BPHeader title="Billing" />
      <div className="grid grid-cols-3 gap-4">
        {cardContents.map((card, index) => (
          <BPCard
            key={index}
            className="col-span-3 md:col-span-1"
            title={card.title}
            actionButton={card.actionButton}
          >
            {card.content}
          </BPCard>
        ))}
      </div>
    </>
  );
}
