export type TCarImages = {
    link: string;
    name: string;
  };
  
  export type TCar = {
    userId?: string;
    _id: string;
    brand: string;
    price: number;
    model: string;
    color: string;
    year: number;
    engine: string;
    transmission: string;
    range: string;
    images?: TCarImages[];
  };
  
  export type TCarForUpload = TCar & {
    createdAt: string;
    updatedAt: string;
    _v: number;
  };
  