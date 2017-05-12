export const REQUEST_POSTCODE = 'REQUEST_POSTCODE';
export const RECEIVE_POSTCODE = 'RECEIVE_POSTCODE';
import fetch from 'isomorphic-fetch';

// #####################################################
// action creators
export function fetchPostcodeData (postcode) {
  return async function (dispatch) {
    dispatch(requestPostcode(postcode));
    try {
      console.log('HELLO')
      const res = await fetch('/api/postcode');
      console.log('F2')
      const result = await res.json();
      console.log('here');
      console.log(result);
      dispatch(receivePostcode(result));
    }
    catch (err) {
      console.warn('Error in getting the postcode data ' + err); // eslint-disable-line no-console
    }
  };
}

export function requestPostcode (postcode) {
  return {
    type: RECEIVE_POSTCODE,
    postcode,
  };
}

export function receivePostcode (data) {
  return {
    type: RECEIVE_POSTCODE,
    postcodeData: data,
  };
}
