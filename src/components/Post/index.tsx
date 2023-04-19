import React from "react";
import { authStore } from "@/store";
import Card from "../Card";
import { PostsArray } from "@/types";

export default function PostPage({ posts }: PostsArray) {
  const message = authStore((state: any) => state?.message);

  return (
    <div className="pl-4 pr-4 pt-12 flex justify-center">
      {message}{" "}
      <div className="grid grid-cols-3 gap-10">
        {posts?.map((item: any, index: any) => {
          return <Card data={item} key={index} />;
        })}
      </div>
    </div>
  );
}
