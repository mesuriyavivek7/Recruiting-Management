import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RecruitmentPieChart = () => {
  // Dummy data for recruitment summary
  const data = [
    { name: 'Joined', value: 45, color: '#14B8A6' }, // Teal
    { name: 'Offered', value: 25, color: '#0D9488' }, // Darker teal
    { name: 'Pending', value: 20, color: '#9CA3AF' }, // Light gray
    { name: 'Rejected', value: 10, color: '#F97316' }, // Orange
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{payload[0].value}</span> candidates
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col space-y-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-700">{entry.value}</span>
            <span className={`text-[${entry.color}]`}>{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-6 border border-gray-200 h-full flex flex-col">
        <h3 className="text-xl font-medium text-gray-800 mb-6">Recruitment Summary</h3>
        
        <div className="flex items-center justify-between gap-8 flex-1">
          {/* Legend */}
          <div className="flex flex-col justify-center">
            <CustomLegend payload={data} />
          </div>
          
          {/* Pie Chart */}
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Additional metrics */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <span>Active Candidates</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <span>Interviews: 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPieChart;
