const AdminReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        // Store user data in localStorage
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