import Cookies from 'js-cookie';

let user = null
const cookievalue = Cookies.get('admin_user')
const localUserData = JSON.parse(localStorage.getItem('userData')) || null
if (cookievalue) {
  if (localUserData) {
    user = localUserData
  } else {
    Cookies.remove('admin_user')
  }
} else {
  if (localUserData) {
    localStorage.removeItem('userData')
  }
}

const initialState = {
  userData: user
};
const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':

      const adminCookie = Cookies.get('admin_user');


      if (adminCookie) {
        localStorage.setItem('userData', JSON.stringify(action.payload));


        return {
          ...state,
          userData: action.payload,
        };

      }
      else {

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