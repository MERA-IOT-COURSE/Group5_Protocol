var exec = require('child_process').exec;
var os = require('os');
const Promise = require('bluebird')


function getUniqueId()
{
    return new Promise((resolve, reject) => {
      var resultSeriaValue = "";
      if (process.platform.indexOf("win") != -1)
      {
      exec("cat /proc/cpuinfo", (error, stdout, stderr) => {
        var cpuInfo = stdout.split(os.EOL);
        var serialValue = "5555"
        //cpuInfo[cpuInfo.length - 2].split(":")[1].trim();
        resultSeriaValue = serialValue;
        //console.log(serialValue);
        resolve(serialValue)
      });
   } else {
      exec("wmic csproduct get uuid", (error, stdout, stderr) => {
        var cpuInfo = stdout.split(os.EOL);
        var serialValue = cpuInfo;
        console.log(cpuInfo);
        resultSeriaValue = serialValue;
        //console.log(serialValue);
        resolve(serialValue)
      });
   }
    })
}
getUniqueId()
module.exports = getUniqueId;
