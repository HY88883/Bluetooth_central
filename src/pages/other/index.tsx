import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    NativeEventEmitter,
    NativeModules
} from "react-native";
import {px2dp} from "../../utils";
import BleManager from "react-native-ble-manager";
import { stringToBytes,bytesToString  } from "convert-string";
import { Buffer } from 'buffer/'
import Toast from 'teaset/components/Toast/Toast';
import usePageHeaderTitle from "../components/usePageHeaderTitle";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
interface OwnProps {}

type Props = OwnProps;

function formatToDecimal(buffer) {
    const hexStr = buffer.toString('hex')
    return hexStr ? parseInt(hexStr, 16) : ''
}

function strToBinary(str) {
    const result = [];
    const list = str.split("");
    for (let i = 0; i < list.length; i++) {
        const str = list[i].charCodeAt().toString(2);
        result.push(str);
    }
    return result.join("");
}

const NotificationAndWrite: FunctionComponent<Props> = (props) => {

    const {route:{params:{device}},navigation}=props
    const {characteristics,services,id}=device
    const [writeValue,setWriteValue]=useState('')
    const [rData,setRData]=useState('')

    usePageHeaderTitle(navigation,'特征操作')

    const handleDidUpdateValueForCharacteristic=({ value, peripheral, characteristic, service }) => {
        // Convert bytes array to string
        const data = bytesToString(value);
        setRData(data)
        console.log(`Recieved ${data} from ${peripheral} ${service} ${characteristic}`);
    }

    useEffect(()=>{
        async function connectAndPrepare(peripheral, service, characteristic) {
            // To enable BleManagerDidUpdateValueForCharacteristic listener
            try{
                await BleManager.startNotification(peripheral, service, characteristic);
                bleManagerEmitter.addListener(
                    "BleManagerDidUpdateValueForCharacteristic",
                    handleDidUpdateValueForCharacteristic
                );
            }catch (e) {
            }
        }

        connectAndPrepare(id,'0003cdd0-0000-1000-8000-00805f9b0131','0003cdd1-0000-1000-8000-00805f9b0131')

        return ()=>{
            BleManager.stopNotification(id, '0003cdd0-0000-1000-8000-00805f9b0131','0003cdd1-0000-1000-8000-00805f9b0131')
                .then(() => {
                    console.log('stopNotification success!');
                })
                .catch((error) => {
                    console.log('stopNotification error:',error);
                });
            bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic',handleDidUpdateValueForCharacteristic)

        }
    },[])

    const read=()=>{
            BleManager.read(id,
                '1800',
                '2a00').then(readData=>{
                console.log('Read: ',readData)
                const data = bytesToString(readData);
                console.log(data)
            }).catch(error=>{
                Toast.fail('读取失败')
                console.log(error)
            })
    }

    const write=()=>{
        const data = stringToBytes(writeValue);
        // if(characteristic.properties.Write){
            BleManager.write(
                id,
                '0003cdd0-0000-1000-8000-00805f9b0131',
                '0003cdd2-0000-1000-8000-00805f9b0131',
                data
            )
                .then(() => {
                    // Success code
                    console.log("Write: " + data);
                })
                .catch((error) => {
                    Toast.fail('发送失败')
                    // Failure code
                    console.log(error);
                });
        /*else if(characteristic.properties.WriteWithoutResponse){
            BleManager.writeWithoutResponse(
                peripheralId,
                characteristic.service,
                characteristic.characteristic,
                data
            )
                .then(() => {
                    // Success code
                    console.log("Write: " + data);
                })
                .catch((error) => {
                    // Failure code
                    Toast.fail('发送失败')
                    console.log(error);
                });
        }else{
            Toast.fail('不可写入')
        }*/

    }

    const buffer = Buffer.from(rData);
    return (
        <SafeAreaView style={styles.fill}>
            <ScrollView style={styles.fill}>
                <View style={{ paddingVertical: 10 ,paddingLeft:px2dp(12)}}>
                    {/*<Text style={styles.label}>服务 UUID:</Text>
                    <Text style={styles.value}>{characteristic.service}</Text>
                    <Text style={styles.label}>特征 UUID:</Text>
                    <Text style={styles.value}>{characteristic.characteristic}</Text>
                    <View style={styles.attributeWrapper}>
                        <Text style={styles.name}>
                            可读:
                            <Text style={styles.des}>{characteristic.properties.Read ? '是' : '否'}</Text>
                        </Text>
                        <Text style={styles.name}>
                            可写(有响应):
                            <Text style={styles.des} >{characteristic.properties.Write ? '是' : '否'}</Text>
                        </Text>
                        <Text style={styles.name}>
                            可写(无响应):
                            <Text style={styles.des}>{characteristic.properties.WriteWithoutResponse ? '是' : '否'}</Text>
                        </Text>
                        <Text style={styles.name}>
                            可通知:
                            <Text style={styles.des}>{characteristic.properties.Notify ? '是' : '否'}</Text>
                        </Text>
                    </View>*/}
                    <Text style={styles.label}>当前特征值</Text>
                    <Text style={styles.charac}>{`二进制: ${strToBinary(buffer.toString())}`}</Text>
                    <Text style={styles.charac}>{`十进制: ${formatToDecimal(buffer)}`}</Text>
                    <Text style={styles.charac}>{`十六进制: ${buffer.toString('hex')}`}</Text>
                    <Text style={styles.charac}>{`UTF8: ${buffer.toString()}`}</Text>
                    <View style={{marginTop:px2dp(8),width:px2dp(150),alignSelf:'center'}}>
                        <Button title={'读取特征值'}  onPress={read}/>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入特征值（十六进制字符串）"
                        value={writeValue}
                        onChangeText={text=>setWriteValue(text)}
                        multiline
                    />
                    <View style={{width:px2dp(150),alignSelf:'center'}}>
                        <Button title={'写入特征值'} onPress={write} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    fill: {
        flex: 1
    },
    label: {
        fontWeight: '500',
        fontSize: 16,
    },
    value: {
        marginTop: 8,
        marginBottom: 10,
        color: '#666'
    },
    attributeWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 16
    },
    des: {
        color: '#666'
    },
    name: {
        fontWeight: '500',
        fontSize: 16,
        marginRight: 16
    },
    input: {
        marginVertical: 32,
        textAlignVertical:'top',
        textAlign: 'left'
    },
    charac: {
        fontSize: 15,
        color: '#666',
        marginVertical: 5
    }
})

export default NotificationAndWrite;
