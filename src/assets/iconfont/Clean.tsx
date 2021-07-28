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
<svg t="1627351779996" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1964" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }
</style></defs><path d="M752.3 91.3l-34.7-16.8c-26.1-12.6-57.5-1.7-70.1 24.5L531.8 338.4l-6.9-3.4c-64.1-30.9-141.1-4.1-172 60l-10 20.7 375.2 181.2 10-20.7c30.9-64.1 4.1-141.1-60-172l-6.9-3.3 115.6-239.4c12.6-26.2 1.7-57.6-24.5-70.2zM702 630L326.3 448.6c-22.9 30-52.5 63.8-90.1 97.4-57.5 51.4-114.5 85.3-159.6 107.4 13.1 41.4 40.8 61.3 60.3 82.3 7.2 7.8 118.3-112.3 126.3-104.6 8 7.7-87 143.1-78.3 150.6 25.9 22.2 55 43.4 86.7 63.3 6.5 4.1 145.1-185 151.3-181.6 12.4 6.8-87.9 217.4-74.8 223.7 13 6.3 26.1 12.2 39.1 17.7 45.1 19 89.9 33 132.8 42.2 13.1 2.8 82-234.4 94.6-232.5 12.7 1.9-30.8 242.9-18.7 243.9 36.5 3 70.6 1.9 100.9-3.3-10.5-54.4-18.2-124.6-12.5-205.8 3.2-44.5 9.9-84.5 17.7-119.3z" p-id="1965" fill="#d81e06"></path></svg>
`

let Clean: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

Clean.defaultProps = {
  size: 18,
};

Clean = React.memo ? React.memo(Clean) : Clean;

export default Clean;
