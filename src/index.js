import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import { loadForm, loadPostcodeData, loadSuburbData } from './actions'

const store = configureStore()
store.dispatch(loadForm())
store.dispatch(loadPostcodeData())
store.dispatch(loadSuburbData())

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
