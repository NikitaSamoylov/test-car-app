"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TInputsSignup } from "./signUpForm.types";
import { useRouter } from "next/navigation";
import { notifyInfo } from "@/utils/notify";
import styles from './SignUpForm.module.scss';

import authImg from '@/assets/images/authImg.jpg';

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<TInputsSignup>({
    mode: "onBlur",
  });

  const onSubmit = async (data: TInputsSignup) => {
    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          role: "user",
        }),
      });

      if (resp.status === 400) {
        throw new Error("такой email уже есть");
      }

      if (resp.status === 200) {
        notifyInfo('Аккаунт создан, войдите')
        reset();
        router.push("/login");
      }
    } catch (e: any) {
      notifyInfo(e)
    }
  };

  return (
    <section className={styles.loginForm}>
      <div className={styles.loginForm__img}>
        <Image
          src={authImg}
          width={authImg.width}
          height={ authImg.height }
          alt="фоновая картинка"
          priority
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className={styles.form__item_label}>
          введите имя
          <input
            type="text"
            className={`${styles.form__item}
            ${styles.form__item_name}`}
            id="username"
            {...register("username", {
              required: "заполните поле",
              minLength: {
                value: 2,
                message: "минимум 2 символа",
              },
            })}
          />
          <span className={styles.form__item_notice}>
            {errors.username ? errors.username.message : null}
          </span>
        </label>
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
        <label htmlFor="confirmPassword" className={styles.form__item_label}>
          повторите пароль
          <input
            type="password"
            className={`${styles.form__item}
            ${styles.form__item_password}`}
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "подтвердите пароль",
              minLength: {
                value: 6,
                message: "минимум 6 символов",
              },
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "пароли не совпадают";
                }
              },
            })}
          />
          <span className={styles.form__item_notice}>
            {errors.confirmPassword ? errors.confirmPassword.message : null}
          </span>
        </label>
        <button type="submit" className={styles.form__btn} disabled={!isValid}>
          создать аккаунт
        </button>
        <span className={styles.form__msg}>
          Есть аккаунт?
          <Link href="/login" className={styles.form__msg_link}>
            войдите
          </Link>
        </span>
      </form>
    </section>
  );
};

export { SignUpForm };
