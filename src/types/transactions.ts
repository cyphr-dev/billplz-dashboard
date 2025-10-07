export interface TransactionData {
  createdAt: string;
  date: string;
  value: string;
  id: string;
}

export interface TotalTransactionsStats {
  count: number;
  totalValue: number;
  trend: string;
  chartData: Array<{
    month: string;
    value: number;
  }>;
}

export interface FPXPayoutData {
  date: string;
  value: string;
  id: string;
}

export interface ProcessedFPXPayoutData {
  totalAmount: number;
  expectedDate: string;
  collections: Array<{
    date: string;
    amount: string;
  }>;
}

export interface CollectionData {
  createdAt: string;
  date: string;
  value: string;
  id: string;
}

export interface TotalCollectionsStats {
  totalAmount: number;
  trend: string;
  chartData: Array<{
    month: string;
    value: number;
    label: string;
  }>;
}

export interface PayoutData {
  date: string;
  value: string;
  id: string;
}

export interface TotalPayoutsStats {
  totalAmount: number;
  trend: string;
  chartData: Array<{
    month: string;
    value: number;
    label: string;
  }>;
}

export interface ActiveCollectionData {
  type: boolean;
  value: number;
  id: string;
}

export interface ActiveInactiveStats {
  active: number;
  inactive: number;
  total: number;
  activePercentage: number;
  inactivePercentage: number;
}

export interface PaymentMethodData {
  name: string;
  value: string;
  id: string;
}

export interface PaymentMethodStats {
  methods: Array<{
    name: string;
    value: number;
    percentage: number;
    label: string;
  }>;
  totalValue: number;
}

export interface BillingTotalPaidData {
  companyName: string;
  date: string;
  collectionTotal: string;
  id: string;
}

export interface TopPerformingCollection {
  name: string;
  value: number;
  percentage: number;
  displayValue: string;
}

export interface TopPerformingCollectionsStats {
  collections: TopPerformingCollection[];
  totalSum: number;
}

export interface TotalPaidData {
  createdAt: string;
  value: string;
  id: string;
}

export interface TotalNumCollectionsData {
  createdAt: string;
  value: number;
  id: string;
}

// Collections Table Types
export interface CollectionTableData {
  createdAt: string;
  name: string;
  collectedValue: string;
  volume: number;
  id: string;
  paid: boolean;
}

export interface CollectionTableResponse {
  data: CollectionTableData[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CollectionFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "name" | "collectedValue" | "volume";
  order?: "asc" | "desc";
  minVolume?: number;
  maxVolume?: number;
  minValue?: number;
  maxValue?: number;
  status?: string[];
  paid?: boolean;
  collectionName?: string;
  dateFrom?: string;
  dateTo?: string;
}
