// expo photo edit, last update Jun23,'20
import * as React from 'react';
import {Button,Image,Text,TouchableHighlight,View,StyleSheet} from 'react-native'; //.47.55b
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker'; // .47
import * as Permissions from 'expo-permissions'; // .47
import * as ImageManipulator from "expo-image-manipulator"; // .52
import { Camera } from 'expo-camera'; // .53

export default class App extends React.Component {
  state = {
    chosenImage: null,
    customCameraReady: false, // .54
    cameraType: Camera.Constants.Type.front, //.55 .58 ****
  } // .48

  _flipCamera = () => {
    console.log("flip me");
    console.log(this.state.cameraType);
    if (this.state.cameraType === Camera.Constants.Type.back) {
      this.setState({ cameraType: Camera.Constants.Type.front});
    } else {
      this.setState({ cameraType: Camera.Constants.Type.back});
    }
  } //.57

  componentDidMount() {this._launcCustomCameraAsync();} // .54

  _launchCameraRollAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status != 'granted') {
      console.error("Camera roll perms not granted!");
      return
    }

    let img = await ImagePicker.launchImageLibraryAsync(); // .47b
    //console.log(img);
    this.setState({chosenImage: img}); //.48
  } // .47

  _launchCameraAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA)
    if (status != 'granted') {
      console.error("Camera perms not granted!");
      return
    } //.49

    let img = await ImagePicker.launchCameraAsync({allowsEditing: true}); // .49 .50
    let flippedImage= await ImageManipulator.manipulateAsync(
      img.uri,
      [{ flip: ImageManipulator.FlipType.Vertical }],
    );
    this.setState({takenImage: flippedImage});
  } // .49

  _launcCustomCameraAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA);
    if (status != 'granted') {
      console.error("Camera perms not granted!");
      return;
    }

    this.setState({
      customCameraReady: true,
    })
  } //.53

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Photos
        </Text>
        <View style={{flexDirection:'row'}}>
          <Image source={require("./assets/CompassFace.png")} 
            style={{height:200, width:200}} />
          <Image source={require("./assets/upBalloons.png")} 
            style={{height:200, width:200}} />
        </View>

        <Button title="Launch Camera Roll" onPress={() => {
          this._launchCameraRollAsync();
        }} //.47
        />
        <Button title="Launch Camera" onPress={() => {
          this._launchCameraAsync();
        }} //.49
        />

        {(this.state.customCameraReady && 
          <TouchableHighlight 
            onPress={() => {
              this._flipCamera(); // .57
          }}>
          <Camera style={{ width: 400, height: 400,}}  //.54  .55 .55b
          type={this.state.cameraType} />
          </TouchableHighlight>
        ) || null}
        
        {(this.state.chosenImage && <Image
            source={{uri: this.state.chosenImage.uri }}
            style={{height: 200, width:200,
            }} />) || null } 

        {(this.state.takenImage && <Image
            source={{uri: this.state.takenImage.uri }} //.51
            style={{height: 200, width:200,
            }} />) || null }       
      </View>
    );
  } // .46 .47 .48
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', 
  paddingTop: Constants.statusBarHeight, backgroundColor: '#ecf0f1',},
  paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
}); // .45

