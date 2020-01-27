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

const initialState = {
  address_search: '', //?
  previous_searches: [],
  search_result: [],
  current_results: null,
  search_pending: false,
  error: null
};

const searchReducer = (state = initialState, action) => {
  switch(action.type) {

    case SEARCH_ADDRESS_PENDING:
      return {
        ...state,
        search_pending: true
      }

    case SEARCH_ADDRESS_SUCCESS:
      return{
        ...state,
        search_pending: false,
        search_result: action.payload
      }

      case SEARCH_ADDRESS_FAILURE: 
      return {
        ...state,
        search_pending: false,
        error: action.error
      }

    default:
      return state;
  }
}