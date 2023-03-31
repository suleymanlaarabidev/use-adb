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
  // the client object variable

  constructor(device) {
    this.client = null;
    // start the server if not started
    this.startServer();
    // check if a device is filled
    if (device) {
      // create client
      this.createClient(device);
    }
  }

  // function for start the server
  startServer() {
    return new Promise((resolve, reject) => {
      exec(adbFile + " start-server", function (error, stdout, stderr) {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  // function for get all devices connected
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

  // function for installAPK
  installAPK(apkPath) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " install " + apkPath,
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for uninstallAPK
  uninstallAPK(packageName) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " uninstall " + packageName,
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for get all installed apps
  getInstalledApps() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell pm list packages",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              let appsList = [];
              var apps = stdout.split("\n");
              apps.forEach((app) => {
                if (app.length > 0) {
                  appsList.push(app.replace("package:", ""));
                }
              });
              resolve(appsList);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for reboot device in recovery oy system or bootloader
  reboot(mode) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        if (mode == "recovery" || mode == "system" || mode == "bootloader") {
          exec(
            adbFile + " -s " + this.client.name + " reboot " + mode,
            function (error, stdout, stderr) {
              if (error) {
                reject(error);
              } else {
                resolve(stdout);
              }
            }
          );
        } else {
          reject("Mode is not valid");
        }
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for push a file to device
  pushFile(localPath, devicePath) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            " push " +
            localPath +
            " " +
            devicePath,
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  listFile(devicePath) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell ls " + devicePath,
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              let filesList = [];
              var files = stdout.split("\n");
              files.forEach((file) => {
                if (file.length > 0) {
                  filesList.push(file);
                }
              });
              resolve(filesList);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for pull a file from device
  pullFile(devicePath, localPath) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            " pull " +
            devicePath +
            " " +
            localPath,
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for remove a file from device
  removeFile(devicePath) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell rm " + devicePath,
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for get device info
  getDeviceInfo() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell getprop",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              let deviceInfo = {};
              var infos = stdout.split("\n");
              infos.forEach((info) => {
                if (info.length > 0) {
                  deviceInfo[info.split(":")[0]] = info.split(":")[1];
                }
              });
              resolve(deviceInfo);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for get device info
  getDeviceModel() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            " shell getprop ro.product.model",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for go to home screen
  goToHome() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell input keyevent 3",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for go to back screen
  goBack() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell input keyevent 4",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  openMenu() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell input keyevent 82",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function turn of or on the screen
  turnScreenOnOff() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell input keyevent 26",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for open browser
  openBrowser(url) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            " shell am start -a android.intent.action.VIEW -d " +
            url,
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for open app
  openApp(packageName) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            " shell monkey -p " +
            packageName +
            " -c android.intent.category.LAUNCHER 1",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }
};
