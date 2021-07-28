import React, {FunctionComponent, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    Alert,
    NativeModules,
    NativeEventEmitter, FlatList, TouchableHighlight, Linking, SafeAreaView, TouchableOpacity, ScrollView
} from "react-native";
// import HeaderButtons from "./components/HeaderButtons";
import BleManager from "react-native-ble-manager";
import {Button} from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import {px2dp} from "../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from 'teaset/components/Toast/Toast'
import IconFont from "../assets/iconfont";
import {navigate} from "../utils/RootNavigation";
import Overlay from './components/OverlayLoading'
import { Dialog, Portal, Text as PText,List  } from 'react-native-paper';
import usePageHeaderTitle from "./components/usePageHeaderTitle";
import HeaderButtons, { Item } from 'react-navigation-header-buttons'
import {DispatchContext, GlobalDataContext} from "../context";
import {ADD_DEVICE, MINUS_DEVICE} from "../reducer";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
interface OwnProps {}

type Props = OwnProps;

const Blutooth: FunctionComponent<Props> = (props) => {

    const [isScanning, setIsScanning] = useState(false);
    const peripherals = useRef(new Map()).current;
    const [list, setList] = useState([]);
    const [visible,setVisible]=useState(false)
    const {_dispatch}=useContext(DispatchContext)
    const {list:deviceList}=useContext(GlobalDataContext)
    useEffect(()=>{

        const initfn=async ()=>{
            try {
                const result = await BleManager.start({showAlert: true});
                console.log('result====', JSON.stringify(result))
                if (!result) {
                    BleManager.checkState();
                    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
                    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
                    bleManagerEmitter.addListener('BleManagerConnectPeripheral',handleConnectPeripheral);
                    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
                    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
                    bleManagerEmitter.addListener("BleManagerDidUpdateState",handleDidUpdateState )

                    return (() => {
                        console.log('unmount');
                        bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
                        bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
                        bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
                        bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
                        bleManagerEmitter.removeListener("BleManagerDidUpdateState",handleDidUpdateState )
                    })
                } else {
                    Toast.fail('蓝牙初始化失败，请检查相关设置再重试')
                }
            }catch (e) {
                console.log('e',e)
            }
        }

        initfn()

    },[])

    const handleDiscoverPeripheral = (peripheral) => {
        if (!peripheral.name) {
            peripheral.name = '未知设备';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
    }

    const startScan = () => {
        console.log('startScan')
        if (!isScanning) {
            BleManager.scan([], 5, false).then((results) => {
                console.log('Scanning...',JSON.stringify(results));
                setIsScanning(true);
            }).catch(err => {
                Toast.fail('扫描出错了')
                console.error('err',err);
            });
        }
    }

    const stopScan=()=>{
        BleManager.stopScan().then(() => {
            // Success code
            console.log("Scan stopped");
        }).catch(err=>{
            console.log('err',err)
        })
    }

    const handleStopScan = () => {
        console.log('Scan is stopped=============xx====');
        setIsScanning(false);
    }
    const handleDisconnectedPeripheral = (data) => {
        console.log('data=========',JSON.stringify(data))
        Overlay.removeLoading()
        Toast.fail('已断开与 BLE 蓝牙设备的连接')
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
        _dispatch({
            type:MINUS_DEVICE,
            payload:{id:data.peripheral}
        })
        console.log('Disconnected from ' + data.peripheral);
    }
    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    const onOpenBluetooth = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:root=Bluetooth')
        } else {
            BleManager.enableBluetooth().catch(() =>{})
        }
    }

    const handleDidUpdateState=args=>{
        console.log('handleDidUpdateState',args)
        if(args.state==='off'){
            Alert.alert(
                '蓝牙未开启',
                '需要您开启蓝牙才能使用后续功能',
                [
                    { text: '取消' },
                    { text: '开启蓝牙', onPress: onOpenBluetooth }
                ]
            )
            // Toast.fail('需要您开启蓝牙才能使用后续功能')
        }else if(args.state==='on'){
            Toast.success('蓝牙已开启')
        }
    }

    const handleConnectPeripheral=args=>{
        Toast.success('已连接到 BLE 蓝牙设备')
        console.log('handleConnectPeripheral',args)
    }

    const testPeripheral = (peripheral) => {
        console.log(peripheral)
        if (peripheral){
            if (peripheral.connected){
                BleManager.disconnect(peripheral.id)
            }else{
                stopScan() // 连接时停止扫描
                setTimeout(()=>{
                    Overlay.displayLoading('正在连接设备...')
                    BleManager.connect(peripheral.id).then(() => {
                        let p = peripherals.get(peripheral.id);
                        console.log('p===',p)
                        if (p) {
                            p.connected = true;
                            peripherals.set(peripheral.id, p);
                            setList(Array.from(peripherals.values()));
                        }
                        Overlay.removeLoading()
                        setTimeout(()=>{
                            BleManager.retrieveServices(peripheral.id).then(peripheralData=>{
                                _dispatch({
                                    type: ADD_DEVICE,
                                    payload: peripheralData
                                })
                                Alert.alert('成功连接设备', '需要立即查看该设备详情吗', [
                                    { text: '下次' },
                                    { text: '去看看', onPress: () => navigate('Device') }
                                ])
                            })
                        },500)
                        console.log('Connected to ' + peripheral.id);
                    }).catch((error) => {
                        console.log('Connection error', error);
                    });
                },500)
            }
        }

    }

    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
            <TouchableOpacity onPress={() => testPeripheral(item) } activeOpacity={0.7}>
                <View style={[styles.row, {backgroundColor: color}]}>
                   <View>
                       <Text style={styles.name}>{item.localName||item.name}</Text>
                       <View style={styles.bView}>
                           <Text style={styles.btext}>RSSI: {item.rssi}</Text>
                           <Text style={styles.btext}>{item.id}</Text>
                       </View>
                   </View>
                    <IconFont name={'arrow'} size={px2dp(20)}/>
                </View>
            </TouchableOpacity>
        );
    }

    const hideDialog=()=>{
setVisible(false)
    }

    const cleanAllDevices=async()=>{
        for(let i=0;i<deviceList.length;i++){
            try {
                await BleManager.disconnect(deviceList[i].id)
            }catch (e) {
            }
        }
        _dispatch({
            type:'connectedDevice/cleanAll'
        })
        setList([])
        peripherals.clear()
    }

  return (<SafeAreaView style={{flex:1}}>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{marginHorizontal:px2dp(50)}}>
              <Dialog.ScrollArea >
                  <ScrollView contentContainerStyle={{paddingHorizontal: px2dp(50),height :px2dp(200)}}>
                      <List.Section>
                      {['清空'].map((item,index)=>{
                          return <List.Item
                              key={item}
                              title={item}
                              left={_ => <IconFont name={'clean'}  size={px2dp(20)} style={{top:px2dp(5),marginRight:px2dp(20)}}/>}
                              onPress={cleanAllDevices}
                          />
                      })}
                      </List.Section>
                  </ScrollView>
              </Dialog.ScrollArea>
          </Dialog>
      </Portal>
      <View style={styles.header}>
          <Button
              icon={()=><AntDesign
                  name={'search1'}
                  size={18}
                  color={"#fff"}
              />}
              mode="contained"
              onPress={startScan}
              loading={isScanning}
              style={{backgroundColor:'#1890FF',flex:1,marginHorizontal:px2dp(2)}}
          >
              扫描
          </Button>
          <Button
              icon={()=><Ionicons name={'md-stop-circle-outline'} color={'#fff'} size={18}/>}
              mode="contained"
              onPress={stopScan}
              loading={false}
              style={{backgroundColor:'#F21A1A',flex:1,marginHorizontal:px2dp(2)}}
          >
              停止扫描
          </Button>
          {/*#46A9A8*/}
          <Button
              icon={()=><Ionicons name={'settings-outline'} color={'#fff'} size={18}/>}
              mode="contained"
              onPress={() => {setVisible(true)}}
              loading={false}
              style={{backgroundColor:'#46A9A8',flex:1,marginHorizontal:px2dp(2)}}
          >
              选项
          </Button>
      </View>
      <FlatList
          extraData={list}
          data={list}
          renderItem={({ item }) => renderItem(item) }
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingVertical:px2dp(12)}}
          style={{flex:1}}
      />
  </SafeAreaView>);
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: px2dp(5),
    },
    row:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomColor:'#999',
        borderBottomWidth:StyleSheet.hairlineWidth,
        paddingHorizontal:px2dp(12),
        paddingVertical:px2dp(15)
    },
    bView:{
        flexDirection: 'row',
        alignItems:'center',
        marginTop:px2dp(8)
    },
    name:{fontSize: px2dp(12), textAlign: 'left', color: '#333333',fontWeight:'500'},
    btext:{fontSize: 10, textAlign: 'left', color: '#333333',marginRight:px2dp(12)}
})

export default Blutooth;
