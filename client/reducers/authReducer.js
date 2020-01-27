import { SIGN_IN, REGISTER, LOGOUT } from '../constants/actionTypes';

const initialState = {
  currentUser: null,
  isLogged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      if (action.payload === null) {
        return state;
      }
      return {
        ...state,
        currentUser: action.payload,
        isLogged: true,
      };
    case REGISTER:
      return {
        ...state,
        currentUser: action.payload,
        isLogged: true,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLogged: false,
      };
    default: return state;
  }
};

export default authReducer;
