import { DependenciesContext } from "dependencies-context";
import { PropsWithChildren, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  ThemeProvider,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
// import mainTheme from "theme";

export interface TopArtistsDisplayProps extends PropsWithChildren {}

export const TopArtists: React.FunctionComponent<
  TopArtistsDisplayProps
> = () => {
  const listSwitch: Array<String> = ["Month", "Year", "All Time"];
  const [alignment, setAlignment] = useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <DependenciesContext.Consumer>
      {({ TopArtistsInfo }: any) => {
        return (
          <Box
            sx={{
              backgroundColor: "#535353",
            }}
          >
            <Container>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                {listSwitch.map((item) => (
                  <ToggleButton value="left" aria-label="left aligned">
                    {item}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Container>
          </Box>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
