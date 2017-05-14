import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Jumbotron, Row, Button } from 'react-bootstrap';
import Form from '../../containers/addressFormContainer';

require('./styles.scss')

class Home extends Component {
  render () {

    return (
      <div className="home-page">
        <main>
          <Grid>
            <Row className="text-center">
              <h1>Postcode Validator</h1>
              <Form />
            </Row>
          </Grid>
        </main>
      </div>
    );
  }
}

export default Home;
