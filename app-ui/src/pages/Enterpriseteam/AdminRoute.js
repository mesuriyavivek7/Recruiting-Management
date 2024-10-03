import React, { useContext } from 'react'

import {useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function AdminRoute({children}) {
   const navigate=useNavigate()
   const {user,isAdmin}=useContext(AuthContext)

   if(!user) navigate('/')
   if(!isAdmin) navigate('/')

   return children
}
