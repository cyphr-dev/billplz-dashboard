"use client";

import BPHeader from "@/components/BPHeader";
import BPSection from "@/components/BPSection";
import BPTimeRangeFilter, { FilterValue } from "@/components/BPTimeRangeFilter";

import { CollectionsTable } from "@/components/pages/billing/CollectionsTable";
import TotalCollection from "@/components/pages/billing/TotalCollection";
import TotalPaid from "@/components/pages/billing/TotalPaid";
import TotalPaidChart from "@/components/pages/billing/TotalPaidChart";
import TopPerformingCollections from "@/components/pages/dashboard/TopPerformingCollections";
import { useState } from "react";

export default function BillingPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>({
    name: "month",
    value: "month",
  });

  const handleFilterChange = (filter: FilterValue) => {
    setSelectedFilter(filter);
    // You can add additional logic here to filter billing data
    console.log("Billing filter changed to:", filter);
  };

  return (
    <>
      <BPHeader
        title="Billing"
        rightChildren={
          <BPTimeRangeFilter
            defaultValue="month"
            onFilterChange={handleFilterChange}
            showComparison={true}
          />
        }
      />
      <BPSection className="grid grid-rows-3 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalPaidChart className="col-span-3 row-span-3 md:col-span-1" />
        <TopPerformingCollections className="col-span-3 row-span-3 md:col-span-1" />
        <TotalPaid className="col-span-3 row-span-1 md:col-span-1" />
        <TotalCollection className="col-span-3 row-span-1 md:col-span-1" />
      </BPSection>
      <BPSection title="Collections" className="mt-4">
        <CollectionsTable />
      </BPSection>
    </>
  );
}
