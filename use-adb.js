//  include lib needed
const { rejects } = require("assert");
const exec = require("child_process").exec;

// set the adb file path default for linux
let adbFile = "./platform-tools-linux/adb";

// verifie the platform and set the adb file path for the platform
if (process.platform == "linux") {
  adbFile = "./platform-tools-linux/adb";
} else if (process.platform == "win32") {
  adbFile = "./platform-tools-windows/adb.exe";
} else if (process.platform == "darwin") {
  adbFile = "./platform-tools-macos/adb";
}

// for get devices
module.exports.getDevices = function () {
  return new Promise(function (resolve, reject) {
    exec(adbFile + " devices", function (error, stdout, stderr) {
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
module.exports.reboot = function (mode, devices) {
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        adbFile + " -s " + devices.name + " reboot " + mode,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: truncate,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "Device is rebooting in " + mode + " mode",
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
        adbFile + " -s " + devices.name + " install -r " + file,
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
        adbFile + " -s " + devices.name + " sideload " + file,
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
        adbFile + " -s " + devices.name + " push " + file + " " + to,
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
        adbFile + " -s " + devices.name + " pull " + file,
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
        adbFile + " -s " + devices.name + " shell rm " + file,
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
        adbFile + " -s " + devices.name + " shell touch " + file,
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
        adbFile + " -s " + devices.name + " shell ls /sdcard",
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
