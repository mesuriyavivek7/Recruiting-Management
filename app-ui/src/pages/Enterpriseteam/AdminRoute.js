import  { useContext, useEffect } from 'react'

import {useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function AdminRoute({children}) {
   const navigate=useNavigate()
   const {user,isAdmin}=useContext(AuthContext)

   useEffect(()=>{
     if(!user || !isAdmin) navigate('/')
   },[])
   
   return children
   
}
