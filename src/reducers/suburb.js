import { REQUEST_SUBURB, RECEIVE_SUBURB, LOAD_SUBURB_DATA } from '../actions'
export const initialState = {
  suburbData: [],
  suburb: '',
}

export default function suburbReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_SUBURB_DATA: {
      return {
        ...state,
      }
    }
    case REQUEST_SUBURB:
      return {
        ...state,
        suburb: action.suburb,
      };
    case RECEIVE_SUBURB:
      return action.suburbData === null
        ? {
          ...state,
        }
        : {
          ...state,
          suburbData: action.suburbData.localities.locality,
        };
    default:
      return state;
  }
}
