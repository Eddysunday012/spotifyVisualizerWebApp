import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import getTopSongs from "@/hooks/getTopSongs";
import Component from "@/components/testComponent";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let accessToken = session?.user?.accessToken;
      const songs = await getTopSongs(accessToken);
      setTopTracks(songs);
    }

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Spotify Visualizer</title>
      </Head>

      <h1>Welcome to the Spotify Visualization App!</h1>
      <img src={session?.user.image} alt="" />
      <ul>
        {topTracks.map((song: any) => (
          <li key={song.id}>{song.name}</li>
        ))}
      </ul>

      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}
