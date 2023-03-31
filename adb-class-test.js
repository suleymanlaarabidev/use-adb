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

// Test 12: go to home
function Test12() {
  adbClient.goToHome().then((res) => {
    if (res.error) {
      throw new Error("Test 14 failed: unable to go to home");
    } else {
      console.log("Test 14 passed: go to home success");
    }
  });
}

// Test 11: go back
function Test11() {
  adbClient.goBack().then((res) => {
    if (res.error) {
      throw new Error("Test 11 failed: unable to go back");
    } else {
      console.log("Test 11 passed: go back success");
      Test12();
    }
  });
}

// Test 10: open Menu
function Test10() {
  adbClient.openMenu().then((res) => {
    if (res.error) {
      throw new Error("Test 10 failed: unable to open menu");
    } else {
      console.log("Test 10 passed: open menu success");
      Test11();
    }
  });
}

// Test 9: open browser
function Test9() {
  adbClient.openBrowser("https://www.google.com").then((res) => {
    if (res.error) {
      throw new Error("Test 9 failed: unable to open browser");
    } else {
      console.log("Test 9 passed: open browser success");
      Test10();
    }
  });
}

// Test 8: get device info
function Test8() {
  adbClient.getDeviceInfo().then((res) => {
    if (res.error) {
      throw new Error("Test 8 failed: unable to get device info");
    } else {
      console.log("Test 8 passed: get device info success");
      Test9();
    }
  });
}

// Test 7: remove file
function Test7() {
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
            Test8();
          } else {
            throw new Error("Test 7 failed: file not removed");
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
            console.log("Test 5 passed: apk is removed");
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
adbClient.getDevices().then((devices) => {
  adbClient.createClient(devices[deviceSelected]);
  if (adbClient.client) {
    console.log("Test 2 passed: get the device");
    Test3();
  }
});
