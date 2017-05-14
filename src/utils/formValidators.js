const isEmpty = (value) => value === undefined || value === null || value === ''

export function required (value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}

export function checkPostcode (value) {
  let regex = /^[0-9]{4}$/
  if (!regex.test(value)) {
    return 'Invalid postcode'
  }
}
