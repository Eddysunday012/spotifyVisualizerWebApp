import { TopTracks } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import { topTracks, songItem } from "types";
import artistPic from "./assets/artistPic.png";
import React from "react";
import { Switch } from "@mui/material";

function App(): JSX.Element {
  const month: Array<songItem> = [];
  const year: Array<songItem> = [];
  const allTime: Array<songItem> = [];

  const list = [month, year, allTime];
  const listName = ["Month", "Year", "All Time"];
  var j = 0;

  list.forEach((item) => {
    var firstName = listName[j];
    for (let i = 0; i < 5; i++) {
      const newSong: songItem = {
        name: `${firstName} Song ${i + 1}`,
        artist: "ArtistName",
        album: "AlbumName",
        img: artistPic,
        duration: 1000,
      };
      item.push(newSong);
    }
    j = j + 1;
  });

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn); // Toggle the switch state
  };

  var TopTracksInfo: topTracks = {
    month: month,
    year: year,
    allTime: allTime,
  };

  if (!isSwitchOn) {
    TopTracksInfo = {
      month: undefined,
      year: undefined,
      allTime: undefined,
    };
  }

  return (
    <>
      <Switch
        checked={isSwitchOn}
        onChange={handleSwitchChange}
        color="primary" // Change the color as needed
      />
      {isSwitchOn ? "Not Loading" : "Loading"}
      <DependenciesContext.Provider value={{ TopTracksInfo }}>
        <TopTracks />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
