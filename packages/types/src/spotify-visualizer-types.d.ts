import { DefaultSession } from "next-auth";

export interface myUser {
  myUserDisplay: userDisplay | null;
  myTopArtists: topArtists | null;
  myTopTracks: topTracks | null;
  myHoursListened: Array<timeStamp>;
  myGenreBreakdown: Array<genreItem>;
  accessToken: string | null;
}

export interface MySession extends Omit<DefaultSession, "user"> {
  user?: myUser;
  expires: string;
}

export interface userDisplay {
  profilePic: string;
  name: string;
  numFollowers: number;
  numFollowing: number;
  // numPlaylists?: number | null;
}

export interface topArtists {
  month: Array<artistItem>;
  year: Array<artistItem>;
  allTime: Array<artistItem>;
}

export interface topTracks {
  month: Array<songItem>;
  year: Array<songItem>;
  allTime: Array<songItem>;
}

export interface artistItem {
  name: string;
  percentage: number;
}

export interface songItem {
  name: string;
}

export interface timeStamp {
  date: Date;
  hours: number;
}

export interface genreItem {
  name: string;
  hours: number;
}
