import { DependenciesContext } from "dependencies-context";
import { PropsWithChildren, useState } from "react";
import {
  Container,
  Box,
  Button,
  List,
  ListItem,
  Typography,
  Avatar,
  Grid,
  ThemeProvider,
} from "@mui/material";
// import { motion, useAnimation } from "framer-motion";
import { artistItem } from "types";
import mainTheme from "theme";

export interface TopArtistsDisplayProps extends PropsWithChildren {}

interface ArtistListItemDisplayProps {
  artist: artistItem;
}

export const ArtistListItem: React.FunctionComponent<
  ArtistListItemDisplayProps
> = ({ artist }) => {
  return (
    <ListItem key={artist.name} alignItems="center">
      <Grid container alignItems="flex-end">
        <Grid item xs={2}>
          <Avatar src={artist.img} />
        </Grid>
        <Grid item xs={10}>
          <Typography
            align="right"
            sx={{ fontSize: 20 }}
            color="#FFFFFF"
            fontWeight={600}
          >
            {artist.name}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export const TopArtists: React.FunctionComponent<
  TopArtistsDisplayProps
> = () => {
  const [underlinedButton, setUnderlinedButton] = useState(0);
  const [artistListNum, setArtistListNum] = useState(0);

  const handleButtonClick = (buttonIndex: number) => {
    setUnderlinedButton(buttonIndex);
    setArtistListNum(buttonIndex);
  };

  return (
    <DependenciesContext.Consumer>
      {({ TopArtistsInfo }: any) => {
        if (!TopArtistsInfo) {
          return null;
        }
        const artistListItems = [
          TopArtistsInfo.month,
          TopArtistsInfo.year,
          TopArtistsInfo.allTime,
        ];

        return (
          <ThemeProvider theme={mainTheme}>
            <Grid sx={{ justifyContent: "center" }}>
              <Typography
                sx={{ color: "#FFFFFF", fontSize: 45 }}
                fontWeight={800}
                align="center"
              >
                Top Artists
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#535353",
                  borderRadius: "3%",
                  width: "auto",
                }}
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
                    {artistListItems[artistListNum]
                      ? artistListItems[artistListNum].map(
                          (artist: artistItem) => (
                            <ArtistListItem key={artist.name} artist={artist} />
                          )
                        )
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
