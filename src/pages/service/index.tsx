import React, { FunctionComponent } from 'react';
import {SafeAreaView, StyleSheet, View,Text} from "react-native";
import usePageHeaderTitle from "../components/usePageHeaderTitle";
import { List } from 'react-native-paper';
import IconFont from "../../assets/iconfont";
import {px2dp} from "../../utils";
import {navigate} from "../../utils/RootNavigation";

interface OwnProps {}

type Props = OwnProps;

const Service: FunctionComponent<Props> = (props) => {
  const {navigation,route:{params:{device}}}=props
    usePageHeaderTitle(navigation,'服务与特征')
    console.log('di',JSON.stringify(device))

    const onPressCharacteristic=(characteristic)=>{
    navigate('Operation',{characteristic,peripheralId:device.id})
    }

  return (
      <SafeAreaView style={styles.fill}>
          <View style={{ paddingVertical: 10,paddingLeft:px2dp(12) }}>
              <Text style={styles.label}>设备 ID:</Text>
              <Text style={styles.value}>{device.id}</Text>
              <Text style={styles.label}>设备名称:</Text>
              <Text style={styles.value}>{device.localName || device.name || '未知设备'}</Text>
          </View>
          <List.Section title="服务和特征列表">
              {
                  device.services&&device.services.length>0&&device.services.map((item,index)=> {
                  return (
                      <List.Accordion
                          key={item.uuid}
                          title={item.uuid}
                          left={props => <List.Icon {...props} icon="folder" />}>
                          {
                             device.characteristics&&device.characteristics.length>0&&device.characteristics.map((c,index)=>{
                                 if(c.service===item.uuid){
                                     return <List.Item
                                         key={c.characteristic}
                                         title={c.characteristic}
                                         left={_ => <IconFont name={'services'}  size={px2dp(20)} style={{top:px2dp(5),marginRight:px2dp(20)}}/>}
                                         onPress={()=>onPressCharacteristic(c)}
                                     />
                                 }
                             })
                          }
                      </List.Accordion>
                  )
                  })
              }
          </List.Section>
      </SafeAreaView >
  );
};

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor:'#f9f9f9'
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
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f9',
        padding: 15
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: '500'
    }
})

export default Service;
