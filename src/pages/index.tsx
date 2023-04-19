import React from "react";
import { authStore } from "@/store";
import Login from "@/components/Forms/Login";
import PostPage from "@/components/Post";
import { GetServerSideProps } from "next";
import { PostProps, PostsArray } from "@/types";
interface HomePageProps {
  posts: PostProps;
}

export default function Home({ posts }: PostsArray) {
  const user = authStore((state: any) => state.user);
  const [isLogin, setIsLogin] = React.useState<Boolean>(true);
  const [post, setPost] = React.useState<any>([]);
  console.log(posts);

  React.useLayoutEffect(() => {
    if (user && user?.username) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  React.useEffect(() => {
    if (posts) {
      setPost(posts);
    }
  }, [posts]);

  return <main>{isLogin ? <PostPage posts={post} /> : <Login />}</main>;
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  let posts;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    posts = data?.data;
  } catch (err) {
    console.error(err);
  }

  const _props: HomePageProps = {
    posts: posts || [],
  };

  return {
    props: _props,
  };
};
