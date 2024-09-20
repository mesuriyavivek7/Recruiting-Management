import RESUMEDOCS from "../models/RESUMEDOCS.js"
import RESUMEPARSE from "../models/RESUMEPARSE.js"
//importing modules for extract file to text
import mammoth from "mammoth";
import textract from 'textract'
import fs from 'fs'
import path from "path";
import pdfparse from 'pdf-parse'
import emailRegax from 'email-regex'
import phoneRegax from 'phone-regex'

export const createAndParseResume=async (req,res,next)=>{
     try{
        const filepath=req.file.path
        const fileType=req.file.mimetype
 
        if(fileType==="application/pdf"){
         const dataBuffer=fs.readFileSync(filepath)
         pdfparse(dataBuffer).then(function(data) {
            const text = data.text;
            parseResumeText(filepath,text, res);
        });
        }else if(fileType==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
         const docxBuffer=fs.readFileSync(filepath)
         mammoth.extractRawText({buffer:docxBuffer}).then(result=>{
            const text=result.value
            parseResumeText(filepath,text,res)
         })
        }else if(fileType==="application/msword"){
         textract.fromFileWithPath(filepath,(error)=>{
            if (error) {
               return res.status(500).send("Error parsing Word Document")
            }
            parseResumeText(filepath,text,rex)
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

const parseResumeText=async (filepath,text,res)=>{
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
      education: educationMatch ? educationMatch[0] : null,
      filepath
  });
}


export const checkParseDetails=async (req,res,next)=>{
   try{
      const {job_id,filepath,firstname,lastname,contactno,emailid,educationdetails,pancardnumber}=req.body
      const check=await RESUMEPARSE.find({$and:[{job_id:job_id},{$or:[{emailid},{contactno},{pancardnumber}]}]})
      if(check.length!==0){
         fs.unlinkSync(filepath)
         res.status(200).json(false)
      }else{
         //if details are not present then store file and parse details into database 
         
         const fileName=path.basename(filepath)
         const fileType=path.extname(filepath)
         const stats=fs.statSync(filepath)
         const fileSize=stats.size
    
        //store resume file into mongodb
        const filedata={
            job_id,
            recruiter_agency_id:req.body.recruiter_agency_id,
            recruiter_memeber_id:req.body.recruiter_memeber_id,
            candidate_id:req.params.cid,
            filename:fileName,
            filepath:filepath,
            filetype:fileType,
            filesize:fileSize,
        }

         const newResumeDocs=new RESUMEDOCS(filedata)
         await newResumeDocs.save()

         const parsedata={
            job_id,
            recruiter_agency_id:req.body.recruiter_agency_id,
            recruiter_memeber_id:req.body.recruiter_memeber_id,
            candidate_id:req.params.cid,
            firstname,
            lastname,
            emailid,
            educationdetails,
            pancardnumber,
            contactno
         }
         
         const newparseData=new RESUMEPARSE(parsedata)
         await newparseData.save()

         res.status(200).json(true)
      }

   }catch(err){
      next(err)
   }
}



export const removeResumeFile=(req,res)=>{
     
   const filepath=req.body.filepath
   if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
   }

   res.status(200).json("Removed file successfully")

}

export const cancelProcess=async (req,res,next)=>{
    const filepath=req.body.filepath
    const cid=req.body.cid
    try{
      if (fs.existsSync(filepath)) {
         fs.unlinkSync(filepath);
      }
      
      await RESUMEDOCS.deleteOne({candidate_id:cid})
      await RESUMEPARSE.deleteOne({candidate_id:cid})

      res.status(200).json("Resume docs and parse details deleted successfully")

    }catch(err){
       next(err)
    }
}