import { combineReducers} from 'redux'
import postcode from './postcode'
import form from './form'
import suburb from './suburb'

const rootReducer = combineReducers({
  form,
  postcode,
  suburb,
})

export default rootReducer
