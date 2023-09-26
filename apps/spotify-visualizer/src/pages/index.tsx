import { Inter } from "next/font/google";
import { useSession, signOut, signIn } from "next-auth/react";
import { getTopArtists, getTopSongs, getUserProfile } from "spotify-logic";
import { useState, useEffect } from "react";
import { UserDisplay } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import { getUserPlaylistNum } from "spotify-logic/src/spotify-logic";
import { Box, Button, createTheme, ThemeProvider } from "@mui/material";

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
  const [topTracks, setTopTracks] = useState([]);
  const [profile, setProfile] = useState({});
  const [UserDisplayInfo, setUserDisplayInfo] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (session && session.user && session.user.accessToken) {
        let accessToken = session?.user?.accessToken;
        const songs = await getTopSongs(accessToken);
        const userProfile = await getUserProfile(accessToken);
        const numPlaylists = await getUserPlaylistNum(accessToken);

        return { songs, userProfile, numPlaylists };
      }
    }

    fetchData().then((result) => {
      console.log(result?.userProfile);
      setUserDisplayInfo({
        profilePic: result?.userProfile.images[1].url,
        name: result?.userProfile.display_name,
        numFollowers: result?.userProfile.followers.total,
        numFollowing: 80,
        numPlaylists: result?.numPlaylists,
      });

      setTopTracks(result?.songs);
      setProfile(result?.userProfile);
      setLoading(false);
    });
  }, [session]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DependenciesContext.Provider value={{ UserDisplayInfo }}>
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
              <UserDisplay />
              <Button variant="contained" onClick={() => signOut()}>
                Sign Out
              </Button>
            </Box>
          </ThemeProvider>
        </DependenciesContext.Provider>
      )}
    </>
  );
}
