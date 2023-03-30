const adb = require("./use-adb");

// set to trueor false reboot test
let includeRebootTest = false;

let deviceSelected = 0;

// get parameters from command line
process.argv.forEach((val, index) => {
  if (val == "reboot") {
    includeRebootTest = true;
  }
});

// Test 7: check input event
function inputEvent(devices) {
  adb.browser(devices[deviceSelected]).then((res) => {
    if (res.error) {
      throw new Error("Test 7 failed: unable to start browser");
    } else {
      console.log("Test 7 passed: input event success");
      adb.back(devices[deviceSelected]).then((res) => {
        if (res.error) {
          throw new Error("Test 7 failed: unable to send input event 4 (back)");
        } else {
          // send input event 4 (back)
          setTimeout(() => {
            adb.home(devices[deviceSelected]).then((res) => {
              if (res.error) {
                throw new Error(
                  "Test 7 failed: unable to send input event 3 (home)"
                );
              } else {
                adb.screen(devices[deviceSelected]).then((res) => {
                  if (res.error) {
                    throw new Error("Test 7 failed: unable to turn on screen");
                  } else {
                    console.log("Test 7 passed: screen on success");
                  }
                });
              }
            });
          }, 500);
        }
      });
    }
  });
}

// Test 6: check if the apk is in the package list and remove this
function installAPK(devices) {
  adb
    .installApk("./assets/empty_3.0_Apkpure.apk", devices[deviceSelected])
    .then((output) => {
      if (output.error) {
        throw new Error("Test 6 failed: unable to install apk file");
      } else {
        adb.getPackages(devices[deviceSelected]).then((res) => {
          if (res.error) {
            throw new Error("Test 6 failed: unable to list package");
          } else {
            let listePackage = res.data;
            listPackage = res.data.split("\n");
            let isInstalled = false;
            listPackage.forEach((name) => {
              if (name.slice(8) == "com.my.empty") {
                isInstalled = true;
              }
            });
            if (isInstalled) {
              // remove apk
              adb
                .uninstallApk("com.my.empty", devices[deviceSelected])
                .then((res) => {
                  if (res.error) {
                    throw new Error("Test 6 failed: unable to uninstall apk");
                  } else {
                    console.log(
                      "Test 6 passed: install apk and remove this success"
                    );
                    // start test 7
                    inputEvent(devices);
                  }
                });
            }
          }
        });
      }
    });
}

//  Test 5: install apk and check package listing
function listPackages(devices) {
  // list packages
  adb.getPackages(devices[deviceSelected]).then((res) => {
    if (res.error) {
      throw new Error("Test5 failed: unable to list packages", res.data);
    } else {
      //format packages list array
      let packages = res.data.split("\n");
      let packagesList = [];
      packages.forEach((package) => {
        // check if a package are a name
        if (package.length > 0) {
          packagesList.push(package.slice(8));
        }
      });
      // check if a minimum of  packages are listed
      if (packagesList.length >= 10) {
        console.log("Test5 passed: list packages success");
        installAPK(devices);
      } else {
        throw new Error("Test5 failed: unable to list packages");
      }
    }
  });
}

// Test 3: check reboot command
function reboot(devices) {
  // verifie if reboot test is activated
  if (!includeRebootTest) {
    // if not activated
    console.log("Test3 skiped because is not activated");
    console.log("no test for sideload available test 4 skiped");
    // skip test 3 and ((4) comming soon) start test 5
    listPackages(devices);
  } else {
    // if activated
    adb.reboot("system", devices[0]).then((output) => {
      if (output.error) {
        throw new Error("Test3 failed: unable to reboot", output.data);
      } else {
        console.log("Test3 passed: device rebooted");
        // start test 5
        listPackages(devices);
      }
    });
  }
}

// Test 2: check rm and ls command
function rmFile(devices) {
  // delete file
  adb.rmFile("/sdcard/index.txt", devices[0]).then((output) => {
    if (output.error) {
      throw new Error("Test2 failed: unable to delete file", output.data);
    } else {
      // list files for check if file is deleted
      adb.ls(devices[0]).then((res) => {
        if (res.error) {
          throw new Error("Test2 failed: unable to list files", res.data);
        } else {
          // check if file is deleted
          if (!res.data.includes("index.txt")) {
            console.log("Test2 passed: rm and ls success");
            // start test 3
            reboot(devices);
          } else {
            throw new Error("Test2 failed: file not deleted");
          }
        }
      });
    }
  });
}

// Test 1: check touch and ls command
function touchFile(devices) {
  // create file
  adb.touchFile("/sdcard/index.txt", devices[deviceSelected]).then((output) => {
    if (output.error) {
      throw new Error("Test1 failed: unable to create file", output.data);
    } else {
      // list files for check if file is created
      adb.ls(devices[0]).then((res) => {
        if (res.error) {
          throw new Error("Test1 failed: unable to list files", res.data);
        } else {
          // check if file is created
          if (res.data.includes("index.txt")) {
            console.log("Test1 passed: touch and ls success");
            // start test 2
            rmFile(devices);
          } else {
            throw new Error("Test1 failed: unable to find file");
          }
        }
      });
    }
  });
}

// get devices for start the test
adb.getDevices().then((devices) => {
  console.log("Devices found: ", devices);
  console.log(
    "device selected: ",
    deviceSelected,
    " :",
    devices[deviceSelected]
  );
  // start test 1
  touchFile(devices);
});
