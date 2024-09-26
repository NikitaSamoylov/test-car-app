import { TSelectOptions } from "@/types/formSelectOptions";

export type TFormSelectField = {
  options: TSelectOptions[];
  action: (value: string) => void;
  title: string;
};
