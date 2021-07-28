import {View, Text, ActivityIndicator} from "react-native";
import {Overlay, Theme} from 'teaset';
import React from "react";
import {px2dp} from "../../../utils";

let overlayKey=null
Overlay.removeLoading=()=>{
    if(!overlayKey)return;
    Overlay.hide(overlayKey)
    overlayKey=null
}

Overlay.displayLoading=(content)=>{
    if(overlayKey){
        return
    }
     const overlayView = (
        <Overlay.View
            style={{alignItems: 'center', justifyContent: 'center'}}
            modal
            animated
            overlayOpacity={0.3}
        >
            <View style={{
               padding:px2dp(10),
                backgroundColor: "rgba(0,0,0,0.6)",
                opacity: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius:px2dp(7)
            }}>
                <ActivityIndicator size="large" color="#FFF" />
                <Text style={{ color:"#FFF",marginTop:px2dp(10) }}>{content}</Text>
            </View>
        </Overlay.View>
    );
    overlayKey=Overlay.show(overlayView);
}

export default Overlay
