/**
 * Action creators
 */
import * as types from '../constants/actionTypes';

//authentication
// const isLogged = (bool) => {
//     return {
//         type: types.AUTHENTICATE,
//         payload: false
//     }
// }



//searching address
const SEARCH_ADDRESS_PENDING = () => { 
    return {
        type: types.SEARCH_ADDRESS_PENDING
    }
}

const SEARCH_ADDRESS_SUCCESS

const SEARCH_ADDRESS_FAILURE = (error) => {
    return {
        type: types.SEARCH_ADDRESS_FAILURE,
        payload: error
    }
}

const SEARCH_ADDRESS = (address) => {
    return (dispatch) => {
        dispatch(SEARCH_ADDRESS_PENDING)
        fetch(URI)
            .then(response => response.json())
            .then(data => console.log(data))

        dispatch(SEARCH_ADDRESS_SUCCESS)
        .catch(err => console.log(err));
    }
    
    // {
    //     type: types.SEARCH_ADDRESS_SUCCESS,
    //     payload: address
    // }
}