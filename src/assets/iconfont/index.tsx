/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Arrow from './Arrow';
import Clean from './Clean';
import Services from './Services';
import Settings from './Settings';
import Sousuo from './Sousuo';
import Stop from './Stop';

export type IconNames = 'arrow' | 'clean' | 'services' | 'settings' | 'sousuo' | 'stop';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'arrow':
      return <Arrow key="L1" {...rest} />;
    case 'clean':
      return <Clean key="L2" {...rest} />;
    case 'services':
      return <Services key="L3" {...rest} />;
    case 'settings':
      return <Settings key="L4" {...rest} />;
    case 'sousuo':
      return <Sousuo key="L5" {...rest} />;
    case 'stop':
      return <Stop key="L6" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
