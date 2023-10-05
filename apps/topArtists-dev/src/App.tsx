import { TopArtists } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import { topArtists, artistItem } from "types";
import React from "react";
import { Switch } from "@mui/material";

function App(): JSX.Element {
  const month: Array<artistItem> = [];
  const year: Array<artistItem> = [];
  const allTime: Array<artistItem> = [];

  const list = [month, year, allTime];
  const listName = ["Month", "Year", "All Time"];
  var j = 0;

  list.forEach((item) => {
    var firstName = listName[j];
    for (let i = 0; i < 5; i++) {
      const newArtist: artistItem = {
        name: `${firstName} Artist ${i + 1}`,
        percentage: 23,
      };
      item.push(newArtist);
    }
    j = j + 1;
  });

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn); // Toggle the switch state
  };

  var TopArtistsInfo: topArtists = {
    month: month,
    year: year,
    allTime: allTime,
  };

  if (!isSwitchOn) {
    TopArtistsInfo = {
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
      <DependenciesContext.Provider value={{ TopArtistsInfo }}>
        <TopArtists />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
