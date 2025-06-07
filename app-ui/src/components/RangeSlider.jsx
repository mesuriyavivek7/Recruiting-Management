import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

export default function BasicSlider({label,min,max,steps,mark,range}) {
  const [value, setValue] = useState(0);

  function valuetext(value) {
    setValue(value)
    return `${value}°C`;
  }


  return (
    <div className='flex flex-col'>
      <span className='font-medium'>{label}</span>
      <Slider
        aria-label="Temperature"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={steps}
        step={steps}
        marks
        min={min}
        max={max}
      />
      <div className='flex justify-between items-center'>
        <span>{mark} {value} {range}</span>
        <span>{mark} {max} {range}</span>
      </div>
    </div>
  );
}
