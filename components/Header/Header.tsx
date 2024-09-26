import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { SignOutBtn } from "../SignOutBtn";
import { SignInBtn } from "../SignInBtn";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import styles from "./Header.module.scss";

const Header: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <Link href={"/"}>
            <h1 className={styles.header__title}>Car App</h1>
          </Link>
          {session ? (
            <div className={styles.header__btns}>
              <div>
                <SignOutBtn />
              </div>
              <div>
                <SignInBtn />
              </div>
            </div>
          ) : (
            <SignInBtn />
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "rgb(72, 147, 209)",
              fontSize: "16px",
              textAlign: "center",
              maxWidth: "250px",
            },
          }}
        />
      </div>
    </header>
  );
};

export { Header };
