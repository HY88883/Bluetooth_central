/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src'
import {name as appName} from './app.json';

if (!__DEV__) {
    const emptyFunc = () => {};
    global.console.info = emptyFunc;
    global.console.log = emptyFunc;
    global.console.warn = emptyFunc;
    global.console.error = emptyFunc;
}

AppRegistry.registerComponent(appName, () => App);
