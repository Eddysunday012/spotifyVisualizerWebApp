import { artistItem } from "types";

export async function getTopSongs(accessToken: any) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    // console.log(response);
    throw new Error("Failed to fetch top tracks");
  }

  const data = await response.json();
  return data.items; // Assuming the response contains an "items" array of top tracks.
}

export async function getTopArtists(accessToken: any, term: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch top artists");
  }

  const data = await response.json();

  const TopArtistsInfo: Array<artistItem> = [];

  data.items.forEach((artist: any) => {
    var newArtistItem: artistItem = {
      name: artist.name,
      percentage: 23,
      img: artist.images[2].url,
    };
    TopArtistsInfo.push(newArtistItem);
  });

  return TopArtistsInfo;
}

export async function getUserProfile(accessToken: any) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    // console.log(response);
    throw new Error("Failed to fetch top tracks");
  }

  const data = await response.json();
  return data;
}

export async function getUserPlaylistNum(accessToken: any) {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    // console.log(response);
    throw new Error("Failed to fetch top tracks");
  }

  const data = await response.json();
  return data.total;
}
