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

## Liste File

### :listFile: return all file in folder of the device

(devicePath)
devicePath = device folder path to list all file

```
 adbClient.listFile("/sdcard/");
```

## Install Apk

### :installAPK: install apk to targeted device

(apkPath)
apkPath = local path of apk

```
 adbClient.installAPK("./apk/xxxx.apk");
```

## Uninstall Apk

### :uninstallAPK: uninstall apk to targeted device

(packageName)
packageName = name of package you want to uninstall

```
 adbClient.uninstallAPK("com.xxx.xxx");
```

## Get Installed Apps Apk

### :getInstalledApps: return all installed app on the device

```
 adbClient.getInstalledApps();
```

## Remove File

### :removeFile: remove a file on the device

(devicePath)
devicePath = device file path to want delete

```
 adbClient.removeFile();
```

## Get Device Info

### :getDeviceInfo: return all info of the device

```
 adbClient.getDeviceInfo();
```

## Get Device Model

### :getDeviceModel: return device model

```
 adbClient.getDeviceModel();
```

## Go to home

### :goToHome: go to home screen

```
 adbClient.goToHome();
```

## Go to back

### :goBack: go to back screen

```
 adbClient.goBack();
```

## Open Menu

### :openMenu: open menu

```
 adbClient.openMenu();
```

## Turn Screen On/Off

### :turnScreenOnOff: turn screen on or off

```
 adbClient.turnScreenOnOff();
```

## Open Browser

### :openBrowser: open browser

(url)
url = url to open

```
 adbClient.openBrowser("https://www.google.com");
```

## Open App

### :openApp: open app

(packageName)

```
 adbClient.openApp("com.xxx.xxx");
```

## Take Screenshot

### :takeScreenshot: take screenshot

(name)
name = name of the screenshot

```
 adbClient.takeScreenshot();
```

## Is Screen Off ?

### :isScreenOff: return false if screen is off

```
 adbClient.isScreenOff();
```

## Is Unlock ?

### :isUnlocked: return true if screen is unlock

```
 adbClient.isUnlocked();
```

## Go To Password in lockscreen

### :goToPassword: go to password in lockscreen

```
 adbClient.goToPassword();
```

## Wait Screen Unlocked

### :waitScreenUnlocked: resolve promis if screen is unlocked

```
 adbClient.waitScreenUnlocked();
```

## Turn Wifi On/Off

### :turnWifiOnOff: turn wifi on or off

(mode)
mode = "enable" or "disable"

```
 adbClient.turnWifiOnOff("enable");
```

## Volume Up

### :volumeUp: volume up

```
 adbClient.volumeUp();
```

## Volume Down

### :volumeDown: volume down

```
 adbClient.volumeDown();
```

## Volume Mute

### :volumeMute: volume mute

```
 adbClient.volumeMute();
```

## turn Bluetooth On/Off ROOT REQUIRED

### :turnBluetoothOnOff: turn bluetooth on or off

(mode)
mode = "8":disable or "6":enable

```
 adbClient.turnBluetoothOnOff("8");
```

## turn airplane mode On/Off ROOT REQUIRED

### :turnAirplaneModeOnOff: turn airplane mode on or off

(mode)
mode = "0":disable or "1":enable

```
 adbClient.turnAirplaneModeOnOff("0");
```

## turn mobile data On/Off ROOT REQUIRED

### :turnMobileDataOnOff: turn mobile data on or off

(mode)
mode = disable or enable

```
 adbClient.turnMobileDataOnOff("disable");
```

## turn GPS On/Off ROOT REQUIRED

### :turnGPSOnOff: turn GPS on or off

(mode)
mode = "3":enable or "0":disable

```
 adbClient.turnGPSOnOff("disable");
```

## get battery level

### :getBatteryLevel: return battery level

```
 adbClient.getBatteryLevel();
```

## get serial number

### :getSerialNumber: return serial number

```
 adbClient.getSerialNumber();
```
