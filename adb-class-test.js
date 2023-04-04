const adb = require("./use-adb");

// set to true or false reboot test
let includeRebootTest = false;

let deviceSelected = 0;

// get parameters from command line
process.argv.forEach((val, index) => {
  if (val == "reboot") {
    includeRebootTest = true;
  }
});

// Test 32: get serial number
function Test32() {
  adbClient.getSerialNumber().then((res) => {
    if (res.error) {
      throw new Error("Test 32 failed: unable to get serial number");
    } else {
      console.log(
        "Test 32 passed: get serial number success" + "Serial number: " + res
      );
    }
  });
}

// Test 31: get battery level
function Test31() {
  adbClient.getBatteryLevel().then((res) => {
    if (res.error) {
      throw new Error("Test 31 failed: unable to get battery level");
    } else {
      console.log(
        "Test 31 passed: get battery level success" + "Battery level: " + res
      );
      Test32();
    }
  });
}

// Test 30: turn gps off REQUIRE ROOT
function Test30() {
  adbClient.turnGpsOnOff("0").then((res) => {
    if (res.error) {
      throw new Error("Test 30 failed: unable to turn gps off");
    } else {
      console.log("Test 30 passed: turn gps off success");
      Test31();
    }
  });
}

// Test 29: turn mobile data on REQUIRE ROOT
function Test29() {
  adbClient.turnMobileDataOnOff("disable").then((res) => {
    if (res.error) {
      throw new Error("Test 29 failed: unable to turn mobile data on");
    } else {
      console.log("Test 29 passed: turn mobile data on success");
      Test30();
    }
  });
}

// Test 28: turn airplane mode on REQUIRE ROOT
function Test28() {
  adbClient.turnAirplaneModeOnOff("1").then((res) => {
    if (res.error) {
      throw new Error("Test 28 failed: unable to turn airplane mode on");
    } else {
      console.log("Test 28 passed: turn airplane mode on success");
      Test29();
    }
  });
}

// Test 27: turn bluetooth on/off REQUIRE ROOT
function Test27() {
  adbClient.turnBluetoothOnOff("8").then((res) => {
    if (res.error) {
      throw new Error("Test 27 failed: unable to turn bluetooth off");
    } else {
      console.log("Test 27 passed: turn bluetooth off success");
      Test28();
    }
  });
}

// Test 26: volume mute
function Test26() {
  adbClient.volumeMute().then((res) => {
    if (res.error) {
      throw new Error("Test 26 failed: unable to volume mute");
    } else {
      console.log("Test 26 passed: volume mute success");
      Test27();
    }
  });
}

// Test 25: volume down
function Test25() {
  adbClient.volumeDown().then((res) => {
    if (res.error) {
      throw new Error("Test 25 failed: unable to volume down");
    } else {
      console.log("Test 25 passed: volume down success");
      Test26();
    }
  });
}

// Test 24: volume up
function Test24() {
  adbClient.volumeUp().then((res) => {
    if (res.error) {
      throw new Error("Test 24 failed: unable to volume up");
    } else {
      console.log("Test 24 passed: volume up success");
      Test25();
    }
  });
}

// Test 23: turn on/off wifi
function Test23() {
  adbClient.turnWifiOnOff("disable").then((res) => {
    if (res.error) {
      throw new Error("Test 23 failed: unable to turn on/off wifi");
    } else {
      console.log("Test 23 passed: turn on/off wifi success");
      Test24();
    }
  });
}

// Test 22: wait device is unlocked
function Test22() {
  adbClient.waitScreenUnlocked().then((res) => {
    if (res.error) {
      throw new Error("Test 22 failed: unable to wait device is unlocked");
    } else {
      console.log("Test 22 passed: wait device is unlocked success");
      Test23();
    }
  });
}

