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
<svg t="1627113281879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2720" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }
</style></defs><path d="M512 928.3c-229.2 0-415-185.8-415-415s185.8-415 415-415 415 185.8 415 415-185.8 415-415 415z m0.4-77.5c186.2 0 337.2-151 337.2-337.2s-151-337.2-337.2-337.2-337.2 151-337.2 337.2 150.9 337.2 337.2 337.2zM382.3 357.6h259.4c14.3 0 25.9 11.6 25.9 25.9V643c0 14.3-11.6 25.9-25.9 25.9H382.3c-14.3 0-25.9-11.6-25.9-25.9V383.6c0-14.4 11.6-26 25.9-26z" p-id="2721"></path></svg>
`

let Stop: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

Stop.defaultProps = {
  size: 18,
};

Stop = React.memo ? React.memo(Stop) : Stop;

export default Stop;
