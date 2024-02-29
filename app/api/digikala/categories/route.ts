import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaConnection";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      distinct: ["product_category"],
      select: {
        product_category: true,
      },
    });

    const categories = products.map((product) => product.product_category);

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
