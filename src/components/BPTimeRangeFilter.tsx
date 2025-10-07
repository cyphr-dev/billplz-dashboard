"use client";

import { useState } from "react";
import BPButton from "@/components/BPButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

export interface FilterValue {
  name: string;
  value: string;
}

interface BPTimeRangeFilterProps {
  defaultValue?: string;
  filterValues?: FilterValue[];
  onFilterChange?: (filter: FilterValue) => void;
  showComparison?: boolean;
  className?: string;
}

const defaultFilterValues: FilterValue[] = [
  { name: "day", value: "today" },
  { name: "last 7 days", value: "week" },
  { name: "month", value: "month" },
  { name: "year", value: "year" },
];

export default function BPTimeRangeFilter({
  defaultValue = "month",
  filterValues = defaultFilterValues,
  onFilterChange,
  showComparison = true,
  className = "",
}: BPTimeRangeFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState(() => {
    return (
      filterValues.find((f) => f.value === defaultValue) || filterValues[2]
    );
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterChange = (filter: FilterValue) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
    onFilterChange?.(filter);
  };

  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <BPButton variant="outline" className="capitalize">
            <Filter className="w-4 h-4" />
            This {selectedFilter.name}
          </BPButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="flex flex-col">
          {filterValues.map((filter, index) => (
            <BPButton
              variant="ghost"
              className="flex justify-start capitalize"
              key={index}
              onClick={() => handleFilterChange(filter)}
            >
              {filter.name}
            </BPButton>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {showComparison && (
        <p className="body2">Compared to previous {selectedFilter.name}</p>
      )}
    </div>
  );
}
