"use client";

import BPButton from "@/components/BPButton";
import BPHeader from "@/components/BPHeader";
import BPPriceCard from "@/components/BPPriceCard";
import BPSection from "@/components/BPSection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { VisuallyHidden } from "react-aria-components";

const priceCards = [
  {
    title: "Basic",
    price: "RM 100",
    pricingDescription: "per month",
    pricingContent: [
      { feature: "Latest 100 customer data" },
      { feature: "Process" },
      { feature: "Feature 3" },
    ],
    subscribed: true,
    popular: false,
  },
  {
    title: "Standard",
    price: "RM 500",
    pricingDescription: "per month",
    pricingButton: <button>View all</button>,
    pricingContent: [
      { feature: "Latest 100 customer data" },
      { feature: "Process" },
      { feature: "Feature 3" },
      { feature: "Feature Hidden 4" },
    ],
    subscribed: false,
    popular: true,
  },
  {
    title: "Super",
    price: "RM 1000",
    pricingDescription: "per month",
    pricingButton: <button>See details</button>,
    pricingContent: [
      { feature: "Latest 100 customer data" },
      { feature: "Process" },
      { feature: "Feature 3" },
      { feature: "Feature Hidden 4" },
      { feature: "Feature Hidden 5" },
    ],
    subscribed: false,
    popular: false,
  },
];

export default function SubscriptionPage() {
  const [dateRange, setDateRange] = useState("27/05/2024 to 27/06/2024");
  const [currentSubscription, setCurrentSubscription] = useState("Basic");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePlanSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    // Update date range based on current date (simulate dynamic dates)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const formatDate = (date: Date) => {
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    };

    setDateRange(`${formatDate(startDate)} to ${formatDate(endDate)}`);
    setIsDialogOpen(true);
  };

  const handleSubscriptionConfirm = () => {
    // Change the active subscription
    setCurrentSubscription(selectedPlan);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const changePlanButton = ({
    card,
    isCurrentPlan,
  }: {
    card: (typeof priceCards)[number];
    isCurrentPlan: boolean;
  }) => {
    return (
      <Dialog
        open={isDialogOpen && selectedPlan === card.title}
        onOpenChange={setIsDialogOpen}
      >
        <DialogTrigger className="w-full" asChild>
          <BPButton
            disabled={isCurrentPlan}
            className="w-full"
            onClick={() => handlePlanSelect(card.title)}
          >
            {isCurrentPlan ? "Current Plan" : "Subscribe Plan"}
          </BPButton>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Change Subscription?</DialogTitle>
              <DialogDescription>
                You are about to change your subscription to the {card.title}
                plan.
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <div className="flex flex-col gap-6">
            <p className="body2">
              Billplz will deduct {card.price} (non-refundable) from your credit
              balance to activate the {card.title} plan subscription from{" "}
              {dateRange}. Do you agree?
            </p>
            <div className="flex justify-between gap-2">
              <BPButton
                variant="outline"
                className="w-[48%]"
                onClick={handleCancel}
              >
                Cancel
              </BPButton>
              <BPButton
                variant="outline"
                className="w-[48%]"
                onClick={handleSubscriptionConfirm}
              >
                OK
              </BPButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <BPHeader title="Subscription" />
      <p className="mb-6 body2">
        Access our rich analytics data by subscribing to your desired
        subscription plan
      </p>
      <BPSection className="flex flex-row flex-wrap gap-4">
        {priceCards.map((card, index) => {
          const isCurrentPlan = currentSubscription === card.title;
          return (
            <BPPriceCard
              key={index}
              title={card.title}
              price={card.price}
              pricingDescription={card.pricingDescription}
              popular={card.popular}
              actionButton={changePlanButton({ card, isCurrentPlan })}
              className="h-full"
            >
              <div className="flex flex-col h-full gap-2">
                <p className="body1-bold">ACCESS TO</p>
                {card.pricingContent.map((content, idx) => (
                  <p key={idx} className="body1">
                    {content.feature}
                  </p>
                ))}
              </div>
            </BPPriceCard>
          );
        })}
      </BPSection>
    </>
  );
}
