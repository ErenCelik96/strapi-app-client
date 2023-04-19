import { authStore } from "@/store";
import { PostProps } from "@/types";
import { GetServerSideProps } from "next";
import React from "react";

export default function Post({ post }: PostProps) {
  const [user, setUser] = React.useState<any>();
  const deletePost = authStore((state: any) => state.deletePost);
  const getUser = authStore((state: any) => state.user);
  const { id } = post;
  const { title, description, imageUri, tutor, subject, createdAt, updatedAt } =
    post?.attributes;

  // for hydrating the user state
  React.useEffect(() => {
    if (getUser) {
      setUser(getUser);
    }
  }, [getUser]);

  const tutorOfPost = user?.username == tutor;
  const postImage =
    imageUri ||
    "https://cdn.nerdschalk.com/wp-content/uploads/2020/07/instagram-no-posts-yet-759x427.png";

  return (
    <div style={{ padding: "50px 20px" }} className="flex justify-center">
      <article className="mb-4 break-inside p-6 rounded-xl bg-gray-800 flex flex-col bg-clip-border" style={{maxWidth: 650}}>
        <div className="flex pb-6 items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="inline-block text-lg font-bold mr-2 dark:text-slate-300">
                {tutor}
              </p>
              <span>
                <svg
                  className="fill-blue-500 dark:fill-slate-50 w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                </svg>
              </span>
            </div>
            <div className="text-slate-500 dark:text-slate-300">
              {createdAt?.split("T")[0]}
            </div>
          </div>
          <div>
            {tutorOfPost && (
              <svg
                onClick={() => deletePost(id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            )}
          </div>
        </div>
        <h6 className="text-center dark:text-slate-300">{subject}</h6>
        <h2 className="text-3xl font-extrabold text-center dark:text-slate-300">
          {title}
        </h2>
        <div className="py-4 flex justify-center">
          <img className="max-w-full rounded-lg" src={postImage} />
        </div>
        <p className="dark:text-slate-300">{description}</p>
        {/*<div className="py-4">
          <a className="inline-flex items-center" href="#">
            <span className="mr-2">
              <svg
                className="fill-rose-600 dark:fill-rose-400"
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
              </svg>
            </span>
            <span className="text-lg font-bold">68</span>
          </a>
        </div>
        <div className="relative">
          <input
            className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
            type="text"
            placeholder="Write a comment"
          />
          <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
            <svg
              className="mr-2"
              style={{ width: "26px", height: "26px" }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
              ></path>
            </svg>
            <svg
              className="fill-blue-500 dark:fill-slate-50"
              style={{ width: "24px", height: "24px" }}
              viewBox="0 0 24 24"
            >
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
            </svg>
          </span>
            </div>*/}
      </article>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id } = query;
  let post;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}posts/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    post = data?.data;
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!post) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
    },
  };
};
