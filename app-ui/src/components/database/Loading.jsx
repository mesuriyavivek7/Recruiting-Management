import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <svg width={100} height={100} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="#4147FF" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="1.4" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="1.4" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="1.4" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
    </div>
  )
}

export default Loading