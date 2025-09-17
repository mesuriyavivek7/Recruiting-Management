import React from 'react'
import GaugeChart from 'react-gauge-chart'

function Gauge() {
  return (
    <div className="bg-white h-full rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Relevancy Ratio</h3>
      <div className="flex justify-center">
        <GaugeChart 
          id="gauge-chart5"
          textColor='black'
          nrOfLevels={3}
          arcsLength={[0.33, 0.34, 0.33]}
          colors={['#FF5B61', '#90EE90', '#89CFF0']}
          percent={0.37}
          arcPadding={0.02}
          style={{ width: '300px', height: '150px' }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#FF5B61' }}></div>
          <span className="text-gray-600">Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#90EE90' }}></div>
          <span className="text-gray-600">Moderate</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#89CFF0' }}></div>
          <span className="text-gray-600">Good</span>
        </div>
      </div>
    </div>
  )
}

export default Gauge