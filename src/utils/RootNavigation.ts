import * as React from 'react';

export const navigationRef = React.createRef<any>();
import {CommonActions, StackActions} from '@react-navigation/native';

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function goBack() {
  navigationRef.current?.goBack();
}

//返回刷新页面带参数
export function goBackRefresh(name: string) {
  navigationRef.current?.dispatch(state => {
    const routes = state.routes.filter(r => r.name !== name).map(i=>({name:i.name,params:i.params,state:i.state}));
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
}
