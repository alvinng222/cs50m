// expo Device Motion, last update Jun22,'20
import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native'; //.24
import Constants from 'expo-constants';
import { DeviceMotion } from 'expo-sensors'; // .30

export default class App extends React.Component {
  state = {
    isReady: false,
  } // .26

  _setupDeviceMotionAsync = async () => {
    DeviceMotion.addListener((dm) => {
      console.log(dm); // .30
      this.setState({dm});
    });
    DeviceMotion.setupdateInterval(16); //.31
  } // .30

  componentDidMount() {
    this._setupDeviceMotionAsync();
  } //.26 .30

  render () {
    let angle = 0;
    if (this.state.dm && this.state.dm.rotation) {
      angle = - this.state.dm.rotation.gamma;
    } // .30 -tive the ballon always up
    
    return (
      <View style={styles.container}>
        <Image source={require("./assets/upBalloons.png")} style={{
          height: 727 * 0.7, // .29
          width: 434 * 0.7,
          transform: [{rotate: (angle + 'rad')}],
        }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8, },
});
