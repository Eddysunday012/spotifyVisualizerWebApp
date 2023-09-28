import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopArtists } from "../TopArtists";
import { DependenciesContext } from "dependencies-context";
import { topArtists, artistItem } from "types";

describe("test TopArtists suite", () => {
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

  it("should render properly", async () => {
    const TopArtistInfo: topArtists = {
      month: month,
      year: year,
      allTime: allTime,
    };
    render(
      <DependenciesContext.Provider value={TopArtistInfo}>
        <TopArtists />
      </DependenciesContext.Provider>
    );

    expect(screen.getByText("Month")).toBeTruthy();
    expect(screen.getByText("Year")).toBeTruthy();
    expect(screen.getByText("All Time")).toBeTruthy();
  });

  //   it("should render if no information", async () => {
  //     const TopArtistInfo = undefined;
  //     render(
  //       <DependenciesContext.Provider value={{ TopArtistInfo }}>
  //         <TopArtists />
  //       </DependenciesContext.Provider>
  //     );
  //   });
});
