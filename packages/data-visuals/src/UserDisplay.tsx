import { DependenciesContext } from "dependencies-context";
import { PropsWithChildren } from "react";
import { Container } from "@mui/material";
import { userDisplay } from "types";
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
      {({ Profile }: any) => {
        const profileData = Profile as userDisplay;
        return (
          <Container>
            <img style={ImageMyStyle} src={profileData.profilePic} alt="" />
          </Container>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
