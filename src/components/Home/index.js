import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Jumbotron, Row, Button } from 'react-bootstrap';
import AddressFormContainer from '../../containers/addressFormContainer';

class Home extends Component {
  render () {

    return (
      <Grid className="home-page">
        <Jumbotron className="jumbo">
          <Row className="text-center">
            <h1>Address Finder</h1>
            <p className="lead">Validate Your Address against AUSPOST API</p>
            <AddressFormContainer />
          </Row>
        </Jumbotron>
      </Grid>
    );
  }
}

export default Home;
