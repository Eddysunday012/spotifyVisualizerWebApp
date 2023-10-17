import { Inter } from "next/font/google";
import { useSession, signOut, signIn } from "next-auth/react";
import { getTopArtists, getTopSongs, getUserProfile } from "spotify-logic";
import { useState, useEffect } from "react";
import { TopArtists, TopTracks, UserDisplay } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import { getUserPlaylistNum } from "spotify-logic/src/spotify-logic";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
  Grid,
} from "@mui/material";

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

export default function Home() {
  const { data: session, status } = useSession();
  const [TopTracksInfo, setTopTracksInfo] = useState({});
  const [profile, setProfile] = useState({});
  const [UserDisplayInfo, setUserDisplayInfo] = useState({});
  const [TopArtistsInfo, setTopArtistsInfo] = useState({});
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

      // setProfile(result?.userProfile);
      setLoading(false);
    });
  }, [session]);

  return (
    <>
      {isLoading && session && session.user && session.user.accessToken ? (
        <p>Loading...</p>
      ) : (
        <DependenciesContext.Provider
          value={{ UserDisplayInfo, TopArtistsInfo, TopTracksInfo }}
        >
          <ThemeProvider theme={themeDark}>
            <Box
              sx={{
                backgroundColor: "#212121",
                minHeight: "100vh", // Ensure the background color covers the full viewport height
                display: "flex",
                flexDirection: "column", // Align children vertically
                overflowX: "hidden",
                margin: -1,
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <UserDisplay />
                </Grid>
                <Grid item container xs={8}>
                  <Grid container item xs={6}>
                    <TopArtists />
                  </Grid>
                  <Grid container item xs={6}>
                    <TopTracks />
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
