# Bluetooth_central
React Native 中使用 BLE 的示例项目,用来扫描并连接可用的外设，然后读取和写入数据。
现版本只在安卓上通过测试，功能正常。ios端需要过一段时间。

## 如何使用

在 Android 设备上运行 `Bluetooth_central`：

```bash
$ cd BluetoothProject
$ react-native run-android
```

### 技术

蓝牙模块通信基于 [react-native-ble-manager](https://github.com/innoveit/react-native-ble-manager) 实现。
app采用react-native+react-native-navigation+hook状态管理技术栈。

支持的功能：
- 扫描设备
- 连接设备
- 读取和写入特征
  等等。
