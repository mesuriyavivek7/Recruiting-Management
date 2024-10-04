import {  createContext, useEffect, useReducer, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";


const token=Cookies.get("t_user")
let userData=JSON.parse(localStorage.getItem("user")) || null
if(token===undefined){
     if(userData!=null){
        localStorage.removeItem("user")
     }
     userData=null
}

const INITIAL_STATE={
    user:userData,
    loading:false,
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

    //Check for user is admin or not
    const checkAdmin=async ()=>{
        if(state.user){
         try{
            let res=null;
            if(state.user.userType==='enterprise') res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/checkadmin/${state.user._id}`)
            else res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/checkadmin/${state.user._id}`)
            
            if(res.data) setIsAdmin(true)
            else setIsAdmin(false)
         }catch(err){
            console.log(err)
         }
        }
    }

    useEffect(()=>{
       localStorage.setItem("user",JSON.stringify(state.user))
       checkAdmin()
    },[state.user])

    
    return (
        <AuthContext.Provider
         value={
            {   isAdmin,
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