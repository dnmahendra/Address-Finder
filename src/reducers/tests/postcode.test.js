import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import expect from 'expect'
import postcodeReducer from '../postcode'
import * as addressActionCreators from '../../actions'

describe('Postcode Store', function () {
  this.timeout(5000)

  const store = createStore(postcodeReducer, applyMiddleware(thunk))

  it('Should return postcode data', async () => {
    const action = addressActionCreators.fetchPostcodeData(2000)

    await store.dispatch(action)
    const actual = store.getState()

    expect(actual.postcode).toEqual(2000)
    expect(actual.postcodeData.length).toBeGreaterThan(1)
  })
})
