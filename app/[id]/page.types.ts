import { TCar } from "@/types/car";

export type TCarPageProps = {
  params: {
    id: string;
  };
};

export type TCarFromServerItem = {
  product: TCar;
};
