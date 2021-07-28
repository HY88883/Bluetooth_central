import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import Blutooth from './Blutooth';
import Settings from './Settings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useLayoutEffect, useMemo} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {navigate} from '../utils/RootNavigation';
import {px2dp} from "../utils";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs(props) {
  const {navigation, route} = props;

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Blutooth';
    console.log('routeName', routeName);
    if (routeName === 'Blutooth') {
      navigation.setOptions({
        headerTitle: 'BLE蓝牙连接',
        headerRight: () => (
          <Text onPress={() => navigate('Device')} style={styles.text}>已连接的设备</Text>
        ),
      });
    } else if (routeName === 'Settings') {
        navigation.setOptions({
            headerTitle: '设置',
            headerRight:()=>null
            /*headerRight: () => (
                <Text onPress={() => navigate('Device')} style={styles.text}>已连接的设备</Text>
            ),*/
        });
    }
  });

  return (
    <Tab.Navigator
      initialRouteName="Blutooth"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen
        name="Blutooth"
        component={Blutooth}
        options={{
          tabBarLabel: 'BLE蓝牙',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="bluetooth-audio"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: '设置',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-settings"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    text: {color: '#eee', fontSize:px2dp(16),marginRight:px2dp(12)}
})
