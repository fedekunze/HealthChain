import React, { Component } from 'react';
import {Grid, Row, Col, Modal, Alert, Form, FormGroup, Button, FormControl, HelpBlock, Radio,
  ControlLabel, Checkbox, Jumbotron} from 'react-bootstrap';
import Upload from './Upload';
import Retrieve from './Retrieve';
import Navb from './Navb';
import './App.css';

const concat = require('concat-stream')
const Buffer = require('safe-buffer').Buffer


  var IPFS = require('ipfs')

  const node = new IPFS({
    repo: 'ipfs-repo-'+String(Math.random()),
    config: {
      Addresses: {
        Swarm: [
          "/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star"
        ],
        API: '',
        Gateway: ''
      },
    EXPERIMENTAL: {
         pubsub: true
       }
     }
   })

  node.on('ready', () => {
    console.log('IPFS node is ready');
  })

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      selectedOption: '',
      data: undefined
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.submitHash = this.submitHash.bind(this);
    this.display = this.display.bind(this);
  }

  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  verifyFingerprint(value) {
    if (value < 100000000 || value > 999999999) return false;
    return true;
  }


  requestEmergencyData(fingerprint) {

    if (!this.verifyFingerprint(fingerprint)) {
      alert('Error: fingerprint does not match');
      return;
    } else {
      // get the hash from the fingerprint
      // hash = contract.getLink(fingerprint);
      // this.display(hash);
    }

  }

//QmVYVDmda2cTYsFaQsu2Hfy4LkJWr7sywR3ymbxevVu41s
  display(hash) {
    console.log("displaying");
    node.files.cat(hash, (err, res) => {
      console.log("displaying...");
      if (err || !res) {
        return console.error('ipfs cat error', err, res);
      }
      else{
        console.log("no error");
      }
      this.setState({hash: hash});
      res.pipe(concat((data) => {
        if (!data) {
          console.log("no Data");
          return;
        } else {
          console.log("Data");
          console.log(JSON.parse(data));
        }
        let data_json = JSON.parse(data);
        document.getElementById('diseases').innerText = 'diseases: '  + data_json['medical'];
        document.getElementById('allergies').innerText = 'allergies: ' + data_json['allergies'];
        document.getElementById('medications').innerText = 'medications: ' + data_json['medications'];
      }))
    })
  }

  submitHash(event) {
    event.preventDefault(); // prevents reload of the page
    console.log("Submit Hash");
    if (!this._hash) {
      alert('Please fill the hash field.');
      return;
    } else {
      console.log("Display");
      this.display(this._hash.value);
      this._hash.value = '';
      console.log("Done Display");
    }

  }

  /* To submit data you need both signatures from user and health provider */

  submitData(event) {
    event.preventDefault(); // prevents reload of the page
    console.log("submitData");

    if (!this._allergies || !this._medications || !this._medicalHistory || 
    !this._name || !this._dob) {
      alert('Please fill all the required fields to submit the data.');
      return;
    } else {

      let medicalHistory_array = this._medicalHistory.value.trim().split('\n');
      let allergies_array = this._allergies.value.trim().split('\n');
      let medications_array = this._medications.value.trim().split('\n');
      let drugs_array = ((!this._drugs) ? [] : this._drugs.value.trim().split('\n'));
      let tobacco_array = ((!this._tobacco) ? [] : this._tobacco.value.trim());
      let alcohol_array = ((!this._alcohol) ? [] : this._alcohol.value.trim());
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
      var strObj = JSON.stringify(json_data);
      console.log(strObj);
      // store JSON on IPFS

      node.files.add({
        path: 'data.json',
        content: Buffer.from(strObj)}, (err, res) => {
        if (err || !res) {
          return console.error('ipfs add error', err, res)
        }

        res.forEach((file) => {
          if (file && file.hash) {
            console.log('successfully stored: ', file.hash)
            this.display(file.hash)
          }
        })
      });
      this._name.value = '';
      this._dob.value = '';
      this._medications.value = '';
      this._allergies.value = '';
      this._medicalHistory.value = '';
      this._alcohol.value = '';
      this._drugs.value = '';
      this._tobacco.value = '';
    }
  }



  render() {
    const FieldGroup = ({id, label, help, inputRef, ...props}) =>
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} inputRef={inputRef}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>;

    const h1style = {
      color: "Crimson"
    };

    return (
      <div>
        <Navb/>
        <div className="main-container">
          <section className="hero-slider">
            <Jumbotron className="banner">
              <h1 style={h1style}>HealthChain</h1>
            </Jumbotron>
          </section><a className="in-page-link" id="upload"></a>
          <section className="subscribe-2 background-gray preserve-3d">
            <Grid>
              <Row>
                <Col sm={12} className="col-sm-12 text-center">
                  <i className="icon pe-7s-pen"></i> <i className="icon pe-7s-mail-open-file"></i> <i className="icon pe-7s-paper-plane"></i>
                  <h1 className="large-h1">Upload Emergency Data</h1>
                </Col>
              </Row>
              <Row>
                <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                  <Upload />
                </Col>
              </Row>
              <Row>
                <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                  <p id="hash">{this.state.hash}</p>
                  <p id="diseases"></p>
                  <p id="medications"></p>
                  <p id="allergies"></p>
                </Col>
              </Row>
            </Grid>
          </section><a className="in-page-link" id="retrieve"></a>
          <section>
            <Grid>
              <Row>
                <Col sm={12} className="col-sm-12 text-center">
                  <i className="icon pe-7s-pen"></i> <i className="icon pe-7s-mail-open-file"></i> <i className="icon pe-7s-paper-plane"></i>
                  <h1 className="large-h1">Retrieve Emergency Data</h1>
                </Col>
              </Row>
              <Row>
                <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                  <Retrieve/>
                </Col>
              </Row>
            </Grid>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
