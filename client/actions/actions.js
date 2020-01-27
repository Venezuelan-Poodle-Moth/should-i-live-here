/* eslint-disable no-irregular-whitespace */
/*
 * Action creators
 */
import * as types from '../constants/actionTypes';

// * searching address
// const SEARCH_ADDRESS_PENDING = () => ({
//   type: types.SEARCH_ADDRESS_PENDING,
// });

export const SEARCH_ADDRESS_FAILURE = (error) => ({
  type: types.SEARCH_ADDRESS_FAILURE,
  payload: error,
});

export const addressSearch = (address, borough) => (dispatch) => {
  const body = {
    address,
    borough,
  };
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => dispatch({
      type: types.SEARCH_ADDRESS,
      payload: {
        address_search: `${address} ${borough}`,
        current_results: data,
      },
    }))
    .catch((err) => console.log(err));
};

// authentication

/*
   After user submits login form with their credentials. isFetching indicates our calls
   to the server with our user's credentials to see if they are valid.
*/
const LOGIN_REQUEST = (creds) => ({
  type: types.LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds,
});

/*
If our LOGIN_REQUEST is successful
*/

const LOGIN_SUCCESS = (currentUser) => ({
  type: types.LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: currentUser.id_token, // token from Natalie will go here, might need to adjust key & value
});
/*
        If credentials are not a match, send an error message.
    */
const LOGIN_FAILURE = () => ({
  type: types.LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message, // error message to send the user to see the problem
});

export function userLoginFetch(email, password) {
  console.log('userLoginFetch fired');
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, // need to check form is coming in this format
    body: JSON.stringify({
      email,
      password,
    }),
  };
    // Redux thunk to dispatch requestLogin to make an async call to our API

  return (dispatch) =>
  // config is passed as our option options object to be sure only certain requests will resolve
    fetch('/user/login', config)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: types.SIGN_IN,
          payload: data,
        });
      });
}

//             if (data.message) {
//               // handles invalid login credentials
//               // assumes our LOGIN_FAILURE action creator will return a JSON object
//               // with a key of 'message' if there is an error
//                 console.log("error message from loginUser func ", data.message)
//                 dispatch(LOGIN_FAILURE(data.message));
//             }
// else {
// set token in local storage, maybe:
// localStorage.setItem("token", data.jwt)
// need to check with Natalie
//             }
