import { NextResponse } from "next/server";

export interface ActiveCollectionData {
  type: boolean;
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
      `https://${secret}.mockapi.io/api/v1/active-collection`,
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

    const data: ActiveCollectionData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching active collection data:", error);
    return NextResponse.json(
      { error: "Failed to fetch active collection data" },
      { status: 500 }
    );
  }
}
