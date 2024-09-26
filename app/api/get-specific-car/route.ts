import Car from "@/models/Car";
import connect from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const _id = request.nextUrl.searchParams.get("id");

  await connect();

  const product = await Car.findById({ _id });
  return NextResponse.json({ product });
};
