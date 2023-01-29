import { GetServerSideProps } from "next";
import React from "react";
import cookie from "cookie";

export default function HelloPage({ user }: any) {
  
  return <div>Hello, {user?.username}</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const user = JSON.parse(cookies.user || "null");

  try {
    if (!user)
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
