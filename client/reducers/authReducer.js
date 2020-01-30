import { SIGN_IN, REGISTER, LOGOUT } from '../constants/actionTypes';

const initialState = {
  currentUser: null,
  isLogged: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      if (action.payload === null) {
        return state;
      }
      // if (action.payload === 'error') {
      //   console.log(
      //     'This email is already is use by another account at SIGN_IN'
      //   );
      //   return state;
      // }
      return {
        ...state,
        currentUser: action.payload,
        isLogged: true
      };
    case REGISTER:
      if (action.payload === 'error') {
        console.log(
          'this email is already in use on another account. Please use a different email or try signing in! at REGISTER'
        );
        return state;
      }
      return {
        ...state,
        currentUser: action.payload,
        isLogged: true
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLogged: false
      };
    default:
      return state;
  }
};

export default authReducer;
