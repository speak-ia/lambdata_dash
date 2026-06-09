import { NextResponse } from "next/server";
import { db } from "@/lib/db";

async function ensureDefaultAdmins() {
  const count = await db.adminEmail.count();
  if (count === 0) {
    const defaultEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const data = defaultEmails.map((email) => {
      let name = "Administrateur";
      if (email.includes("mody")) name = "Mody Barry";
      else if (email.includes("seybael")) name = "Seyba El";
      return { email, name };
    });

    if (data.length > 0) {
      await db.adminEmail.createMany({
        data,
        skipDuplicates: true,
      });
    }
  }
}

export async function GET() {
  try {
    await ensureDefaultAdmins();
    const admins = await db.adminEmail.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, admins });
  } catch (error) {
    console.error("Admins GET API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch admins" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await db.adminEmail.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({ success: false, error: "Cet email est déjà enregistré comme administrateur" }, { status: 400 });
    }

    const admin = await db.adminEmail.create({
      data: {
        email: cleanEmail,
        name: name || "Administrateur",
      },
    });

    return NextResponse.json({ success: true, admin });
  } catch (error) {
    console.error("Admins POST API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to add admin" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await db.adminEmail.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admins DELETE API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete admin" }, { status: 500 });
  }
}
