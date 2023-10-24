import { DependenciesContext } from "dependencies-context";
import { PropsWithChildren, useState } from "react";
import {
  Container,
  Box,
  Button,
  List,
  ListItem,
  Typography,
  Grid,
  ThemeProvider,
} from "@mui/material";
// import { motion, useAnimation } from "framer-motion";
import { songItem } from "types";
import mainTheme from "theme";

export interface TopTracksDisplayProps extends PropsWithChildren {}

interface SongListItemDisplayProps {
  song: songItem;
}

function millisecondsToMinutesAndSeconds(milliseconds: number): string {
  // Calculate minutes and seconds
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the result as "m:ss" (e.g., "0:06" or "3:40")
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
}

export const SongListItem: React.FunctionComponent<
  SongListItemDisplayProps
> = ({ song }) => {
  const ImageMyStyle = {
    maxWidth: "36px",
    maxHeight: "36px",
    flex: 1,
    resizeMode: "contain",
  };

  return (
    <ListItem key={song.name} alignItems="center">
      <Grid container alignItems="flex-end">
        <Grid item xs={3}>
          <img style={ImageMyStyle} src={song.img} />
        </Grid>
        <Grid item xs={4}>
          <Typography
            align="right"
            sx={{ fontSize: 20 }}
            color="#FFFFFF"
            fontWeight={600}
            style={{
              overflow: "hidden", // Hide any overflowing content
              textOverflow: "ellipsis", // Display an ellipsis (...) for truncated content
              whiteSpace: "nowrap", // Prevents line breaks within the text
              maxWidth: "100%", // Adjust the maximum width as needed
            }}
          >
            {song.name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            align="right"
            sx={{ fontSize: 20 }}
            color="#FFFFFF"
            fontWeight={600}
          >
            {millisecondsToMinutesAndSeconds(song.duration)}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export const TopTracks: React.FunctionComponent<TopTracksDisplayProps> = () => {
  const [underlinedButton, setUnderlinedButton] = useState(0);
  const [artistListNum, setArtistListNum] = useState(0);

  const handleButtonClick = (buttonIndex: number) => {
    setUnderlinedButton(buttonIndex);
    setArtistListNum(buttonIndex);
  };

  return (
    <DependenciesContext.Consumer>
      {({ TopTracksInfo }: any) => {
        if (!TopTracksInfo) {
          return null;
        }
        const songListItems = [
          TopTracksInfo.month,
          TopTracksInfo.year,
          TopTracksInfo.allTime,
        ];

        return (
          <ThemeProvider theme={mainTheme}>
            <Grid
              container
              direction="column"
              alignItems="center"
              sx={{ justifyContent: "center" }}
            >
              <Typography
                sx={{ color: "#FFFFFF", fontSize: 45 }}
                fontWeight={800}
                align="center"
              >
                Top Tracks
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#535353",
                  borderRadius: "3%",
                }}
                width="80%"
              >
                <Container>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid
                      container
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        disableRipple
                        variant="text"
                        color="primary"
                        onClick={() => handleButtonClick(0)}
                        sx={{
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Typography
                          variant="h3"
                          fontWeight={600}
                          style={{
                            textTransform: "none",
                            textDecoration:
                              underlinedButton === 0 ? "underline" : "none",
                          }}
                          sx={{ color: "#FFFFFF", fontSize: 30 }}
                        >
                          Month
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        disableRipple
                        variant="text"
                        color="primary"
                        onClick={() => handleButtonClick(1)}
                        sx={{
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Typography
                          fontWeight={600}
                          style={{
                            textTransform: "none",
                            textDecoration:
                              underlinedButton === 1 ? "underline" : "none",
                          }}
                          sx={{ color: "#FFFFFF", fontSize: 30 }}
                        >
                          Year
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        disableRipple
                        variant="text"
                        color="primary"
                        onClick={() => handleButtonClick(2)}
                        sx={{
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Typography
                          fontWeight={600}
                          style={{
                            textTransform: "none",
                            textDecoration:
                              underlinedButton === 2 ? "underline" : "none",
                          }}
                          sx={{ color: "#FFFFFF", fontSize: 30 }}
                        >
                          All Time
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <List>
                    {songListItems[artistListNum]
                      ? songListItems[artistListNum].map((song: songItem) => (
                          <SongListItem key={song.name} song={song} />
                        ))
                      : [1, 2, 3, 4, 5].map((item) => {
                          <ListItem key={item}>{"Bruh"}</ListItem>;
                        })}
                  </List>
                </Container>
              </Box>
            </Grid>
          </ThemeProvider>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
