"use client";

import BPHeader from "@/components/BPHeader";
import BPSection from "@/components/BPSection";
import BPTimeRangeFilter, { FilterValue } from "@/components/BPTimeRangeFilter";
import ActiveInactiveCollections from "@/components/pages/dashboard/ActiveInactiveCollections";
import PaymentMethodsCollections from "@/components/pages/dashboard/PaymentMethodsCollections";
import TopPerformingCollections from "@/components/pages/dashboard/TopPerformingCollections";
import TotalCollections from "@/components/pages/dashboard/TotalCollections";
import TotalPayouts from "@/components/pages/dashboard/TotalPayouts";
import TotalTransactions from "@/components/pages/dashboard/TotalTransactions";
import UpcomingFPXPayout from "@/components/pages/dashboard/UpcomingFPXPayout";
import { useState } from "react";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>({
    name: "month",
    value: "month",
  });

  const handleFilterChange = (filter: FilterValue) => {
    setSelectedFilter(filter);
    // You can add additional logic here to filter dashboard data
    console.log("Dashboard filter changed to:", filter);
  };

  return (
    <>
      <BPHeader
        title="Overview Dashboard"
        rightChildren={
          <BPTimeRangeFilter
            defaultValue="month"
            onFilterChange={handleFilterChange}
            showComparison={true}
          />
        }
      />
      <BPSection className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalCollections className="col-span-3 md:col-span-1" />
        <TotalTransactions className="col-span-3 md:col-span-1" />
        <UpcomingFPXPayout className="col-span-3 md:col-span-1" />
        <TotalPayouts className="col-span-3 md:col-span-1" />
        <TopPerformingCollections className="col-span-3 md:col-span-1" />
        <ActiveInactiveCollections className="col-span-3 md:col-span-1" />
        <PaymentMethodsCollections className="col-span-3 md:col-span-1" />
      </BPSection>
    </>
  );
}
