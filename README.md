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

 adb.getDevices().then((devices)=>{
  console.log(devices);
 });
```

# Features

- includes sdk implementation for windows, macOS and linux

# Docs

## Get Devices

### :getDevices: get all devices connected

no setting

```
 adb.getDevices().then((devices)=>{
  console.log(devices);
 });
```

## Push

### :push: sends a local file to a folder on the targeted device

(file, devices, to)
file = local path of the file to send
devices = object of the device to which it send the file
to = device folder path to send the file to

```
 adb.push("/index.txt", "id_of_device", "/sdcard/");
```

## Pull

### :pull: get targeted device file in local storage

(file, devices)
file = targeted path of the file to get
devices = object of the device to which it send the file

```
 adb.pull("/sdcard/index.txt", "id_of_device");
```

## Reboot

### :reboot: reboot targeted device in selected mode

(mode, device)
mode = desired mode name
devices = object of the device to which it send the file

```
 adb.reboot("system", "id_of_device");
```

## Install Apk

### :installApk: install apk to targeted device

(file, device)
mode = local path of apk
devices = object of the device to which it send the file

```
 adb.reboot("system", "id_of_device");
```
