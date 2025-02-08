import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function PieLabel() {
  // Sample candidate data
  const candidateData = [
    { label: 'Offered', value: 30 },
    { label: 'Joined', value: 15 },
    { label: 'Selected', value: 20 },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={230}
        series={[
          {
            data: candidateData.map(item => ({
              id: item.label,
              label: item.label,
              value: item.value,
            })),
            innerRadius: 10,
            arcLabel: (params) => `${params.label}: ${params.value}`,
            arcLabelMinAngle: 10,
           
          },
        ]}
      />
    </Box>
  );
}

export default PieLabel;
