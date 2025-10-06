"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

import BPButton from "@/components/BPButton";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dropdown-menu";

export interface Collection {
  id: string;
  name: string;
  description: string;
  amount: number;
  status: "active" | "inactive" | "pending";
  createdDate: Date;
  lastPayment: Date | null;
  totalCollected: number;
  paymentMethod: string;
}

// Sample data
const sampleData: Collection[] = [
  {
    id: "1",
    name: "Monthly Tuition Fee",
    description: "Monthly fee collection for tuition center",
    amount: 150.0,
    status: "active",
    createdDate: new Date("2024-01-15"),
    lastPayment: new Date("2024-10-01"),
    totalCollected: 4500.0,
    paymentMethod: "FPX",
  },
  {
    id: "2",
    name: "Course Registration",
    description: "One-time registration fee",
    amount: 50.0,
    status: "inactive",
    createdDate: new Date("2024-02-20"),
    lastPayment: new Date("2024-09-15"),
    totalCollected: 2000.0,
    paymentMethod: "Card",
  },
  {
    id: "3",
    name: "Workshop Fee",
    description: "Weekend workshop payment",
    amount: 75.0,
    status: "active",
    createdDate: new Date("2024-03-10"),
    lastPayment: new Date("2024-10-05"),
    totalCollected: 1125.0,
    paymentMethod: "Wallet",
  },
  {
    id: "4",
    name: "Equipment Rental",
    description: "Monthly equipment rental fee",
    amount: 200.0,
    status: "pending",
    createdDate: new Date("2024-04-01"),
    lastPayment: null,
    totalCollected: 800.0,
    paymentMethod: "FPX",
  },
  {
    id: "5",
    name: "Exam Fee",
    description: "Examination fee collection",
    amount: 25.0,
    status: "active",
    createdDate: new Date("2024-05-12"),
    lastPayment: new Date("2024-10-03"),
    totalCollected: 750.0,
    paymentMethod: "Card",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-positive text-positive-foreground";
    case "inactive":
      return "bg-muted text-muted-foreground";
    case "pending":
      return "bg-yellow-500 text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

interface CollectionsTableProps {
  data?: Collection[];
  statusFilter?: string;
  searchQuery?: string;
}

export function CollectionsTable({
  data = sampleData,
  statusFilter = "all",
  searchQuery = "",
}: CollectionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Reset pagination when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [statusFilter, searchQuery]);

  const columns: ColumnDef<Collection>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Collection Name",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.getValue("name")}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.description}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-MY", {
            style: "currency",
            currency: "MYR",
          }).format(amount);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge className={getStatusColor(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      },
      {
        accessorKey: "totalCollected",
        header: "Total Collected",
        cell: ({ row }) => {
          const total = parseFloat(row.getValue("totalCollected"));
          const formatted = new Intl.NumberFormat("en-MY", {
            style: "currency",
            currency: "MYR",
          }).format(total);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        cell: ({ row }) => (
          <Badge variant="outline">{row.getValue("paymentMethod")}</Badge>
        ),
      },
      {
        accessorKey: "createdDate",
        header: "Created Date",
        cell: ({ row }) => {
          const date = row.getValue("createdDate") as Date;
          return <div>{format(date, "MMM dd, yyyy")}</div>;
        },
      },
      {
        accessorKey: "lastPayment",
        header: "Last Payment",
        cell: ({ row }) => {
          const date = row.getValue("lastPayment") as Date | null;
          return (
            <div>{date ? format(date, "MMM dd, yyyy") : "No payments yet"}</div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <BPButton variant="outline" size="sm">
                  <EllipsisVertical />
                </BPButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <BPButton variant="ghost">View Collection</BPButton>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.filter((item) => {
      // Safely check status filter
      const matchesStatus =
        !statusFilter || statusFilter === "all" || item.status === statusFilter;

      // Safely check search query
      const matchesSearch =
        !searchQuery ||
        searchQuery === "" ||
        (item.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStatus && matchesSearch;
    });
  }, [data, statusFilter, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: false,
    pageCount: -1,
  });

  // Add safety check for table data
  if (!table) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading table...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 uppercase">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
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
                  {filteredData.length === 0 && searchQuery
                    ? `No collections found matching "${searchQuery}"`
                    : filteredData.length === 0 && statusFilter !== "all"
                    ? `No ${statusFilter} collections found`
                    : "No collections found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} collections
        </div>
        <div className="flex items-center space-x-2">
          <BPButton
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </BPButton>
          <BPButton
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </BPButton>
        </div>
      </div>
    </div>
  );
}
