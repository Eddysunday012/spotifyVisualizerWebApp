import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { spotifyApi } from "@/lib/spotify";
import SpotifyWebApi from "spotify-web-api-node";

export default function useSpotify(): SpotifyWebApi {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // if rrefresh token fails (ihghly unlikely)
      if (session.error == "refresh token error") {
        signIn();
      }
      spotifyApi.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);
  return spotifyApi;
}
