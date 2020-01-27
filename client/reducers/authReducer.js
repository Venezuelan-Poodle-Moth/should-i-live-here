import { SIGN_IN } from '../constants/actionTypes';

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
    default: return state;
  }
};

export default authReducer;
