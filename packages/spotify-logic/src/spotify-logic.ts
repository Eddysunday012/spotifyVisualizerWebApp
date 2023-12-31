import { artistItem, songItem } from "types";

/**
 *
 * @param accessToken from env
 * @param term short_term, medium_term, or long_term
 * @returns TopSongObj with object containing TopSongsInfo, SongIdList and ArtistIdList
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
  const SongIdList: any[] = [];

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
    SongIdList.push(song.id);
  });

  const TopSongsObj = {
    ArtistIdList: AristIdList,
    SongIdList: SongIdList,
    TopSongsInfo: TopSongsInfo,
  };

  return TopSongsObj;
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

  const response = await fetch(
    `https://api.spotify.com/v1/artists?ids=${IdListString}`,
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

  const genreList: { [key: string]: number } = {};

  data.artists.forEach((artist: any) => {
    artist.genres.forEach((genre: string) => {
      if (!(genre in genreList)) {
        genreList[genre] = 0;
      }
      genreList[genre]++;
    });
  });

  const genreArray: [string, number][] = Object.entries(genreList);

  genreArray.sort((a, b) => b[1] - a[1]);

  const genreNames = genreArray.map((innerList) => innerList[0]);
  const genreValues = genreArray.map((innerList) => innerList[1]);

  const genreBreakdownInfo = {
    genreNames: genreNames,
    genreValues: genreValues,
  };

  return genreBreakdownInfo;
}

export async function getAudioFeaturesFromSongIds(
  accessToken: any,
  songIds: any
) {
  const IdListString = songIds.join(",");

  const response = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${IdListString}`,
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

  return data.audio_features;
}
