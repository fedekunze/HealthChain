import React, { Component } from 'react';
import {Form, FormGroup, Button, FormControl, HelpBlock, Radio,
  ControlLabel} from 'react-bootstrap';

class Upload extends Component {


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
          id="name"
          type="text"
          label="Full name"
          placeholder="Enter full name"
          inputRef={c => this._name = c}
        />
        <FieldGroup
          id="dob"
          type="date"
          label="Date of birth"
          min="1900-01-01"
          placeholder="Date of birth"
          inputRef={c => this._dob = c}
        />
        <FieldGroup
          id="hospital"
          type="text"
          label="Preferred hospital"
          placeholder="Enter hospital name"
          inputRef={c => this._hospital = c}
        />

        <FormGroup>
          <ControlLabel>Resuscitate  </ControlLabel>
          <Radio name="resuscitateGroup">
            Yes
          </Radio>
          {' '}
          <Radio name="resuscitateGroup" inline>
            No
          </Radio>
        </FormGroup>
        <FormGroup
          controlId="surgicalInput"
        >
          <ControlLabel>Surgical history</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Add surgical history separated by newline"
            inputRef={c => this._surgicalHistory = c}
          />
        </FormGroup>
        <FormGroup
          controlId="medicalInput"
        >
          <ControlLabel>Medical history</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Add medical history separated by newline"
            inputRef={c => this._medicalHistory = c}
          />
        </FormGroup>
          <FormGroup
            controlId="allergiesInput"
          >
            <ControlLabel>Allergies</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Add allergies separated by newline"
              inputRef={c => this._allergies = c}
            />
          </FormGroup>
          <FormGroup
            controlId="medicationsInput"
          >
            <ControlLabel>Medications</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Add medications separated by newline"
              inputRef={c => this._medications = c}
            />
          </FormGroup>
          <FieldGroup
            id="tobacco"
            type="text"
            label="Tobacco"
            placeholder="Enter description"
            inputRef={c => this._tobacco = c}
          />
          <FieldGroup
            id="alcohol"
            type="text"
            label="Alcohol"
            placeholder="Enter description"
            inputRef={c => this._alcohol = c}
          />
          <FieldGroup
            id="drugs"
            type="text"
            label="Other drugs"
            placeholder="Enter description"
            inputRef={c => this._drugs = c}
          />
          <hr/>
          <FieldGroup
            id="thumbUpload"
            type="number"
            label="Thumb fingerprint"
            placeholder="Enter thumb id"
            inputRef={c => this._thumbUpload = c}
          />
        <Button type="submit" bsStyle="success" onClick={this.submitData}>Submit</Button>
      </Form>

    );
  }
}

export default Upload;
