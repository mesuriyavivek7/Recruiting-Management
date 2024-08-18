import Cookies from 'js-cookie';


const initialState={
  userData:JSON.parse(localStorage.getItem('userData'))||null
};
const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':

      const adminCookie=Cookies.get('admin_user');
      

      if(adminCookie){ 
        localStorage.setItem('userData', JSON.stringify(action.payload));
     
       
        return {
          ...state,
          userData: action.payload,
        };
        
      }

      else{
       
        localStorage.removeItem('userData');
        return {
          ...state,
          userData: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default AdminReducer;