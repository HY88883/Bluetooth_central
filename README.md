# Bluetooth_central
React Native 中使用 BLE 的示例项目,用来扫描并连接可用的外设，然后读取和写入数据。
现版本只在安卓上通过测试，功能正常。ios端需要过一段时间。

## 如何使用

在 Android 设备上运行 `Bluetooth_central`：

```bash
$ cd BluetoothProject
$ yarn install or npm install
$ react-native run-android
```

### 技术

蓝牙模块通信基于 [react-native-ble-manager](https://github.com/innoveit/react-native-ble-manager) 实现。
app采用react-native+react-native-navigation+typescript+hook状态管理技术栈。

app部分截图：
![5f7e098185066082a4b02ed00a9f81a](https://user-images.githubusercontent.com/43999270/127261404-b54d2786-0825-473a-9c1c-b898ea9d031b.jpg)
![8374f15cc7ee4266a43353ab065149e](https://user-images.githubusercontent.com/43999270/127261420-7c910433-a083-403a-b665-ebf9a49454f0.jpg)
![7451279674ce2f0c1b698e9ae7882c5](https://user-images.githubusercontent.com/43999270/127261424-dccabd25-977a-4d89-9668-57bf55823e7e.jpg)
![b3d2139e69efb83f9bef2a851acf925](https://user-images.githubusercontent.com/43999270/127261429-cbadccc5-d926-4a44-9973-d55d8b66eccf.jpg)

支持的功能：
- 扫描设备
- 连接设备
- 读取和写入特征
- 等等。

有疑问或bug欢迎在issue中提出，我将尽快处理。
