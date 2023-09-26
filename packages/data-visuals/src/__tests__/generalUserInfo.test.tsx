import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UserDisplay } from "../UserDisplay";
import { DependenciesContext } from "dependencies-context";
import Profile from "../img/Profile.png";
import { userDisplay } from "types";

describe("test userDisplay suite", () => {
  const user: userDisplay = {
    profilePic: Profile,
    name: "Ethan Domingo",
    numFollowers: 23,
    numFollowing: 88,
  };

  it("should render properly", async () => {
    render(
      <DependenciesContext.Provider value={{ user }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    );
  });

  it("should have the users name", async () => {
    const user: userDisplay = {
      profilePic: Profile,
      name: "Ethan Domingo",
      numFollowers: 23,
      numFollowing: 88,
    };

    render(
      <DependenciesContext.Provider value={{ user }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    );

    const foundName = screen.findByText(user.name);

    expect(foundName).toBeTruthy();
    expect(screen.findByText(user.numFollowers)).toBeTruthy();
    expect(screen.findByText(user.numFollowing)).toBeTruthy();
  });
});
