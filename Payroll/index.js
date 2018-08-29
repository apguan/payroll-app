// //import and parse the interface ABI from ./build/contracts
var fs = require("fs");
var interface = fs.readFileSync(__dirname + "/build/contracts/Payroll.json", 'utf8');
var parsed= JSON.parse(interface);
var abi = parsed.abi;

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var TokenContract = web3.eth.contract(abi).at("0x8a226f65f548bf85794c24e04dae341ad1e5c115");

$(document).ready(function() {
  //process the csv file
  $('#process-csv').click(function() {
    readFile();
  })

})

//read at files
function readFile(){
  var file = fileInput.files[0];
  var textType = /text.*/;

  if (file.type.match(textType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var look = reader.result;
      csvJSON(look);
    }

    reader.readAsText(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }
}

//var csv is the CSV file with headers
function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
	  var obj = {};
	  var currentline=lines[i].split(",");

	  for (var j = 0; j < headers.length; j++) {
		  obj[headers[j]] = currentline[j];
	  }

    result.push(obj);
  }

  //return result; //JavaScript object
  console.log(JSON.stringify(result));
  return JSON.stringify(result);
}
