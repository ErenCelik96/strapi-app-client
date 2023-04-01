import React, { useState } from "react";
import { authStore } from "@/store";
import { useRouter } from "next/router";

const Profile = ({ avatar }: any) => {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const getIdFromLocalCookie = authStore(
    (state: any) => state.getIdFromLocalCookie
  );

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
      }).then((_) => router.reload());
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <div>
      <>
        <h1 className="text-5xl font-bold">
          Welcome back <span>👋</span>
        </h1>
        {avatar === "default_user" && (
          <div>
            <h4>Select an image to upload</h4>
            <input type="file" onChange={uploadToClient} />
            <button
              className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
              type="submit"
              onClick={uploadToServer}
            >
              Set Profile Image
            </button>
          </div>
        )}
        {/* eslint-disable @next/next/no-img-element */}
        {avatar && (
          <img
            src={`https://res.cloudinary.com/dohzbtmro/image/upload/f_auto,q_auto,w_150,h_150,g_face,c_thumb,r_max/${avatar}.jpg`}
            alt="Profile"
          />
        )}
      </>
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
      },
    };
  }
}
