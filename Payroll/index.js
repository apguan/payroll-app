// //import and parse the interface ABI from ./build/contracts
var price = require('crypto-price');
var Papa = require('papaparse');
var fs = require("fs");
var interface = fs.readFileSync(__dirname + "/build/contracts/Payroll.json", 'utf8');
var parsed= JSON.parse(interface);
var abi = parsed.abi;

var currentEthConversionRate;
getCurrentEthRate();

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var PayrollContract = web3.eth.contract(abi).at("0x8a226f65f548bf85794c24e04dae341ad1e5c115");

$(document).ready(function() {
  //process the csv file
  $('#process-csv').click(function() {
    processPayments();
  })

})

//read at files
function processPayments() {
  var file = fileInput.files[0];
  var textType = /text.*/;

  if (file.type.match(textType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var look = reader.result;
      var csvArray = Papa.parse(look, {header: true}).data;

      csvArray.map(function(recipient) {
        var userCoffers = web3.eth.accounts[0];
        var amount = (parseFloat(currentEthConversionRate) * parseFloat(recipient.rate)).toString();
        var recipientAddress = recipient.address;
        console.log(userCoffers, amount, recipientAddress);

        web3.eth.sendTransaction({
          to: recipientAddress,
          from: userCoffers,
          value: web3.toWei(amount, "ether")
        })
      })
    }

    reader.readAsText(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }
}


function getCurrentEthRate() {
  price.getBasePrice('USD', 'ETH')
  .then(obj => { // Base for ex - USD, Crypto for ex
      currentEthConversionRate = obj.price;
      console.log('The price of ether is: ', currentEthConversionRate);
  }).catch(err => {
      console.log(err);
  });
}
