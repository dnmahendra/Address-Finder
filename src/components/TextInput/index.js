import React, { Component, PropTypes } from 'react'
import { FormGroup, InputGroup, FormControl, HelpBlock } from 'react-bootstrap'
import debounce from 'lodash/debounce'

class TextInput extends Component {
  constructor () {
    super()
    this.setAttribute = debounce(this.updateAttribute, 1000, { 'trailing': true, 'leading': false })
    this.state = {
      value: '',
    }
  }
  handleTextChange = (event) => {
    const value = event.target.value
    this.setState({value})
    event.persist()
    this.setAttribute(value)
  }
  updateAttribute = (value) => {
    this.props.updateAttribute(this.props.name, value)
  }
  render () {
    const { placeholder, className, name, validationState, helpMessage } = this.props
    const { value } = this.state

    let textInput = (
      <FormControl
        name={name}
        componentClass="input"
        type="text"
        value={value}
        onChange={this.handleTextChange}
        placeholder={placeholder}
        className={className}
      />
    )

    return (
      <FormGroup validationState={validationState}>
        {textInput}
        <FormControl.Feedback />
        <HelpBlock>{helpMessage}</HelpBlock>
      </FormGroup>
    )
  }
}

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  updateAttribute: PropTypes.func,
  validationState: PropTypes.string,
  helpMessage: PropTypes.string,
}

export default TextInput
