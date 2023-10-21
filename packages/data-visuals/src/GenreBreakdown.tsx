import React, { useState } from "react";
// import { genreItem } from "types";
import { DependenciesContext } from "dependencies-context";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Box,
  Button,
  Container,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import mainTheme from "theme";

interface GenreBreakdownProps {}

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const options = {
  scales: {
    r: {
      angleLines: {
        color: "white", // Change the color of angle lines
        lineWidth: 8,
      },
      grid: {
        color: "black", // Change the color of grid lines
      },
      pointLabels: {
        font: {
          size: 16,
          family: "Open Sans",
        },
        color: "white",
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const GenreBreakdown: React.FunctionComponent<
  GenreBreakdownProps
> = () => {
  const [underlinedButton, setUnderlinedButton] = useState(0);
  const [genreListNum, setGenreListNum] = useState(0);

  const handleButtonClick = (buttonIndex: number) => {
    setUnderlinedButton(buttonIndex);
    setGenreListNum(buttonIndex);
  };
  return (
    <DependenciesContext.Consumer>
      {({ GenreBreakdownInfo }: any) => {
        if (!GenreBreakdownInfo && !GenreBreakdownInfo?.month) {
          return null;
        }

        const genreListItems = [
          GenreBreakdownInfo.month,
          GenreBreakdownInfo.year,
          GenreBreakdownInfo.allTime,
        ];

        const data = {
          labels: genreListItems[genreListNum].genreNames.slice(0, 5),
          datasets: [
            {
              label: "",
              data: genreListItems[genreListNum].genreValues.slice(0, 5),
              backgroundColor: "rgba(29, 185, 84, 0.31)",
              borderColor: "rgba(29, 185, 84, 1)",
              borderWidth: 2,
            },
          ],
        };

        return (
          <ThemeProvider theme={mainTheme}>
            <Grid sx={{ justifyContent: "center" }}>
              <Typography
                sx={{ color: "#FFFFFF", fontSize: 45 }}
                fontWeight={800}
                align="center"
              >
                Genre Breakdown
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#535353",
                  borderRadius: "3%",
                  width: "auto",
                }}
              >
                <Container>
                  <Radar data={data} options={options} />
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid
                      container
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        disableRipple
                        variant="text"
                        color="primary"
                        onClick={() => handleButtonClick(0)}
                        sx={{
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Typography
                          variant="h3"
                          fontWeight={600}
                          style={{
                            textTransform: "none",
                            textDecoration:
                              underlinedButton === 0 ? "underline" : "none",
                          }}
                          sx={{ color: "#FFFFFF", fontSize: 30 }}
                        >
                          Month
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        disableRipple
                        variant="text"
                        color="primary"
                        onClick={() => handleButtonClick(1)}
                        sx={{
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Typography
                          fontWeight={600}
                          style={{
                            textTransform: "none",
                            textDecoration:
                              underlinedButton === 1 ? "underline" : "none",
                          }}
                          sx={{ color: "#FFFFFF", fontSize: 30 }}
                        >
                          Year
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        disableRipple
                        variant="text"
                        color="primary"
                        onClick={() => handleButtonClick(2)}
                        sx={{
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Typography
                          fontWeight={600}
                          style={{
                            textTransform: "none",
                            textDecoration:
                              underlinedButton === 2 ? "underline" : "none",
                          }}
                          sx={{ color: "#FFFFFF", fontSize: 30 }}
                        >
                          All Time
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Grid>
          </ThemeProvider>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
