/*
 * Action creators
*/

import * as types from '../constants/actionTypes';

// * searching address
const SEARCH_ADDRESS_PENDING = () => ({
  type: types.SEARCH_ADDRESS_PENDING,
});

const SEARCH_ADDRESS_FAILURE = (error) => ({
  type: types.SEARCH_ADDRESS_FAILURE,
  payload: error,
});

const SEARCH_ADDRESS = (address) => (dispatch) => {
  const body = {
    address: address.address,
    borough: address.borough,
  };
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  dispatch(SEARCH_ADDRESS_SUCCESS)
    .catch((err) => console.log(err));
};
