import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const payments = await db.reward.findMany({
      include: {
        user: {
          select: {
            displayName: true,
            email: true,
            phone: true,
            country: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, payments });
  } catch (error) {
    console.error("Payments API GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch payments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or Status" }, { status: 400 });
    }

    const payment = await db.reward.update({
      where: { id },
      data: {
        status: status.toLowerCase(),
      },
    });

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error("Payments API POST Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update payment status" }, { status: 500 });
  }
}
