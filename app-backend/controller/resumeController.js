import RESUMEDOCS from "../models/RESUMEDOCS.js"
import RESUMEPARSE from "../models/RESUMEPARSE.js"
//importing modules for extract file to text
import mammoth from "mammoth";
import textract from 'textract'
import fs from 'fs'
import pdfparse from 'pdf-parse'
import emailRegax from 'email-regex'
import phoneRegax from 'phone-regex'

export const createAndParseResume=async (req,res,next)=>{
     try{
        const filepath=req.file.path
        const fileType=req.file.mimetype


        //store resume file into mongodb
        const filedata={
            candidate_id:req.params.cid,
            filename:req.file.filename,
            filepath:req.file.path,
            filetype:req.file.mimetype,
            filesize:req.file.size
        }

        const newResumeDocs=new RESUMEDOCS(filedata)
        await newResumeDocs.save()
 
        if(fileType==="application/pdf"){
         const dataBuffer=fs.readFileSync(filepath)
         pdfparse(dataBuffer).then(function(data) {
            const text = data.text;
            parseResumeText(text, res);
        });
        }else if(fileType==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
         const docxBuffer=fs.readFileSync(filepath)
         mammoth.extractRawText({buffer:docxBuffer}).then(result=>{
            const text=result.value
            parseResumeText(text,res)
         })
        }else if(fileType==="application/msword"){
         textract.fromFileWithPath(filepath,(error)=>{
            if (error) {
               return res.status(500).send("Error parsing Word Document")
            }
            parseResumeText(text,rex)
         })
        }else{
          res.status(400).json("Unsupported file type")
        }

     }catch(err){
        next(err)
     }
}


const cleanMobileNumber=(mobilenum)=>{
     let ans=""
     for(let i of mobilenum){
      if(!isNaN(i)) ans+=i
     }
     ans=ans.trim()
     if(ans.length>10) ans=ans.slice(2)
     if(ans.length===10) return ans
     else return ""
}

const parseResumeText=(text,res)=>{
   const firstNameLastNameRegex = /([A-Z][a-z]+)\s([A-Z][a-z]+)/;
   const educationRegex = /(Bachelor|Master|PhD|B\.Sc|M\.Sc|Diploma|Degree)/i;

   const nameMatch=text.match(firstNameLastNameRegex)
   const mobileMatch=cleanMobileNumber(text.match(phoneRegax())[0])
   const emailMatch=text.match(emailRegax())
   const educationMatch=text.match(educationRegex)

   res.status(200).json({
      firstName: nameMatch ? nameMatch[1] : null,
      lastName: nameMatch ? nameMatch[2] : null,
      mobile: mobileMatch ? mobileMatch : null,
      email: emailMatch ? emailMatch[0] : null,
      education: educationMatch ? educationMatch[0] : null
  });
}