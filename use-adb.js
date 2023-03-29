const { rejects } = require("assert");

//  include lib needed
const exec = require("child_process").exec;

// function for use shell command
function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

// for get devices
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

// for reboot device
module.exports.reboot = function (where, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " reboot " + where,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: truncate,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "Device is rebooting in " + where + " mode",
            });
          }
        }
      );
    } else {
      resolve("Device is not authorized");
    }
  });
};

// for install apk
module.exports.installApk = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " install -r " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "app " + file + " is installed",
            });
          }
        }
      );
    } else {
      reject({
        error: true,
        data: "Device is not authorized",
      });
    }
  });
};

// for sideload file
module.exports.sideload = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " sideload " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "sideload " + file + " sucess",
            });
          }
        }
      );
    } else {
      rejects({
        error: true,
        data: "Device is not authorized",
      });
    }
  });
};

// for push file
module.exports.push = function (file, devices, to) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " push " + file + " " + to,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "push " + file + " to " + to + " sucess",
            });
          }
        }
      );
    } else {
      reject({
        error: true,
        data: "Device is not authorized",
      });
    }
  });
};

// for pull file
module.exports.pull = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " pull " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "pull " + file + " sucess",
            });
          }
        }
      );
    } else {
      reject({
        error: true,
        data: "Device is not authorized",
      });
    }
  });
};

// for rm file
module.exports.rmFile = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " shell rm " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "rm file : " + file + " success",
            });
          }
        }
      );
    } else {
      reject({
        error: true,
        data: "Device is not authorized",
      });
    }
  });
};

// for touch file
module.exports.touchFile = function (file, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " shell touch " + file,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "touch file : " + file + " success",
            });
          }
        }
      );
    } else {
      reject({
        error: true,
        data: "Device is not authorized",
      });
    }
  });
};

// for mkdir file
module.exports.ls = function (devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        "adb -s " + devices.name + " shell ls /sdcard",
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: stdout,
            });
          }
        }
      );
    } else {
      reject({
        error: true,
        data: "Device is not authorized",
      });
    }
  });
};
