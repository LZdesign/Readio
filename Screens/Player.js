import * as React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    SafeAreaView,
    useWindowDimensions
} from 'react-native';
import {Reader, ReaderProvider, useReader} from 'epubjs-react-native';
import Constants from 'expo-constants';
import {ScrollView} from 'react-native-gesture-handler';
import {Audio} from 'expo-av';


const Tracks = [
    {
      id: 'Think Like A Monk',
      track: require('../assets/ThinkLikeAMonk.mp3'),
    },
    {
      id: 1,
      track: require('../assets/ThinkLikeAMonk.mp3'),
    },
    {
      id: 2,
      track: require('../assets/ThinkLikeAMonk.mp3'),
    },
  ];
  

export default function Player({navigation}) {
    const {width, height} = useWindowDimensions();
    const {changeFontSize, goToLocation} = useReader();
    const [Loaded, SetLoaded] = React.useState(false);
    const [Loading, SetLoading] = React.useState(false);
    const [CurrentSong, SetCurrentSong] = React.useState(Tracks[0]);
    const sound = React.useRef(new Audio.Sound());

    React.useEffect(() => {
      LoadAudio();
  
      return () => Unload();
    }, [CurrentSong]);
  
    const Unload = async () => {
      await sound.current.unloadAsync();
    };
  
    const PlayAudio = async () => {
      try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
          if (result.isPlaying === false) {
            sound.current.playAsync();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const PauseAudio = async () => {
      try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
          if (result.isPlaying === true) {
            sound.current.pauseAsync();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const LoadAudio = async () => {
      SetLoaded(false);
      SetLoading(true);
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === false) {
        try {
          const result = await sound.current.loadAsync(
            CurrentSong.track,
            {},
            true
          );
          if (result.isLoaded === false) {
            SetLoading(false);
            console.log('Error in Loading Audio');
          } else {
            SetLoading(false);
            PlayAudio();
            SetLoaded(true);
          }
        } catch (error) {
          console.log(error);
          SetLoading(false);
        }
      } else {
        SetLoading(false);
      }
    };
  
    const NextSong = () => {
      if (CurrentSong.id === Tracks[Tracks.length - 1].id) {
        SetCurrentSong(Tracks[0]);
      } else {
        SetCurrentSong(Tracks[CurrentSong.id + 1]);
      }
    };
  
    const PrevSong = () => {
      if (CurrentSong.id === 0) {
        SetCurrentSong(Tracks[Tracks.length - 1]);
      } else {
        SetCurrentSong(Tracks[CurrentSong.id - 1]);
      }
    };
  
    return (
    <ScrollView>

      <View style={styles.container}>
        <View style={styles.AudioPLayer}>
          {Loading === true ? (
            <ActivityIndicator size={'small'} color={'red'} />
            ) : (
                <>
              <Button title="Play Song" onPress={PlayAudio} />
              <Button title="Pause Song" onPress={PauseAudio} />
              <Text>Currently Playing : {CurrentSong.id}</Text>
              <Button title="Next Song" onPress={NextSong} />
              <Button title="Previous Song" onPress={PrevSong} />
            </>
          )}
        </View>
      </View>
      <SafeAreaView style={ styles.container}>
            <ReaderProvider>
                <Reader src={
                        {
                            uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf'
                        }
                    }
                    width={width}
                    height={height}
                    changeFontSize='44px'
                    initialLocation={'epubcfi(/6/2[cover]!/6)'}/>
            </ReaderProvider>
        </SafeAreaView>
    </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContentL: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    AudioPLayer: {
      width: '100%',
      alignItems: 'center',
    },
});

