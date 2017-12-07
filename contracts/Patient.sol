pragma solidity ^0.4.15;

contract Patient {
  address owner;
  uint num_updates;
  bytes32 functionInputs;


  struct AccessEmergencyData {
    address requester;
    address owner;
    uint timestamp;
  }

  mapping (address => AccessEmergencyData[]) emergencyAccesses;

  //
  mapping(uint => address) updatesByTime;

  //
  mapping(address => uint) mostRecentUpdate;

  event InfoChanged(address);
  event Emergency(address);

  function Patient(bytes32 _functionInputs, address pcp) public {
    functionInputs = _functionInputs;
    uint time = now;
    updatesByTime[time] = pcp;
    mostRecentUpdate[pcp] = now;
    InfoChanged(pcp);
  }

  function toBytes(uint256 x) public returns (bytes b) {
    b = new bytes(32);
    assembly { mstore(add(b, 32), x) }
  }


  /*function returnHash(bytes32 thumbHash) public returns (bytes) {
    /*bytes memory output;
    for (uint i = 0; i < 64; i += 1) {
      uint a = uint(thumbHash[i]);
      uint b = uint(functionInputs[i]);
      if (a > b) {
        (output[i]) = (toBytes(a  - b));
      } else {
        output[i] = bytes1(toBytes(b - a));
      }
      a = 0;
      b = 0;
    }
    return output;
  } */


  function updateInfo(bytes input, address pcp) public {
    InfoChanged(pcp);
  }
}
