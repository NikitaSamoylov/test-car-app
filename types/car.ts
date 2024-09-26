export type TCarImages = {
  link: string;
  name: string;
};

export type TCar = {
  _id: string;
  uniqueId: string;
  carid: string;
  brand: string;
  price: string;
  model: string;
  color: string;
  year: string;
  engine: string;
  transmission: string;
  range: string;
  images: TCarImages[];
};

export type TCarFromServer = {
  product: TCar[];
};

