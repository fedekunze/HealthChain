import React, { Component } from 'react';
import {Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Footer from './Footer';

class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {

    const RedirectButton = () => (
    <Route render={({ history}) => (
      <Button
        className="btn btn-7"
        bsSize="lg"
        type="button"
        onClick={() => { history.push('/signup') }}
      >
        Request to Join
      </Button>
    )} />
  );


    return(
      <div>
        <Jumbotron className="banner-background">
          <div className="light-cover">
          <Grid className="grid-banner">
            <Row>
              <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                <h1 className="text-white">Access Emergency Data</h1>
                <LoginForm/>
              </Col>
              <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                <h1 className="text-white">Log In</h1>
                <LoginForm/>
              </Col>
            </Row>
          </Grid>
          </div>
        </Jumbotron>
        <Footer/>
      </div>
    );
  }
}

export default LoginView;
