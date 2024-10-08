// src/components/PolarChart.js

import React from "react";
import { VictoryChart, VictoryPolarAxis, VictoryBar, VictoryTheme } from "victory";

const PolarChart = () => {
  return (
    <VictoryChart
      polar
      theme={VictoryTheme.material}
      startAngle={0}
      endAngle={180}
    >
      <VictoryPolarAxis tickValues={[0, 45, 90, 135, 180]} labelPlacement="vertical" />
      <VictoryBar
        style={{ data: { fill: "blue", width: 30 } }}
        data={[
          { x: 0, y: 2 },
          { x: 45, y: 3 },
          { x: 90, y: 5 },
          { x: 135, y: 4 },
          { x: 180, y: 7 },
        ]}
      />
    </VictoryChart>
  );
};

export default PolarChart;
