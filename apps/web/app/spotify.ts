export async function getUserPlaylists(accessToken: string) {
  const response = await fetch("https://api.spotify.comv1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching user playlists");
  }

  const data = await response.json();
  return data.items;
}
