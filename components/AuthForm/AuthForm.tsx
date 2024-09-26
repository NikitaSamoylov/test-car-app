"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { TInputsLogin } from "./AuthForm.types";
import { notifyError, notifyInfo } from "@/utils/notify";
import styles from "./AuthForm.module.scss";

import authImage from "@/assets/images/authImg.jpg";

const AuthForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TInputsLogin>({
    mode: "onBlur",
  });

  const onSubmit = async (data: TInputsLogin) => {
    try {
      const res = await signIn("credentials", {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false,
      });

      if (res?.status === 200) {
        reset();
        notifyInfo("Вход, теперь добавьте авто");
        router.refresh();
      }

      if (res?.status === 401) {
        throw new Error("неверный логин или пароль");
      }

      if (res?.status !== 200 && res?.status !== 401) {
        throw new Error("что-то пошло не так");
      }
    } catch (e: any) {
      notifyError(e);
    }
  };

  return (
    <section className={styles.loginForm}>
      <div className={styles.loginForm__img}>
        <Image
          src={authImage}
          width={authImage.width}
          height={authImage.height}
          alt="фоновая картинка"
          priority
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={styles.form__item_label}>
          введите email
          <input
            type="email"
            className={`${styles.form__item}
            ${styles.form__item_name}`}
            id="email"
            {...register("email", {
              required: "заполните поле",
              minLength: {
                value: 2,
                message: "минимум 2 символа",
              },
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          <span className={styles.form__item_notice}>
            {errors.email ? errors.email.message : null}
          </span>
        </label>
        <label htmlFor="password" className={styles.form__item_label}>
          введите пароль
          <input
            type="password"
            className={`${styles.form__item}
            ${styles.form__item_password}`}
            id="password"
            {...register("password", {
              required: "введите пароль",
              minLength: {
                value: 6,
                message: "минимум 6 символов",
              },
            })}
          />
          <span className={styles.form__item_notice}>
            {errors.password ? errors.password.message : null}
          </span>
        </label>
        <button type="submit" className={styles.form__btn} disabled={!isValid}>
          войти
        </button>
        <span className={styles.form__msg}>
          Не зарегистрированы? Создайте
          <Link href="/signup" className={styles.form__msg_link}>
            аккаунт
          </Link>
        </span>
      </form>
    </section>
  );
};

export { AuthForm };
