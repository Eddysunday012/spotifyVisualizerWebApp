// import React, { useEffect, useState } from "react";
import { DependenciesContext } from "dependencies-context";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
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
import { useEffect, useState, useContext } from "react";
import mainTheme from "theme";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const Cluster: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [underlinedButton, setUnderlinedButton] = useState(0);
  const [clusterListNum, setClusterListNum] = useState(0);

  const handleButtonClick = (buttonIndex: number) => {
    setUnderlinedButton(buttonIndex);
    setClusterListNum(buttonIndex);
  };

  const { ClusterInfo }: any = useContext(DependenciesContext);

  useEffect(() => {
    if (ClusterInfo) {
      const ScatterData = processData(ClusterInfo, "valence", "tempo");
      setChartData(ScatterData);
    }
  }, [ClusterInfo]);

  // Scatter plot options
  const options = {
    scales: {
      x: {
        beginAtZero: true,
        border: {
          color: "black",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        border: {
          color: "black",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  const processData = (dependenciesData: any, x: string, y: string) => {
    const mainData: any[] = [];
    dependenciesData.forEach((song: any) => {
      mainData.push({ x: song[x], y: song[y] });
    });

    return {
      datasets: [
        {
          label: "Main Label",
          data: mainData,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          pointBackgroundColor: "#1DB954", // Set all points to be the same color
          pointBorderColor: "#1DB954",
        },
      ],
    };
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{ color: "#FFFFFF", fontSize: 45 }}
          fontWeight={800}
          align="center"
        >
          Tempo vs Valence
        </Typography>
        <Box
          sx={{
            backgroundColor: "#535353",
            borderRadius: "3%",
          }}
          width="80%"
        >
          <Container>
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
            <div
              style={{
                minHeight: "300px",
                maxHeight: "300px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {chartData ? (
                <Scatter data={chartData} options={options} />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Container>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
