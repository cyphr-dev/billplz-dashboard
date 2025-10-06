import BPBentoCard from "@/components/BPBentoCard";
import BPButton from "@/components/BPButton";

export default function UpcomingFPXPayout({
  className,
}: {
  className?: string;
}) {
  const fakeData = {
    title: "Upcoming FPX Payout",
    actionButton: <button>See details</button>,
    content: (
      <>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">RM1,200.00</p>
          <p className="body">
            Expected to reach your bank account on 12 Sept 2021
          </p>
          <hr />
          <p className="capitalize">COLLECTION DATE</p>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-1">Amount</td>
                <td className="font-medium text-right">RM1,200.00</td>
              </tr>
              <tr>
                <td className="py-1">Fee</td>
                <td className="font-medium text-right">RM3.00</td>
              </tr>
              <tr>
                <td className="py-1">Net Amount</td>
                <td className="font-medium text-right">RM1,197.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  };

  return (
    <BPBentoCard
      className={className}
      title={fakeData.title}
      actionButton={<BPButton variant="link">See details</BPButton>}
    >
      {fakeData.content}
    </BPBentoCard>
  );
}
