import React,{useEffect,useState} from 'react'
import axios from 'axios';
import mammoth from 'mammoth';

export default function DocxViewer({fileName}) {
  const [docContent, setDocContent] = useState('');

  console.log('filename---->',fileName)
  useEffect(() => {
    const fetchDocxFile = async () => {
        try {
            // Assuming backend server is running at http://localhost:3001
            const response = await axios.get(`http://localhost:3001/uploads/resumedocs/${fileName}`, {
                responseType: 'arraybuffer',
            });

            const result = await mammoth.extractRawText({ arrayBuffer: response.data });
            setDocContent(result.value);
        } catch (error) {
            console.error('Error fetching DOCX file:', error);
        }
    };

    fetchDocxFile();
}, [fileName]);

  return (
    <div>
      {docContent || "Unable to load document"}
    </div>
  )
}
