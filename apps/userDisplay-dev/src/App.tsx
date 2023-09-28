import { DependenciesContext } from "dependencies-context";
import { UserDisplay } from "data-visuals";
import React from "react";
import Profile from "./assets/Profile.png";
import { userDisplay } from "types";

function handleSignOut() {
  alert("Sign Out works!");
}

function App(): JSX.Element {
  const UserDisplayInfo: userDisplay = {
    profilePic: Profile,
    name: "Ethan Domingo",
    numFollowers: 23,
    numFollowing: 88,
    numPlaylists: 25,
    signOut: () => handleSignOut(),
  };

  return (
    <>
      <DependenciesContext.Provider value={{ UserDisplayInfo }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
