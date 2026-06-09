import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ContributionStatus } from "@prisma/client";

export async function GET() {
  try {
    const contributions = await db.contribution.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        user: {
          select: {
            displayName: true,
            email: true,
            level: true,
            xp: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, contributions });
  } catch (error) {
    console.error("Moderation API GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch contributions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or Status" }, { status: 400 });
    }

    const contribution = await db.contribution.update({
      where: { id },
      data: {
        status: status as ContributionStatus,
      },
    });

    // Award agreements and XP if approved
    if (status === "APPROVED") {
      const user = await db.user.findUnique({ where: { id: contribution.userId } });
      if (user) {
        await db.user.update({
          where: { id: contribution.userId },
          data: {
            agreements: { increment: 1 },
            xp: { increment: contribution.xpEarned || 50 },
          },
        });
      }
    }

    return NextResponse.json({ success: true, contribution });
  } catch (error) {
    console.error("Moderation API POST Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}
