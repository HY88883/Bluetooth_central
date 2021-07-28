import React, {FunctionComponent, useContext} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {navigate} from "../utils/RootNavigation";
import DeviceList from './components/DeviceList'
import usePageHeaderTitle from "./components/usePageHeaderTitle";
import {GlobalDataContext} from "../context";

interface OwnProps {}

type Props = OwnProps;

const Device: FunctionComponent<Props> = (props) => {
    const {navigation } = props;

    usePageHeaderTitle(navigation,'已连接的设备')

    const {list:deviceList}=useContext(GlobalDataContext)

    const onPressDevice = (item) => {
        navigate('Service', { device: item })
        // navigate('NotificationAndWrite', { device: item })
    }

    return (
      <SafeAreaView style={styles.container}>
          <DeviceList data={deviceList} onPress={onPressDevice} />
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f9f9f9'
    }
})
export default Device;
