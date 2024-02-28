import { NextRequest, NextResponse } from "next/server";
import { UserSignUpSchema } from "@/schema";
import bcrypt from "bcrypt";
import prisma from "@/db/prismaConnection";
import jwt from "jsonwebtoken";

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
  const resultValidation = UserSignUpSchema.safeParse(body);

  // check if the any error happens
  if (!resultValidation.success) {
    return NextResponse.json(
      { error: resultValidation.error.format() },
      { status: 400 }
    );
  }

  // get values
  const { first_name, last_name, role, username, password } = body;

  // get the user
  const isUserExist = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  // check if the user exist
  if (isUserExist) {
    return NextResponse.json({ error: "User Already Exist!" }, { status: 400 });
  }

  // hash the body password
  const password_hashed = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      role: role,
      username: username,
      password: password,
      password_hashed: password_hashed,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
