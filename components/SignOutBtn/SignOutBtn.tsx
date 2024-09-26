"use client";

import { signOut } from "next-auth/react";
import styles from "./SignOutBtn.module.scss";

const SignOutBtn: React.FC = () => {
  return (
    <button className={styles.signOutBtn} onClick={() => signOut()}>
      Выйти
    </button>
  );
};

export { SignOutBtn };
