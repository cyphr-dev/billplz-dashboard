import { NextResponse } from "next/server";

export interface CollectionData {
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
      `https://${secret}.mockapi.io/api/v1/total-collections`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CollectionData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching total collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch total collections data" },
      { status: 500 }
    );
  }
}
