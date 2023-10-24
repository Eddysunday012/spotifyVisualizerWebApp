import { Inter } from "next/font/google";
import { useSession, signOut, signIn } from "next-auth/react";
import {
  getTopArtists,
  getTopSongs,
  getUserProfile,
  getUserPlaylistNum,
  getTopGenresFromArtists,
} from "spotify-logic";
import { useState, useEffect } from "react";
import {
  Cluster,
  GenreBreakdown,
  TopArtists,
  TopTracks,
  UserDisplay,
} from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
  Grid,
} from "@mui/material";
import { getAudioFeaturesFromSongIds } from "spotify-logic/src/spotify-logic";

export const themeDark = createTheme({
  palette: {
    background: {
      default: "#212121",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

interface ArtistIds {
  month: any;
  year: any;
  allTime: any;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [TopTracksInfo, setTopTracksInfo] = useState({});
  const [UserDisplayInfo, setUserDisplayInfo] = useState({});
  const [TopArtistsInfo, setTopArtistsInfo] = useState({});
  const [ArtistIds, setArtistIds] = useState<ArtistIds>();
  const [SongIds, setSongIds] = useState<any>();
  const [ClusterInfo, setClusterInfo] = useState<any>();
  const [GenreBreakdownInfo, setTopGenres] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (session && session.user && session.user.accessToken) {
        let accessToken = session?.user?.accessToken;

        const userProfile = await getUserProfile(accessToken);
        const numPlaylists = await getUserPlaylistNum(accessToken);
        const TopTracksInfo_month = await getTopSongs(
          accessToken,
          "short_term"
        );
        const TopTracksInfo_year = await getTopSongs(
          accessToken,
          "medium_term"
        );
        const TopTracksInfo_allTime = await getTopSongs(
          accessToken,
          "long_term"
        );
        const TopArtistsInfo_month = await getTopArtists(
          accessToken,
          "short_term"
        );
        const TopArtistsInfo_year = await getTopArtists(
          accessToken,
          "medium_term"
        );
        const TopArtistsInfo_allTime = await getTopArtists(
          accessToken,
          "long_term"
        );
        return {
          TopTracksInfo_month,
          TopTracksInfo_year,
          TopTracksInfo_allTime,
          userProfile,
          numPlaylists,
          TopArtistsInfo_month,
          TopArtistsInfo_year,
          TopArtistsInfo_allTime,
        };
      }
    }

    fetchData().then((result) => {
      setUserDisplayInfo({
        profilePic: result?.userProfile.images[1].url,
        name: result?.userProfile.display_name,
        numFollowers: result?.userProfile.followers.total,
        numFollowing: 80,
        numPlaylists: result?.numPlaylists,
        signOut: () => signOut(),
      });

      setTopArtistsInfo({
        month: result?.TopArtistsInfo_month,
        year: result?.TopArtistsInfo_year,
        allTime: result?.TopArtistsInfo_allTime,
      });

      setTopTracksInfo({
        month: result?.TopTracksInfo_month.TopSongsInfo,
        year: result?.TopTracksInfo_year.TopSongsInfo,
        allTime: result?.TopTracksInfo_allTime.TopSongsInfo,
      });

      setArtistIds({
        month: result?.TopTracksInfo_month.ArtistIdList,
        year: result?.TopTracksInfo_year.ArtistIdList,
        allTime: result?.TopTracksInfo_year.ArtistIdList,
      });

      setSongIds({
        month: result?.TopTracksInfo_month.SongIdList,
        year: result?.TopTracksInfo_year.SongIdList,
        allTime: result?.TopTracksInfo_allTime.SongIdList,
      });
    });
  }, [session]);

  useEffect(() => {
    async function fetchGenreData() {
      if (ArtistIds?.month && ArtistIds?.year && ArtistIds?.allTime) {
        let accessToken = session?.user?.accessToken;

        const TopGenres_month = await getTopGenresFromArtists(
          accessToken,
          ArtistIds?.month
        );
        const TopGenres_year = await getTopGenresFromArtists(
          accessToken,
          ArtistIds?.year
        );
        const TopGenres_allTime = await getTopGenresFromArtists(
          accessToken,
          ArtistIds?.allTime
        );

        return {
          TopGenres_month,
          TopGenres_year,
          TopGenres_allTime,
        };
      }
    }

    fetchGenreData().then((result) => {
      setTopGenres({
        month: result?.TopGenres_month,
        year: result?.TopGenres_year,
        allTime: result?.TopGenres_allTime,
      });
    });
  }, [ArtistIds]);

  useEffect(() => {
    async function fetchAudioFeatures() {
      if (SongIds?.month && SongIds?.year && SongIds?.allTime) {
        let accessToken = session?.user?.accessToken;

        const audioFeatures_month = await getAudioFeaturesFromSongIds(
          accessToken,
          SongIds.month
        );

        const audioFeatures_year = await getAudioFeaturesFromSongIds(
          accessToken,
          SongIds.year
        );

        const audioFeatures_allTime = await getAudioFeaturesFromSongIds(
          accessToken,
          SongIds.year
        );

        return [audioFeatures_month, audioFeatures_year, audioFeatures_allTime];
      }
    }
    fetchAudioFeatures().then((result) => {
      setClusterInfo(result);
      setLoading(false);
    });
  }, [SongIds]);

  return (
    <>
      {isLoading && session && session.user && session.user.accessToken ? (
        <p>Loading...</p>
      ) : (
        <DependenciesContext.Provider
          value={{
            UserDisplayInfo,
            TopArtistsInfo,
            TopTracksInfo,
            GenreBreakdownInfo,
            ClusterInfo,
          }}
        >
          <ThemeProvider theme={themeDark}>
            <Box
              sx={{
                backgroundColor: "#212121",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                overflowX: "hidden",
                margin: -1,
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <UserDisplay />
                </Grid>
                <Grid item container xs={8}>
                  <Grid container item xs={6} justifyContent="center">
                    <TopArtists />
                  </Grid>
                  <Grid container item xs={6} justifyContent="center">
                    <TopTracks />
                  </Grid>
                  <Grid container item xs={6} justifyContent="center">
                    <Cluster />
                  </Grid>
                  <Grid container item xs={6} justifyContent="center">
                    <GenreBreakdown />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </DependenciesContext.Provider>
      )}
    </>
  );
}
