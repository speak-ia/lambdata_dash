import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const fallbackContributors = [
  { id: "USR-001", name: "Fatou Ndiaye", level: 4, totalEarned: "125,000 XOF", pending: "15,000 XOF", contributions: 342, language: "Wolof", badge: "⭐", avatar: "FN", avatarColor: "bg-blue-100 text-blue-700", joinDate: "Jan 2024", streak: 28 },
  { id: "USR-002", name: "Moussa Traoré", level: 3, totalEarned: "78,500 XOF", pending: "8,500 XOF", contributions: 218, language: "Bambara", badge: "🔥", avatar: "MT", avatarColor: "bg-orange-100 text-orange-700", joinDate: "Fév 2024", streak: 14 },
  { id: "USR-003", name: "Aissatou Ba", level: 4, totalEarned: "198,000 XOF", pending: "22,000 XOF", contributions: 456, language: "Dioula", badge: "⭐", avatar: "AB", avatarColor: "bg-purple-100 text-purple-700", joinDate: "Déc 2023", streak: 42 },
  { id: "USR-004", name: "Ibrahim Coulibaly", level: 1, totalEarned: "8,200 XOF", pending: "3,200 XOF", contributions: 24, language: "Pulaar", badge: "🌱", avatar: "IC", avatarColor: "bg-red-100 text-red-700", joinDate: "Avr 2024", streak: 3 },
  { id: "USR-005", name: "Mariam Sow", level: 3, totalEarned: "92,750 XOF", pending: "12,750 XOF", contributions: 289, language: "Wolof", badge: "🔥", avatar: "MS", avatarColor: "bg-pink-100 text-pink-700", joinDate: "Jan 2024", streak: 19 },
];

export async function GET() {
  try {
    const dbUsers = await db.user.findMany({
      include: {
        contributionRecords: {
          select: {
            id: true,
            status: true,
          },
        },
        rewards: {
          select: {
            amount: true,
            status: true,
          },
        },
      },
    });

    if (dbUsers.length === 0) {
      return NextResponse.json({ success: true, contributors: fallbackContributors });
    }

    const contributorsList = dbUsers.map((user) => {
      const contributionsCount = user.contributionRecords.length;
      
      const totalEarnedNum = user.rewards
        .filter((r) => r.status.toLowerCase() === "paid" || r.status.toLowerCase() === "payé")
        .reduce((sum, r) => sum + r.amount, 0);

      const pendingNum = user.rewards
        .filter((r) => r.status.toLowerCase() === "pending" || r.status.toLowerCase() === "en attente")
        .reduce((sum, r) => sum + r.amount, 0);

      const badges = ["🌱", "💪", "🔥", "⭐", "👑"];
      const badgeIndex = Math.min(Math.floor((user.level - 1)), badges.length - 1);
      const userBadge = badges[badgeIndex >= 0 ? badgeIndex : 0];

      const langNames: Record<string, string> = {
        fr: "Français",
        wo: "Wolof",
        bm: "Bambara",
        dyu: "Dioula",
        pulaar: "Pulaar",
        soninke: "Soninké",
        malinke: "Malinké",
      };
      const primaryLang = user.languages.length > 0 ? langNames[user.languages[0].toLowerCase()] || user.languages[0] : "Wolof";

      return {
        id: user.id.slice(0, 8).toUpperCase(),
        name: user.displayName,
        level: user.level || 1,
        totalEarned: `${totalEarnedNum.toLocaleString()} XOF`,
        pending: `${pendingNum.toLocaleString()} XOF`,
        contributions: contributionsCount,
        language: primaryLang,
        badge: userBadge,
        avatar: user.displayName.slice(0, 2).toUpperCase(),
        avatarColor: "bg-emerald-100 text-emerald-700",
        joinDate: new Date(user.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "short" }),
        streak: user.streak || 0,
      };
    });

    // Merge real database users with fallback users
    const allContributors = [...contributorsList, ...fallbackContributors.slice(contributorsList.length)];

    return NextResponse.json({ success: true, contributors: allContributors });
  } catch (error) {
    console.error("Recompenses GET API Error:", error);
    return NextResponse.json({ success: true, contributors: fallbackContributors });
  }
}
