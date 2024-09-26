"use client";

import { IFormField } from "./FormField.types";
import { TCar } from "@/types/car";
import styles from "./FormField.module.scss";

const FormField: React.FC<IFormField> = ({
  register,
  title,
  errors,
  type,
  name,
}) => {
  return (
    <>
      <label className={styles.field__label}>
        {title}
        <input
          {...register(name as keyof TCar, {
            required: "заполните поле",
            minLength: {
              value: 2,
              message: "минимум 2 символа",
            },
          })}
          name={name}
          type={type}
          id={title}
          className={styles.field__input}
        />
      </label>
      {errors[name] ? (
        <span className={styles.addCar__input_error}>
          {errors[name].message}
        </span>
      ) : null}
    </>
  );
};

export { FormField };
