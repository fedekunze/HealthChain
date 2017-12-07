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


  /*function accessData(uint32 indexFinger, uint32 thumb) public {
    bytes32 memory indexHash = sha256(indexFinger);
    bytes32 memory thumbHash = sha256(thumb);
    return indexToFunc[indexHash].call(bytes4(sha3("returnHash(bytes32)")),thumbHash);
  }*/



}
