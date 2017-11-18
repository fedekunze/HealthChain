import React, { Component } from 'react';
import logo from './logo.svg';
import {Grid, Row, Col, Modal, Alert, Form, FormGroup, Button, FormControl,
  ControlLabel, Checkbox, Jumbotron} from 'react-bootstrap';
import './App.css';

const concat = require('concat-stream')
const Buffer = require('safe-buffer').Buffer
var IPFS = require('ipfs')

var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});

const node = new IPFS({
repo: String(Math.random() + Date.now())
})

node.on('ready', () => {
  console.log('IPFS node is ready')
})

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      alergies: '',
      medications: '',
      hash: '',
      data: undefined
    }
    this.addAlergies = this.addAlergies.bind(this);
    this.addMedications = this.addMedications.bind(this);
    this.submitData = this.submitData.bind(this);
    this.display = this.display.bind(this);
  }

  addAlergies(event) {
    this.setState({alergies: event.target.value});
  }

  addMedications(event) {
    this.setState({medications: event.target.value});
  }

  display(hash) {
    node.files.cat(hash, (err, res) => {
      if (err || !res) {
        return console.error('ipfs cat error', err, res)
      }
      this.setState({hash: hash})
      res.pipe(concat((data) => {

        document.getElementById('content').innerText = data
      }))
    })
  }

  submitData() {
    let alergies_array = (this.state.alergies).split(',');
    let medications_array = (this.state.medications).split(',');
    // store the states in a dictionary
    let json_data = {
      'alergies': alergies_array,
      'medications': medications_array
    }
    // dict to JSON
    var strObj = JSON.stringify(json_data);
    console.log(strObj);
    // store JSON on IPFS

    node.files.add(Buffer.from(strObj), (err, res) => {
      if (err || !res) {
        return console.error('ipfs add error', err, res)
      }

      res.forEach((file) => {
        if (file && file.hash) {
          console.log('successfully stored', file.hash)
          this.display(file.hash)
        }
      })
    })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Upload your medical information to IPFS.
        </p>
        <Grid>
          <Row>
            <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Add alergies separated by comas"
                    onChange={this.addAlergies}
                  />
                  <FormControl
                    type="text"
                    placeholder="Add medications separated by comas"
                    onChange={this.addMedications}
                  />
                  <FormControl.Feedback />
              </FormGroup>
              <Button type="submit" bsStyle="success" onClick={this.submitData}>Submit</Button>
            </Col>
          </Row>
          <Row>
            <p id="hash">{this.state.hash}</p>
            <p id="content"></p>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
