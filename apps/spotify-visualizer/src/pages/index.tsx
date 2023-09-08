import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signOut } from "next-auth/react";
import usePlaylistInfo from "@/hooks/usePlaylistInfo";
import Component from "@/components/testComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>Spotify Visualizer</title>
      </Head>

      <h1>Welcome to the Spotify Visualization App!</h1>
      {session?.user.accessToken}
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}
