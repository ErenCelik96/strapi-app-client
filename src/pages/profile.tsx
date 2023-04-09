import React, { useState, useEffect } from "react";
import { authStore } from "@/store";
import { User } from "@/types";
import Cookies from "js-cookie";

const Profile = ({ avatar, data }: any) => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState<User>();

  const getIdFromLocalCookie = authStore(
    (state: any) => state.getIdFromLocalCookie
  );
  const getUser = authStore((state: any) => state.user);

  useEffect(() => {
    if (getUser) {
      setUser(getUser);
    }
  }, [getUser]);

  useEffect(() => {
    if (data) {
      Cookies.set("user", JSON.stringify(data));
    }
  }, [data]);

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const clientImage = event.target.files[0];
      setImage(clientImage);
    }
  };
  const uploadToServer = async () => {
    const formData = new FormData();
    const file = image || "";
    formData.append("inputFile", file);
    formData.append("user_id", await getIdFromLocalCookie());
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <div className="flex justify-between items-center flex-col mt-5 bg-indigo-700 p-5">
      {/* eslint-disable @next/next/no-img-element */}
      {avatar && (
        <img
          src={`https://res.cloudinary.com/dohzbtmro/image/upload/f_auto,q_auto,w_150,h_150,g_face,c_thumb,r_max/${avatar}.jpg`}
          alt="Profile"
        />
      )}
      <h1 className="text-5xl font-bold text-white">
        Hi {user?.username} <span>👋</span>
      </h1>
      <h3 className="mt-3 text-white text-xl">Your email: {user?.email}</h3>
      <h3 className="mt-3 text-white text-xl">
        Account created at: {user?.createdAt?.split("T")[0]}
      </h3>

      {avatar === "default_user" && (
        <div className="mt-3">
          <h4 className="text-center">You have not a profile picture yet.</h4>
          <input type="file" onChange={uploadToClient} className="mt-3" />
          <button
            className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
            type="submit"
            onClick={uploadToServer}
          >
            Set Profile Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }: any) {
  const jwt = req.cookies.token;
  if (!jwt) {
    return {
      redirect: {
        destination: "/",
      },
    };
  } else {
    let data;
    const responseData: any = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    ).then((res) => (data = res.json()));
    const avatar = responseData?.imageUri
      ? responseData?.imageUri
      : "default_user";
    return {
      props: {
        avatar,
        data: responseData,
      },
    };
  }
}
