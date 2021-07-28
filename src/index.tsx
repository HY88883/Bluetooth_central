import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import MyTabs from './pages/BottomTabNavigator';
import {
  Alert,
  BackHandler,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {px2dp} from './utils';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import IconFont from './assets/iconfont';
import {createContext, useEffect, useReducer} from 'react';
import BleManager from 'react-native-ble-manager';
import {useState} from 'react';
import Toast from 'teaset/components/Toast/Toast';
import {navigationRef} from "./utils/RootNavigation";
import Device from "./pages/Device";
import {initialState, reducer} from "./reducer";
import {GlobalDataContext,DispatchContext} from './context'
import Service from "./pages/service";
import Operation from "./pages/service/Operation";
import AboutMe from "./pages/AboutMe";
import NotificationAndWrite from "./pages/other";
enableScreens();

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const RootStack = createStackNavigator();

const RootStackComponent = function () {
  return (
    <RootStack.Navigator
      initialRouteName={'MyTabs'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          shadowOffset: {width: 0, height: 0},
          shadowColor: 'transparent',
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#1A9CF2',
          borderBottomColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {fontSize: 17},
        headerBackTitleVisible: false,
        // headerLeft: () => _HEADER_BACK_BUTTON(navigation)
      }}>
      <RootStack.Screen name="MyTabs" component={MyTabs} />
      {/*Device*/}
      <RootStack.Screen name="Device" component={Device} />
        {/*Service*/}
        <RootStack.Screen name="Service" component={Service} />
        {/*Operation*/}
        <RootStack.Screen name="Operation" component={Operation} />
        {/*AboutMe*/}
        <RootStack.Screen name="AboutMe" component={AboutMe} />
        {/*NotificationAndWrite*/}
        <RootStack.Screen name="NotificationAndWrite" component={NotificationAndWrite} />
    </RootStack.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db',
    // accent: '#f1c40f',
  },
};

export default function App() {
    const [globalState,_dispatch] =useReducer(reducer,initialState)
  useEffect(() => {
    const initPermissions = async function () {
      if (Platform.OS === 'android'&& Platform.Version >= 23) {
        const result=await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if(result){
          console.log("Permission is OK");
        }else{
          const res = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (res === 'granted') {
          } else {
            setTimeout(() => {
              BackHandler.exitApp();
            }, 3000);
            Toast.fail('获取权限失败，请先打开相应权限再进入App');
          }
        }
      }
    };
    initPermissions();
  });

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
      ref={navigationRef}
      >
          <GlobalDataContext.Provider value={globalState}>
          <DispatchContext.Provider value={{_dispatch}}>
        <RootStackComponent />
          </DispatchContext.Provider>
          </GlobalDataContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}
