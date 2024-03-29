import { authStore } from "@/store";
import { useRouter } from "next/router";
import React from "react";

export default function Card({ data }: any) {
  const user = authStore((state: any) => state.user);
  const deletePost = authStore((state: any) => state.deletePost);
  const router = useRouter();
  const { attributes, id } = data;
  const { title, imageUri, description, createdAt, subject, tutor, updatedAt } =
    attributes;

  const tutorOfPost = user?.username == tutor;

  const formattedDescription =
    description.length >= 10
      ? description.substring(0, 10) + "..."
      : description;

  const postImage =
    imageUri ||
    "https://cdn.nerdschalk.com/wp-content/uploads/2020/07/instagram-no-posts-yet-759x427.png";

  return (
    <div
      className="max-w-sm min-w-24 lg:max-w-full lg:flex cursor-pointer"
      onClick={() => router.push(`/posts/${id}`)}
    >
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${postImage})`,
        }}
        title="Woman holding a mug"
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal min-w-[50%]">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">{subject}</p>
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{formattedDescription}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{tutor}</p>
            <p className="text-gray-600">{createdAt?.split("T")[0]}</p>
          </div>
        </div>
        {tutorOfPost && (
          <svg
            onClick={() => deletePost(data?.id)}
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
  );
}
