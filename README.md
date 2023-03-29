# use-adb

lib for use adb in node js works 2022-2023

# Features

- includes sdk implementation for windows, macOS and linux

## push

### :push: sends a local file to a folder on the targeted device

(file, devices, to)
file = local path of the file to send
devices = object of the device to which it send the file
to = device folder path to send the file to

## pull

### :pull: get targeted device file in local storage

(file, devices, to)
file = targeted path of the file to get
devices = object of the device to which it send the file

## reboot

### :reboot: reboot targeted device in selected mode

(mode, device)
mode = desired mode name
devices = object of the device to which it send the file
