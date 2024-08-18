import {  createContext, useEffect, useReducer } from "react";
import Cookies from 'js-cookie';


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

    useEffect(()=>{
       localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    
    return (
        <AuthContext.Provider
         value={
            {
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