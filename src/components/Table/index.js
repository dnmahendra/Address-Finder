import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap'

class DataTable extends Component {
  render () {
    const { data } = this.props

    let renderHeader
    let renderRows = []
    if (data.length > 0) {
      renderHeader = (
        <thead className="table-header">
          <tr>
            <th>POSTCODE</th>
            <th>SUBURB</th>
            <th>STATE</th>
          </tr>
        </thead>
      )

      data.forEach((item, i) => {
        renderRows.push(
          <tbody className="table-body" key={i}>
            <tr>
              <td>{item.postcode}</td>
              <td>{item.location}</td>
              <td>{item.state}</td>
            </tr>
          </tbody>
        )
      })
    }
    return (
      <div className="data-table">
        <Table striped bordered responsive>
          {renderHeader}
          {renderRows}
        </Table>
      </div>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default DataTable
