import React, { FC } from 'react';
import { Slider, SliderProps } from 'react-native-elements';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { SongTime, SongTimeProps } from './SongTime';
import { TrackInfo, TrackInfoProps } from './TrackInfo';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
  sliderText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface MusicSliderProps {
  artist?: string;
  title?: string;
  length?: number;
  currentTime?: number;
  onSlidingComplete?: (position: number) => void;
  classes?: {
    root?: StyleProp<ViewStyle>,
    times?: StyleProp<ViewStyle>,
    slider?: StyleProp<ViewStyle>,
    currentTime?: StyleProp<TextStyle>,
    totalTime?: StyleProp<TextStyle>,
    trackInfo?: StyleProp<TextStyle>,
  };
  trackInfoProps?: TrackInfoProps;
  currentTimeProps?: SongTimeProps;
  totalTimeProps?: SongTimeProps;
  sliderProps?: SliderProps;
}

export const MusicSlider: FC<MusicSliderProps> = ({
  artist,
  title,
  length = 0,
  currentTime = 0,
  onSlidingComplete,
  classes = {},
  trackInfoProps = {},
  currentTimeProps = {},
  totalTimeProps = {},
  sliderProps = {},
}) => (
    <View style={classes.root || styles.root}>
      <Slider
        style={classes.slider}
        thumbTintColor={'hsl(200, 70%, 40%)'}
        maximumTrackTintColor={'hsl(200, 70%, 70%)'}
        minimumTrackTintColor={'hsl(200, 70%, 40%)'}
        value={currentTime}
        minimumValue={0}
        maximumValue={length}
        onSlidingComplete={onSlidingComplete}
        {...sliderProps}
      />
      <View style={classes.times || styles.times}>
        <SongTime style={classes.currentTime} length={currentTime} {...currentTimeProps} />
        <TrackInfo style={classes.trackInfo} artist={artist} title={title} {...trackInfoProps} />
        <SongTime style={classes.totalTime} length={length} {...totalTimeProps} />
      </View>
    </View>
  );

export default MusicSlider;
