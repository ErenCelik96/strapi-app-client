import Navbar from "@/components/Navbar";
import { authStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const user = authStore((state: any) => state.user);
  
  return (
    <>
      <Navbar user={user} />
      <Component {...pageProps} />
    </>
  );
}