// Test 21: go to password
function Test21() {
  adbClient.goToPassword().then((res) => {
    if (res.error) {
      throw new Error("Test 21 failed: unable to go to password");
    } else {
      console.log("Test 21 passed: go to password success");
      Test22();
    }
  });
}

// Test 20: check isUnlocked
function Test20() {
  adbClient.isUnlocked().then((res) => {
    if (res.error) {
      throw new Error("Test 20 failed: unable to check isUnlocked");
    } else {
      if (!res) {
        console.log("Test 20 passed: isUnlocked is false");
        Test21();
      } else {
        throw new Error("Test 20 failed: isUnlocked is true");
      }
    }
  });
}

// Test 19: turn on screen
function Test19() {
  adbClient.turnScreenOnOff().then((res) => {
    if (res.error) {
      throw new Error("Test 19 failed: unable to turn on screen");
    } else {
      console.log("Test 19 passed: turn on screen success");
      Test20();
    }
  });
}

// Test 18: turn off screen
function Test18() {
  adbClient.turnScreenOnOff().then((res) => {
    if (res.error) {
      throw new Error("Test 18 failed: unable to turn off screen");
    } else {
      console.log("Test 18 passed: turn off screen success");
      Test19();
    }
  });
}

// Test 17: if screen is off
function Test17() {
  adbClient.isScreenOff().then((res) => {
    if (res.error) {
      throw new Error("Test 17 failed: unable to check screen status");
    } else {
      console.log("Test 17 passed: screen status is" + res);
      Test18();
    }
  });
}

// Test 16: take a screenshot
function Test16() {
  adbClient.takeScreenshot("testscreen.png").then((res) => {
    if (res.error) {
      throw new Error("Test 16 failed: unable to take screenshot");
    } else {
      adbClient.listFile("/sdcard/").then((res) => {
        if (res.error) {
          throw new Error("Test 16 failed: unable to list files");
        } else {
          if (res.includes("testscreen.png")) {
            console.log("Test 16 passed: take screenshot success");
            // remove screenshot
            adbClient.removeFile("/sdcard/testscreen.png").then((res) => {
              if (res.error) {
                throw new Error("Test 16 failed: unable to remove screenshot");
              }
              Test17();
            });
          } else {
            throw new Error("Test 16 failed: unable to find screenshot");
          }
        }
      });
    }
  });
}

// Test 15: open app tiktok
function Test15() {
  adbClient.openApp("com.zhiliaoapp.musically").then((res) => {
    if (res.error) {
      throw new Error("Test 15 failed: unable to open app tiktok");
    } else {
      console.log("Test 15 passed: open app tiktok success");
      Test16();
    }
  });
}

// Test 13: go to home
function Test13() {
  adbClient.goToHome().then((res) => {
    if (res.error) {
      throw new Error("Test 14 failed: unable to go to home");
    } else {
      console.log("Test 14 passed: go to home success");
      Test15();
    }
  });
}

// Test 12: go back
function Test12() {
  adbClient.goBack().then((res) => {
    if (res.error) {
      throw new Error("Test 11 failed: unable to go back");
    } else {
      console.log("Test 11 passed: go back success");
      Test13();
    }
  });
}

// Test 11: open Menu
function Test11() {
  adbClient.openMenu().then((res) => {
    if (res.error) {
      throw new Error("Test 10 failed: unable to open menu");
    } else {
      console.log("Test 10 passed: open menu success");
      Test12();
    }
  });
}

// Test 10: open browser
function Test10() {
  adbClient.openBrowser("https://www.google.com").then((res) => {
    if (res.error) {
      throw new Error("Test 9 failed: unable to open browser");
    } else {
      console.log("Test 9 passed: open browser success");

      Test11();
    }
  });
}

// Test 9: get device info
function Test9() {
  adbClient.getDeviceInfo().then((res) => {
    if (res.error) {
      throw new Error("Test 8 failed: unable to get device info");
    } else {
      console.log("Test 8 passed: get device info success");
      Test10();
    }
  });
}

