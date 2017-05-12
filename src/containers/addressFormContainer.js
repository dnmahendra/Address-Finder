import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import * as addressActionCreators from '../actions';

export class AddressFormContainer extends Component {
  componentDidMount () {
    this.fetchPostcodeData();
  }
  fetchPostcodeData = (postcode = this.props.postcode) => {
    this.props.fetchPostcodeData(postcode);
  }
  render () {
    const { postcode, isFetching, postcodeData } = this.props;

    let renderAlbum;
    if (isFetching) {
      renderAlbum = (
        <p>LOADING!</p>
      );
    } else {
      renderAlbum = (
        <Col md={12}>
          <Row>
            <h1 className="text-center page-heading">Album - {postcode}</h1>
            <p>{postcode}</p>
          </Row>
        </Col>
      );
    }
    return (
      <Grid>
        {renderAlbum}
      </Grid>
    );
  }
}

AddressFormContainer.defaultProps = {
  postcode: 2000,
  isFetching: false,
  postcodeData: [],
};

AddressFormContainer.propTypes = {
  fetchPostcodeData: PropTypes.func.isRequired,
  postcode: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  postcodeData: PropTypes.array,
};

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching,
    postcodeData: state.postcodeData,
    postcode: state.postcode,
  };
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(addressActionCreators, dispatch)
)(AddressFormContainer);
