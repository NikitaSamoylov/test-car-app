"use client";

import Link from "next/link";
import styles from "./SignInBtn.module.scss";

const SignInBtn: React.FC = () => {
  return (
    <button className={styles.button}>
      <Link href={"/login"} className={styles.button__link}>
        добавить авто
      </Link>
    </button>
  );
};

export { SignInBtn };
