import { NextRequest, NextResponse } from "next/server";

export interface CollectionData {
  createdAt: string;
  name: string;
  collectedValue: string;
  volume: number;
  id: string;
  paid: boolean;
}

export interface CollectionResponse {
  data: CollectionData[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function GET(request: NextRequest) {
  try {
    const secret = process.env.SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50); // Max 50 per page
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";
    const minVolume = searchParams.get("minVolume");
    const maxVolume = searchParams.get("maxVolume");
    const minValue = searchParams.get("minValue");
    const maxValue = searchParams.get("maxValue");
    const statuses = searchParams.getAll("status");
    const paid = searchParams.get("paid");
    const collectionName = searchParams.get("collectionName");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    // Build query parameters for MockAPI
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy: sortBy,
      order: order,
    });

    // Add search if provided
    if (search) {
      console.log(`Searching for: "${search}"`);
      queryParams.append("search", search);
    }

    // Add volume filters
    if (minVolume) {
      queryParams.append("volume_gte", minVolume);
    }
    if (maxVolume) {
      queryParams.append("volume_lte", maxVolume);
    }

    // Add value filters (for collectedValue)
    if (minValue) {
      queryParams.append("collectedValue_gte", minValue);
    }
    if (maxValue) {
      queryParams.append("collectedValue_lte", maxValue);
    }

    // Add paid status filter
    if (paid !== null) {
      queryParams.append("paid", paid);
    }

    // Handle status filters (legacy support for checkbox filters)
    if (statuses.length > 0) {
      // If both paid and unpaid are selected, don't add filter (show all)
      if (statuses.includes("paid") && !statuses.includes("unpaid")) {
        queryParams.append("paid", "true");
      } else if (statuses.includes("unpaid") && !statuses.includes("paid")) {
        queryParams.append("paid", "false");
      }
      // If both or neither are selected, don't add the paid filter
    }

    // Add collection name filter (search by name)
    if (collectionName) {
      queryParams.append("name", collectionName);
    }

    // Add date range filters
    if (dateFrom) {
      queryParams.append("createdAt_gte", dateFrom);
    }
    if (dateTo) {
      queryParams.append("createdAt_lte", dateTo);
    }

    const response = await fetch(
      `https://${secret}.mockapi.io/api/v1/collections?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    // Handle different response scenarios
    let data: CollectionData[] = [];

    if (response.ok) {
      const responseData = await response.json();
      // MockAPI might return an array or an object with data
      data = Array.isArray(responseData) ? responseData : [];
    } else if (response.status === 404) {
      // 404 means no results found, which is fine for search
      data = [];
    } else {
      // Only throw for actual server errors (5xx)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // If searching and no results found, return empty results gracefully
    if (search && data.length === 0) {
      const result: CollectionResponse = {
        data: [],
        totalCount: 0,
        page: 1,
        limit,
        totalPages: 0,
      };
      return NextResponse.json(result);
    }

    // MockAPI doesn't return total count in headers, so we'll estimate based on the returned data
    const totalCount =
      data.length === limit
        ? page * limit + 1
        : (page - 1) * limit + data.length;
    const totalPages = Math.ceil(totalCount / limit);

    const result: CollectionResponse = {
      data,
      totalCount,
      page,
      limit,
      totalPages,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections data" },
      { status: 500 }
    );
  }
}
