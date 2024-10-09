import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';


export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading,setLoading]=useState(false)
  const [sendLoader,setSendLoader]=useState(false)


  // Fetch users to chat with
  const fetchUsers = async () => {
    try {
      let res=null
      if(user.userType==='enterprise') res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/enterpriseteam/getrecruiterteam/${user._id}`);
      else if (user.userType==='recruiting') res= await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recruitingteam/getenterpriseteam/${user._id}`);
      if(res) setUsers(res.data)
      console.log('fetched users---->',res.data)
    } catch (err) {
      console.error(err);
    }
  };



  // Select a user to chat with
  const selectUserToChat = async (user) => {
    setSelectedUser(user);
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/message/getmsg`,{
        candidate_id:user.candidate_id,
        otherUserId:user.id
      },{
        headers: { 'x-auth-token': Cookies.get("t_user") },
      });
      setMessages(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
    setLoading(false)
  };

  // Send a message
  const sendMessage = async (receiverId,candidate_id,content) => {
    setSendLoader(true)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/message`, {
        receiverId,
        candidate_id,
        receiverModel:(user.userType==='recruiting'?("enterpriseteam"):("recruitingteam")),
        content,
      }, {
        headers: { 'x-auth-token': Cookies.get("t_user") },
      });
      console.log(res.data)
      setMessages(prev => [...prev, res.data]);
      setSendLoader(false)
    } catch (err) {
      console.error(err);
      setSendLoader(false)
    }
  };

  useEffect(()=>{
    if(user){
      fetchUsers()
    } 
  },[user])

  return (
    <MessageContext.Provider value={{
      messages,
      setMessages,
      users,
      fetchUsers,
      selectUserToChat,
      selectedUser,
      sendMessage,
      sendLoader,
      loading
    }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
