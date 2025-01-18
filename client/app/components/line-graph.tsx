import React from "react";

const LineGraph = ({ data }: { data: number[] }) => {
  //Get highest and lowest values in the data array
  //Find the difference between the highest and lowest values
  //

  const width = 2000; // Graph width
  const height = 300; // Graph height
  const padding = 10; // Padding around the graph

  // Find the minimum and maximum values in the data
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  // If the data has only one point, we can't scale the graph properly, so we just set the same Y value for all points
  const scaleY =
    maxValue === minValue ? 1 : (height - 2 * padding) / (maxValue - minValue);
  const scaleX = (width - 2 * padding) / (data.length - 1);

  // Generate the points for the polyline element
  const points = data
    .map((value, index) => {
      const x = padding + index * scaleX;
      const y = height - padding - (value - minValue) * scaleY; // Adjust the Y coordinate based on min and max values
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="line-graph">
      <svg width={width} height={height}>
        <polyline
          strokeLinecap="round"
          points={points}
          fill="none"
          stroke="blue"
          strokeWidth="3"
        />
        {data.map((value, index) => {
          const x = padding + index * scaleX;
          const y = height - padding - (value - minValue) * scaleY; // Calculate the Y position for each point
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={3} // Radius of the circle
              fill="white" // Fill color for the circles
              stroke="blue"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default LineGraph;
