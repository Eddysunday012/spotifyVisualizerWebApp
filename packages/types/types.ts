import { DefaultSession } from "next-auth";

export interface myUser {
  myGeneralUserInfo: generalUserInfo | null;
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

export interface generalUserInfo {
  profilePic?: string | null;
  name: string | null;
  totalHoursListened?: number | null;
  numFollowers?: number | null;
  numFollowing?: number | null;
  numPlaylists?: number | null;
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
