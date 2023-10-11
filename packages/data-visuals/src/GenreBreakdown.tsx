import * as d3 from "d3";
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

interface GenreBreakdownProps {}

interface DataPoint {
  axis: string;
  value: number;
}

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
> = ({}) => {
  const data = {
    labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5"],
    datasets: [
      {
        label: "# of Votes",
        data: [8, 9, 3, 5, 2],
        backgroundColor: "rgba(29, 185, 84, 0.31)",
        borderColor: "rgba(29, 185, 84, 1)",
        borderWidth: 2,
      },
    ],
  };

  return <Radar data={data} />;
};
