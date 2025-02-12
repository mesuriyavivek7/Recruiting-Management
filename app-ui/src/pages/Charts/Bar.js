import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'Resume Count',
    },
  ],
  width: 540,
  height: 260,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

const barChartData = [
  { submited: 20, accepted: 10, month: 'Jan' },
  { submited: 30, accepted: 20, month: 'Feb' },
  { submited: 40, accepted: 35, month: 'Mar' },
  { submited: 50, accepted: 20, month: 'Apr' },
  { submited: 30, accepted: 40, month: 'May' },
  { submited: 20, accepted: 10, month: 'June' },
  { submited: 40, accepted: 30, month: 'July' },
  { submited: 50, accepted: 20, month: 'Aug' },
  { submited: 40, accepted: 20, month: 'Sept' },
  { submited: 30, accepted: 15, month: 'Oct' },
  { submited: 20, accepted: 15, month: 'Nov' },
  { submited: 40, accepted: 35, month: 'Dec' },
];

function Bar() {
  return (
    <BarChart
      dataset={barChartData}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'submited', label: 'Cv Submission', valueFormatter, color: '#00717F' },
        { dataKey: 'accepted', label: 'Cv Accepted', valueFormatter, color: '#28A745' },
      ]}
      {...chartSetting}
    />
  );
}

export default Bar;
