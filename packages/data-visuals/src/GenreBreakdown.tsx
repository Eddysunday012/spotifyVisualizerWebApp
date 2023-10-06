import * as d3 from "d3";
import React from "react";
import { genreItem } from "types";
import { DependenciesContext } from "dependencies-context";

interface GenreBreakdownProps {}

export const GenreBreakdown: React.FunctionComponent<
  GenreBreakdownProps
> = () => {
  const data: { [key: string]: number }[] = [];
  const features: string[] = ["A", "B", "C", "D", "E", "F"];

  // Generate the data
  for (let i = 0; i < 3; i++) {
    const point: { [key: string]: number } = {};

    // Each feature will be a random number from 1-9
    features.forEach((f) => (point[f] = 1 + Math.random() * 8));

    data.push(point);
  }

  console.log(data);

  return (
    <DependenciesContext.Consumer>
      {({ GenreBreakdownInfo }: any) => {
        return <div></div>;
      }}
    </DependenciesContext.Consumer>
  );
};
