/**
 * Action creators
 */
import * as types from '../constants/actionTypes';

// authentication

/*
    After user submits login form with their credentials. isFetching indicates our calls 
    to the server with our user's credentials to see if they are valid.
*/
const LOGIN_REQUEST = (creds) => {
    return {
        type: types.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds,
    }
}

/*
    If our LOGIN_REQUEST is successful
*/
const LOGIN_SUCCESS = (currentUser) => {
    return {
        type: types.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: currentUser.id_token, // token from Natalie will go here, might need to adjust key & value
    }
}
/*
    If credentials are not a match, send an error message.
*/
const LOGIN_FAILURE = () => {
    return {
        type: types.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message, // error message to send the user to see the problem
    }
}

export function userLoginFetch(user) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // need to check form is coming in this format
        body: JSON.stringify({ user })
    }
/*
    Redux thunk to dispatch requestLogin to make an async call to our API
*/
    return dispatch => {
        // config is passed as our option options object to be sure only certain requests will resolve
        return fetch ('path', config)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
              // handles invalid login credentials
              // assumes our LOGIN_FAILURE action creator will return a JSON object
              // with a key of 'message' if there is an error
                console.log("error message from loginUser func ", data.message)
                dispatch(LOGIN_FAILURE(data.message));
            } else {
              // set token in local storage, maybe:
              // localStorage.setItem("token", data.jwt)
              // need to check with Natalie
              dispatch(LOGIN_SUCCESS(data.user));
            }
        })
    
}

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