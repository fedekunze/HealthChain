pragma solidity ^0.4.15;
import "Patient.sol";

contract Master {

  mapping(string => address) indexToFunc;

  /*function hashFinger(uint finger) public returns(bytes32) {
    return sha256(finger);
  }*/

  /*function toBytes(uint256 x) public returns (bytes b) {
    b = new bytes(32);
    assembly { mstore(add(b, 32), x) }
  }*/

  function pullFunc(string indexFinger) returns(address) {
    return indexToFunc[indexFinger].call(bytes4(sha3("accessData(address)")), msg.sender);
  }

  function addPatient(string indexFinger, bytes32 _func, address pcp, bytes32 _ipfshashHash, bytes32 _jsonHash) {
    newAddress = address(new Patient(_func, _pcp, _ipfshasthHash, _jsonHash));
    indexToFunc[indexFinger] = newAddress;
  }

  function updatePatient(string indexFinger, bytes32 _func, address pcp, bytes32 _ipfshashHash, bytes32 _jsonHash) {
    indexToFunc[indexFinger].call(bytes4(sha3("updateData(bytes32, address, bytes32, bytes32)")), _func, pcp, _ipfshashHash, _jsonHash);
  }


  /*function accessData(uint32 indexFinger, uint32 thumb) public {
    bytes32 memory indexHash = sha256(indexFinger);
    bytes32 memory thumbHash = sha256(thumb);
    return indexToFunc[indexHash].call(bytes4(sha3("returnHash(bytes32)")),thumbHash);
  }*/



}
