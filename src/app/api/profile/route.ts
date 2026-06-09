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
      return NextResponse.json({
        success: true,
        profile: {
          name: dbUser.displayName,
          email: dbUser.email,
          avatarUrl: dbUser.avatarUrl,
          phone: dbUser.phone,
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
          phone: null,
        },
      });
    }

    // Default fallback if registered in Firebase but not in DB yet
    return NextResponse.json({
      success: true,
      profile: {
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        avatarUrl: null,
        phone: null,
      },
    });
  } catch (error) {
    console.error("Profile GET API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
