import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MusicSlider from './MusicSlider';
import PlayButton from './PlayButton';
import { Player } from '@react-native-community/audio-toolkit';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'hsla(200, 10%, 80%, 0)',
    flexShrink: 1,
    flex: 1,
  },
  container: {
    top: win.height,
    flex: 1,
    backgroundColor: 'hsl(50, 10%, 10%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    backgroundColor: 'hsl(120, 20%, 80%)',
    flexDirection: 'column',
    flex: 1,
    flexShrink: 1,
    position: 'relative',
  },
  panelHeader: {

  },
  songbar: {
    backgroundColor: 'hsl(200, 20%, 80%)',
    flexDirection: 'row',
  },
  icon: {

  },
  slider: {
    flex: 1,
    alignSelf: 'stretch',
    paddingRight: 10,
  },
  pullout: {
    backgroundColor: 'hsl(200, 20%, 80%)',
    marginTop: 20,
    borderRadius: 500,
    height: 5,
    width: '100%',
  },
});

export interface MediaPlayerProps {
  songUrl: string;
  artist?: string;
  title?: string;
  playerOptions: ConstructorParameters<typeof Player>[1];
}

export const MediaPlayer: FC<MediaPlayerProps> = ({ songUrl, playerOptions, title, artist }) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [songIsLoaded, setSongIsLoaded] = useState(false);
  const [currentSongLength, setCurrentSongLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  useEffect(() => {
    setPlayer(new Player(songUrl, playerOptions));
    if (!player)
      throw new Error('Could not load ReactNativeMediaPlayer.');
    setSongIsLoaded(player.isPrepared);
    setCurrentPosition(player.currentTime);
    setCurrentSongLength(player.duration);
  }, [player, playerOptions, songUrl]);

  // in milliseconds
  return (
    <View style={styles.root}>
      <View style={styles.songbar}>
        <View style={styles.icon}>
          <PlayButton onPress={async isPlaying => {
            if (!player)
              return;
            if (!isPlaying) {
              if (!songIsLoaded) {
                setPlayer(new Player(songUrl, playerOptions));
                if (!player.canPlay)
                  throw Error('why tho');

                setSongIsLoaded(true);
                setCurrentSongLength(player.duration);
              }
              return await new Promise((res, rej) => player.play(e => e
                ? rej(e)
                : res()
              ));
            } else {
              return await new Promise((res, rej) => player.pause(e => e
                ? rej(e)
                : res()
              ));
            }
          }} />
        </View>
        <View style={styles.slider}>
          <MusicSlider
            title={title}
            artist={artist}
            length={currentSongLength}
            currentTime={currentPosition}
            onSlidingComplete={position => {
              player && player.seek(position);
            }}
          />
        </View>
      </View>

    </View>
  );
};

export default MediaPlayer;
