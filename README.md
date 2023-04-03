# USE-ADB

lib for use adb in node js works 2022-2023

## quick-start

- 1: add sdk-dir directory in your project
  link :
  https://drive.google.com/drive/folders/1MzZMHOjXMa8pNZyIYWcnmLEKPjHrAwMf?usp=share_link

- 2: include lib in your project and enjoy

```
// init use-adb lib
const adb = require("./use-adb");

const adbClient = new adb.adbClient();

adbClient.startServer().then((res) => {
  if (res.error) {
    throw new Error("unable to start server");
  } else {
    adbClient.getDevices().then((devices) => {
      adbClient.createClient(devices[0]);
      if (adbClient.client) {
        console.log("device connected");
      }
    });
  }
});
```

# Features

- includes sdk implementation for windows, macOS and linux

# Docs

## Get Devices

### :getDevices: get all devices connected

no setting

```
 adbClient.getDevices().then((devices)=>{
  console.log(devices);
 });
```

## Push

### :pushFile: sends a local file to a folder on the targeted device

(localPath, devicePath)
localPath = local path of the file to send
devicePath = device folder path to send the file to

```
 adbClient.push("/index.txt", "/sdcard/");
```

## Pull

### :pullFile: get targeted device file in local storage

(localPath, devicePath)
localPath = local path of the file to send
devicePath = device folder path to send the file to

```
 adbClient.pull("/sdcard/index.txt");
```

## Reboot

### :reboot: reboot targeted device in selected mode

(mode)
mode = desired mode name

```
 adbClient.reboot("system");
```
