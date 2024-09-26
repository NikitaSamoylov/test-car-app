import Car from "@/models/Car";
import connect from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const {
    images,
    brand,
    model,
    color,
    price,
    year,
    engine,
    transmission,
    range,
  } = await request.json();

  await connect();

  const newCar = new Car({
    images,
    brand,
    model,
    color,
    price,
    year,
    engine,
    transmission,
    range,
  });

  try {
    await newCar.save();
    return NextResponse.json({ msg: "товар добавлен" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const page = Number(request.nextUrl.searchParams.get("page"));
  const limit = Number(request.nextUrl.searchParams.get("limit"));
  const yearSort = request.nextUrl.searchParams.get("yearsort");
  const priceSort = request.nextUrl.searchParams.get("pricesort");
  const colorFilter = request.nextUrl.searchParams.get("color");
  const brandFilter = request.nextUrl.searchParams.get("brand");

  console.log(brandFilter);

  await connect();

  const product = await Car.find({
    color: colorFilter || { $nin: "exlude" },
    brand: brandFilter || { $nin: "exlude" },
  })
    .skip(page)
    .limit(limit)
    .sort(
      yearSort === "asc"
        ? "year"
        : yearSort === "desc"
        ? "-year"
        : { createdAt: -1 }
    )
    .sort(
      priceSort === "asc"
        ? "price"
        : priceSort === "desc"
        ? "-price"
        : { createdAt: -1 }
    )
    .exec();

  if (!product) {
    return NextResponse.json({ message: "товаров нет" }, { status: 400 });
  }
  return NextResponse.json({ product }, { status: 200 });
};
