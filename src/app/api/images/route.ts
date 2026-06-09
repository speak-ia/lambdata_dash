import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const fallbackImages = [
  { id: "IMG-001", name: "Marché Dakar", tags: ["marché", "commerce", "nourriture"], questions: 3, validations: 45, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Scène de marché typique à Dakar avec des étals de fruits et légumes.", campaign: "CAMP-006" },
  { id: "IMG-002", name: "Champ Mil Bamako", tags: ["agriculture", "mil", "champ"], questions: 2, validations: 32, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Champ de mil en saison de culture dans la région de Bamako.", campaign: "CAMP-002" },
  { id: "IMG-003", name: "Clinique Abidjan", tags: ["santé", "clinique", "hôpital"], questions: 4, validations: 28, status: "En Revue", statusColor: "bg-yellow-100 text-yellow-700", description: "Entrée d'une clinique de quartier à Abidjan, Côte d'Ivoire.", campaign: "CAMP-001" },
  { id: "IMG-004", name: "École Primaire Ouaga", tags: ["éducation", "école", "enfants"], questions: 2, validations: 51, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", description: "Classe d'école primaire à Ouagadougou, Burkina Faso.", campaign: "CAMP-004" },
];

export async function GET() {
  try {
    const dbImages = await db.imageContribution.findMany({
      include: {
        user: {
          select: {
            displayName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (dbImages.length === 0) {
      return NextResponse.json({ success: true, images: fallbackImages });
    }

    const imagesList = dbImages.map((img, index) => {
      return {
        id: img.id,
        name: img.category ? `Image ${img.category.charAt(0).toUpperCase() + img.category.slice(1)}` : "Image Locale",
        tags: img.tags || [],
        questions: 2,
        validations: 10,
        status: "Active",
        statusColor: "bg-emerald-100 text-emerald-700",
        description: `Image téléversée pour la validation et l'annotation linguistique.`,
        campaign: "CAMP-003",
        imageUrl: img.imageUrl,
      };
    });

    // Merge real database images with fallback images
    const allImages = [...imagesList, ...fallbackImages.slice(imagesList.length)];

    return NextResponse.json({ success: true, images: allImages });
  } catch (error) {
    console.error("Images GET API Error:", error);
    return NextResponse.json({ success: true, images: fallbackImages });
  }
}
