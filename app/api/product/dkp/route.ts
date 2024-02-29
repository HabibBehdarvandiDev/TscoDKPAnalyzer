import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaConnection";

export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany();

  if (!products) {
    return NextResponse.json({ error: "No products found" }, { status: 404 });
  }

  const dkpValues = products.map((product) => product.dkp);

  return NextResponse.json(dkpValues, { status: 200 });
}
