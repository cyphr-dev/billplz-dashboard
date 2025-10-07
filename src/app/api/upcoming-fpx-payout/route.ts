import { NextResponse } from "next/server";

export interface FPXPayoutData {
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
      `https://${secret}.mockapi.io/api/v1/upcoming-fpx-payout`,
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

    const data: FPXPayoutData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching upcoming FPX payout:", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming FPX payout data" },
      { status: 500 }
    );
  }
}
