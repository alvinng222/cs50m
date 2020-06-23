import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'; //.38
import Constants from 'expo-constants';
import { Video } from 'expo-av'; // .32
import { Audio } from 'expo-av'; // .33
import * as Font from 'expo-font'; // .41
import { AppLoading } from 'expo'; // .41
import { Asset } from 'expo-asset'; // .42

let green = '#477009';
let yellow = '#fcd602';

export default class App extends React.Component {
  state = {
    isReady: false,
  }; // .41

  _setAudioModeAsync = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    });
  }; // .33 .34

  _loadFontsAsync = async () => {
    await Font.loadAsync({
      CooperBlackRegular: require("./assets/CooperBlackRegular.ttf")
    });
  };// .41

  _loadAssetsAsync = async () => {
    await Asset.loadAsync([
      require("./assets/1.mp4"),
      require("./assets/2.mp4"),
      require("./assets/3.mp4"),
      require("./assets/4.mp4"),
      require("./assets/5.mp4"),
      require("./assets/6.mp4"),
      //require("./assets/7.mp4"),
      //require("./assets/8.mp4"),
      //require("./assets/9.mp4"),
    ])
  } //.42

  _setupAsync = async () => {
    await Promise.all([
      this._loadAssetsAsync(), 
      this._setAudioModeAsync(),
      this._loadFontsAsync(),
    ]);
    this.setState({ isReady: true });
  }; // .41b .42

  UNSAFE_componentWillMount() {
    this._setupAsync();
  } // .33 .41b

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    } // .41

    let size = 100; //.36
    return (
      <View style={styles.container}>
        <Text style={{ 
          color: yellow, fontSize: 42, fontFamily: "CooperBlackRegular", // .41c
          }}>Cat Sounds</Text>
        <View style={{
          flexDirection: 'row' // .43
        }}>
          <CatVideoButton source={require('./assets/1.mp4')} size={size} />
          <CatVideoButton source={require('./assets/2.mp4')} size={size} />
          <CatVideoButton source={require('./assets/3.mp4')} size={size} />
        </View>
        <View style={{
          flexDirection: 'row' // .43
        }}>
          <CatVideoButton source={require('./assets/4.mp4')} size={size} />
          <CatVideoButton source={require('./assets/5.mp4')} size={size} />
        </View>
        <View style={{
          flexDirection: 'row' // .43
        }}>
          <CatVideoButton source={require('./assets/6.mp4')} size={size} />
        </View>
      </View>
    );
  } //.32 .36 .43 .44
}

class CatVideoButton extends React.Component {
  resetAync = async () => {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  }; // .37

  playAsync = async () => {
    await this._video.replayAsync();
  }; // .39

  render() {
    return (
      <View style={{
        margin: 10, // .43c
      }}>
        <TouchableHighlight
          onPress={() => {
            //console.log("Pressed the cat.")
            this.playAsync(); // .39
          }}>
          <View>
            <Video
              source={this.props.source} // .36
              style={{
                width: this.props.width || this.props.size || 400,
                height: this.props.height || this.props.size || 400,
              }} //.32
              resizeMode="cover" // .35
              shouldPlay={true}
              ref={c => {
                this._video = c;
              }} // .37
              onPlaybackStatusUpdate={status => {
                if (status.didJustFinish) {
                  this.resetAync();
                } // .37
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  } // .38
} // .36

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: green, //.40
    alignItems: 'center',
  },
});
