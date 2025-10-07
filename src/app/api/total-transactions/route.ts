import { NextResponse } from "next/server";

export interface TransactionData {
  createdAt: string;
  date: string;
  value: string;
  id: string;
}

export async function GET() {
  try {
    const secret = process.env.SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://${secret}.mockapi.io/api/v1/total-transactions`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        // Add cache control for better performance
        cache: "no-store", // or 'force-cache' if you want caching
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TransactionData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching total transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch total transactions" },
      { status: 500 }
    );
  }
}
