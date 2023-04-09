import { GetServerSideProps } from "next";
import React from "react";
import cookie from "cookie";
import { authStore } from "@/store";
import ForgotPassword from "@/components/Forms/ForgotPassword";

export default function ForgotPasswordPage() {
  const forgotPassword = authStore((state: any) => state.forgotPassword);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    forgotPassword(email);
  };

  return (
    <>
      <ForgotPassword handleSubmit={handleSubmit} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const user = JSON.parse(cookies.user || "null");

  try {
    if (user)
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      user,
    },
  };
};
