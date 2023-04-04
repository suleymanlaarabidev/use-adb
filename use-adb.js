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

module.exports.adbClient = class {
  // the client object variable

  constructor(device) {
    this.client = null;
    this.isStarded = false;
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

  // function for stop the server | not tested
  stopServer() {
    return new Promise((resolve, reject) => {
      exec(adbFile + " kill-server", function (error, stdout, stderr) {
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

  // function for take a screenshot
  takeScreenshot(name) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            " shell screencap -p /sdcard/" +
            name,
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

  // get if screen is off
  isScreenOff() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell dumpsys power",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              resolve(stdout.includes("mScreenOn=false"));
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // check is unlocked
  isUnlocked() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell dumpsys window policy",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              // get status mIsShowing
              let status = stdout.split("mIsShowing=")[1];
              status = status.split(" ")[0];
              if (status.trim() == "true") {
                resolve(false);
              } else {
                resolve(true);
              }
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function go to password
  goToPassword() {
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

  // function wait screen is unlocked and return
  waitScreenUnlocked() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        this.isUnlocked().then((unlocked) => {
          if (unlocked) {
            resolve(true);
          } else {
            setTimeout(() => {
              this.waitScreenUnlocked().then((res) => {
                resolve(res);
              });
            }, 1000);
          }
        });
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for turn on-off wifi
  turnWifiOnOff(mode) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell svc wifi " + mode,
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

  // function for up volume
  volumeUp() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell input keyevent 24",
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

  // function for down volume
  volumeDown() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell input keyevent 25",
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

  // function for mute volume | not tested
  volumeMute() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell input keyevent 164",
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

  // function for turn on-off bluetooth REQUIRES ROOT
  turnBluetoothOnOff(mode) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            ' shell su -c "service call bluetooth_manager ' +
            mode +
            '"',
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

  // function for turn on-off airplane mode REQUIRES ROOT
  turnAirplaneModeOnOff(mode /* 1 or 0 */) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            ' shell su -c "settings put global airplane_mode_on ' +
            mode +
            '"',
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

  // function for turn on-off data REQUIRES ROOT
  turnMobileDataOnOff(mode /* enable or disable */) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            ' shell su -c "svc data ' +
            mode +
            '"',
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

  // function for turn on-off gps ROOT REQUIRED
  turnGpsOnOff(mode /* 3 or 0 */) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile +
            " -s " +
            this.client.name +
            ' shell su -c "settings put secure location_mode ' +
            mode +
            '"',
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

  // function for get battery level
  getBatteryLevel() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell dumpsys battery",
          function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {
              let level = stdout.split("level: ")[1];
              level = level.split(" ")[0];
              resolve(level);
            }
          }
        );
      } else {
        reject("Client is not defined");
      }
    });
  }

  // function for get serial number
  getSerialNumber() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        exec(
          adbFile + " -s " + this.client.name + " shell getprop ro.serialno",
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
