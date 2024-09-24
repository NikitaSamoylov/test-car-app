import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/SignUpForm";

export const metadata: Metadata = {
  title: "Car-App | новый аккаунт",
};

const SignupPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section>
      <div className="container">
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignupPage;
