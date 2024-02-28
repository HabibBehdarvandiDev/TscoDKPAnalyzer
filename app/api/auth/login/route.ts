import { NextRequest, NextResponse } from "next/server";
import { UserLoginSchema } from "@/schema";
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
  const resultValidation = UserLoginSchema.safeParse(body);

  // check if the any error happens
  if (!resultValidation.success) {
    return NextResponse.json(
      { error: resultValidation.error.format() },
      { status: 400 }
    );
  }

  // get values
  const { username, password } = body;

  // get the user
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  // check if the user exist
  if (!user) {
    return NextResponse.json({ error: "User Do Not Exist!" }, { status: 400 });
  }

  // get the hashed password from DB
  const { password_hashed } = user;

  // compare the passwords
  const isPasswordMatch = await bcrypt.compare(password, password_hashed);

  // check if the password match
  if (!isPasswordMatch) {
    return NextResponse.json(
      { error: "Password Does Not Match!" },
      {
        status: 400,
      }
    );
  }

  const jwtPayload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    actions: user.actions,
    username: user.username,
    password: user.password_hashed,
  };
  const authToken = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY!);

  return NextResponse.json({ authToken }, { status: 200 });
}
