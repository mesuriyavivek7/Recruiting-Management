import React, { useContext, useEffect, useState } from 'react'

import {useForm, useFieldArray, Controller} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from '../../data/manuallAddSchema';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { AuthContext } from '../../context/AuthContext';

//Importing data
import { currencyListInLacs } from '../../data/AddData'
import { durationList } from '../../data/AddData'
import { source } from '../../data/AddData';
import { gender } from '../../data/AddData';
import { candidateLabels } from '../../data/AddData';
import { fetchSkills } from '../../data/skill';
import { totalExperienceOptions } from '../../data/AddData';
import { city } from '../../data/city';
import { cityOptions } from '../../data/city';

//Importing icons
import { LoaderCircle, Plus } from 'lucide-react';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';



const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? '#d4d4d4' : '#d4d4d4',
    boxShadow: state.isFocused ? '0 0 0 1px #d4d4d4' : 'none',
    '&:hover': {
      borderColor: '#d4d4d4',
    },
    borderRadius:'6px',
    minHeight: '36px',
    fontSize: '14px',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#0369a1',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#0369a1',
    ':hover': {
      backgroundColor: '#bae6fd',
      color: '#0c4a6e',
    },
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '15px',
    color: '#9ca3af',
  }),
};



function ManuallAdd() {
  const animatedComponents = makeAnimated();
  const {user} = useContext(AuthContext)
  const [loader,setLoader] = useState(false)

  let defaultValues = {
    candidate_name:'',
    mobile_no:'',
    email:'',
    current_city:'',
    prefered_locations:[],
    total_experience:'',
    notice_period:'',
    currency:'INR (Lacs)',
    duration:'Yearly',
    current_salary:"0.00",
    hike:"0",
    expected_salary:'0.00',
    key_skills:[],
    may_also_know:[],
    pancard:'',
    aadharcard:'',
    experience:[],
    academic_details:[],
    naukri_profile:'',
    linkedin_profile:'',
    portfolio_link:'',
    source:'By Recruiter',
    alternate_phone_number:'',
    last_working_date:'',
    gender:'Not Mentioned',
    age:0,
    is_tier_one_engineering_college:"No",
    is_tier_one_mba_college:"No",
    comment:'',
    exit_reason:""
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: {errors},
   } = useForm({
    resolver: zodResolver(formSchema),
    mode:'onChange',
    defaultValues
   })

  const currentSalary = watch("current_salary");
  const hike = watch("hike");
  const expectedSalary = watch("expected_salary");

  useEffect(() => {
    if (currentSalary && hike) {
      const expected = parseFloat(currentSalary) + (parseFloat(currentSalary) * parseFloat(hike)) / 100;
      setValue("expected_salary", expected.toFixed(2));
    }
  }, [currentSalary, hike, setValue]);

  useEffect(() => {
    if (currentSalary && expectedSalary && parseFloat(currentSalary) > 0) {
      const calcHike = ((parseFloat(expectedSalary) - parseFloat(currentSalary)) / parseFloat(currentSalary)) * 100;
      setValue("hike", calcHike.toFixed(2), { shouldValidate: true });
    }
  }, [expectedSalary]);


  const { fields : experience_field, append : experience_append, remove: experience_remove } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: education_field, append: education_append, remove: education_remove } = useFieldArray({
    control,
    name:'academic_details'
  })


  const customComponents = {
    ...animatedComponents,
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  };

  const [skills,setSkills] = useState([])

  useEffect(()=>{
    const handleFetchSkills = async () =>{
      try{
        const data = await fetchSkills()
        setSkills(data || [])
      }catch(err){
        console.log(err)
      }
    }

   handleFetchSkills()

  },[])


  const addCandidate = async (data) =>{
     //Add new candidate into db
     let obj = {
      user_id:user._id,
      username:user.full_name,
      contact_details:{
        name:data.candidate_name,
        email:data.email,
        phone:data.mobile_no,
        alternative_phone:data.alternate_phone_number,
        current_city:data.current_city,
        looking_for_jobs_in:data.prefered_locations,
        gender:data.gender,
        age:data.age,
        naukri_profile:data.naukri_profile,
        linkedin_profile:data.linkedin_profile,
        portfolio_link:data.portfolio_link,
        pan_card:data.pancard,
        aadhar_card:data.aadharcard
      },
      total_experience:data.total_experience,
      notice_period:data.notice_period,
      currency:data.currency,
      pay_duration:data.duration,
      current_salary:data.current_salary,
      hike:data.hike,
      expected_salary:data.expected_salary,
      skills:data.key_skills,
      may_also_known_skills:data.may_also_know,
      labels:data.labels,
      experience:data.experience,
      academic_details:data.academic_details,
      source:data.source,
      last_working_day:data.last_working_date,
      is_tier1_mba:data.is_tier_one_mba_college==="Yes"?true:false,
      is_tier1_engineering:data.is_tier_one_engineering_college==="Yes"?true:false,
      comment:data.comment,
      exit_reason:data.exit_reason
     }

     setLoader(true)
     try{
       const response = await axios.post(`${process.env.REACT_APP_AI_URL}/add_user/submit-details`,obj)
       console.log(response)
       toast.success("New candidate added successfully.",'success')
       reset(defaultValues)
     }catch(err){
      toast.error("Something went wrong while adding new candidate.","failure")
      console.log(err)
     }finally{
      setLoader(false)
     }

  }

  return (
    <form onSubmit={handleSubmit(addCandidate)} className='w-full p-4 border border-neutral-300 rounded-md overflow-hidden bg-white custom-shadow-1 flex flex-col gap-5'>
       <div className='grid grid-cols-3 items-start gap-5'>
         <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>Candidate Name <span className='text-sm text-red-500'>*</span></label>
            <input {...register("candidate_name")} type='text' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]' placeholder='Enter candidate name'></input>
            {errors.candidate_name && <span className='text-sm text-red-500'>{errors.candidate_name.message}</span>}
         </div>
         <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>Mobile No <span className='text-sm text-red-500'>*</span></label>
            <input {...register("mobile_no")} type='number' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]' placeholder='Enter mobileno'></input>
            {errors.mobile_no && <span className='text-sm text-red-500'>{errors.mobile_no.message}</span>}
         </div>
         <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>Email <span className='text-sm text-red-500'>*</span></label>
            <input {...register("email")} type='text' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]' placeholder='Enter email address'></input>
            {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
         </div>
       </div>
       <div className='grid grid-cols-4 items-start gap-5'>
         <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>Current City <span className='text-sm text-red-500'>*</span></label>
            <select {...register("current_city")} className='border text-[15px] outline-none border-neutral-300 px-2 py-1.5 rounded-md'>
                <option value={''}>Select current city</option>
                {
                  city.map((item)=>(
                    <option value={item}>{item}</option>
                  ))
                }
            </select>
            {
              errors.current_city && 
              <span className='text-sm text-red-500'>
                 {errors.current_city.message}
              </span>
            }
         </div>
         <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>Prefered Location <span className='text-sm text-red-500'>*</span></label>
            <Controller
             control={control}
             name="prefered_locations"
             render={({ field, fieldState }) => (
             <>
               <Select
                 {...field}
                 closeMenuOnSelect={false}
                 components={customComponents}
                 styles={customStyles}
                 isMulti
                 options={cityOptions}
                 placeholder="Type to search city"
                 onChange={(selectedOptions) =>
                 field.onChange(selectedOptions.map((opt) => opt.value))
                 }
                 value={cityOptions.filter((option) =>
                  field.value?.includes(option.value)
                 )}
                />
              {fieldState.error && (
                 <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
             </>
             )}
             />
         </div>
         <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>Total Experience <span className='text-sm text-red-500'>*</span></label>
            <select {...register("total_experience")} className='border text-[15px] outline-none border-neutral-300 px-2 py-1.5 rounded-md'>
                <option value={''}>Select Total Experience</option>
                {
                  totalExperienceOptions.map((item,index)=>(
                    <option value={item} key={index}>{item}</option>
                  ))
                }
            </select>
            {
              errors.total_experience && <span className='text-sm text-red-500'>{errors.total_experience.message}</span>
            }
         </div>
         <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>Notice Period (in days) <span className='text-sm text-red-500'>*</span></label>
            <input {...register("notice_period")} placeholder='Enter Notice Period' type='number' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
            {errors.notice_period && <span className='text-sm text-red-500'>{errors.notice_period.message}</span>}
         </div>
      </div>
      <div className='grid grid-cols-5 items-start gap-5'>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Currency <span className='text-sm text-red-500'>*</span></label>
          <select {...register("currency")} className='border text-[15px] outline-none border-neutral-300  px-2 py-1.5 rounded-md'>
             {
               currencyListInLacs.map((item)=>(
                  <option value={item}>{item}</option>
               ))
             }
          </select>
          {errors.currency && <span className='text-sm text-red-500'>{errors.currency.message}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Pay Duration <span className='text-sm text-red-500'>*</span></label>
          <select {...register('duration')} className='border text-[15px] outline-none border-neutral-300  px-2 py-1.5 rounded-md'>
            {
               durationList.map((item) => (
                  <option value={item}>{item}</option>
               ))
            }
          </select>
          {errors.duration && <span className='text-sm text-red-500'>{errors.duration.message}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Current Salary (Lacs) <span className='text-sm text-red-500'>*</span></label>
          <input {...register('current_salary')} type='number' step="0.01" className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
          {errors.current_salary && <span className='text-sm text-red-500'>{errors.current_salary.message}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Hike(%) <span className='text-sm text-red-500'>*</span></label>
          <input {...register('hike')} type='number' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
          {errors.hike && <span className='text-sm text-red-500'>{errors.hike.message}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Expected Salary (Lacs) <span className='text-sm text-red-500'>*</span></label>
          <input type='number' {...register('expected_salary')} step={"0.01"} className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
          {errors.expected_salary && <span className='text-sm text-red-500'>{errors.expected_salary.message}</span>}
        </div>
      </div>
      <div className='grid grid-cols-3 items-start gap-5'>
         <div className='flex flex-col gap-2'>
           <label className='text-sm font-semibold'>Key Skills<span className='text-sm text-red-500'>*</span></label>
           <Controller
             control={control}
             name="key_skills"
             render={({ field, fieldState }) => (
             <>
               <Select
                 {...field}
                 closeMenuOnSelect={false}
                 components={customComponents}
                 styles={customStyles}
                 isMulti
                 options={skills}
                 placeholder="Type to search skillset"
                 onChange={(selectedOptions) =>
                 field.onChange(selectedOptions.map((opt) => opt.value))
                 }
                 value={skills.filter((option) =>
                  field.value?.includes(option.value)
                 )}
                />
              {fieldState.error && (
                 <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
             </>
             )}
             />
         </div>
         <div className='flex flex-col gap-2'>
           <label className='text-sm font-semibold'>May also know<span className='text-sm text-red-500'>*</span></label>
           <Controller
             control={control}
             name="may_also_know"
             render={({ field, fieldState }) => (
             <>
               <Select
                 {...field}
                 closeMenuOnSelect={false}
                 components={customComponents}
                 styles={customStyles}
                 isMulti
                 options={skills}
                 placeholder="Type to search skillset"
                 onChange={(selectedOptions) =>
                 field.onChange(selectedOptions.map((opt) => opt.value))
                 }
                 value={skills.filter((option) =>
                  field.value?.includes(option.value)
                 )}
                />
              {fieldState.error && (
                 <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
             </>
             )}
             />
         </div>
         <div className='flex flex-col gap-2'>
           <label className='text-sm font-semibold'>Labels</label>
           <Controller
             control={control}
             name="labels"
             render={({ field, fieldState }) => (
             <>
               <Select
                 {...field}
                 closeMenuOnSelect={false}
                 components={customComponents}
                 styles={customStyles}
                 isMulti
                 options={candidateLabels}
                 placeholder="Type to search labels"
                 onChange={(selectedOptions) =>
                 field.onChange(selectedOptions.map((opt) => opt.value))
                 }
                 value={candidateLabels.filter((option) =>
                  field.value?.includes(option.value)
                 )}
                />
              {fieldState.error && (
                 <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
             </>
             )}
             />
         </div>
      </div>
      <div className='grid grid-cols-2 items-start gap-5'>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Pan No <span className='text-sm text-red-500'>*</span></label>
          <input {...register("pancard")} type='text' placeholder='Enter pancard no' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
          {
            errors.pancard && <span className='text-sm text-red-500'>{errors.pancard.message}</span>
          }
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Aadhar No</label>
          <input {...register("aadharcard")} type='text' placeholder='Enter aadhar no' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
          {
            errors.aadharcard && <span className='text-sm text-red-500'>{errors.aadharcard.message}</span>
          }
        </div>
      </div>
      <div className='flex flex-col gap-4'>
          <span className='font-medium text-lg'>Experiences</span>
          {
            experience_field.map((item,index)=>(
              <div key={index} className='grid grid-cols-5 items-start gap-4'>
                   <div className='flex flex-col gap-2'>
                     <label className='text-sm font-semibold'>Company <span className='text-sm text-red-500'>*</span></label>
                     <input {...register(`experience.${index}.company`)} type='text' placeholder='Enter company name' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:font-light'></input>
                     {
                      errors.experience?.[index]?.company && 
                      <span className='text-sm text-red-500'>{errors.experience[index].company.message}</span>
                     }
                   </div>
                   <div className='flex flex-col gap-2'>
                     <label className='text-sm font-semibold'>Title <span className='text-sm text-red-500'>*</span></label>
                     <input {...register(`experience.${index}.title`)} type='text' placeholder='Enter title' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:font-light'></input>
                     {
                      errors.experience?.[index]?.title && (
                        <span className='text-sm text-red-500'>{errors.experience[index].title.message}</span>
                      )
                     }
                   </div>
                   <div className='flex flex-col gap-2'>
                     <label className='text-sm font-semibold'>From </label>
                     <input {...register(`experience.${index}.from_date`)} type='month'  className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:font-light'></input>
                   </div>
                   <div className='flex flex-col gap-2'>
                     <label className='text-sm font-semibold'>To </label>
                     <input {...register(`experience.${index}.to`)} type='month' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:font-light'></input>
                   </div>
                   <div>
                     <button type='button' onClick={()=> experience_remove(index)} className='bg-red-500 w-8 p-1 flex justify-center items-center rounded-md cursor-pointer text-white'>
                       <X className='w-5 h-5'></X>
                     </button>
                   </div>
              </div>
            ))
          }
          <button type='button' onClick={()=>experience_append({company:"",title:"",from_date:'',to:''})} className='border w-48 gap-2 p-1.5 transition-colors duration-300 hover:bg-blue-500 hover:text-white text-blue-500 border-blue-500 flex justify-center items-center rounded-md'>
             <Plus className='w-5 h-5'></Plus>
             Add Experience
          </button>
      </div>
      <div className='flex flex-col gap-4'>
        <span className='font-medium text-lg'>Academic Details</span>
        {
          education_field.map((item,index)=>(
            <div key={index} className='grid grid-cols-4 items-start gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold'>Education <span className='text-sm text-red-500'>*</span></label>
                <input {...register(`academic_details.${index}.education`)} type='text' placeholder='Enter education' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:font-light'></input>
                {
                  errors.academic_details?.[index]?.education && 
                  <span className='text-sm text-red-500'>
                    {errors.academic_details?.[index]?.education.message}
                  </span>
                }
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold'>College <span className='text-sm text-red-500'>*</span></label>
                <input {...register(`academic_details.${index}.college`)} type='text' placeholder='Enter college' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:font-light'></input>
                {
                  errors.academic_details?.[index]?.college && 
                  <span className='text-sm text-red-500'>
                    {errors.academic_details?.[index]?.college.message}
                  </span>
                }
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold'>Passing Year </label>
                <input {...register(`academic_details.${index}.pass_year`)} type='number' placeholder='Enter passing year' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:font-light'></input>
              </div>
              <div>
                <button type='button' onClick={()=>education_remove(index)} className='bg-red-500 w-8 p-1 flex justify-center items-center rounded-md cursor-pointer text-white'>
                   <X className='w-5 h-5'></X>
                </button>
               </div>
            </div>
          ))
        }
        <button type='button' onClick={()=>education_append({education:'',college:'',pass_year:""})} className='border w-48 gap-2 p-1.5 transition-colors duration-300 hover:bg-blue-500 hover:text-white text-blue-500 border-blue-500 flex justify-center items-center rounded-md'>
            <Plus className='w-5 h-5'></Plus>
            Add Education
        </button>
      </div>
      <div className='flex flex-col gap-4'>
         <span className='text-lg font-medium'>Additional Details</span>
         <div className='flex flex-col gap-5'>
           <div className='grid grid-cols-4 items-start gap-5'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold'>Naukri.com profile </label>
                <input {...register("naukri_profile")} type='text' placeholder='Enter Naukri.com profile' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
                {
                  errors.naukri_profile && <span className='text-sm text-red-500'>{errors.naukri_profile.message}</span>
                }
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold'>Linkedin profile </label>
                <input {...register("linkedin_profile")} type='text' placeholder='Enter Linkedin profile url' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
                {
                  errors.linkedin_profile && <span className='text-sm text-red-500'>{errors.linkedin_profile.message}</span>
                }
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold'>Portfolio link </label>
                <input {...register("portfolio_link")} type='text' placeholder='Enter Naukri.com profile' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
                {
                  errors.portfolio_link && <span className='text-sm text-red-500'>{errors.portfolio_link.message}</span>
                }
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold'>Source </label>
                <select {...register("source")} className='border font-light outline-none border-neutral-300 px-2 py-1.5 rounded-md'>
                   {
                    source.map((item)=>(
                      <option value={item}>{item}</option>
                    ))
                   }
                </select>
              </div>
           </div>
           <div className='grid grid-cols-3 items-start gap-5'>
               <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Alternate Phone Number</label>
                 <input {...register("alternate_phone_number")} type='text' placeholder='Enter Naukri.com profile' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
                 {
                  errors.alternate_phone_number && 
                  <span className='text-sm text-red-500'>{errors.alternate_phone_number.message}</span>
                 }
               </div>
               <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Last Working Date</label>
                 <input {...register('last_working_date')} type='date' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
               </div>
               <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Gender</label>
                 <select {...register("gender")} className='border text-sm outline-none border-neutral-300 px-2 py-1.5 rounded-md'>
                  {
                    gender.map((item)=>(
                      <option value={item}>{item}</option>
                    ))
                   }
                 </select>
               </div>
           </div>
           <div className='grid grid-cols-3 items-center gap-5'>
              <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Age (In Years)</label>
                 <input {...register('age')} type='number' placeholder='Enter age' className='border outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></input>
               </div>
               <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Is Tier 1 MBA College?</label>
                 <select {...register('is_tier_one_mba_college')} className='border text-sm outline-none border-neutral-300 px-2 py-1.5 rounded-md'>
                   <option value={"No"}>No</option>
                   <option value={"Yes"}>Yes</option>
                 </select>
               </div>
               <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Is Tier 1 Engineering College?</label>
                 <select {...register('is_tier_one_engineering_college')} className='border text-sm outline-none border-neutral-300 px-2 py-1.5 rounded-md'>
                   <option value={"No"}>No</option>
                   <option value={"Yes"}>Yes</option>
                 </select>
               </div>
           </div>
           <div className='grid grid-cols-2 items-center gap-5'>
              <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Comment</label>
                 <textarea {...register('comment')}  rows={4} className='border resize-none outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></textarea>
              </div>
              <div className='flex flex-col gap-2'>
                 <label className='text-sm font-semibold'>Exit Reason</label>
                 <textarea {...register('exit_reason')}  rows={4} className='border resize-none outline-none border-neutral-300 px-2 py-1.5 rounded-md placeholder:text-[15px]'></textarea>
              </div>
           </div>
         </div>
      </div>
      <div className='flex p-2 justify-center items-center'>
          <button type='submit' className='bg-blue-500 hover:tracking-wider flex justify-center items-center transition-all duration-300 text-white w-32 rounded-md p-2'>
             {
              loader ? 
              <LoaderCircle className='animate-spin'></LoaderCircle>
              :<span>Submit</span>
             }
          </button>
      </div>
    </form>
  )
}

export default ManuallAdd