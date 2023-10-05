import { getProviders, signIn } from "next-auth/react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  ThemeProvider,
} from "@mui/material";
import spotify from "../../public/spotify.png";
import mainTheme from "theme";

export default function Login({ providers }: any) {
  return (
    <ThemeProvider theme={mainTheme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          backgroundColor: "#212121",
          justifyContent: "center",
          margin: -1,
        }}
      >
        <Grid container justifyContent="center">
          {Object.values(providers).map((provider: any) => {
            return (
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                spacing={3}
                key={provider.name}
              >
                <Grid item justifyContent="center">
                  <img src={spotify.src} />
                </Grid>
                <Grid item justifyContent="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      signIn(provider.id, { callbackUrl: "/" });
                    }}
                    size="large"
                    style={{ borderRadius: "16px" }}
                    sx={{
                      backgroundColor: "#1DB954",
                    }}
                  >
                    <Typography
                      fontWeight={800}
                      sx={{ textTransform: "capitalize", color: "#212121" }}
                    >
                      Login
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
