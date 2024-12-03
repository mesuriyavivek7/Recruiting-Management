import * as React from 'react';
import { LineChart } from '@mui/x-charts';

export default function DashboardChart() {

  


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4  md:p-6">
      {/* Enterprise Chart */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2 text-center">Enterprise</h2>
<div classname="w-full">        
<LineChart
          xAxis={[
            {
              data: [1, 2, 3, 5, 8, 10],
                min:1,
                max:10
            },
          ]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              color: 'gray', 
              area: true,
              areaOpacity: 0.2, 
            },
          ]}
          width={undefined}
          height={400}
        />
        
      </div>
</div>
      {/* Recruiter Chart */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2 text-center">Recruiter</h2>
<div clasName="w-full">       
<LineChart
          xAxis={[
            {
              data: [1, 2, 3, 5, 8, 10],
         min:1,
         max:10
              
            },
          ]}
         
        
          series={[
            {
              data: [3, 4.5, 3, 7.5, 2.5, 6],
              color: 'gray', 
              area: true,
              areaOpacity: 0.2, 
            },
          ]}
          width={undefined}
          height={400}
        />
        </div> 
      </div>
    </div>
 
  );
}

