import { NextResponse } from "next/server";

export interface BillingTotalPaidData {
  companyName: string;
  date: string;
  collectionTotal: string;
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
      `https://${secret}.mockapi.io/api/v1/billing-total-paid`,
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

    const data: BillingTotalPaidData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching billing total paid data:", error);
    return NextResponse.json(
      { error: "Failed to fetch billing total paid data" },
      { status: 500 }
    );
  }
}
