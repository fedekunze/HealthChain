pragma solidity ^0.4.15;

contract Patient {

  address public owner;

  struct AccessData {
    address requester;
    uint timestamp;
  }

  struct UpdateData {
    address updater;
    uint numberOfUpdates;
    uint timestamp;
    string jsonHash;
    string ipfs2Hash;
  }

  struct User {
    address addr;
    string transformed; // hash that allows to store and retrieve data
  }

  mapping (string => address) private patients; // index fingerprint to user
  mapping (address => string) private patientToFunc;
  mapping (address => AccessData[]) public dataAccesses;
  mapping (address => UpdateData[]) public dataUpdates;

  event patientCreated();
  event dataUpdated(address patient);
  event dataAccessed(address requester, address patient);
  event contractInitialized();

  modifier ownlerOnly() {
    require(msg.sender == owner);
    _;
  }


//constructor
  function Patient() public {
    owner = msg.sender; // patient owner of the contract ?
    contractInitialized();
  }

  function userExists(string indexPrint) constant public returns (bool) {
    if (patients[indexPrint] == address(0)) return false;
    else return true;
  }

  function createPatient(address _addr, string _indexFingerprint, string _func) public {
    patients[_indexFingerprint] = _addr;
    patientToFunc[_addr] = _func;
    patientCreated();
  }

  function accessData(address _requester, string _indexFingerprint) constant public returns (string) {
    uint time = now;
    address patientAddr = patients[_indexFingerprint];
    dataAccesses[patientAddr].push(AccessData({
      requester: _requester,
      timestamp: time
      }));
    dataAccessed(_requester, patientAddr);
    string storage func = patientToFunc[patientAddr];
    return func;
  }

  function updateData(address _pcp, string _ipfshashHash, string _jsonHash) ownlerOnly() public {
    uint time = now;
    uint updates = dataUpdates[_pcp][dataUpdates[_pcp].length -1].numberOfUpdates;
    dataUpdates[_pcp].push(UpdateData({
      updater: _pcp,
      numberOfUpdates: updates + 1,
      timestamp: time,
      jsonHash: _jsonHash,
      ipfs2Hash: _ipfshashHash}));
    dataUpdated(_pcp);
  }
}
