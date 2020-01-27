import { SEARCH_ADDRESS } from "../constants/actionTypes";

/**
   * dispatch({type: SEARCH_ADDRESS})
   * 
   * ?do something async
   * //fetch(URI)
   * .then(response => response.json())
   * .then(data)
   * 
   * 
   * dispatch({})
  
   */

    // case SEARCH_ADDRESS_SUCCESS:
    //   return{
    //     ...state,
    //     search_pending: false,
    //     search_result: action.payload
    //   }

      // case SEARCH_ADDRESS_FAILURE: 
      // return {
      //   ...state,
      //   search_pending: false,
      //   error: action.error
      // }

const initialState = {
  address_search: '',
  previous_searches: [],
  current_results: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADDRESS:
      return {
        ...state,
        address_search: action.payload.address_search,
        previous_searches: [...state.previous_searches, action.payload.address_search],
        current_results: action.payload.current_results,
      };
    default:
      return state;
  }
};

export default searchReducer;
