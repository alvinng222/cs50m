// last update Jun20,'20

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // .09
import * as Permissions from 'expo-permissions'; //.05
import * as Location from 'expo-location'; // .06

export default class App extends React.Component {
  state = {
    location: null,
  }; // .07

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('Location permission not granted!');
      return;
    }

    let location = await Location.getCurrentPositionAsync({}); // .06
   
    let otBuilding =  (await Location.geocodeAsync("OrangeTee Building"))[0];// .12
    let tenaga = (await Location.geocodeAsync("660 Jln Tenaga"))[0] // .11
    //console.log(tenaga); 
    let simLim = (await Location.geocodeAsync("10 Jln Besar"))[0]// 14b
    
    let where = (await Location.reverseGeocodeAsync(location.coords))[0];
    console.log(where); // .14

    this.setState({ location, places: {
      otBuilding,
      tenaga,
      simLim, //14b
    },
    where, //.14
    }); // .12
    // .07 console.log(location);
  };

  componentDidMount() {
    this._getLocationAsync();
  } // .06

  render() {
    if (!this.state.location) {
      return <View />;
    } // .07 return empty view
      
    return (
      <MapView 
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.location.coords.latitude, 
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922 / 2.5,
          longitudeDelta: 0.0421 /2.5,
        }} // .08 .09 was />
      > 
        <Marker
            coordinate={this.state.location.coords}
            title="You are here!"
            description={this.state.where.street} // .14
            pinColor="green"
          />  
        <Marker coordinate={this.state.places.tenaga} title="TENAGA!"/>
        <Marker 
          coordinate={this.state.places.otBuilding} 
          title="OT Building"
          description="Real Estate HQ" 
          pinColor="blue"
        />
        <Marker 
          coordinate={this.state.places.simLim} //14b 
          title="Sim Lim Tower"
          description="Electrical" 
          pinColor="yellow"
        />

      </MapView> 
    );
  } // .09
}
