//  include lib needed
const { rejects } = require("assert");
const exec = require("child_process").exec;

// get directory name for set the adb file path
const path = require("path");
const { isObject } = require("util");
const dirname = path.resolve();

//set path for adb file

let adbFile = "";

// verifie the platform and set the adb file path for the platform
if (process.platform == "linux") {
  adbFile = dirname + "/sdk-dir/platform-tools-linux/adb";
} else if (process.platform == "win32") {
  adbFile = dirname + "/sdk-dir/platform-tools-windows/adb.exe";
} else if (process.platform == "darwin") {
  adbFile = dirname + "/sdk-dir/platform-tools-mac/adb";
}

// for get devices
module.exports.getDevices = function (customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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
module.exports.reboot = function (mode, devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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
module.exports.installApk = function (file, devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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

// for uninstall apk
module.exports.uninstallApk = function (package, devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        adbFile + " -s " + devices.name + " uninstall " + package,
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "app " + package + " is uninstalled",
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
module.exports.sideload = function (file, devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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
module.exports.push = function (file, devices, to, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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
module.exports.pull = function (file, devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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
module.exports.rmFile = function (file, devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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
module.exports.touchFile = function (file, devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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
module.exports.ls = function (devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
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

// for get packages
module.exports.getPackages = function (devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        adbFile + " -s " + devices.name + " shell pm list packages",
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

// home button
module.exports.home = function (devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        adbFile + " -s " + devices.name + " shell input keyevent 3",
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "home button success",
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

// back button
module.exports.back = function (devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        adbFile + " -s " + devices.name + " shell input keyevent 4",
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "back button success",
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

// turn on/off screen
module.exports.screen = function (devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        adbFile + " -s " + devices.name + " shell input keyevent 26",
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "screen button success",
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

// start browser
module.exports.browser = function (devices, customPath) {
  // check if a custom path for adb process has been filled
  if (customPath) {
    // set custom path for adb
    adbFile = customPath + "adb";
  }
  return new Promise(function (resolve, reject) {
    if (devices.status == "device" || devices.status == "recovery") {
      exec(
        adbFile +
          " -s " +
          devices.name +
          " shell am start -a android.intent.action.VIEW -d https://google.com",
        function (error, stdout, stderr) {
          if (error) {
            reject({
              error: true,
              data: error,
            });
          } else {
            resolve({
              error: false,
              data: "browser button success",
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

module.exports.adbClient = class {
  client = null;
  constructor(device) {
    if (device) {
      this.createClient(device);
    }
  }

  getDevices() {
    return new Promise((resolve, reject) => {
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
  }

  createClient(device) {
    if (isObject(device)) {
      if (device.status == "device" || device.status == "recovery") {
        this.client = device;
      } else {
        throw new Error("Device is not authorized");
      }
    } else {
      throw new Error("Device is not object");
    }
  }
};
