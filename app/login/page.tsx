import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm/AuthForm";

export const metadata: Metadata = {
  title: "Car-App | страница входа"
};

const LoginPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  console.log(session)

  if (session) {
    redirect('/')
  };

  return (
    <section>
      <div className="container">
        <AuthForm />
      </div>
    </section>
  )
};

export default LoginPage;