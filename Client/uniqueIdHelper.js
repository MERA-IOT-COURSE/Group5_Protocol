var exec = require('child_process').exec;
var os = require('os');
const Promise = require('bluebird')


function getUniqueId()
{
    return new Promise((resolve, reject) => {
      var resultSeriaValue = "";
      exec("cat /proc/cpuinfo", (error, stdout, stderr) => {
        var cpuInfo = stdout.split(os.EOL);
        var serialValue = cpuInfo[cpuInfo.length - 2].split(":")[1].trim();
        resultSeriaValue = serialValue;
        console.log(serialValue);
        resolve(serialValue)
      });
    })
}
getUniqueId()
module.exports = getUniqueId;