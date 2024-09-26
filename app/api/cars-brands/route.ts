import Car from "@/models/Car";
import connect from "@/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connect();

  const product = await Car.find({}).select("brand -_id").exec();

  return NextResponse.json({ product }, { status: 200 });
};
