import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// const web3R = new Web3(new Web3.providers.HttpProvider("http://rinkeby.infura.io"));

var patientsABI = [{"constant":false,"inputs":[{"name":"_tokenAddr","type":"address"}],"name":"setTokenAddress","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_votingMechContract","type":"address"}],"name":"setVotingMech","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"type":"constructor"}];

var patientAddress = '0x2b38b858e24390f93bf2aa21be5147f62aa2fada';


const patientContract = web3.eth.contract(patientsABI).at(patientAddress);


var accounts = web3.eth.accounts;



export { patientContract, accounts, web3 };
