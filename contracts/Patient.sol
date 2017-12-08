pragma solidity ^0.4.15;

contract Patient {

  address owner;
  uint num_updates;

  struct AccessData {
    address requester;
    uint timestamp;
  }

  struct UpdateData {
    address updater;
    uint numberOfUpdates;
    uint timestamp;
    bytes32 jsonHash;
    bytes32 ipfs2Hash;
  }

  struct User {
    address addr;
    bytes32 transformed; // hash that allows to store and retrieve data
  }

  mapping (bytes32 => address) private patients; // index fingerprint to user
  mapping (address => string) private patientToFunc;
  mapping (address => AccessData[]) public dataAccesses;
  mapping (address => UpdateData[]) public dataUpdates;

  event patientCreated();
  event DataUpdated(address patient);
  event DataAccessed(address requester, address patient);
  event ContractInitialized();

  modifier ownlerOnly() {
    require(msg.sender == owner);
    _;
  }


//constructor
  function Patient(address _pcp, bytes32 _ipfshashHash, bytes32 _jsonHash) public {
    owner = _pcp; // patient owner of the contract ?
    updateData(msg.sender, _ipfshashHash, _jsonHash);
    ContractInitialized();
  }

  function userExists(bytes32 indexPrint) constant public returns (bool) {
    if (patients[indexPrint] == address(0)) return false;
    else return true;
  }

  function createPatient(address _addr, bytes32 _indexFingerprint, string _func) public {
    patients[_indexFingerprint] = _addr;
    patientToFunc[_addr] = _func;
    patientCreated();
  }

  function accessData(address _requester, bytes32 _indexFingerprint) constant public returns (string) {
    uint time = now;
    address patientAddr = patients[_indexFingerprint];
    dataAccesses[patientAddr].push(AccessData({
      requester: _requester,
      timestamp: time
      }));
    DataAccessed(_requester, patientAddr);
    string func = patientToFunc[patientAddr];
    return func;
  }

  function updateData(address _pcp, bytes32 _ipfshashHash, bytes32 _jsonHash) ownlerOnly() {
    uint time = now;
    uint updates = dataUpdates[_pcp][dataUpdates[_pcp].length -1].numberOfUpdates;
    dataUpdates[_pcp].push(UpdateData({
      updater: _pcp,
      numberOfUpdates: updates + 1,
      timestamp: time,
      jsonHash: _jsonHash,
      ipfs2Hash: _ipfshashHash}));
    DataUpdated(_pcp);
  }
}
