import React, { FunctionComponent } from 'react';
import {View, Text, SafeAreaView, StyleSheet} from "react-native";
import {ListRow} from 'teaset'
import {navigate} from "../utils/RootNavigation";

interface OwnProps {}

type Props = OwnProps;

const Settings: FunctionComponent<Props> = (props) => {

    const handlePress=()=>{
        navigate('AboutMe')
    }

  return (
      <SafeAreaView style={{flex:1,backgroundColor:'#f9f9f9'}}>
          <ListRow title='关于我们' titleStyle={{fontSize: 18, color: '#31708f'}} detail={'意见反馈'} accessory='indicator' onPress={handlePress}/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({

})

export default Settings;
