import {  createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

const INITIAL_STATE={
    user:null,
    loading:true,
    error:null
}

export const AuthContext=createContext(INITIAL_STATE)


const AuthReducer=(state,action)=>{
    switch(action.type){

        case "USER_FETCH_START":
            return{
                loading:true,
                error:null
            }

        case "USER_FETCH_SUCCESS":
            return {
                user:action.payload,
                loading:false,
                error:null
            }

        case "USER_FETCH_FAILURE":
            return {
                user:null,
                loading:false,
                error:action.payload
            }
        case "LOGOUT":
            return {
                user:null,
                loading:false,
                error:null
            }
        
        default:
            return state
    }
}

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)
    const [isAdmin,setIsAdmin]=useState(false)
    const [isVerified,setIsVerified]=useState(true)


    // Fetch user data from the server using the httpOnly cookie
    const fetchUserData = async () => {
      dispatch({ type: "USER_FETCH_START" });
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/validate`, {
          withCredentials: true, // Include cookies in the request
         });
        dispatch({ type: "USER_FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        console.log("Error while fetching data",error)
        dispatch({ type: "USER_FETCH_FAILURE", payload: error.response?.data?.message || "Failed to fetch user" });
      }
    };

    //Check for user is admin or not
    const checkAdmin=async ()=>{
        if(state.user){
         try{
            if(state.user){
            let res=null;
            if(state.user.userType==='enterprise') res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/checkadmin/${state.user._id}`)
            else res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkadmin/${state.user._id}`)
            if(res.data) setIsAdmin(true)
            else setIsAdmin(false)
            }
         }catch(err){
            console.log(err)
         }
        }
    }

    //check for user is verified by master admin or not
    const handleCheckisVerified=async ()=>{
        try{
           if(state.user){
           let res=null
           if(state.user.userType==='enterprise') res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterprise/isverifiedaccount/${state.user.enterprise_id}`)
           else res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruiting/isverified/${state.user.recruiting_agency_id}`)
           setIsVerified(res.data)
           }
        }catch(err){
          console.log(err)
          
        }
     }
   
    useEffect(()=>{
      fetchUserData()
    },[])

    useEffect(()=>{
       localStorage.setItem("user",JSON.stringify(state.user))
       checkAdmin()
       handleCheckisVerified()
    },[state.user])

    
    return (
        <AuthContext.Provider
         value={
            {   isVerified,
                isAdmin,
                user:state.user,
                loading:state.loading,
                error:state.error,
                dispatch
            }
         }
        >
         {children}
        </AuthContext.Provider>

    )

}