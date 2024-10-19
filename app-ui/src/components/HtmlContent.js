import React from 'react'

export default function HtmlContent({htmlString}) {

  return (
    <div className='text-sm' dangerouslySetInnerHTML={{__html:htmlString}} />
  )
}
