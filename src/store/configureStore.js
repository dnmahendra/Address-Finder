import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInVariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

const logger = createLogger()
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger, reduxImmutableStateInVariant())
  );
}
