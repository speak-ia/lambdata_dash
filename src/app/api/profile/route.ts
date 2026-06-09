import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, error: "Email requis" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check in users table (PostgreSQL)
    const dbUser = await db.user.findUnique({
      where: { email: cleanEmail },
    });

    if (dbUser) {
      // Count user's contributions and reviews
      const contributionsCount = await db.contribution.count({
        where: { userId: dbUser.id },
      });
      const reviewsCount = await db.review.count({
        where: { userId: dbUser.id },
      });

      return NextResponse.json({
        success: true,
        profile: {
          name: dbUser.displayName,
          email: dbUser.email,
          avatarUrl: dbUser.avatarUrl,
          phone: dbUser.phone || "",
          actionsCount: contributionsCount + reviewsCount,
        },
      });
    }

    // 2. Fallback to AdminEmail table
    const dbAdmin = await db.adminEmail.findUnique({
      where: { email: cleanEmail },
    });

    if (dbAdmin) {
      return NextResponse.json({
        success: true,
        profile: {
          name: dbAdmin.name || "Administrateur",
          email: dbAdmin.email,
          avatarUrl: null,
          phone: "",
          actionsCount: 0,
        },
      });
    }

    // Default fallback
    return NextResponse.json({
      success: true,
      profile: {
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        avatarUrl: null,
        phone: "",
        actionsCount: 0,
      },
    });
  } catch (error) {
    console.error("Profile GET API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { email, firstName, lastName, phone } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email requis pour la mise à jour" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "Administrateur";

    // 1. Update in users table if exists
    const dbUser = await db.user.findUnique({
      where: { email: cleanEmail },
    });

    if (dbUser) {
      await db.user.update({
        where: { id: dbUser.id },
        data: {
          displayName: fullName,
          phone: phone ? phone.trim() : null,
        },
      });
    }

    // 2. Update in admin_emails whitelist table if exists
    const dbAdmin = await db.adminEmail.findUnique({
      where: { email: cleanEmail },
    });

    if (dbAdmin) {
      await db.adminEmail.update({
        where: { id: dbAdmin.id },
        data: {
          name: fullName,
        },
      });
    }

    return NextResponse.json({
      success: true,
      profile: {
        name: fullName,
        email: cleanEmail,
        phone: phone || "",
      },
    });
  } catch (error) {
    console.error("Profile PUT API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
