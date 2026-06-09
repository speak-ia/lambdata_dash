import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ContributionType } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const moduleType = searchParams.get("type");

    const where: any = {};
    if (language && language !== "All") {
      where.language = language;
    }
    if (moduleType && moduleType !== "All") {
      // Map frontend type ("Audio" | "Traduction") to enum ContributionType ("AUDIO" | "TRANSLATION")
      where.module = moduleType.toUpperCase() === "AUDIO" 
        ? ContributionType.AUDIO 
        : ContributionType.TRANSLATION;
    }

    const phrases = await db.taskPhrase.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, phrases });
  } catch (error) {
    console.error("Phrases API GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch phrases" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if it's a single phrase or multiple (bulk import)
    if (Array.isArray(body)) {
      const created = await db.taskPhrase.createMany({
        data: body.map((p: any) => ({
          text: p.text,
          language: p.language,
          module: p.type?.toUpperCase() === "AUDIO" 
            ? ContributionType.AUDIO 
            : ContributionType.TRANSLATION,
          category: p.theme || "Santé",
          active: true,
        })),
      });
      return NextResponse.json({ success: true, count: created.count });
    } else {
      const { text, translation, language, type, theme } = body;
      
      const newPhrase = await db.taskPhrase.create({
        data: {
          text,
          language,
          module: type?.toUpperCase() === "AUDIO" 
            ? ContributionType.AUDIO 
            : ContributionType.TRANSLATION,
          category: theme || "Santé",
          active: true,
        },
      });

      return NextResponse.json({ success: true, phrase: newPhrase });
    }
  } catch (error) {
    console.error("Phrases API POST Error:", error);
    return NextResponse.json({ success: false, error: "Failed to create phrase(s)" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await db.taskPhrase.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Phrases API DELETE Error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete phrase" }, { status: 500 });
  }
}
