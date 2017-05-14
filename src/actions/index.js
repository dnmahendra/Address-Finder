import fetch from 'isomorphic-fetch'

export const REQUEST_POSTCODE = 'REQUEST_POSTCODE'
export const RECEIVE_POSTCODE = 'RECEIVE_POSTCODE'
export const REQUEST_SUBURB = 'REQUEST_SUBURB'
export const RECEIVE_SUBURB = 'RECEIVE_SUBURB'
export const SET_ATTRIBUTE = 'SET_ATTRIBUTE'
export const LOAD_FORM = 'LOAD_FORM'
export const LOAD_POSTCODE_DATA = 'LOAD_POSTCODE_DATA'
export const LOAD_SUBURB_DATA = 'LOAD_SUBURB_DATA'

const environment = process.env.NODE_ENV
// #####################################################
// action creators
export function fetchPostcodeData (postcode) {
  return async function (dispatch) {
    dispatch(requestPostcode(postcode))
    try {
      let url
      if (environment === 'test') {
        url = `http://localhost:3000/api/postcode?q=${postcode}`
      } else {
        url = `/api/postcode?q=${postcode}`
      }
      const res = await fetch(url)
      const result = await res.json()
      dispatch(receivePostcode(result))
    }
    catch (err) {
      console.warn('Error in getting the postcode data ' + err) // eslint-disable-line no-console
    }
  }
}

export function fetchSuburbData (suburb) {
  return async function (dispatch) {
    dispatch(requestSuburb(suburb))
    try {
      const url = `/api/postcode?q=${suburb}`
      const res = await fetch(url)
      const result = await res.json()
      dispatch(receiveSuburb(result))
    }
    catch (err) {
      console.warn('Error in getting the suburb data ' + err) // eslint-disable-line no-console
    }
  }
}

export function requestPostcode (postcode) {
  return {
    type: REQUEST_POSTCODE,
    postcode,
  }
}

export function receivePostcode (data) {
  return {
    type: RECEIVE_POSTCODE,
    postcodeData: data,
  }
}

export function requestSuburb (suburb) {
  return {
    type: REQUEST_SUBURB,
    suburb,
  }
}

export function receiveSuburb (data) {
  return {
    type: RECEIVE_SUBURB,
    suburbData: data,
  }
}

export function updateFormAttribute (attribute, value) {
  return function (dispatch) {
    dispatch({
      type: SET_ATTRIBUTE,
      value: value,
      attribute: attribute,
    })
  }
}

export function loadForm () {
  return {
    type: LOAD_FORM,
  }
}

export function loadPostcodeData () {
  return {
    type: LOAD_POSTCODE_DATA,
  }
}

export function loadSuburbData () {
  return {
    type: LOAD_SUBURB_DATA,
  }
}
