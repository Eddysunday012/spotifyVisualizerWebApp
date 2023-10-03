import { DependenciesContext } from "dependencies-context";
import { PropsWithChildren } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  ThemeProvider,
  Button,
} from "@mui/material";
import { userDisplay } from "types";
import mainTheme from "theme";

export interface UserDisplayProps extends PropsWithChildren {}

export const UserDisplay: React.FunctionComponent<UserDisplayProps> = () => {
  const ImageMyStyle = {
    maxWidth: "230px",
    maxHeight: "230px",
    flex: 1,
    resizeMode: "contain",
    borderRadius: "50%",
  };

  return (
    <DependenciesContext.Consumer>
      {({ UserDisplayInfo }: any) => {
        // console.log(UserDisplayInfo);
        if (!UserDisplayInfo) {
          return null; // Return null to prevent rendering when data is not available
        }
        const profileData = UserDisplayInfo as userDisplay;

        return (
          <ThemeProvider theme={mainTheme}>
            <Box
              sx={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
              }}
            >
              <Container>
                <Grid container justifyContent="center">
                  <Grid
                    item
                    xs={12}
                    m={10}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <img
                      style={ImageMyStyle}
                      src={profileData.profilePic}
                      alt=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h3"
                      align="center"
                      fontWeight="bold"
                      color="common.white"
                    >
                      {profileData.name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "right",
                      display: "flex",
                      alignItems: "center",
                    }}
                    marginRight={1}
                  >
                    <Typography
                      variant="h5"
                      align="right"
                      fontWeight={600}
                      color="common.white"
                    >
                      {profileData.numFollowers} Followers
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "left",
                      display: "flex",
                      alignItems: "center",
                    }}
                    marginLeft={1}
                  >
                    <Typography
                      variant="h5"
                      align="left"
                      fontWeight={600}
                      color="common.white"
                    >
                      {profileData.numFollowing} Following
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      align="center"
                      fontWeight={600}
                      color="common.white"
                    >
                      {profileData.numPlaylists} Total Playlists
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => profileData.signOut()}
                    >
                      Sign Out
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </ThemeProvider>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
