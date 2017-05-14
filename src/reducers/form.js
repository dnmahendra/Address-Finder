import update from 'react-addons-update'
import { SET_ATTRIBUTE, LOAD_FORM } from '../actions'

export const initialState = {
  postcode: '',
  suburb: '',
  state: '',
}

export default function formReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_FORM: {
      return state
    }
    case SET_ATTRIBUTE: {
      return update(state, {
        [action.attribute]: {$set: action.value},
      })
    }
    default:
      return state
  }
}
