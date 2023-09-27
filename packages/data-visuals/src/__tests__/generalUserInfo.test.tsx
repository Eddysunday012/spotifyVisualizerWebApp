import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UserDisplay } from "../UserDisplay";
import { DependenciesContext } from "dependencies-context";
import Profile from "../img/Profile.png";
import { userDisplay } from "types";

describe("test userDisplay suite", () => {
  const UserDisplayInfo: userDisplay = {
    profilePic: Profile,
    name: "Ethan Domingo",
    numFollowers: 23,
    numFollowing: 88,
    numPlaylists: 90,
  };

  it("should render properly", async () => {
    render(
      <DependenciesContext.Provider value={{ UserDisplayInfo }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    );
  });

  it("should have the users name", async () => {
    const UserDisplayInfo: userDisplay = {
      profilePic: Profile,
      name: "Ethan Domingo",
      numFollowers: 23,
      numFollowing: 88,
      numPlaylists: 90,
    };

    render(
      <DependenciesContext.Provider value={{ UserDisplayInfo }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    );

    const foundName = screen.findByText(UserDisplayInfo.name);

    expect(foundName).toBeTruthy();
    expect(screen.findByText(UserDisplayInfo.numFollowers)).toBeTruthy();
    expect(screen.findByText(UserDisplayInfo.numFollowing)).toBeTruthy();
  });

  it("should render nothing if no information", async () => {
    const UserDisplayInfo = undefined;
    render(
      <DependenciesContext.Provider value={{ UserDisplayInfo }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    );
  });
});
