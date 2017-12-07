import React, { Component } from 'react';
import {Form, FormGroup, Button, FormControl, HelpBlock, Radio,
  ControlLabel} from 'react-bootstrap';
var shajs = require('sha.js');

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  submitData(event) {
    event.preventDefault(); // prevents reload of the page
    console.log("submitData");

    // validators
    if (!this._allergies || !this._medications || !this._medicalHistory || 
    !this._name || !this._dob || !this._thumbUpload || !this._indexUpload) {
      alert('Please fill all the required fields to submit the data.');
      return;
    } else if (!this.props.verifyFingerprint(this._thumbUpload.value) || 
  !this.props.verifyFingerprint(this._indexUpload.value)) {
      alert('Error: fingerprint does not match');
      return;
    } else {

      // set variables of the scope
      let medicalHistory_array = this._medicalHistory.value.trim().split('\n');
      let allergies_array = this._allergies.value.trim().split('\n');
      let medications_array = this._medications.value.trim().split('\n');
      let drugs_array = ((!this._drugs) ? [] : this._drugs.value.trim().split('\n'));
      let tobacco_array = ((!this._tobacco) ? [] : this._tobacco.value.trim());
      let alcohol_array = ((!this._alcohol) ? [] : this._alcohol.value.trim());
      let thumb = this._thumbUpload.value;
      let index = this._indexUpload.value;
      console.log(this._dob.value);

      // store the states in a dictionary
      let json_data = {
        'name': this._name.value,
        'dob': this._dob.value,
        'medical': medicalHistory_array,
        'allergies': allergies_array,
        'medications': medications_array,
        'drugs': {
          'tobacco': tobacco_array,
          'alcohol': alcohol_array,
          'other': drugs_array
        }
      }
      // dict to JSON
      let strObj = JSON.stringify(json_data);
      let hashJSON = shajs('sha256').update(strObj).digest('hex');
      console.log(strObj);

      // store JSON on IPFS

      let ipfsHash = '';

      node.files.add({
        path: 'data.json',
        content: Buffer.from(strObj)}, (err, res) => {
        if (err || !res) {
          return console.error('ipfs add error', err, res)
        }

        res.forEach((file) => {
          if (file && file.hash) {
            ipfsHash = file.hash;
            console.log('successfully stored: ', file.hash);
            this.display(file.hash);
          }
        })
      });

      // create transformed array
      console.log('Creating transformed array...');
      let transformed = this.props.makeFunction(thumb, ipfsHash);
      let hash2ipfs = shajs('sha256').update(ipfsHash).digest('hex');

      // upload information to blockchain
      console.log('Uploading Emergency data...');
      this.props.uploadEmergencyInfo(transformed, hashJSON, hash2ipfs, ipfsHash, index);
      console.log('DONE');

      // clear values of inputs
      console.log('Clearing inputs...');
      this._name.value = '';
      this._dob.value = '';
      this._medications.value = '';
      this._allergies.value = '';
      this._medicalHistory.value = '';
      this._alcohol.value = '';
      this._drugs.value = '';
      this._tobacco.value = '';
      this._thumbUpload.value = undefined;
      this._indexUpload.value = undefined;
    }
  }


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
          <hr/>
          <FieldGroup
            id="indexUpload"
            type="number"
            label="Index fingerprint"
            placeholder="Enter index id"
            inputRef={c => this._indexUpload = c}
          />
        <Button type="submit" bsStyle="success" onClick={this.submitData}>Submit</Button>
      </Form>

    );
  }
}

export default Upload;
