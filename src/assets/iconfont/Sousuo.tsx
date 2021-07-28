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
<svg t="1627113222833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1244" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }
</style></defs><path d="M949.217812 877.584326 728.039535 656.473439c-0.823795-0.826831-1.687501-1.592264-2.574744-2.320858 47.224446-61.931514 75.272371-139.271974 75.272371-223.165686 0-203.455785-164.941204-368.390231-368.405326-368.390231-203.465145 0-368.405326 164.934446-368.405326 368.390231 0 203.456808 164.940181 368.390231 368.405326 368.390231 84.056792 0 161.536525-28.152177 223.529931-75.538417 0.711227 0.86674 1.457248 1.713015 2.261599 2.51938l221.238655 221.140563c16.054285 16.142655 44.891212 13.5936 64.173138-5.716188C962.816062 922.473699 965.334522 893.756657 949.217812 877.584326zM104.860436 430.987918c0-180.849928 146.614063-327.457983 327.471401-327.457983 180.856315 0 327.471401 146.608056 327.471401 327.457983 0 88.709391-35.291184 169.164794-92.582305 228.134861-1.14308 0.980327-2.265693 2.006703-3.353512 3.092431-1.111356 1.111311-2.160288 2.257413-3.161122 3.427052-58.992949 57.419757-139.545797 92.802616-228.374461 92.802616C251.474499 758.445902 104.860436 611.838869 104.860436 430.987918z" p-id="1245"></path></svg>
`

let Sousuo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

Sousuo.defaultProps = {
  size: 18,
};

Sousuo = React.memo ? React.memo(Sousuo) : Sousuo;

export default Sousuo;
