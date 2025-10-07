import { NextResponse } from "next/server";

export interface TotalNumCollectionsData {
  createdAt: string;
  value: number;
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
      `https://${secret}.mockapi.io/api/v1/total-num-collections`,
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

    const data: TotalNumCollectionsData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching total num collections data:", error);
    return NextResponse.json(
      { error: "Failed to fetch total num collections data" },
      { status: 500 }
    );
  }
}
