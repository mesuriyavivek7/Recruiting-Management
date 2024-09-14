import React,{useEffect, useState} from 'react'

//imporitng icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function ScreeningQue({id,type,addQuestion,questionValueChange,removeQuestion}) {
    const [ansType,setAnsType]=useState("option")
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({label:"Single Select",value:'single_select'});
    const [madantoryOn,setMandatoryOn]=useState(true)
    const [ansOptions,setAnsOptions]=useState([{id:1,label:"Choise 1",value:"Yes",delete:false},{id:2,label:"Choise 2",value:"No",delete:false}])
    const [shortTextLength,setShortTextLength]=useState(300)
    const [questionTitle,setQuestionTitle]=useState("")

    //mandatory change
    const toggleSwitch = () => {
        setMandatoryOn(!madantoryOn);
    };

    //change into parent
    useEffect(()=>{ 
      questionValueChange(id,{madantory:madantoryOn})
    },[madantoryOn])

    const options = [
        { id: 1, label: 'Single Select', value:'single_select',content: <div className='group w-full py-2 cursor-pointer hover:bg-blue-400 hover:text-white  px-4 flex justify-between place-items-center transition-all'><div className='flex flex-col'><span>Single Select</span><p className='text-sm group-hover:text-white text-gray-400'>For single choise from multiple options</p></div> {selectedOption.value==="single_select" && <span className='text-blue-400 group-hover:text-white'><CheckIcon></CheckIcon></span>}</div> },
        { id: 2, label: 'Multi Select', value:'multi_select' , content: <div className='group w-full py-2 cursor-pointer hover:bg-blue-400 hover:text-white px-4 flex justify-between place-items-center transition-all'><div className='flex flex-col'><span>Multi Select</span><p className='text-sm group-hover:text-white text-gray-400'>Allow user to select more then 1 choise</p></div> {selectedOption.value==="multi_select" && <span className='text-blue-400 group-hover:text-white'><CheckIcon></CheckIcon></span>} </div> },
        { id: 3, label: 'Short Text', value:'short_text' ,content: <div className='group w-full py-2 px-4 cursor-pointer hover:bg-blue-400 hover:text-white flex justify-between place-items-center transition-all'><div className='flex flex-col'><span>Short Text</span><p className='text-sm group-hover:text-white text-gray-400'>Use for Names, City and other short answer (max 300 char)</p></div> {selectedOption.value==="short_text" && <span className='text-blue-400 group-hover:text-white'><CheckIcon></CheckIcon></span>} </div> }
      ];
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //handle option type
  const handleOptionClick = (option) => {
    if(option.value==='short_text'){
      setAnsType("shorttext")
      questionValueChange(id,{ans_type:"short_text",answer:{short_text_length:shortTextLength}})
    }else{
      setAnsType("option")
      questionValueChange(id,{ans_type:option.value,answer:{option:ansOptions.map((item)=>item.value)}})
    }
    setSelectedOption(option);
    setIsOpen(false);
  };


  const handleAnsOptionsAdd=()=>{
    setAnsOptions((prevData)=>[...prevData,{id:prevData.length+1,label:`Choise ${prevData.length+1}`,value:"",delete:true}])
  }

  const handleAnsOptionsRemove=(id)=>{
    let newdata=ansOptions.filter((item)=>item.id!==id)
    let cnt=1
    for(let it of newdata){
        it["id"]=cnt
        it["label"]=`Choise ${cnt}`
        cnt++
    }
    setAnsOptions(newdata)
  }

  //handle question title
  const handleQuestionTitleChange=(e)=>{
    setQuestionTitle(e.target.value)
  }
  //change into parent
  useEffect(()=>{
    questionValueChange(id,{question_title:questionTitle})
  },[questionTitle])

  //handle change options value
  const handleAnsOpitonsChange=(id,updatedValue)=>{
     setAnsOptions(prevData=>prevData.map(item=> item.id===id ? {...item,...updatedValue} : item))
  }

  //change into parent
  useEffect(()=>{
      questionValueChange(id,{answer:{option:ansOptions.map(item=>item.value)}})
  },[ansOptions])
  
  //handle short text change
  const handleShortTextLength=(e)=>{
    setShortTextLength(e.target.value)
  }
  //change into parent
  useEffect(()=>{
    if(selectedOption.value==="short_text") questionValueChange(id,{answer:{short_text_length:shortTextLength}})
  },[shortTextLength])

  return (
    <div className='custom-div relative overflow-show w-[900px]'>
       <div className='absolute rounded-md flex flex-col p-2 gap-2 right-[-5%] bg-white top-28'>
           <span onClick={()=>removeQuestion(id)} className='cursor-pointer text-gray-500'><DeleteOutlineOutlinedIcon style={{fontSize:"1.2rem"}}></DeleteOutlineOutlinedIcon></span>
           <span onClick={()=>addQuestion(type)} className='cursor-pointer text-gray-500'><AddCircleOutlineOutlinedIcon style={{fontSize:"1.2rem"}}></AddCircleOutlineOutlinedIcon></span>
       </div>
       <div className='border-2 rounded-md w-full px-2 py-4 flex flex-col gap-4'>
         <div className='flex gap-2 place-items-center'>
            <span>{type==="general"?`Q${id}`:`C${id}`}</span>
            <input 
            type='text'
            placeholder='Title'
            className='input-field'
            value={questionTitle}
            onChange={handleQuestionTitleChange}
            ></input>
         </div>
         <div className='flex place-items-center justify-between'>
            <div className='relative'>
                <div onClick={toggleDropdown} className='text-gray-500 w-[180px] cursor-pointer rounded-md text-sm flex place-items-center p-1 px-2 border justify-between'>
                    {selectedOption?(selectedOption.label):("Select Option")}
                    {isOpen===false? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowDropUpIcon></ArrowDropUpIcon>}
                </div>
                {
                    isOpen && (
                        <div className='z-50 shadow absolute top-[100%] bg-white w-[350px] flex flex-col transition-all'>
                            {
                                options.map((item,index)=>(
                                    <div key={index} onClick={()=>handleOptionClick(item)}>
                                      {item.content}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className='flex gap-2 place-items-center'>
               <span>Mandatory</span>
               <div
                 className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                  madantoryOn ? 'bg-blue-500' : 'bg-gray-300'
                 }`}
                onClick={toggleSwitch}
               >
               <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                madantoryOn ? 'translate-x-6' : 'translate-x-0'
                }`}
                ></div>
               </div>
            </div>
         </div>
         {
          ansType==="option" && (<div className='flex flex-col gap-3'>
            {
                ansOptions.map((item,index)=>(
                    <div key={index} className='flex w-full gap-2'>
                        <input
                        type='text'
                        value={item.value}
                        className='input-field'
                        onChange={(e)=>handleAnsOpitonsChange(item.id,{value:e.target.value})}
                        placeholder={item.label}
                        ></input>
                        <button onClick={()=>handleAnsOptionsRemove(item.id)} disabled={!item.delete} className='px-2 hover:bg-red-100 hover:text-red-400 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-slate-100 disabled:opacity-80 py-0.5 border rounded-md text-gray-400'><DeleteOutlineOutlinedIcon style={{fontSize:"1.3rem"}}></DeleteOutlineOutlinedIcon></button>
                    </div>
                ))
            }
         </div>
         )
         }

         {
          ansType==="shorttext" && (
            <div className='flex gap-2 items-center'>
               <span>Max Length</span>
               <input
               onChange={handleShortTextLength}
               value={shortTextLength}
               type='number'
               className='input-field w-36'
               ></input>
            </div>
          )
         }
         
        {
          ansType==="option" && ( 
            <div>
              <button onClick={handleAnsOptionsAdd} className='text-blue-400 font-light text-[14px] p-1 px-2 border rounded-sm hover:bg-slate-100 flex gap-2 place-items-center transition-all'><AddCircleOutlineOutlinedIcon style={{fontSize:"15px"}}></AddCircleOutlineOutlinedIcon> Add Option</button>
            </div> )
        }
        
       </div>    
    </div>
  )
}
