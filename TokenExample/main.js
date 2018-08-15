if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];
console.log('testing:', web3);

// var TokenContract = web3.eth.contract();
// var Token = TokenContract.at('PASTE CONTRACT ADDRESS HERE');
