import { DependenciesContext } from "dependencies-context";
import { PropsWithChildren } from "react";
// import { Container } from "@mui/material";
// import Profile from "./img/Profile.png";

export interface UserDisplayProps extends PropsWithChildren {}

export const UserDisplay: React.FunctionComponent<UserDisplayProps> = () => {
  const ImageMyStyle = {
    maxWidth: "230px",
    maxHeight: "230px",
    flex: 1,
    resizeMode: "contain",
  };

  return (
    <DependenciesContext.Consumer>
      {({ Profile }: any) => <img style={ImageMyStyle} src={Profile} alt="" />}
    </DependenciesContext.Consumer>
  );
};
