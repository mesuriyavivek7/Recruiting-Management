import React from 'react'
import GaugeChart from 'react-gauge-chart'

function Gauge() {
  return (
    <GaugeChart id="gauge-chart5"
    textColor='black'
    nrOfLevels={420}
    arcsLength={[0.3, 0.5, 0.2]}
    colors={['#FF5B61', '#90EE90', '#89CFF0']}
    percent={0.37}
    arcPadding={0.02}
   />
  )
}

export default Gauge