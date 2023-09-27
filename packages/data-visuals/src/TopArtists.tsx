import { DependenciesContext } from "dependencies-context";
import { PropsWithChildren } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  ThemeProvider,
  Button,
} from "@mui/material";
import { userDisplay } from "types";
import { signOut } from "next-auth/react";
import mainTheme from "theme";

export interface TopArtistsDisplayProps extends PropsWithChildren {}

export const TopArtists: React.FunctionComponent<
  TopArtistsDisplayProps
> = () => {
  return (
    <DependenciesContext.Consumer>
      {({ TopArtistsInfo }: any) => {
        return <div>Hello World</div>;
      }}
    </DependenciesContext.Consumer>
  );
};
