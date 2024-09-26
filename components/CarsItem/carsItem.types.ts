import { StaticImageData } from "next/image";

export interface ICarItemProps {
  brand: string;
  model: string;
  year: string;
  image: string | StaticImageData;
  id: string;
}
