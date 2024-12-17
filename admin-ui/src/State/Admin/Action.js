import axios from 'axios'
import {
  USER_FETCH_START,
  SET_USER_DATA,
  SET_USER_FAILURE,
} from './actionTypes';

export const validateUser = () => async (dispatch)=>{
   dispatch({type:USER_FETCH_START})

   try{
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/validate`,{withCredentials:true})
    const data = response.data

    dispatch({
      type:SET_USER_DATA,
      payload:data.details
    })
   }catch(error){
     console.log(error)
     dispatch({
      type:SET_USER_FAILURE,
      payload:error.response?.data?.message || "Validation failed"
     })
   }
}

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data,
});