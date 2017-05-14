import React from 'react'
import { mount } from 'enzyme'
import DataTable from '../index'
import expect from 'expect'

const data = [
  {
    location: 'sydney',
    postcode: 2000,
    state: 'NSW',
  },
]

describe('DataTable Component', () => {
  let wrapper = mount(
    <DataTable data={data} />
  )

  it('Should have a header', () => {
    const headers = wrapper.find('.data-table').find('.table-header').find('tr').find('th')
    expect(headers.at(0).text()).toEqual('POSTCODE')
  })

  it('Should have a row', () => {
    const body = wrapper.find('.data-table').find('.table-body').find('tr').find('td')

    expect(body.at(0).text()).toEqual('2000')
  })
})
