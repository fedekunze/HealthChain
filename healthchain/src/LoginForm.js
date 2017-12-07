import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button, Checkbox} from 'react-bootstrap';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
    this._onTogglePassword = this._onTogglePassword.bind(this);
    this._logIn = this._logIn.bind(this);
  }

  _onTogglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  _logIn(event){
    console.log("_logIn");
    event.preventDefault(); // prevents reload of the page

    if (this._username && this._password) {
      let username = this._username.value.trim();
      let password = this._password.value.trim();

      // verify credentials


      alert('Success');
      // Clear values
      this._username.value = '';
      this._password.value = '';

    } else {
      alert('Please fill all the required fields.');
    }
  }

  render() {

    return (
    <Form onSubmit={this._logIn}>
      <FormGroup
        controlId="username"
      >
        <FormControl
          type="text"
          name="username"
          placeholder="Username"
          inputRef={c => this._username = c}
        />
      </FormGroup>
      <FormGroup
        controlId="password"
      >
        <FormControl
          type={!this.state.showPassword ? "password" : "text"}
          name="password"
          placeholder="Password"
          inputRef={c => this._password = c}
          autoComplete="new-password"
        />
        <Checkbox className="text-white" ref="modalCheckbox" onClick={this._onTogglePassword}>
          Show
        </Checkbox>
        <FormControl.Feedback />
      </FormGroup>
      <Button
        className="btn btn-7"
        bsSize="lg"
        type="submit"
      >
        Log in
      </Button>
    </Form>
  );
  }

}

export default LoginForm;
