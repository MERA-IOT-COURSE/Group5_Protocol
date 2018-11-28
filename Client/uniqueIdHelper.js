var exec = require('child_process').exec;
var os = require('os');
const Promise = require('bluebird')


function getUniqueId()
{
      console.log("promise");
      return new Promise((resolve, reject) => {
         resolve("qwertyID");
         return;
      exec("cat /proc/cpuinfo", (error, stdout, stderr) => {
        var cpuInfo = stdout.split(os.EOL);
        var serialValue = cpuInfo[cpuInfo.length - 2].split(":")[1].trim();
        resolve(serialValue);
      });
   });
}

module.exports = getUniqueId;
