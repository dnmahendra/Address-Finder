import { combineReducers} from 'redux';
import postcodeReducer from './postcode';

const rootReducer = combineReducers({
  postcodeReducer,
});

export default rootReducer;
