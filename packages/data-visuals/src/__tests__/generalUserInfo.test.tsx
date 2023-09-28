import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserDisplay } from "../UserDisplay";
import { DependenciesContext } from "dependencies-context";
import Profile from "../img/Profile.png";
import { userDisplay } from "types";

describe("test userDisplay suite", () => {
  const mockSignOut = vi.fn();

  const UserDisplayInfo: userDisplay = {
    profilePic: Profile,
    name: "Ethan Domingo",
    numFollowers: 23,
    numFollowing: 88,
    numPlaylists: 90,
    signOut: () => mockSignOut(),
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render properly", async () => {
    render(
      <DependenciesContext.Provider value={{ UserDisplayInfo }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    );
  });

  it("should have the users name", async () => {
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

  it("should call the mock when clicked", async () => {
    render(
      <DependenciesContext.Provider value={{ UserDisplayInfo }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    );

    const foundButton = screen.getByText("Sign Out");
    fireEvent.click(foundButton);
    expect(mockSignOut).toHaveBeenCalled();
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
