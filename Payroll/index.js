// //import and parse the interface ABI from ./build/contracts
var price = require('crypto-price');
var Papa = require('papaparse');

var fs = require("fs");
var interface = fs.readFileSync(__dirname + "/build/contracts/Payroll.json", 'utf8');

var parsed= JSON.parse(interface);
var abi = parsed.abi;

var currentEthConversionRate;
getCurrentEthRate();

var receiptOutput = [];

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
    var completedTransactions = processPayments();
  });

  $('#download-csv').click(function() {
    downloadCSV(Papa.unparse(receiptOutput));
  });

})

//read at files
function processPayments() {
  var file = fileInput.files[0];
  var textType = /text.*/;

  if (file.type.match(textType)) {
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(e) {
      var readData = reader.result;
      var csvArray = Papa.parse(readData, {header: true}).data;

      csvArray.map(function(recipient) {
        var userWallet = web3.eth.accounts[0];
        var recipientAddress = recipient.address;
        var amount = (parseFloat(currentEthConversionRate) * parseFloat(recipient.payment)).toString();

        //only works if you unlock/upload private key to metamask for web3 to access
        if (recipient.address) {
          web3.eth.sendTransaction({
            to: recipientAddress,
            from: userWallet,
            value: web3.toWei(amount, "ether")
          }, function(err, hash) {
            //cb to record transaction data
            if (err) {
              console.log(err);
            } else {
              var txnObj = web3.eth.getTransactionReceipt(hash);
              var receipt = {
                name: recipient.name,
                txnhash: txnObj.transactionHash,
                gasCost: txnObj.gasUsed,
                block: txnObj.blockNumber,
                ethTransfered: amount,
                recipientAddress: recipientAddress
              };

              receiptOutput.push(receipt);
            }
          });
        }
      });
    }
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }

  console.log(receiptOutput);
}

function downloadCSV(csvFile) {
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'transactions.csv';
  hiddenElement.click();
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
