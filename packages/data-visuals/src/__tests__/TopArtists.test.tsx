import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopArtists } from "../TopArtists";
import { DependenciesContext } from "dependencies-context";
import { topArtists, artistItem } from "types";
import artistPic from "../img/artistPic.png";

describe("test TopArtists suite", () => {
  const month: Array<artistItem> = [];
  const year: Array<artistItem> = [];
  const allTime: Array<artistItem> = [];

  const list = [month, year, allTime];
  const listName = ["Month", "Year", "All Time"];
  var j = 0;

  it("should render properly", async () => {
    list.forEach((item) => {
      var firstName = listName[j];
      for (let i = 0; i < 5; i++) {
        const newArtist: artistItem = {
          name: `${firstName} Artist ${i + 1}`,
          percentage: 23,
          img: artistPic,
        };
        item.push(newArtist);
      }
      j = j + 1;
    });

    const TopArtistsInfo: topArtists = {
      month: month,
      year: year,
      allTime: allTime,
    };
    render(
      <DependenciesContext.Provider value={{ TopArtistsInfo }}>
        <TopArtists />
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
        <TopArtists />
      </DependenciesContext.Provider>
    );
  });

  it("should change to specific month/year/all time when clicked on", async () => {
    list.forEach((item) => {
      var firstName = listName[j];
      for (let i = 0; i < 5; i++) {
        const newArtist: artistItem = {
          name: `${firstName} Artist ${i + 1}`,
          percentage: 23,
          img: artistPic,
        };
        item.push(newArtist);
      }
      j = j + 1;
    });

    const TopArtistsInfo: topArtists = {
      month: month,
      year: year,
      allTime: allTime,
    };
    render(
      <DependenciesContext.Provider value={{ TopArtistsInfo }}>
        <TopArtists />
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
    const TopArtistsInfo = {
      month: undefined,
      year: undefined,
      allTime: undefined,
    };
    render(
      <DependenciesContext.Provider value={{ TopArtistsInfo }}>
        <TopArtists />
      </DependenciesContext.Provider>
    );
  });
});
