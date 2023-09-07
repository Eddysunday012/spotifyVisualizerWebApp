import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import Component from "@/components/testComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Visualizer</title>
      </Head>
      <Component />
    </>
  );
}
