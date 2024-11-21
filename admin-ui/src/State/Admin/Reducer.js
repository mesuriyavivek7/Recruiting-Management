import Cookies from 'js-cookie';

const cookievalue = Cookies.get("admin_user")
let localUserData = ((localStorage.getItem("userData")!=="undefined" && localStorage.getItem("userData")!==undefined && localStorage.getItem("userData")!==null)?(JSON.parse(localStorage.getItem("userData"))):null)
console.log(cookievalue)
console.log(localUserData)

if(cookievalue===undefined){
  if(localUserData!==null){
    localStorage.removeItem("userData")
  }
  localUserData=null
}

if(!localUserData){
  if(cookievalue){
    Cookies.remove("userData")
  }
  localUserData=null
}


const initialState = {
  userData: localUserData
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
        localStorage.setItem('userData', JSON.stringify(action.payload));
        return {
          ...state,
          userData: action.payload,
        };

    default:
      return state;
  }
};

export default AdminReducer;