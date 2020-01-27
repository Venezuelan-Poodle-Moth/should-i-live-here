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