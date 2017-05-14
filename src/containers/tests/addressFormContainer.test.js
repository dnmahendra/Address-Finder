import React from 'react'
import { mount } from 'enzyme'
import { AddressFormContainer } from '../addressFormContainer'
import expect from 'expect'
import sleep from 'sleep-promise'

const props = {
  postcode: '2000',
  suburb: 'westmead',
  state: 'nsw',
  postcodeData: [{
    location: 'sydney',
    postcode: 2000,
    state: 'NSW',
  }],
  suburbData: [{
    location: 'westmead',
    postcode: 2145,
    state: 'NSW',
  }],
  fetchPostcodeData: () => { return Promise.resolve() },
  fetchSuburbData: () => { return Promise.resolve() },
  updateFormAttribute: () => { return Promise.resolve() },
}

describe('Form Contianer', function () {
  this.timeout(3000)
  let wrapper = mount(
    <AddressFormContainer {...props} />
  )

  it('Should have a form', () => {
    expect(wrapper.find('.form-container').length).toEqual(1)
  })

  it('Validate form input data', async () => {
    const form = wrapper.find('.form-container').find('form')
    expect(form.find('.help-block').at(0).text()).toEqual('Validation is based on string value and length')

    form.simulate('submit')

    expect(form.find('.help-block').at(0).text()).toEqual('Validation success')
  })
})