// Test 8: remove file
function Test8() {
  adbClient.removeFile("/sdcard/test.txt").then((res) => {
    if (res.error) {
      throw new Error("Test 7 failed: unable to remove file");
    } else {
      adbClient.listFile("/sdcard/").then((res) => {
        if (res.error) {
          throw new Error("Test 7 failed: unable to list files");
        } else {
          if (!res.includes("test.txt")) {
            console.log("Test 7 passed: remove file success");
            Test9();
          } else {
            throw new Error("Test 7 failed: file not removed");
          }
        }
      });
    }
  });
}

// Test 7: pull file
function Test7() {
  adbClient.pullFile("/sdcard/test.txt", "./assets/").then((res) => {
    if (res.error) {
      throw new Error("Test 7 failed: unable to pull file");
    } else {
      adbClient.listFile("/sdcard/").then((res) => {
        if (res.error) {
          throw new Error("Test 7 failed: unable to list files");
        } else {
          if (res.includes("test.txt")) {
            console.log("Test 7 passed: pull file success");
            Test8();
          } else {
            throw new Error("Test 7 failed: unable to find file");
          }
        }
      });
    }
  });
}

// Test 6: push file
function Test6() {
  adbClient.pushFile("./assets/test.txt", "/sdcard/").then((res) => {
    if (res.error) {
      throw new Error("Test 6 failed: unable to push file");
    } else {
      adbClient.listFile("/sdcard/").then((res) => {
        if (res.error) {
          throw new Error("Test 6 failed: unable to list files");
        } else {
          if (res.includes("test.txt")) {
            console.log("Test 6 passed: push file success");
            Test7();
          } else {
            throw new Error("Test 6 failed: unable to find file");
          }
        }
      });
    }
  });
}

// Test 5 : remove apk
function Test5() {
  adbClient.uninstallAPK("com.my.empty").then((res) => {
    if (res.error) {
      throw new Error("Test 5 failed: unable to remove apk");
    } else {
      adbClient.getInstalledApps().then((res) => {
        if (res.error) {
          throw new Error("Test 5 failed: unable to get installed apps");
        } else {
          let isInstalled = false;
          res.forEach((app) => {
            if (app == "com.my.empty") {
              isInstalled = true;
            }
          });
          if (!isInstalled) {
            console.log("Test 5 passed: apk removed");
            Test6();
          } else {
            throw new Error("Test 5 failed: apk is still installed");
          }
        }
      });
    }
  });
}

// Test 4: check if apk is installed
function Test4() {
  adbClient.getInstalledApps().then((res) => {
    if (res.error) {
      throw new Error("Test 4 failed: unable to get installed apps");
    } else {
      let isInstalled = false;
      res.forEach((app) => {
        if (app == "com.my.empty") {
          isInstalled = true;
        }
      });
      if (isInstalled) {
        console.log("Test 4 passed: apk is installed");
        Test5();
      } else {
        throw new Error("Test 4 failed: apk is not installed");
      }
    }
  });
}

// Test 3: install apk
function Test3() {
  adbClient.installAPK("./assets/empty.apk").then((res) => {
    if (res.error) {
      throw new Error("Test 3 failed: unable to install apk");
    } else {
      console.log("Test 3 passed: apk installed");
      Test4();
    }
  });
}

const adbClient = new adb.adbClient();
if (adbClient) {
  console.log("Test 1 passed: get the class");
} else {
  throw new Error("Test 1 failed: unable to get the class");
}

// Test 2: get device
adbClient.startServer().then((res) => {
  if (res.error) {
    throw new Error("Test 2 failed: unable to start server");
  } else {
    adbClient.getDevices().then((devices) => {
      adbClient.createClient(devices[deviceSelected]);
      if (adbClient.client) {
        console.log("Test 2 passed: get the device");
        Test3();
      }
    });
  }
});
