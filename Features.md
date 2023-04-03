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

## Install Apk

### :installAPK: install apk to targeted device

(apkPath)
apkPath = local path of apk

```
 adbClient.installAPK("./apk/xxxx.apk");
```

## Uninstall Apk

### :uninstallAPK: install apk to targeted device

(packageName)
packageName = name of package you want to uninstall

```
 adbClient.uninstallAPK("com.xxx.xxx");
```
