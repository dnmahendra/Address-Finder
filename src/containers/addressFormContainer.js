import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, Form, FormGroup, FormControl, HelpBlock, Button, Table } from 'react-bootstrap'
import * as addressActionCreators from '../actions'
import TextInput from '../components/TextInput'
import { required, checkPostcode } from '../utils/formValidators'
import DataTable from '../components/Table'

import './form.scss'

export class AddressFormContainer extends Component {
  constructor () {
    super()
    this.state = {
      showPostcodeTable: false,
      showSuburbTable: false,
      postcodeValidate: null,
      suburbValidate: null,
      stateValidate: null,
      postcodeHelp: 'Validation is based on string value and length',
      suburbHelp: 'Validation is based on postcode entered',
      stateHelp: 'Validation is based on suburb entered',
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.postcodeData.length > 0) {
      this.checkSuburbExists(nextProps.postcodeData)
      this.setState({ showPostcodeTable: true })
    }
    if (nextProps.suburbData.length > 0) {
      this.checkState(nextProps.suburbData)
      this.setState({ showSuburbTable: true })
    }
  }
  checkSuburbExists = (data) => {
    let exists = false
    const regex = new RegExp(`(^|\\W)${this.props.suburb}($|\W)`, 'i')
    data.forEach((item) => {
      if (regex.test(item.location)) {
        exists = true
      }
    })

    if (exists) {
      this.setState({ suburbValidate: 'success' })
      this.setState({ suburbHelp: 'Validation success'})
    } else {
      this.setState({
        suburbValidate: 'error',
        suburbHelp: `${this.props.postcode} is not valid for ${this.props.suburb}. Please refer below table.`,
       })
    }
  }
  checkState = (data) => {
    let exists = false

    const regexState = new RegExp(this.props.state, 'i')
    const regexSuburb = new RegExp(`(^|\\W)${this.props.suburb}($|\W)`, 'i')

    data.forEach((item) => {
      if (regexState.test(item.state) && regexSuburb.test(item.location)) {
        exists = true
      }
    })

    if (exists) {
      this.setState({ stateValidate: 'success' })
      this.setState({ stateHelp: 'Validation success'})
    } else {
      this.setState({
        stateValidate: 'error',
        stateHelp: `${this.props.suburb} does not exist in ${this.props.state}. Please refer below table.`,
       })
    }
  }
  fetchPostcodeData = (postcode = this.props.postcode) => {
    this.props.fetchPostcodeData(postcode)
  }
  fetchSuburbData = (suburb = this.props.suburb) => {
    this.props.fetchSuburbData(suburb)
  }
  handleStateChange = (e) => {
    e.preventDefault()
    this.props.updateFormAttribute('state', e.target.value)
  }
  isPostcodeValid = (value) => {
    if (checkPostcode(value)) {
      this.setState({ postcodeValidate: 'error' })
      this.setState({ postcodeHelp: 'postcode should be a 4 digit value' })
      return false
    }

    this.setState({ postcodeHelp: 'Validation success'})
    this.setState({ postcodeValidate: 'success'})
    return true
  }
  isSuburbValid = (value) => {
    if (required(value)) {
      return false
    }
    return true
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { postcode, suburb, state, postcodeData } = this.props
    if (this.isPostcodeValid(postcode) && this.isSuburbValid(suburb) && state !== 'empty') {
      this.fetchPostcodeData(postcode)
      this.fetchSuburbData(suburb)
    }
  }
  render () {
    const { postcodeData, suburbData } = this.props
    const { showSuburbTable, showPostcodeTable, postcodeValidate, suburbValidate, stateValidate, postcodeHelp, suburbHelp, stateHelp } = this.state

    let renderSuburbTable
    let renderPostcodeTable

    if (showSuburbTable) {
      renderSuburbTable = (
        <Col md={6} className="suburb-table">
          <h5>Suburb Related Data</h5>
          <Row>
            <DataTable data={suburbData} />
          </Row>
        </Col>
      )
    }

    if (showPostcodeTable) {
      renderPostcodeTable = (
        <Col md={6} className="postcode-table">
          <h5>Postcode Related Data</h5>
          <Row>
            <DataTable data={postcodeData} />
          </Row>
        </Col>
      )
    }

    return (
      <div className="form-container">
        <Grid>
          <Form onSubmit={this.handleSubmit}>
            <Col md={12}>
              <div className="form-input">
                <Row>
                  <Col md={6} mdOffset={3} className="no-gutter">
                    <TextInput
                      name="postcode"
                      type="text"
                      placeholder="Postcode"
                      className="postcode-input"
                      updateAttribute={this.props.updateFormAttribute}
                      validationState={postcodeValidate}
                      helpMessage={postcodeHelp}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} mdOffset={3} className="no-gutter">
                    <TextInput
                      name="suburb"
                      type="text"
                      placeholder="Suburb"
                      className="suburb-input"
                      updateAttribute={this.props.updateFormAttribute}
                      validationState={suburbValidate}
                      helpMessage={suburbHelp}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} mdOffset={3} className="no-gutter">
                    <FormGroup validationState={stateValidate}>
                      <FormControl componentClass="select" onChange={this.handleStateChange} className="state-dropdown">
                        <option value="empty">Select a state...</option>
                        <option value="nsw">NSW</option>
                        <option value="vic">VIC</option>
                        <option value="qld">QLD</option>
                        <option value="wa">WA</option>
                        <option value="sa">SA</option>
                        <option value="tas">TAS</option>
                        <option value="nt">NT</option>
                      </FormControl>
                      <FormControl.Feedback />
                      <HelpBlock>{stateHelp}</HelpBlock>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} mdOffset={3} className="text-center">
                    <Button type="submit" className="form-submit">
                      Validate
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Form>
        </Grid>
        <Grid>
          <Col md={12} className="data-tables">
            {renderPostcodeTable}
            {renderSuburbTable}
          </Col>
        </Grid>
      </div>
    )
  }
}

AddressFormContainer.propTypes = {
  fetchPostcodeData: PropTypes.func.isRequired,
  fetchSuburbData: PropTypes.func.isRequired,
  postcode: PropTypes.string,
  suburb: PropTypes.string,
  state: PropTypes.string,
  updateFormAttribute: PropTypes.func,
  postcodeData: PropTypes.array,
  suburbData: PropTypes.array,
};

function mapStateToProps (state) {
  return {
    postcode: state.form.postcode,
    suburb: state.form.suburb,
    state: state.form.state,
    postcodeData: state.postcode.postcodeData,
    suburbData: state.suburb.suburbData,
  };
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(addressActionCreators, dispatch)
)(AddressFormContainer);
