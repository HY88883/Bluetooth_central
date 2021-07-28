import React from 'react'
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native'
import IconFont from "../../../assets/iconfont";
import {px2dp} from "../../../utils";

export default (props)=> {
  const renderItem = ({ item }) => {
    const { onPress } = props
    return (
      <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.7}>
        <View style={styles.row}>
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
    )
  }

    const { data } = props
    return (
      <FlatList
        style={styles.list}
        ListEmptyComponent={() => <Text style={styles.placeholder}>暂无数据</Text>}
        data={data}
        ItemSeparatorComponent={() => <View style={styles.border} />}
        keyExtractor={(item, index) => '' + index}
        renderItem={renderItem}
      />
    )
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 15
  },
  item: {
    paddingLeft: 16,
    paddingVertical: 8
  },
  title: {
    fontSize: 16
  },
  desc: {
    color: '#666'
  },
  border: {
    backgroundColor: '#d9d9d9',
    height: 0.5
  },
  placeholder: {
    fontSize: 16,
    paddingLeft: 15,
    color: '#666',
    textAlign:'center'
  },
  row:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomColor:'#999',
    borderBottomWidth:StyleSheet.hairlineWidth,
    paddingHorizontal:px2dp(12),
    paddingVertical:px2dp(15),
    backgroundColor:'green'
  },
  bView:{
    flexDirection: 'row',
    alignItems:'center',
    marginTop:px2dp(8)
  },
  name:{fontSize: px2dp(12), textAlign: 'left', color: '#333333',fontWeight:'500'},
  btext:{fontSize: 10, textAlign: 'left', color: '#333333',marginRight:px2dp(12)}
})
