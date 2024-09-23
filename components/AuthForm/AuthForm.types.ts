import { TInputsSignup } from "../SignUpForm/signUpForm.types";

export type TInputsLogin = Pick<TInputsSignup, "email" | "password">;