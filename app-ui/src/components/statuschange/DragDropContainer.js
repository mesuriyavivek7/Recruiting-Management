import React, { useState } from 'react'
import DropSection from './DropSection'
import DropBox from './DropBox'

export default function DragDropContainer() {
    const [sections,setSections]=useState({
        section1:[{id:1,cname:'Sahil Dalal',cid:'31229',jobname:'Softwere Engineer-Cloud Platforms',jobid:'J12422',jobcountry:'India',jobtype:'Permanent Hiring',date:'13 jun 23'},{id:2,cname:'Dhruv Kakdiya',cid:'31229',jobname:'Softwere Engineer-Cloud Platforms',jobid:'J12422',jobcountry:'India',jobtype:'Permanent Hiring',date:'13 jun 23'}],
        section2:[{id:3,cname:'Sahil Gediya',cid:'31229',jobname:'Softwere Engineer-Cloud Platforms',jobid:'J12422',jobcountry:'India',jobtype:'Permanent Hiring',date:'15 jun 23'}],
        section3:[],
        section4:[],
        section5:[],
        section6:[],
        section7:[],
        section8:[],
        section9:[],
        section10:[],
        section11:[],
        section12:[],
        section13:[],
        section14:[],
        section15:[],
        section16:[],
        section17:[],
        section18:[],
        section19:[],
        section20:[],
        section21:[],
        section22:[],
        section23:[],
        section24:[],
    })

    const handleDrop=(item,sectionId)=>{
       console.log('sectionid------>',sectionId)
      console.log('item------>',item.id)
       const {id}=item

       setSections((prevSection)=>{
           const sourceSection=Object.keys(prevSection).find((key)=>(
              prevSection[key].some((box)=>box.id===id)
           ))

           console.log('sourceSection---->',sourceSection)
           console.log('sectionId',sectionId)

           if(sourceSection===sectionId){
            return (
                {
                    ...prevSection
                }
            )
           }

           const box=prevSection[sourceSection].find((box)=>box.id===id)
           const newItem=prevSection[sourceSection].filter((box)=>box.id!==id)
           console.log('newitem----->',newItem)
           return (
            {
                ...prevSection,
                [sourceSection]:prevSection[sourceSection].filter((box)=>box.id!==id),
                [sectionId]:[...prevSection[sectionId],box]

            })
       })
    }
    console.log(sections)
  return (
    <div className='pt-3 px-4 pb-5 bg-white rounded-md custom-shadow-1'>
        <h1 className='w-full text-center text-gray-800 text-sm'>Scroll to View Other Resume</h1>
        
        <div class="w-full overflow-x-auto whitespace-nowrap mt-2 p-4">
          
            <DropSection id='section1' onDrop={handleDrop} sectionItem={{title:"New Resume",count:sections.section1.length,theme:'blue'}}>
              {
                sections.section1.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section2' onDrop={handleDrop} sectionItem={{title:"Resume Select - Client Recruiter",count:sections.section2.length,theme:'purple'}}>
              {
                sections.section2.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section3' onDrop={handleDrop} sectionItem={{title:"Resume Select - Hiring Manager",count:sections.section3.length,theme:'purple'}}>
              {
                sections.section3.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section4' onDrop={handleDrop} sectionItem={{title:"Test in Process",count:sections.section4.length,theme:'purple'}}>
              {
                sections.section4.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section5' onDrop={handleDrop} sectionItem={{title:"Interview in Process",count:sections.section5.length,theme:'purple'}}>
              {
                sections.section5.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section6' onDrop={handleDrop} sectionItem={{title:"No show",count:sections.section6.length,theme:'purple'}}>
              {
                sections.section6.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section7' onDrop={handleDrop} sectionItem={{title:"Candidate Not Interested",count:sections.section7.length,theme:'orange'}}>
              {
                sections.section7.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section8' onDrop={handleDrop} sectionItem={{title:"Candidate Not Reachable",count:sections.section8.length,theme:'orange'}}>
              {
                sections.section8.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section9' onDrop={handleDrop} sectionItem={{title:"Resume Reject - Client Recruiter",count:sections.section9.length,theme:'red'}}>
              {
                sections.section9.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section10' onDrop={handleDrop} sectionItem={{title:"Resume Reject - Hiring Manager",count:sections.section10.length,theme:'red'}}>
              {
                sections.section10.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section11' onDrop={handleDrop} sectionItem={{title:"Rejected in Test",count:sections.section11.length,theme:'red'}}>
              {
                sections.section11.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section12' onDrop={handleDrop} sectionItem={{title:"Rejected in Tech Interview",count:sections.section12.length,theme:'red'}}>
              {
                sections.section12.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section13' onDrop={handleDrop} sectionItem={{title:"Rejected in HR Interview",count:sections.section13.length,theme:'red'}}>
              {
                sections.section13.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section14' onDrop={handleDrop} sectionItem={{title:"Selected in Final Interview",count:sections.section14.length,theme:'green'}}>
              {
                sections.section14.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section15' onDrop={handleDrop} sectionItem={{title:"Selected - Won't be Offered",count:sections.section15.length,theme:'green'}}>
              {
                sections.section15.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section16' onDrop={handleDrop} sectionItem={{title:"Offer Released",count:sections.section16.length,theme:'green'}}>
              {
                sections.section16.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section17' onDrop={handleDrop} sectionItem={{title:"Offer Accepted",count:sections.section17.length,theme:'green'}}>
              {
                sections.section17.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section18' onDrop={handleDrop} sectionItem={{title:"Offer Rejected",count:sections.section18.length,theme:'green'}}>
              {
                sections.section18.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section19' onDrop={handleDrop} sectionItem={{title:"Candidate Not Joining",count:sections.section19.length,theme:'green'}}>
              {
                sections.section19.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section20' onDrop={handleDrop} sectionItem={{title:"Candidate Joined",count:sections.section20.length,theme:'green'}}>
              {
                sections.section20.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section21' onDrop={handleDrop} sectionItem={{title:"Quit After Joining",count:sections.section21.length,theme:'green'}}>
              {
                sections.section21.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section22' onDrop={handleDrop} sectionItem={{title:"On Hold",count:sections.section22.length,theme:'sky'}}>
              {
                sections.section22.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section23' onDrop={handleDrop} sectionItem={{title:"No Further Action",count:sections.section23.length,theme:'sky'}}>
              {
                sections.section23.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>
           <DropSection id='section24' onDrop={handleDrop} sectionItem={{title:"Use Later",count:sections.section24.length,theme:'sky'}}>
              {
                sections.section24.map((box)=>(
                    <DropBox key={box.id} id={box.id} text={box}></DropBox>
                ))
              }
           </DropSection>

      </div>
    </div>
  )
}
