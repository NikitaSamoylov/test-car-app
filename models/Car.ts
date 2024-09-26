import mongoose from "mongoose";

const { Schema } = mongoose;

const CarSchema = new Schema(
  {
    images: [
      {
        link: String,
        name: String,
      },
    ],
    brand: {
      type: String,
      required: [true, "введите бренд"],
    },
    model: {
      type: String,
      required: [true, "введите модель"],
    },
    color: {
      type: String,
      required: [true, "введите цвет"],
    },
    price: {
      type: String,
      required: [true, "введите цену"],
    },
    year: {
      type: String,
      required: [true, "введите год выпуска"],
    },
    engine: {
      type: String,
      required: [true, "введите тип двигателя"],
    },
    transmission: {
      type: String,
    },
    range: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
