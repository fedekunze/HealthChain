import React, { Component } from 'react';
import {Form, FormGroup, Button, FormControl, HelpBlock,
  ControlLabel} from 'react-bootstrap';

class Retrieve extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hash: ''
      data: undefined
    }
    this.submitRequest = this.submitRequest.bind(this);
    this.display = this.display.bind(this);
  }

  //QmVYVDmda2cTYsFaQsu2Hfy4LkJWr7sywR3ymbxevVu41s
    display(hash) {
      node.files.cat(hash, (err, res) => {
        if (err || !res) {
          return console.error('ipfs cat error', err, res);
        }
        this.setState({hash: hash});
        res.pipe(concat((data) => {
          if (!data) {
            console.log("Error: no data available from IPFS");
            return;
          }
          let data_json = JSON.parse(data);
          document.getElementById('diseases').innerText = 'diseases: '  + data_json['medical'];
          document.getElementById('allergies').innerText = 'allergies: ' + data_json['allergies'];
          document.getElementById('medications').innerText = 'medications: ' + data_json['medications'];
        }))
      })
    }

  submitRequest(event) {
    event.preventDefault(); // prevents reload of the page
    console.log("Submit Request");
    if (!this._thumbRetrieve || !this._indexRetrieve) {
      alert('Please fill the fingerprint fields.');
      return;
    } else if (!this.props.verifyFingerprint(this._thumbRetrieve.value) || 
  !this.props.verifyFingerprint(this._indexRetrieve.value)) {
      alert('Error: fingerprint does not match');
      return;
    } else {
      // set variables of the scope
      let thumb = this._thumbRetrieve.value;
      let index = this._indexRetrieve.value;

      // Get hash link from IPFS
      console.log("Getting IPFS hash...");
      let ipfs_hash = this.props.retrieveEmergencyInfo(thumb, index);

      // Display emergency data
      console.log("Displaying information...");
      this.display(ipfs_hash);

      // Clear inputs
      console.log("Clearing inputs...");
      this._thumbRetrieve.value = undefined;
      this._indexRetrieve.value = undefined;
      console.log("Done");
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
        <Button type="submit" bsStyle="success" onClick={this.submitRequest}>Submit</Button>
      </Form>

    );
  }
}
export default Retrieve;
