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
<svg t="1627367977901" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6439" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }
</style></defs><path d="M212.1 237H812v150H212.1z" fill="#3A6EFF" p-id="6440"></path><path d="M212.1 309.7H812v4.7H212.1zM761.9 187.1H262.1l-50 50h599.8zM761.9 412.3H262.1l-50 50h599.8zM761.9 636.8H262.1l-50 50h599.8z" fill="#003DF0" p-id="6441"></path><path d="M262.1 387.4H762v50H262.1zM262.1 611.8H762v50H262.1z" fill="#BEC6D3" p-id="6442"></path><path d="M212 462h599.9v150H212z" fill="#3A6EFF" p-id="6443"></path><path d="M212.1 534.6H812v4.7H212.1z" fill="#003DF0" p-id="6444"></path><path d="M212.1 686.6H812v150H212.1z" fill="#3A6EFF" p-id="6445"></path><path d="M212.1 759.2H812v4.7H212.1z" fill="#003DF0" p-id="6446"></path><path d="M287.1 312m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#D3E0EA" p-id="6447"></path><path d="M746.4 280.7H762v62.5h-15.6zM696.4 280.7H712v62.5h-15.6zM746.4 505.7H762v62.5h-15.6zM696.4 505.7H712v62.5h-15.6zM746.4 730.3H762v62.5h-15.6zM696.4 730.3H712v62.5h-15.6z" fill="#FFA326" p-id="6448"></path><path d="M287.1 537m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#D3E0EA" p-id="6449"></path><path d="M287.1 761.6m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#D3E0EA" p-id="6450"></path></svg>
`

let Services: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

Services.defaultProps = {
  size: 18,
};

Services = React.memo ? React.memo(Services) : Services;

export default Services;
