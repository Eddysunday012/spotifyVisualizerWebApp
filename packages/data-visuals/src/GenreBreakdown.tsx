import * as d3 from "d3";
import React from "react";
// import { genreItem } from "types";

import { DependenciesContext } from "dependencies-context";

interface GenreBreakdownProps {
  data: DataPoint[];
  width: number;
  height: number;
}

interface DataPoint {
  axis: string;
  value: number;
}

export const GenreBreakdown: React.FunctionComponent<GenreBreakdownProps> = ({
  data,
  width,
  height,
}) => {
  //   const data: { [key: string]: number }[] = [];
  //   const features: string[] = ["A", "B", "C", "D", "E", "F"];

  //   // Generate the data
  //   for (let i = 0; i < 3; i++) {
  //     const point: { [key: string]: number } = {};

  //     // Each feature will be a random number from 1-9
  //     features.forEach((f) => (point[f] = 1 + Math.random() * 8));

  //     data.push(point);
  //   }

  //   let width = 600;
  //   let height = 600;
  //   let svg = d3
  //     .select("body")
  //     .append("svg")
  //     .attr("width", width)
  //     .attr("height", height);

  //   let radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
  //   let ticks = [2, 4, 6, 8, 10];
  //   svg
  //     .selectAll("circle")
  //     .data(ticks)
  //     .join((enter) =>
  //       enter
  //         .append("circle")
  //         .attr("cx", width / 2)
  //         .attr("cy", height / 2)
  //         .attr("fill", "none")
  //         .attr("stroke", "gray")
  //         .attr("r", (d) => radialScale(d))
  //     );
  //   svg
  //     .selectAll(".ticklabel")
  //     .data(ticks)
  //     .join((enter) =>
  //       enter
  //         .append("text")
  //         .attr("class", "ticklabel")
  //         .attr("x", width / 2 + 5)
  //         .attr("y", (d) => height / 2 - radialScale(d))
  //         .text((d) => d.toString())
  //     );

  //   function angleToCoordinate(angle: number, value: number) {
  //     let x = Math.cos(angle) * radialScale(value);
  //     let y = Math.sin(angle) * radialScale(value);
  //     return { x: width / 2 + x, y: height / 2 - y };
  //   }

  //   let featureData = features.map((f, i) => {
  //     let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
  //     return {
  //       name: f,
  //       angle: angle,
  //       line_coord: angleToCoordinate(angle, 10),
  //       label_coord: angleToCoordinate(angle, 10.5),
  //     };
  //   });

  //   // draw axis line
  //   svg
  //     .selectAll("line")
  //     .data(featureData)
  //     .join((enter) =>
  //       enter
  //         .append("line")
  //         .attr("x1", width / 2)
  //         .attr("y1", height / 2)
  //         .attr("x2", (d) => d.line_coord.x)
  //         .attr("y2", (d) => d.line_coord.y)
  //         .attr("stroke", "black")
  //     );
  //   const centerX = width / 2;
  //   const centerY = height / 2;
  //   const margin = 50;
  //   const radius = Math.min(width, height) / 2 - margin;
  //   const angleScale = d3
  //     .scaleLinear()
  //     .domain([0, 5])
  //     .range([0, Math.PI * 2]);
  //   const line = d3
  //     .lineRadial()
  //     .angle((d, i) => angleScale(i))
  //     .radius((d: any) => radius * d);

  //   svg
  //     .selectAll(".axis")
  //     .data(data)
  //     .enter()
  //     .append("line")
  //     .attr("class", "axis")
  //     .attr("x1", centerX)
  //     .attr("y1", centerY)
  //     .attr("x2", (d, i) => centerX + radius * Math.cos(angleScale(i)))
  //     .attr("y2", (d, i) => centerY + radius * Math.sin(angleScale(i)))
  //     .attr("stroke", "gray");

  //   // Draw spider lines
  //   svg
  //     .append("path")
  //     .datum(data)
  //     .attr("class", "spider-line")
  //     .attr("d", line)
  //     .attr("fill", "rgba(0, 0, 255, 0.2)")
  //     .attr("stroke", "blue");

  //   // draw axis label
  //   svg
  //     .selectAll(".axislabel")
  //     .data(featureData)
  //     .join((enter) =>
  //       enter
  //         .append("text")
  //         .attr("x", (d) => d.label_coord.x)
  //         .attr("y", (d) => d.label_coord.y)
  //         .text((d) => d.name)
  //     );

  //   interface DataPoint {
  //     x: number;
  //     y: number;
  //   }

  //   const line = d3
  //     .line<DataPoint>()
  //     .x((d) => d.x)
  //     .y((d) => d.y);

  //   const colors: string[] = ["darkorange", "gray", "navy"];

  //   function getPathCoordinates(data_point: any) {
  //     let coordinates = [];
  //     for (var i = 0; i < features.length; i++) {
  //       let ft_name = features[i];
  //       let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
  //       coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
  //     }
  //     return coordinates;
  //   }

  //   // draw the path element
  //   svg
  //     .selectAll("path")
  //     .data(data)
  //     .join((enter: any) =>
  //       enter
  //         .append("path")
  //         .datum((d: any) => getPathCoordinates(d))
  //         .attr("d", line)
  //         .attr("stroke-width", 3)
  //         .attr("stroke", (_: any, i: any) => colors[i])
  //         .attr("fill", (_: any, i: any) => colors[i])
  //         .attr("stroke-opacity", 1)
  //         .attr("opacity", 0.5)
  //     );

  //   return (
  //     <DependenciesContext.Consumer>
  //       {({}: any) => {
  //         return <div>Hello World</div>;
  //       }}
  //     </DependenciesContext.Consumer>
  //   );
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);

    const numAxes = data.length;
    const angleSlice = (Math.PI * 2) / numAxes;

    const radius = Math.min(width, height) / 2;

    const angleScale = d3
      .scaleLinear()
      .domain([0, numAxes])
      .range([0, Math.PI * 2]);

    const line = d3
      .lineRadial<DataPoint>()
      .curve(d3.curveLinearClosed)
      .angle((d, i) => angleScale(i)) // Use the angleScale to convert index to radians
      .radius((d) => (d.value / 10) * radius);

    const axes = svg
      .selectAll(".axis")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "axis");

    axes
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", height / 2)
      .attr("x2", (d, i) => width / 2 + Math.cos(angleSlice * i) * radius)
      .attr("y2", (d, i) => height / 2 + Math.sin(angleSlice * i) * radius)
      .attr("class", "spider-line");

    axes
      .append("text")
      .attr("x", (d, i) => width / 2 + Math.cos(angleSlice * i) * radius * 1.15)
      .attr(
        "y",
        (d, i) => height / 2 + Math.sin(angleSlice * i) * radius * 1.15
      )
      .text((d) => d.axis)
      .attr("class", "axis-label");

    svg
      .selectAll(".spider-area")
      .data([data])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("class", "spider-area")
      .attr("fill", "rgba(0, 0, 255, 0.2)")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill-opacity", 0.6);
  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      {/* Add any additional elements here */}
    </svg>
  );
};
