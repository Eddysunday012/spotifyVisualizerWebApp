import { artistItem, songItem } from "types";

/**
 *
 * @param accessToken from env
 * @param term short_term, medium_term, or long_term
 * @returns TopSongObj with object containing TopSongsInfo and ArtistIdList
 */
export async function getTopSongs(accessToken: any, term: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=50`,
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

  const TopSongsInfo: Array<songItem> = [];
  const AristIdList: any[] = [];

  data.items.slice(0, 5).forEach((song: any) => {
    var newSongItem: songItem = {
      name: song.name,
      artist: song.artists[0].name,
      album: song.album.name,
      img: song.album.images[2].url,
      duration: song.duration_ms,
    };
    TopSongsInfo.push(newSongItem);
  });

  data.items.forEach((song: any) => {
    AristIdList.push(song.artists[0].id);
  });

  const TopSongsObj = {
    ArtistIdList: AristIdList,
    TopSongsInfo: TopSongsInfo,
  };

  return TopSongsObj; // Assuming the response contains an "items" array of top tracks.
}

/**
 *
 * @param accessToken from env
 * @param term short_term, medium_term, or long_term
 * @returns TopArtistInfo Obj (in types/src/spotify-visualizer-types)
 */
export async function getTopArtists(accessToken: any, term: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    // console.log(response);
    throw new Error("Failed to fetch top artists");
  }

  const data = await response.json();

  const TopArtistsInfo: Array<artistItem> = [];

  data.items.slice(0, 5).forEach((artist: any) => {
    var newArtistItem: artistItem = {
      name: artist.name,
      percentage: 23,
      img: artist.images[2].url,
    };
    TopArtistsInfo.push(newArtistItem);
  });

  return TopArtistsInfo;
}

/**
 *
 * @param accessToken from env
 * @returns UserProfile Obj (in types/src/spotify-visualizer-types)
 */
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

/**
 *
 * @param accessToken from env
 * @returns number of playlists
 */
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

/**
 *
 * @param accessToken from env
 * @param ArtistIdList list of ArtistIds
 * @returns dictionary of genres and how many artists fall into the list
 */
export async function getTopGenresFromArtists(
  accessToken: any,
  ArtistIdList: Array<any>
) {
  const IdListString = ArtistIdList.join(",");
  console.log(IdListString);

  const response = await fetch(
    `https://api.spotify.com/v1/artists?ids=${IdListString}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  const genreList: { [key: string]: number } = {};

  data.artists.forEach((artist: any) => {
    artist.genres.forEach((genre: string) => {
      if (!(genre in genreList)) {
        genreList[genre] = 0;
      }
      genreList[genre]++;
    });
  });

  return genreList;
}
