//list how big the file is
function updateSize() {
  var nBytes = 0,
      oFiles = document.getElementById("uploadInput").files,
      nFiles = oFiles.length;

  for (var nFileId = 0; nFileId < nFiles; nFileId++) {
    nBytes += oFiles[nFileId].size;
  }

  var sOutput = nBytes + " bytes";
  // optional code for multiples approximation
  for (var aMultiples = [
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB"
  ], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
  }

  // end of optional code
  document.getElementById("fileNum").innerHTML = nFiles;
  document.getElementById("fileSize").innerHTML = sOutput;
}

//read at files
function readFileType(){
  var file = uploadInput.files[0];
  var textType = /text.*/;
  var csvType = 'application/vnd.ms-excel';

  if (file.type.match(textType) || file.type == csvType) {
    var reader = new FileReader();
    
    //read the file contents
    reader.onload = function(e) {
      var look = reader.result;
      window.alert(look);
    }

    reader.readAsText(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }
}
