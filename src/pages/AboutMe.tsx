import React, { FunctionComponent } from 'react';
import {View, Text, StyleSheet} from "react-native";
import usePageHeaderTitle from "./components/usePageHeaderTitle";
import {px2dp} from "../utils";

interface OwnProps {}

type Props = OwnProps;

const AboutMe: FunctionComponent<Props> = (props) => {

    usePageHeaderTitle(props.navigation,'关于我们')

  return (
      <View style={styles.container}>
          <Text style={styles.text}>作者：胡勇</Text>
          <Text style={styles.text}>微信：ab101098</Text>
          <Text style={styles.text}>github主页：https://github.com/HY88883</Text>
      </View>
  );
};

const styles = StyleSheet.create({
    text:{
        fontSize :px2dp(15),
        textAlign:'center',
    },
    container:{
        flex:1,
        backgroundColor:'#f9f9f9',
        justifyContent:'center'
    }
})

export default AboutMe;
