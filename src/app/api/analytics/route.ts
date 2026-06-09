import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const totalUsers = await db.user.count();
    const totalContributions = await db.contribution.count();
    
    // Count pending contributions
    const pendingContributions = await db.contribution.count({
      where: { status: "PENDING" },
    });

    // Sum of paid and pending rewards
    const rewardsData = await db.reward.findMany({
      select: {
        amount: true,
        status: true,
      },
    });

    let totalPaidXOF = 0;
    let totalPendingXOF = 0;
    for (const r of rewardsData) {
      if (r.status.toLowerCase() === "paid" || r.status.toLowerCase() === "payé") {
        totalPaidXOF += r.amount;
      } else {
        totalPendingXOF += r.amount;
      }
    }

    // Get contribution counts grouped by type
    const contributionsGrouped = await db.contribution.groupBy({
      by: ["type"],
      _count: {
        _all: true,
      },
    });

    const contributionsByType: Record<string, number> = {
      AUDIO: 0,
      IMAGE: 0,
      VIDEO: 0,
      TEXT: 0,
      TRANSLATION: 0,
      VALIDATION: 0,
    };

    contributionsGrouped.forEach((group) => {
      contributionsByType[group.type] = group._count._all;
    });

    // Get language distribution
    const users = await db.user.findMany({
      select: {
        languages: true,
      },
    });

    const langDistribution: Record<string, number> = {};
    users.forEach((u) => {
      u.languages.forEach((lang) => {
        langDistribution[lang] = (langDistribution[lang] || 0) + 1;
      });
    });

    // Fetch some recent contributions for recent activity feed
    const recentContributionsRaw = await db.contribution.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            displayName: true,
            email: true,
          },
        },
      },
    });

    const recentContributions = recentContributionsRaw.map((c) => ({
      id: c.id,
      user: c.user.displayName,
      email: c.user.email || "contributeur@lambdata.com",
      type: c.type,
      status: c.status,
      time: c.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      totalUsers,
      totalContributions,
      pendingContributions,
      totalPaidXOF,
      totalPendingXOF,
      contributionsByType,
      langDistribution,
      recentContributions,
    });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load analytics" },
      { status: 500 }
    );
  }
}
