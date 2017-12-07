function makeFunction(thumbPrint, ipfsHash) {
  thumbHash = sha256(thumbPrint);
  transformed = new Array(len(thumbHash)); // array of ASCII chars 
  for (i = 0; i < len(ipfsHash); i += 1) {
    transformed[i] = String.fromCharCode(thumbHash.charCodeAt(i) + ipfsHash.charCodeAt(i));
  }
  return transformed;
}

function accessData(thumbPrint, indexPrint) {
  thumbHash = sha256(thumbPrint);
  ipfsHash = "";
  for (i = 0; i < len(thumbHash); i += 1) {
    ipfsHash += String.fromCharCode(transformed.charCodeAt(i) - thumbHash.charCodeAt(i));
  }
  return ipfsHash;

}
