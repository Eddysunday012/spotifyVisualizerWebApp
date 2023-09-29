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
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { artistItem } from "types";
// import mainTheme from "theme";

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
    <ListItem key={artist.name}>
      <Avatar {...stringAvatar(artist.name)} />
      <Typography>{artist.name}</Typography>
    </ListItem>
  );
};

export const TopArtists: React.FunctionComponent<
  TopArtistsDisplayProps
> = () => {
  const [activeTab, setActiveTab] = useState("Month");
  const lineControls = useAnimation();

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);

    // Animate the line to the clicked option
    lineControls.start({
      x: tab === "Month" ? 0 : tab === "Year" ? 1 : 2,
    });
  };

  return (
    <DependenciesContext.Consumer>
      {({ TopArtistsInfo }: any) => {
        return (
          <Box
            sx={{
              backgroundColor: "#535353",
            }}
          >
            <Container>
              <div>
                <Button
                  onClick={() => handleTabClick("Month")}
                  sx={{ color: activeTab === "Month" ? "primary" : "default" }}
                >
                  Month
                </Button>
                <Button
                  onClick={() => handleTabClick("Year")}
                  sx={{ color: activeTab === "Year" ? "primary" : "default" }}
                >
                  Year
                </Button>
                <Button
                  onClick={() => handleTabClick("All Time")}
                  sx={{
                    color: activeTab === "All Time" ? "primary" : "default",
                  }}
                >
                  All Time
                </Button>
                <motion.div
                  className="line"
                  initial={{ x: 0 }}
                  animate={lineControls}
                />
              </div>
              <List>
                {TopArtistsInfo.month.map((artist: artistItem) => (
                  <ArtistListItem key={artist.name} artist={artist} />
                ))}
              </List>
            </Container>
          </Box>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
