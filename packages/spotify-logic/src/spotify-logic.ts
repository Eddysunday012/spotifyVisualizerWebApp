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

export async function getTopArtists(accessToken: any) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
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
