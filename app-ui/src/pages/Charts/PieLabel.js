import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';

function PieLabel() {
  // Sample candidate data with custom colors
  const candidateData = [
    { label: 'Offered', value: 30, color: '#00717F', labelColor: 'white' },  // Red, White Label
    { label: 'Joined', value: 15, color: '#28A745', labelColor: 'white' },   // Blue, White Label
    { label: 'Selected', value: 20, color: '#52A7AE', labelColor: 'black' }, // Yellow, Black Label
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <PieChart
        height={210}
        series={[
          {
            data: candidateData.map(item => ({
              id: item.label,
              label: item.label,
              value: item.value,
              color: item.color, // Custom colors
            })),
            innerRadius: 10,
            arcLabel: (params) => `${params.value}`,
            arcLabelMinAngle: 10,
            cx: 100, // Adjust position if needed
            paddingAngle: 2, // Adds some space between slices
          },
        ]}
        sx={{
          '& .MuiChartsArcLabel-root': {
            fontSize: 20, // Custom font size for labels
            fontWeight: 'bold',
            // Dynamically set label color based on data
            fill: (params) => {
              const dataItem = candidateData.find(item => item.label === params.label);
              return dataItem ? dataItem.labelColor : 'black'; // Default to black if not found
            },
          },
        }}
      />
    </Box>
  );
}

export default PieLabel;