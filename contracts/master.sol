pragma solidity ^0.4.15;
import "./Patient.sol";

contract Master {

  Patient patientContract;

  mapping(string => address) indexToAddress; // maps index with address
  mapping (bytes32 => string) indexToFunc; // maps index's hash to the temp string


  // constructor function
  function Master(string _temporalArray, string _ipfs2Hash, string _jsonHash) public {
    bytes32 ipfs = stringToBytes32(_ipfs2Hash);
    bytes32 json = stringToBytes32(_jsonHash);
    bytes32 temp = stringToBytes32(_temporalArray);

    patientContract = Patient(msg.sender);


  }


  function userExists(string indexPrint) constant public returns (bool) {
    if (indexToAddress[indexPrint] == address(0)) return true;
    else return false;
  }

  function stringToBytes32(string memory source) returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
  }

  function pullFunc(string indexFinger) returns(address) {
    return (indexToAddress[indexFinger]).call(bytes4(sha3("accessData(address)")), msg.sender);
  }

  function addPatient(string indexFinger, string _temporalArray, address _pcp, string _ipfshashHash, string _jsonHash) {
    address newAddress = address(Patient(_temporalArray, _pcp, _ipfshashHash, _jsonHash));
    indexToAddress[indexFinger] = newAddress;
  }

  function updatePatient(string indexFinger, string _func, address _pcp, string _ipfshashHash, string _jsonHash) {
    indexToAddress[indexFinger].call(bytes4(sha3("updateData(string, address, string, string)")), _func, _pcp, _ipfshashHash, _jsonHash);
  }



}
