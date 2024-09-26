import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/dbConnect";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const { email, username, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { msg: "такой email уже зарегистрирован" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      { msg: "учетная запись создана" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
};
