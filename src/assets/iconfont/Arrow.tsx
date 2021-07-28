/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgCss } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const xml = `
<svg t="1627290674129" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2602" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }
</style></defs><path d="M290.909091 983.272727a29.090909 29.090909 0 0 1-20.596364-49.570909L689.92 512l-418.909091-421.701818a29.090909 29.090909 0 0 1 41.309091-40.96l439.505455 442.181818a29.090909 29.090909 0 0 1 0 40.96l-439.505455 442.181818a28.974545 28.974545 0 0 1-21.410909 8.610909z" fill="#999999" p-id="2603"></path></svg>
`

let Arrow: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

Arrow.defaultProps = {
  size: 18,
};

Arrow = React.memo ? React.memo(Arrow) : Arrow;

export default Arrow;
