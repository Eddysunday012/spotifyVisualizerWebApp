import React from "react";
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
import { Box, Container, Grid, ThemeProvider, Typography } from "@mui/material";
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

export const GenreBreakdown: React.FunctionComponent<
  GenreBreakdownProps
> = () => {
  return (
    <DependenciesContext.Consumer>
      {({ GenreBreakdownInfo }: any) => {
        // if (!GenreBreakdownInfo) {
        //   return null;
        // }

        const data = {
          labels: GenreBreakdownInfo.genreNames,
          datasets: [
            {
              label: "",
              data: GenreBreakdownInfo.genreValues,
              backgroundColor: "rgba(29, 185, 84, 0.31)",
              borderColor: "rgba(29, 185, 84, 1)",
              borderWidth: 2,
            },
          ],
        };
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
                </Container>
              </Box>
            </Grid>
          </ThemeProvider>
        );
      }}
    </DependenciesContext.Consumer>
  );
};
