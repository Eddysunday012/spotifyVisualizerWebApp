import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

export default function usePlaylistInfo() {
  const spotifyApi = useSpotify();
  const topArtists = spotifyApi.getMyTopArtists();

  return topArtists;
}
