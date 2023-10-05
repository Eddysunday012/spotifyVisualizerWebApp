import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopTracks } from "../TopTracks";
import { DependenciesContext } from "dependencies-context";
import { topTracks, songItem } from "types";
import artistPic from "../img/artistPic.png";

describe("test TopTracks suite", () => {
  const month: Array<songItem> = [];
  const year: Array<songItem> = [];
  const allTime: Array<songItem> = [];

  const list = [month, year, allTime];
  const listName = ["Month", "Year", "All Time"];
  var j = 0;

  it("should render properly", () => {
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

    const TopTracksInfo: topTracks = {
      month: month,
      year: year,
      allTime: allTime,
    };

    render(
      <DependenciesContext.Provider value={{ TopTracksInfo }}>
        <TopTracks />
      </DependenciesContext.Provider>
    );

    expect(screen.getByText("Month")).toBeTruthy();
    expect(screen.getByText("Year")).toBeTruthy();
    expect(screen.getByText("All Time")).toBeTruthy();
  });

  it("should render if no information", async () => {
    const TopArtistsInfo = undefined;
    render(
      <DependenciesContext.Provider value={{ TopArtistsInfo }}>
        <TopTracks />
      </DependenciesContext.Provider>
    );
  });

  it("should change to specific month/year/all time when clicked on", async () => {
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

    const TopTracksInfo: topTracks = {
      month: month,
      year: year,
      allTime: allTime,
    };
    render(
      <DependenciesContext.Provider value={{ TopTracksInfo }}>
        <TopTracks />
      </DependenciesContext.Provider>
    );

    const yearButton = screen.getByText("Year");
    fireEvent.click(yearButton);
    expect(screen.getByText(year[0].name)).toBeTruthy();
    const allTimeButton = screen.getByText("All Time");
    fireEvent.click(allTimeButton);
    expect(screen.getByText(allTime[0].name)).toBeTruthy();
    const monthButton = screen.getByText("Month");
    fireEvent.click(monthButton);
    expect(screen.getByText(month[0].name)).toBeTruthy();
  });

  it("should render if no information for each", async () => {
    const TopTracksInfo = {
      month: undefined,
      year: undefined,
      allTime: undefined,
    };
    render(
      <DependenciesContext.Provider value={{ TopTracksInfo }}>
        <TopTracks />
      </DependenciesContext.Provider>
    );
  });
});
