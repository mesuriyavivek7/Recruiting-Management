export const filterOutLiveJobs=(jobs,enmemberid)=>{
    return jobs.filter((item)=>{
          let isMapped=false
          let isAccepted=false
          if(item.mapped_recruiting_agency_member && item.mapped_recruiting_agency_member.includes(enmemberid)){
                isMapped=true
          }

          if(item.accepted_recruiting_agency && item.accepted_recruiting_agency.includes(enmemberid)){
                isAccepted=true
          }

          if(!isMapped && !isAccepted){
             return item
          }
     })
}