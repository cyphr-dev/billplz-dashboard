"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Search,
  Filter,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import BPButton from "@/components/BPButton";
import BPEmptyErrorState from "@/components/BPEmptyErrorState";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import { Skeleton } from "@/components/ui/skeleton";
import type {
  CollectionTableResponse,
  CollectionFilters,
  CollectionTableData,
} from "@/types/transactions";
import BPCard from "@/components/BPCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import BPDateRangePicker from "@/components/BPDateRangePicker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// API fetch function with abort signal
async function fetchCollections(
  filters: CollectionFilters,
  signal?: AbortSignal
): Promise<CollectionTableResponse> {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.order) params.append("order", filters.order);
  if (filters.minVolume)
    params.append("minVolume", filters.minVolume.toString());
  if (filters.maxVolume)
    params.append("maxVolume", filters.maxVolume.toString());
  if (filters.minValue) params.append("minValue", filters.minValue.toString());
  if (filters.maxValue) params.append("maxValue", filters.maxValue.toString());
  if (filters.status && filters.status.length > 0) {
    filters.status.forEach((status) => params.append("status", status));
  }
  if (filters.paid !== undefined) {
    params.append("paid", filters.paid.toString());
  }
  if (filters.collectionName) {
    params.append("collectionName", filters.collectionName);
  }
  if (filters.dateFrom) {
    params.append("dateFrom", filters.dateFrom);
  }
  if (filters.dateTo) {
    params.append("dateTo", filters.dateTo);
  }

  const response = await fetch(`/api/collections?${params.toString()}`, {
    signal,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch collections data: ${response.status}`);
  }

  return response.json();
}

interface CollectionsTableProps {
  className?: string;
}

// Search and Filters Component
interface SearchAndFiltersProps {
  searchInput: string;
  isSearchFocused: boolean;
  isFetching: boolean;
  debouncedSearch: string;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  selectedStatusFilter: string;
  onStatusFilterChange: (value: string) => void;

  // Filter sheet props
  filterSheetCollectionName: string;
  filterSheetStatuses: string[];
  isFilterSheetOpen: boolean;
  onFilterSheetCollectionNameChange: (value: string) => void;
  onFilterSheetStatusChange: (status: string, checked: boolean) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onFilterSheetOpenChange: (open: boolean) => void;
}

function SearchAndFilters({
  searchInput,
  isSearchFocused,
  isFetching,
  debouncedSearch,
  searchInputRef,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  selectedStatusFilter,
  onStatusFilterChange,
  filterSheetCollectionName,
  filterSheetStatuses,
  isFilterSheetOpen,
  onFilterSheetCollectionNameChange,
  onFilterSheetStatusChange,
  onApplyFilters,
  onResetFilters,
  onFilterSheetOpenChange,
}: SearchAndFiltersProps) {
  return (
    <div className="flex flex-col-reverse justify-between px-3 pt-3 space-x-3 md:pt-0 md:pr-3 md:items-center md:flex-row">
      <ToggleGroup
        type="single"
        value={selectedStatusFilter}
        onValueChange={onStatusFilterChange}
        size={"lg"}
      >
        <ToggleGroupItem value="all" className="body14-regular">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="paid" className="body14-regular">
          Paid
        </ToggleGroupItem>
        <ToggleGroupItem value="unpaid" className="body14-regular">
          Unpaid
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search
            className={`absolute left-2 top-2.5 h-4 w-4 text-muted-foreground ${
              isFetching && searchInput !== debouncedSearch
                ? "animate-pulse"
                : ""
            }`}
          />
          <Input
            ref={searchInputRef}
            placeholder="Search"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
            className={`pl-8 ${isSearchFocused ? "ring-2 ring-primary" : ""} ${
              isFetching && searchInput !== debouncedSearch ? "pr-8" : ""
            }`}
            autoComplete="off"
            type="text"
          />
          {isFetching && searchInput !== debouncedSearch && (
            <div className="absolute right-2 top-2.5">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full animate-spin border-t-primary"></div>
            </div>
          )}
        </div>
        <Sheet open={isFilterSheetOpen} onOpenChange={onFilterSheetOpenChange}>
          <SheetTrigger asChild>
            <BPButton variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </BPButton>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-col gap-1">
                <p className="body12-regular">Collection Name</p>
                <Input
                  placeholder="Type to search"
                  value={filterSheetCollectionName}
                  onChange={(e) =>
                    onFilterSheetCollectionNameChange(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="body12-regular">Date Range</p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="relative z-10"
                >
                  <BPDateRangePicker />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="body12-regular">Status</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-paid"
                      checked={filterSheetStatuses.includes("paid")}
                      onCheckedChange={(checked) =>
                        onFilterSheetStatusChange("paid", checked === true)
                      }
                    />
                    <label
                      htmlFor="filter-paid"
                      className="leading-none body14-regular peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Paid
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filter-unpaid"
                      checked={filterSheetStatuses.includes("unpaid")}
                      onCheckedChange={(checked) =>
                        onFilterSheetStatusChange("unpaid", checked === true)
                      }
                    />
                    <label
                      htmlFor="filter-unpaid"
                      className="leading-none body14-regular peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Unpaid
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-x-2">
                <BPButton onClick={onApplyFilters}>Apply Filters</BPButton>
                <BPButton variant="outline" onClick={onResetFilters}>
                  Reset
                </BPButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export function CollectionsTable({ className }: CollectionsTableProps) {
  const [filters, setFilters] = useState<CollectionFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    order: "desc",
  });
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Filter sheet states (separate from applied filters)
  const [filterSheetCollectionName, setFilterSheetCollectionName] =
    useState("");
  const [filterSheetStatuses, setFilterSheetStatuses] = useState<string[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Handle search input with debounce - separate from filters to prevent excessive API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setFilters((prev) => ({
        ...prev,
        search: searchInput,
        page: 1, // Reset to first page on search
      }));
    }, 800); // Increased debounce time to prevent freezing

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    let updatedStatuses: string[];
    if (checked) {
      updatedStatuses = [...selectedStatuses, status];
    } else {
      updatedStatuses = selectedStatuses.filter((s) => s !== status);
    }
    setSelectedStatuses(updatedStatuses);
    setFilters((prev) => ({
      ...prev,
      status: updatedStatuses,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleStatusFilterChange = (value: string) => {
    setSelectedStatusFilter(value);
    setFilters((prev) => ({
      ...prev,
      paid: value === "paid" ? true : value === "unpaid" ? false : undefined,
      page: 1, // Reset to first page on filter change
    }));
  };

  // Filter sheet handlers
  const handleFilterSheetStatusChange = (status: string, checked: boolean) => {
    let updatedStatuses: string[];
    if (checked) {
      updatedStatuses = [...filterSheetStatuses, status];
    } else {
      updatedStatuses = filterSheetStatuses.filter((s) => s !== status);
    }
    setFilterSheetStatuses(updatedStatuses);
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      collectionName: filterSheetCollectionName || undefined,
      status: filterSheetStatuses.length > 0 ? filterSheetStatuses : undefined,
      page: 1, // Reset to first page
    }));

    // Also update the regular status state for consistency
    setSelectedStatuses(filterSheetStatuses);

    setIsFilterSheetOpen(false);
  };

  const handleResetFilters = () => {
    setFilterSheetCollectionName("");
    setFilterSheetStatuses([]);

    setFilters((prev) => ({
      page: 1,
      limit: prev.limit,
      sortBy: prev.sortBy,
      order: prev.order,
      // Keep search and paid filter from toggle group
      search: prev.search,
      paid: prev.paid,
    }));

    // Reset regular status state too
    setSelectedStatuses([]);

    setIsFilterSheetOpen(false);
  };

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [
      "collections",
      filters.page,
      filters.limit,
      filters.sortBy,
      filters.order,
      debouncedSearch,
      selectedStatuses,
      filters.paid,
      filters.collectionName,
      filters.status,
    ],
    queryFn: ({ signal }) =>
      fetchCollections({ ...filters, search: debouncedSearch }, signal),
    staleTime: 2 * 60 * 1000, // 2 minutes - shorter stale time
    gcTime: 5 * 60 * 1000, // 5 minutes cache
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors like search not found)
      if (error.message.includes("4")) return false;
      // Retry up to 2 times for server errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: true, // Always enabled
    placeholderData: (previousData) => previousData, // Keep previous data while loading new data
  });

  const columns: ColumnDef<CollectionTableData>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Collection Name",
        cell: ({ row }) => (
          <div className="min-w-0 max-w-[200px]">
            <div className="text-black truncate body2">
              {row.getValue("name")}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "id",
        header: "Collection ID",
        cell: ({ row }) => (
          <div className="min-w-0 max-w-[200px]">
            <div className="text-black truncate body2">
              {row.getValue("id")}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "collectedValue",
        header: "Total Collected",
        cell: ({ row }) => {
          const value = parseFloat(row.getValue("collectedValue"));
          const formatted = new Intl.NumberFormat("en-MY", {
            style: "currency",
            currency: "MYR",
          }).format(value);
          return (
            <div className="text-right text-black body2 whitespace-nowrap">
              {formatted}
            </div>
          );
        },
      },
      {
        accessorKey: "volume",
        header: "Volume",
        cell: ({ row }) => {
          const volume = row.getValue("volume") as number;
          return (
            <div className="text-black text-end body2">
              {volume.toLocaleString()}
            </div>
          );
        },
      },
      {
        accessorKey: "paid",
        header: "Status",
        cell: ({ row }) => {
          const paid = row.getValue("paid") as boolean;
          return (
            <div className="flex items-center">
              <div
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  paid
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {paid ? "Paid" : "Unpaid"}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: () => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <BPButton variant="outline" size="sm">
                  <EllipsisVertical className="w-4 h-4" />
                </BPButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Action 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  // Handle sorting changes
  const handleSortingChange = (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState)
  ) => {
    setSorting(updaterOrValue);

    const newSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;

    if (newSorting.length > 0) {
      const { id, desc } = newSorting[0];
      setFilters((prev) => ({
        ...prev,
        sortBy: id as CollectionFilters["sortBy"],
        order: desc ? "desc" : "asc",
        page: 1,
      }));
    }
  };

  const table = useReactTable({
    data: (response as CollectionTableResponse)?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: handleSortingChange,
    manualSorting: true,
    enableSorting: true,
  });

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setFilters((prev) => ({ ...prev, limit: newPageSize, page: 1 }));
  };

  // Don't show full loading state - keep search input visible always

  const totalPages = (response as CollectionTableResponse)?.totalPages || 1;
  const currentPage = (response as CollectionTableResponse)?.page || 1;

  // Render error content only (search and filters will be rendered in the main component)
  const renderErrorContent = () => (
    <div className="space-y-4">
      <BPEmptyErrorState
        icon={<AlertCircle className="w-12 h-12 text-red-500" />}
        title="Unable to load collections"
        description={
          debouncedSearch
            ? `Cannot search for "${debouncedSearch}" at the moment`
            : "There was an error loading the collections data"
        }
      />
      <div className="flex justify-center">
        <BPButton
          onClick={() => window.location.reload()}
          variant="outline"
          size="sm"
        >
          Retry
        </BPButton>
      </div>
    </div>
  );

  return (
    <BPCard noPadding className={`w-full ${className}`}>
      {/* Unified Search and Filters Component */}
      <SearchAndFilters
        searchInput={searchInput}
        isSearchFocused={isSearchFocused}
        isFetching={isFetching}
        debouncedSearch={debouncedSearch}
        searchInputRef={searchInputRef}
        onSearchChange={handleSearchChange}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        selectedStatusFilter={selectedStatusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        filterSheetCollectionName={filterSheetCollectionName}
        filterSheetStatuses={filterSheetStatuses}
        isFilterSheetOpen={isFilterSheetOpen}
        onFilterSheetCollectionNameChange={setFilterSheetCollectionName}
        onFilterSheetStatusChange={handleFilterSheetStatusChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        onFilterSheetOpenChange={setIsFilterSheetOpen}
      />

      {/* Conditional Content: Show error or normal content */}
      {isError && !response ? (
        renderErrorContent()
      ) : (
        <>
          {/* Desktop Table View - Hidden on mobile */}
          <div className="hidden md:block max-w-full overflow-x-auto border  md:h-[calc(100vh-710px)] lg:h-[calc(100vh-610px)]">
            <Table className="min-w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="min-w-0 px-4 py-3 uppercase cursor-pointer body1-bold hover:bg-muted/50"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center space-x-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {{
                            asc: " ↑",
                            desc: " ↓",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {(isLoading || isFetching) && !response ? (
                  // Show skeletons only on initial load or when no previous data
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      {columns.map((_, colIndex) => (
                        <TableCell
                          key={`skeleton-${i}-${colIndex}`}
                          className="px-4 py-3"
                        >
                          <Skeleton className="w-full h-4" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={`hover:bg-muted/50 ${
                        isFetching ? "opacity-60" : ""
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4 py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {debouncedSearch
                        ? `No collections found matching "${debouncedSearch}"`
                        : "No collections found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View - Visible only on mobile */}
          <div className="block px-3 md:hidden ">
            {(isLoading || isFetching) && !response ? (
              // Mobile skeleton loading
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`mobile-skeleton-${i}`}
                    className="p-4 border rounded-lg"
                  >
                    <Skeleton className="w-3/4 h-5 mb-2" />
                    <Skeleton className="w-1/2 h-4 mb-1" />
                    <Skeleton className="w-2/3 h-4 mb-1" />
                    <Skeleton className="w-1/3 h-4" />
                  </div>
                ))}
              </div>
            ) : table.getRowModel().rows?.length ? (
              <div className="pb-3 space-y-3 h-[calc(100vh-210px)] overflow-y-auto">
                {table.getRowModel().rows.map((row) => {
                  const collection = row.original;
                  const value = parseFloat(collection.collectedValue);
                  const formattedValue = new Intl.NumberFormat("en-MY", {
                    style: "currency",
                    currency: "MYR",
                  }).format(value);

                  return (
                    <div
                      key={row.id}
                      className={`p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors ${
                        isFetching ? "opacity-60" : ""
                      }`}
                    >
                      {/* Collection Name */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="truncate body3-bold">
                            {collection.name}
                          </h3>
                          <p className="mt-1 text-gray-500 body2">
                            {collection.id}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <BPButton
                              variant="outline"
                              size="sm"
                              className="ml-2"
                            >
                              <EllipsisVertical className="w-4 h-4" />
                            </BPButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Action 2</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Collection Details */}
                      <div className="grid gap-2 text-sm grid-cols">
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500 uppercase body1-bold">
                            Collected
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-positive" />
                            <p className="text-gray-900 body2">
                              {formattedValue}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 uppercase body1-bold">
                            Volume
                          </span>
                          <p className="text-gray-900 body2">
                            {collection.volume.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 uppercase body1-bold">
                            Status
                          </span>
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              collection.paid
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {collection.paid ? "Paid" : "Unpaid"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                {debouncedSearch
                  ? `No collections found matching "${debouncedSearch}"`
                  : "No collections found."}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center px-3 py-2">
            <div className="flex items-center space-x-2">
              <BPButton
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </BPButton>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber =
                    currentPage <= 3
                      ? i + 1
                      : currentPage >= totalPages - 2
                      ? totalPages - 4 + i
                      : currentPage - 2 + i;

                  if (pageNumber < 1 || pageNumber > totalPages) return null;

                  return (
                    <BPButton
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </BPButton>
                  );
                })}
              </div>
              <BPButton
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </BPButton>
            </div>
          </div>
        </>
      )}
    </BPCard>
  );
}
