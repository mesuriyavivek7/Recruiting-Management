import React from 'react'

//importing icons
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

export default function CopyToClipBoard({text,showNotification}) {

    const handleCopy=()=>{
        let simpleText= text.replace(/<[^>]*>?/gm, '')
        navigator.clipboard.writeText(simpleText)
        .then(() => {
          showNotification("Text copied to clipboard!",'info')
        })
        .catch(err => {
          showNotification("Something went wrong while copy text",'failure')
        });
    }
  return (
    <button onClick={handleCopy}><ContentCopyOutlinedIcon style={{fontSize:"1.1rem"}}></ContentCopyOutlinedIcon></button>
  )
}
