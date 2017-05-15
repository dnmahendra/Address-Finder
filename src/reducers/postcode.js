import concat from 'lodash/concat'

import { REQUEST_POSTCODE, RECEIVE_POSTCODE, LOAD_POSTCODE_DATA } from '../actions';
export const initialState = {
  postcodeData: [],
  postcode: '',
};

export default function postcodeReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTCODE_DATA: {
      return {
        ...state,
      }
    }
    case REQUEST_POSTCODE:
      return {
        ...state,
        postcode: action.postcode,
      };
    case RECEIVE_POSTCODE:
      return action.postcodeData === null
        ? {
          ...state,
        }
        : {
          ...state,
          postcodeData: concat([], action.postcodeData.localities.locality),
        };
    default:
      return state;
  }
}
