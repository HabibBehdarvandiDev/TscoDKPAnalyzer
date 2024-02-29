import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaConnection";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found!" }, { status: 404 });
  }

  return NextResponse.json(product, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "The Body Cannot Be Empty!" },
      { status: 400 }
    );
  }

  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found!" }, { status: 404 });
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: body,
  });

  return NextResponse.json(updatedProduct, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found!" }, { status: 404 });
  }

  const DeletedProduct = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json(
    { message: "Product was Deleted", DeletedProduct: DeletedProduct },
    { status: 200 }
  );
}
