const adb = require("./use-adb");
const includeRebootTest = false;

adb.getDevices().then((devices) => {
  adb.touchFile("/sdcard/index.txt", devices[0]).then((output) => {
    if (output.error) {
      throw new Error("Test1 failed: unable to create file", output.data);
    } else {
      adb.ls(devices[0]).then((res) => {
        if (res.error) {
          throw new Error("Test1 failed: unable to list files", res.data);
        } else {
          if (res.data.includes("index.txt")) {
            console.log("Test1 passed: file created");
            adb.rmFile("/sdcard/index.txt", devices[0]).then((output) => {
              if (output.error) {
                throw new Error(
                  "Test2 failed: unable to delete file",
                  output.data
                );
              } else {
                adb.ls(devices[0]).then((res) => {
                  if (res.error) {
                    throw new Error(
                      "Test2 failed: unable to list files",
                      res.data
                    );
                  } else {
                    if (!res.data.includes("index.txt")) {
                      console.log("Test2 passed: file deleted");
                      if (!includeRebootTest) {
                        console.log("Test3 not activated");
                        console.log(
                          "no test for sideload available please reboot"
                        );
                      } else {
                        adb.reboot("system", devices[0]).then((output) => {
                          if (output.error) {
                            throw new Error(
                              "Test3 failed: unable to reboot",
                              output.data
                            );
                          } else {
                            console.log("Test3 passed: device rebooted");
                            console.log(
                              "no test for sideload available please reboot"
                            );
                          }
                        });
                      }
                    } else {
                      throw new Error("Test2 failed: file not deleted");
                    }
                  }
                });
              }
            });
          } else {
            throw new Error("Test1 failed: unable to find file");
          }
        }
      });
    }
  });
});
