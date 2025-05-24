import axios from "axios";

export const fetchSkills = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_AI_URL}/skills_titles/get_all_skills`)
        return response.data.skills.map((item) => ({label:item,value:item.toLowerCase()}))
    }catch(err){
        console.log(err)
    }
}
  