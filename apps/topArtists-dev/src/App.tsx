import { TopArtists } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import { topArtists, artistItem } from "types";

function App(): JSX.Element {
  const month: Array<artistItem> = [];
  const year: Array<artistItem> = [];
  const allTime: Array<artistItem> = [];
  const list = [month, year, allTime];

  list.forEach((item) => {
    for (let i = 0; i < 5; i++) {
      const newArtist: artistItem = {
        name: `artist ${i + 1}`,
        percentage: 23,
      };
      item.push(newArtist);
    }
  });

  const TopArtistInfo: topArtists = {
    month: month,
    year: year,
    allTime: allTime,
  };

  return (
    <>
      <DependenciesContext.Provider value={{ TopArtistInfo }}>
        <TopArtists />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
