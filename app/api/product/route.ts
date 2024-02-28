import { ProductPost } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaConnection";

export async function POST(req: NextRequest) {
  // check the for Empty body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "The Body Cannot Be Empty!" },
      { status: 400 }
    );
  }

  // validate body using Zod
  const validationResult = ProductPost.safeParse(body);

  // check if the any error happens
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error.format() },
      { status: 400 }
    );
  }

  const { product_name, dkp, price, product_category } = body;

  // get the product with same DKP
  const isProductExist = await prisma.product.findFirst({
    where: {
      dkp: dkp,
    },
  });

  //check if product exist
  if (isProductExist) {
    return NextResponse.json(
      { error: "Product Already Exist!" },
      { status: 400 }
    );
  }

  // create the product
  const newProduct = await prisma.product.create({
    data: {
      product_name: product_name.toLowerCase(),
      dkp: dkp,
      price: price,
      product_category: product_category,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}

export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products, { status: 200 });
}
