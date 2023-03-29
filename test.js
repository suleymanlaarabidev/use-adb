const adb = require("./use-adb");

adb.getDevices().then((devices) => {
  adb.touchFile("/sdcard/index.txt", devices[0]).then((output) => {
    if (output.error) {
      throw new Error(output.data);
    } else {
      adb.ls(devices[0]).then((res) => {
        if (res.error) {
          throw new Error(res.data);
        } else {
          if (res.data.includes("index.txt")) {
            console.log("Test1 passed: file created");
            adb.rmFile("/sdcard/index.txt", devices[0]).then((output) => {
              if (output.error) {
                throw new Error(output.data);
              } else {
                adb.ls(devices[0]).then((res) => {
                  if (res.error) {
                    throw new Error(res.data);
                  } else {
                    if (!res.data.includes("index.txt")) {
                      console.log("Test2 passed: file deleted");
                    } else {
                      throw new Error("Test failed");
                    }
                  }
                });
              }
            });
          } else {
            throw new Error("Test failed");
          }
        }
      });
    }
  });
});
