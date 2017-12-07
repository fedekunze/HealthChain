import React, { Component } from 'react';
import {Grid, Row, Col, Modal, Alert, Form, FormGroup, Button, FormControl, HelpBlock, Radio,
  ControlLabel, Checkbox, Jumbotron} from 'react-bootstrap';
import Upload from './Upload';
import Retrieve from './Retrieve';
import Navb from './Navb';
import './App.css';

var shajs = require('sha.js');


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
      data: undefined
    }
    this._makeFunction = this._makeFunction.bind(this);
    this._uploadEmergencyInfo = this._uploadEmergencyInfo.bind(this);
    this._retrieveEmergencyInfo = this._retrieveEmergencyInfo.bind(this);
    this._verifyFingerprint = this._verifyFingerprint.bind(this);
  }

  // Array transformed created on upload
  _makeFunction(thumbPrint, ipfsHash) {
    let thumbHash = shajs('sha256').update(thumbPrint.toString()).digest('hex');
    var transformed = new Array(thumbHash.length); // array of ASCII chars
    for (var i = 0; i < ipfsHash.length; i += 1) {
      transformed[i] = String.fromCharCode(thumbHash.charCodeAt(i) + ipfsHash.charCodeAt(i));
    }
    // Store transformed in the mapping: mapping[indexHash] = transformed;
    return transformed;
  }

  // upload data to blockchain
    // hash2Ipfs: hash of the ipfsHash value
    // ipfsHash: link to data
  _uploadEmergencyInfo(transformedArray, dataJson, hash2Ipfs, ipfsHash, indexPrint) {
    // web3
  }



  // get emergency info using both fingerprints
  _retrieveEmergencyInfo(thumbPrint, indexPrint) {
    // get transformed from mapping using index fingerprint
    //let transformed = mapping[indexPrint.toString()]; // web3

    // Using transformed get the IPFS hash to get data
    let thumbHash = shajs('sha256').update(thumbPrint.toString()).digest('hex');
    var ipfsHash = "";
    for (var i = 0; i < thumbHash.length; i += 1) {
      
      //ipfsHash += String.fromCharCode(transformed.charCodeAt(i) - thumbHash.charCodeAt(i));
    }
    return ipfsHash;
  }



  _verifyFingerprint(value) {
    if (value < 100000000 || value > 999999999) return false;
    return true;
  }


  render() {

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
                  <Upload
                    node={node}
                    verifyFingerprint={this._verifyFingerprint}
                    makeFunction={this._makeFunction}
                    uploadEmergencyInfo={this._uploadEmergencyInfo}
                  />
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
                  <Retrieve
                    node={node}
                    verifyFingerprint={this._verifyFingerprint}
                    retrieveEmergencyInfo={this._retrieveEmergencyInfo}
                  />
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
