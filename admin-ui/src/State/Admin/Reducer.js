const initialState = {
  userData: null,
  loading:true,
  error:null
};

const AdminReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "USER_FETCH_START":
      return{
       loading:true,
       error:null
      }

    case 'SET_USER_DATA':
        localStorage.setItem('userData', JSON.stringify(action.payload));
        return {
          userData: action.payload,
          loading:false,
          error:null
        };
      
    case "SET_USER_FAILURE":
      return {
        userData:null,
        loading:false,
        error:action.payload
      }
    
    case "LOGOUT":
      return {
        userData:null,
        loading:false,
        error:null
      }

    default:
      return state;
  }
};

export default AdminReducer;