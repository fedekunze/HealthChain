import React, { Component } from 'react';
import {Form, FormGroup, Button, FormControl, HelpBlock,
  ControlLabel} from 'react-bootstrap';

class Retrieve extends Component {

  render() {
    const FieldGroup = ({id, label, help, inputRef, ...props}) =>
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} inputRef={inputRef}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>

    return(
      <Form>
        <FieldGroup
          id="thumbRetrieve"
          type="number"
          label="Thumb fingerprint"
          placeholder="Enter thumb id"
          inputRef={c => this._thumbRetrieve = c}
        />
        <hr/>
        <FieldGroup
          id="indexRetrieve"
          type="number"
          label="Index fingerprint"
          placeholder="Enter index id"
          inputRef={c => this._indexRetrieve = c}
        />
        <Button type="submit" bsStyle="success" onClick={this.submitHash}>Submit</Button>
      </Form>

    );
  }
}
export default Retrieve;
