import mongoose from "mongoose";

const { Schema } = mongoose;

const CarSchema = new Schema(
  {
    images: [
      {
        link: String,
        name: String
      }
    ],
    brand: {
      type: String,
      required: [true, "введите бренд"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "введите модель"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "введите цвет"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "введите цену"],
      min: [1, "не меньше 1"],
    },
    year: {
      type: Number,
      required: [true, "введите год выпуска"],
      min: [2, "не меньше 2"],
    },
    engine: {
      type: String,
      required: [true, "введите тип двигателя"],
    },
    transmission: {
      type: String,
      required: [true, "введите тип трансмиссии"],
    },
    range: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Car || mongoose.model("Car", CarSchema);