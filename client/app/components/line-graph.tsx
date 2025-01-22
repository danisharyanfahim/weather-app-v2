import React from "react";

const LineGraph = ({
  data,
  graphWidth,
  graphHeight,
  padding = { x: 10, y: 10 },
  id,
}: {
  data: number[];
  graphWidth: number;
  graphHeight: number;
  padding?: { x: number; y: number };
  id: string;
}) => {
  //Get highest and lowest values in the data array
  //Find the difference between the highest and lowest values
  //

  // Find the minimum and maximum values in the data
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  // If the data has only one point, we can't scale the graph properly, so we just set the same Y value for all points
  const scaleY =
    maxValue === minValue
      ? 1
      : (graphHeight - 2 * padding.y) / (maxValue - minValue);
  const scaleX = (graphWidth - 2 * padding.x) / (data.length - 1);

  // Generate the points for the polyline element
  const points = data
    .map((value, index) => {
      const x = padding.x + index * scaleX;
      const y = graphHeight - padding.y - (value - minValue) * scaleY; // Adjust the Y coordinate based on min and max values
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      className="line-graph"
      style={{ "--graph-width": graphWidth + "px" }}
      id={id}
    >
      <svg width={graphWidth} height={graphHeight}>
        <polyline
          strokeLinecap="round"
          points={points}
          fill="none"
          stroke="var(--line-graph-color)"
          strokeWidth="3"
        />
        {data.map((value, index) => {
          const x = padding.x + index * scaleX;
          const y = graphHeight - padding.y - (value - minValue) * scaleY; // Calculate the Y position for each point
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={3} // Radius of the circle
              fill="var(--text-color)" // Fill color for the circles
              stroke="var(--line-graph-color)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default LineGraph;
