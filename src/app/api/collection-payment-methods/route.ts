import { NextResponse } from "next/server";

export interface PaymentMethodData {
  name: string;
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
      `https://${secret}.mockapi.io/api/v1/collection-payment-methods`,
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

    const data: PaymentMethodData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching payment methods data:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment methods data" },
      { status: 500 }
    );
  }
}
