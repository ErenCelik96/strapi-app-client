import { GetServerSideProps } from "next";
import React from "react";
import cookie from "cookie";
import { User } from "@/types";
import { authStore } from "@/store";
import Register from "@/components/Forms/Register";

interface RegisterPageProps {
  user: User;
}

export default function RegisterPage({ user }: RegisterPageProps) {
  const register = authStore((state: any) => state.register);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    register(username, email, password);
  };

  return (
    <>
      <Register handleSubmit={handleSubmit} />
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
