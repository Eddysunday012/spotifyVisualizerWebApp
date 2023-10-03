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

function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const ArtistListItem: React.FunctionComponent<
  ArtistListItemDisplayProps
> = ({ artist }) => {
  return (
    <ListItem key={artist.name} alignItems="center">
      <Grid container alignItems="flex-end">
        <Grid item xs={2}>
          <Avatar {...stringAvatar(artist.name)} />
        </Grid>
        <Grid item xs={10}>
          <Typography align="right" sx={{ fontSize: 24 }} fontWeight={600}>
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

  const handleButtonClick = (buttonIndex: number) => {
    setUnderlinedButton(buttonIndex);
  };

  return (
    <DependenciesContext.Consumer>
      {({ TopArtistsInfo }: any) => {
        return (
          <ThemeProvider theme={mainTheme}>
            <Box
              sx={{
                backgroundColor: "#535353",
                borderRadius: "10%",
              }}
            >
              <Container>
                <div>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleButtonClick(0)}
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
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
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleButtonClick(1)}
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
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
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleButtonClick(2)}
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
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
                </div>
                <List>
                  {TopArtistsInfo.month.map((artist: artistItem) => (
                    <ArtistListItem key={artist.name} artist={artist} />
                  ))}
                </List>
              </Container>
            </Box>
          </ThemeProvider>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
