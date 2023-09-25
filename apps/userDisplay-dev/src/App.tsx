import { DependenciesContext } from "dependencies-context";
import { UserDisplay } from "data-visuals";
import React from "react";
import Profile from "./assets/Profile.png";

function App(): JSX.Element {
  return (
    <>
      <DependenciesContext.Provider value={{ Profile }}>
        <UserDisplay />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
