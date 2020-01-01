import React, { FC, ReactNode } from 'react';
import { TextStyle, StyleProp } from 'react-native';
import { Text } from 'react-native-elements';

export interface TrackInfoProps {
  title?: ReactNode;
  artist?: ReactNode;
  overrideText?: ReactNode;
  style?: StyleProp<TextStyle>;
  component?: ReactNode,
}


export const TrackInfo: FC<TrackInfoProps> = ({ title, artist, style, component, overrideText }) => {
  if (component)
    return <>{component}</>;
  if (typeof overrideText !== 'undefined')
    return <Text style={style}>{overrideText}</Text>;

  if (typeof artist === 'string' && typeof title === 'string')
    return <Text style={style}>`${artist} - ${title}`</Text>;

  return (
    <Text style={style}>
      <>{artist}</>
      <>{' '}</>
      <>{title}</>
    </Text>
  );
};


export default TrackInfo;
