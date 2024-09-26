import { TCar } from "@/types/car";
import { UseFormRegister } from "react-hook-form";

export interface IFormField {
  register: UseFormRegister<TCar>;
  title: string;
  errors: any;
  type: string;
  name: string;
}
