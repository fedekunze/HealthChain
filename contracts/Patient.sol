pragma solidity ^0.4.15;

contract Patient {
  address owner;
  uint num_updates;
  public bytes32 func; // the output after something is uploaded
  public ipfshashHash;
  public jsonHash;


  struct AccessData {
    address requester;
    uint timestamp;
  }

  struct UpdateData {
    address updater;
    uint timestamp;
    bytes32 jsonHash;
    bytes32 ipfshashHash;
  }



  mapping (address => AccessData[]) dataAccesses;
  mapping (address => UpdateData[]) dataUpdates;


  event DataUpdated(address);
  event DataAccessed(address);

  modifier ownlerOnly()
    {
        require(msg.sender == owner);
        _;
    }


//constructor
  function Patient(bytes32 _func, address pcp, bytes32 _ipfshashHash, bytes32 _jsonHash) public {
    func = _func;
    ipfshashHash = _ipfshashHash;
    jsonHash = _jsonHash;
    uint time = now;
    dataUpdates[pcp].push(UpdateData(pcp, time));
    DataUpdated(pcp);
  }


  /*function toBytes(uint256 x) public returns (bytes b) {
    b = new bytes(32);
    assembly { mstore(add(b, 32), x) }
  }*/


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

  function accessData(address requester) returns (bytes32) {
    uint time = now;
    DataAccessed(requester);
    dataAccesses[requester].push(AccessData(emt, time))
    return func;
  }

  function updateData(bytes32 _func, address pcp, bytes32 _ipfshashHash, bytes32 _jsonHash) ownlerOnly() public {
    uint time = now;
    DataUpdated(pcp);
    dataUpdates[pcp].push(UpdateData(pcp, time));
    func  =
  }
}
