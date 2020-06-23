// expo compass, last updated Jun21,'20

import * as React from 'react';
import { Image, ImageBackground, Text, View, StyleSheet } from 'react-native'; //.24
import Constants from 'expo-constants';
import { Magnetometer } from 'expo-sensors';

export default class App extends React.Component {
  state = {
    isReady: false,
    v: null,
  } // .26 .26b 

  _setupMagnetometerAsync = async () => {
    Magnetometer.addListener((v) =>{
      this.setState({ v })
    })
  } // .26 

  componentDidMount() {
    this._setupMagnetometerAsync();
  } //.26

  render () {
    let theta = "0rad";
    if (this.state.v) {
      let {x,y,z} = this.state.v;
      theta = Math.atan(-x/y);
      if (-x > 0 && y > 0) {
          //
      } else if (y > 0){
        theta += Math.PI;
      } else {
        theta += Math.PI * 2;
      }
    } // .27

    return (
      <View style={styles.container}>
        <Text>{ //.27 .28b 
          JSON.stringify(theta + 'rad') //.27 .28b
              }</Text>
        <ImageBackground source={require("./assets/CompassFace.png")} style={{
          height: 320,  // size to fill the phone
          width: 320,
          alignItems: 'center', // .25
          justifyContent: 'center', // .25
        }}>
        <Image source={require("./assets/CompassNeedle.png")} style={{
          height: 403,  // actual height
          width: 51,    // actuals width
          opacity: 0.65, //.25
          transform: [{ rotate: (theta + 'rad') }], //.28b
        }} />
        </ImageBackground>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8, },
  //paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
});
