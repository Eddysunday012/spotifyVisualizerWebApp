import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

export default async function getTopSongs(accessToken: any) {
  if (accessToken === "") {
    throw new Error("invalid accessToken");
  }

  const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch top tracks");
  }

  const data = await response.json();
  return data.items; // Assuming the response contains an "items" array of top tracks.
}
