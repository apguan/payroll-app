//import and parse the interface ABI from ./build/contracts
var fs = require("fs")
var interface = fs.readFileSync(__dirname + "/build/contracts/EIP20Interface.json");
var parsed= JSON.parse(interface);
var abi = parsed.abi;

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

//inject the ABI
//contract is the location at which it was deployed
//use ` ganache-cli -s 'testing' ` command to set up mirrored local environment
var TokenContract = web3.eth.contract(abi).at("0xcdab9f73c30034dbcabb8e07d1409d46d23d85d7");

console.log(TokenContract);

//jQuery to interact with the contract
$(document).ready(function() {
  //get total supply of tokens created
  $('#get-total-supply').click(function() {
    $('#total-supply').html(TokenContract.totalSupply().c[0] + ' ' + 'tokens minted');
  })

  //allows user to input address
  $('#get-balance').click(function() {
    var address = $('#balance-of-input').val();
    $('#balance-text').html(TokenContract.balanceOf(address).c[0] + ' ' + 'SCT');

    if (TokenContract.balanceOf($('#balance-of-input').val()).c[0]) {
      $('#balance-of-input').val('');
    }
  })

  //transfer from one address to another
  $('#transfer-balance').click(function() {
    var addressTo = $('#transfer-address').val();
    var amount = parseInt($('#transfer-amount').val());

    if (TokenContract.transfer(addressTo, amount)) {
      $('#transfer-address').val('');
      $('#transfer-amount').val('');
    }
  })
})
