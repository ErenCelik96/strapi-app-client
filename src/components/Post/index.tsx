import React from "react";
import { authStore } from "@/store";
import Card from "../Card";

export default function PostPage({ posts }: any) {
  const message = authStore((state: any) => state?.message);
    
  return (
    <div className="pl-32 pr-32 pt-12">
      {message}{" "}
      <div className="grid grid-cols-3 gap-5">
        {posts?.map((item: any, index: any) => {
          return <Card data={item} key={index} />;
        })}
      </div>
    </div>
  );
}
