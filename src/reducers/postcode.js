import { REQUEST_POSTCODE, RECEIVE_POSTCODE } from '../actions';
export const initialState = {
  postcodeData: [],
  isFetching: true,
  postcode: 1,
};

export default function postcodeReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTCODE:
      return {
        ...state,
        isFetching: true,
        postcode: action.postcode,
      };
    case RECEIVE_POSTCODE:
      return action.postcodeData === null
        ? {
          ...state,
          isFetching: false,
        }
        : {
          ...state,
          isFetching: false,
          postcodeData: action.postcodeData,
        };
    default:
      return state;
  }
}
