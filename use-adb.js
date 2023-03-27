const exec = require("child_process").exec;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

module.exports.getDevices = function () {
  return new Promise(function (resolve, reject) {
    exec("adb devices", function (error, stdout, stderr) {
      if (error) {
        reject(error);
      } else {
        let devicesListe = [];
        var devices = stdout.replace("List of devices attached", "");
        devices = devices.split("\n");
        devices.forEach((device) => {
          if (device.length > 0) {
            devicesListe.push({
              name: device.split("\t")[0],
              status: device.split("\t")[1],
            });
          }
        });
        resolve(devicesListe);
      }
    });
  });
};

module.exports.reboot = function (where, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " reboot " + where,
        function (error, stdout, stderr) {
          if (error) {
            reject(error);
          } else {
            resolve("Device is rebooting in " + where + " mode");
          }
        }
      );
    } else {
      resolve("Device is not authorized");
    }
  });
};

module.exports.installApk = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " install -r " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject(error);
          } else {
            resolve("app " + file + " is installed");
          }
        }
      );
    } else {
      resolve("Device is not authorized");
    }
  });
};

module.exports.sideload = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " sideload " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject(error);
          } else {
            resolve("app " + file + " is installed");
          }
        }
      );
    } else {
      resolve("Device is not authorized");
    }
  });
};

module.exports.push = function (file, devices, to) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " push " + file + " " + to,
        function (error, stdout, stderr) {
          if (error) {
            reject(error);
          } else {
            resolve("app " + file + " is installed");
          }
        }
      );
    } else {
      resolve("Device is not authorized");
    }
  });
};

module.exports.pull = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " pull " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject(error);
          } else {
            resolve("app " + file + " is installed");
          }
        }
      );
    } else {
      resolve("Device is not authorized");
    }
  });
};
