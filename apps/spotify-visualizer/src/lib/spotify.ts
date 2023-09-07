import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "app-remote-control",
  "streaming",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
export { LOGIN_URL, spotifyApi };
