Lecture 8:  Expo Components
===
[top]: topOfThePage
lecture: http://video.cs50.net/mobile/2018/spring/lectures/8

slides: http://cdn.cs50.net/mobile/2018/spring/lectures/8/lecture8.pdf
- [Maps and Location](#maps-and-location)
- [Text or Delete](#text-or-delete)
- [A Compass](#a-compass)
- [A Multimedia Board](#a-multimedia-board)
- [A Photo Editor](#a-photo-editor)
- [Other APIs](#other-apis)

[my Source Code](#my-source-code)   
- [09_ExpoMap.js](#09_expomapjs)
- [09_ExpoContacts.js](#09_expocontactsjs)
- [09_ExpoCompass.js](#09_expocompassjs), images: ./assets/...
- [09_ExpoDeviceMotion.js](#09_expodevicemotionjs), images: ./assets/...
- [09_ExpoMultimedia.js](#09_expomultimediajs), images: ./assets/...
- [09_ExpoPhotoEdit.js](#09_expophotoeditjs)

[cs50 Source Code](#cs50-source-code)
files: src08.zip  
App.js
app.json
package.json   
assets/...
  1.mp4
  2.mp4
  3.mp4
  4.mp4
  5.mp4
  6.mp4
  7.mp4
  8.mp4
  9.mp4
  CooperBlackRegular.ttf
  icon.png
  splash.png
 
 [**myNote**](#mynote)

---
### expo
https://docs.expo.io/

And we're going to use Snack a lot, which is at snack.expo.io.
And also, we're going to use XDE, the sort of desktop development tool.

Visual Studio Code, myNote: https://code.visualstudio.com/download

[:top: Top](#top)

---
### Maps and Location
- MapView
- Location
- Geocoding

check on  [09_ExpoMap.js](#09_expomapjs)

Expo components installation
``` console
$ expo install react-native-maps expo-permissions expo-location
```

.02 App.js, MapView. For Snack, problem on Expo.MapView, suggect USE .15 App.js  
``` jsx
      <MapView style={{flex: 1}} />
```
using docs.expo.io, https://docs.expo.io/versions/v37.0.0/sdk/map-view/
work on Andriod.


ExpoCli, work on device. Snack work on Simulator
``` jsx
import React from 'react';
//import Expo from 'expo';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <MapView style={{flex: 1}}/>
    );  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },  
});
~  
```
:point_right:  
Snack > package.json;    
ExpoCli, see myNote for Expo component installation



.03 App.js using Google map. all ok
``` jsx
      <MapView style={{flex: 1}} provider={MapView.PROVIDER_GOOGLE} />
    );
```
https://docs.expo.io/ > search > MapView

[:top: Top](#top)

#### MapView
https://docs.expo.io/versions/v37.0.0/sdk/map-view/

ExpoCli > device ok. Snack > simulator ok
``` jsx
import React from 'react';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  render() {
    return (
      <MapView style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825, 
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} // San Francisco
      />
    );
  }
}

```

.05 location, you need to get permission. check with doc, Permissions.LOCATION,
ref to https://docs.expo.io/versions/latest/sdk/permissions/
``` jsx
import * as Permissions from 'expo-permissions'; //.05

export default class App extends React.Component {

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('Location permission not granted!');
      return;
    }
  }
...
```

.06
``` jsx
...
import * as Location from 'expo-location'; // .06

export default class App extends React.Component {
  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('Location permission not granted!');
      return;
    }
        
    let location = await Location.getCurrentPositionAsync({});  // .06
      console.log(location); 
  }

  componentDidMount() {
    this._getLocationAsync();
  } // .06
  
  render() {
  ...
```
console from Expo Dev, shown the location of Singapore
``` console
Object {
  "coords": Object {
    "accuracy": 15.927000045776367,
    "altitude": 46,
    "heading": 0,
    "latitude": 1.3339021,
    "longitude": 103.9064983,
    "speed": 0,
  },
  "mocked": false,
  "timestamp": 1592638296908,
}
```
[11:46]

.07 to setlocation and **empty view** since not ready. Not on the Expo device.
``` jsx
import { StyleSheet, Text, View} from 'react-native';
...
export default class App extends React.Component {
  state= {
    location: null,
  } // .07
  ...
    let location = await Location.getCurrentPositionAsync({});  // .06
    this.setState({ location });
    // .07 console.log(location); 
  ...
  render() {
    if (!this.state.location){
      return (<View />);  
    } // .07 return empty view
    return (
    ...
```
.08 this coordinates location
``` jsx
    return (
        <MapView 
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude, 
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} // .08
        />
    );
```
.09  To pin the map...

#### Marker
for Full document, see https://github.com/react-native-community/react-native-maps > 
Component API > `<Marker /> Component API ` >   
 https://github.com/react-native-community/react-native-maps/blob/master/docs/marker.md.   
https://github.com/react-native-community/react-native-maps/blob/master/example/examples/DefaultMarkers.js

shown on ExpoCLi device only.
``` jsx
 import MapView, { Marker } from 'react-native-maps';
...
            longitudeDelta: 0.0421,
          }}> //.09 was />
        <Marker coordinate={this.state.location.coords}/>
        </MapView> 
    );  
  } // .09
}
```
.10 tap on the marker to shown title
``` jsx
        <Marker coordinate={this.state.location.coords} title="You are here!"/>
```
[:top: Top](#top)

#### App.js .10 for MapView, ExpoCLi device ok. Snack simulator Andriod ok, IOS blank view.
``` jsx
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
    this.setState({ location });
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} // .08 .09 was />
      > 
        <Marker coordinate={this.state.location.coords} title="You are here!"/>
      </MapView> 
    );
  } // .09
}

```
#### Geocode
.11 Geocode an address string to latitiude-longitude location.
https://docs.expo.io/versions/latest/sdk/location/#locationgeocodeasyncaddress
``` jsx
    let location = await Location.getCurrentPositionAsync({});  // .06

    let elioHouse = await Location.geocodeAsync("101 Dunster St.") // .11
    console.log(elioHouse)

    this.setState({ location });
```
.12 Marker on others location, but inaccurate. Add in **[0]** for just long and lat
``` jsx
... 
    let location = await Location.getCurrentPositionAsync({});  // .06
    let otBuilding =  (await Location.geocodeAsync("OrangeTee Building"))[0];// .12
    let tenaga = (await Location.geocodeAsync("660 Jln Tenaga"))[0] // .11
    console.log(tenaga); 
    
    this.setState({ location, places: {
      otBuilding,
      tenaga,
    } }); // .12
    // .07 console.log(location); 
  }
  
...
          <Marker coordinate={this.state.location.coords} title="You are here!"/>
          <Marker coordinate={this.state.places.tenaga} title="TENAGA!"/>
          <Marker 
            coordinate={this.state.places.otBuilding} 
            title="OT Building"
            description="Real Estate HQ" 
            pinColor="blue"
          />
        </MapView> 
      </View>
    );
  } // .09 .10 .12
```
.13 zoom in, add in **/ 2.5**
``` jsx
        <MapView 
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude, 
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922 / 2.5,
            longitudeDelta: 0.0421 / 2.5,
          }} // .08 // .13
          //.09 was /> 
        > 
```
.14 **where we are**
``` jsx
    let where = (await Location.reverseGeocodeAsync(location.coords))[0];
    console.log(where); // .14

    this.setState({ location, places: {
        otBuilding,
        tenaga,
      },
      where, // .14
    }); // .12
  };
  ...
          <Marker
            coordinate={this.state.location.coords}
            title="You are here!"
            description={this.state.where.street} // .14
            pinColor="green"
          />  
```
Snack console:
``` console
SM-G5510:
    ▼{postalCode:null,isoCountryCode:"20001",name:null,region:"East",city:"",country:"Singapore",street:"Jalan Tenaga"}
        postalCode:null
        isoCountryCode:"20001"
        name:null
        region:"East"
        city:""
        country:"Singapore"
        street:"Jalan Tenaga"
```
Expo Cli device console:
``` console
        Object {
          "city": "",
          "country": "Singapore",
          "isoCountryCode": "20001",
          "name": null,
          "postalCode": null,
          "region": "East",
          "street": "Jalan Tenaga",
        }
```

.14b add in more data
``` jsx
    let simLim = (await Location.geocodeAsync("10 Jln Besar"))[0]// 14b
    ...
      simLim, //14b
      ...
        <Marker 
          coordinate={this.state.places.simLim} //14b 
          title="Sim Lim Tower"
          description="Electrical" 
          pinColor="yellow"
        />      
```
[:top: Top](#top)
[26:10]

---

### Text or Delete
- Contacts

check on [09_ExpoContacts.js](#09_expocontactsjs)

Expo components installation
``` console
$ expo install expo-permissions expo-contacts
```

.15 App.js, my way!
``` jsx
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8, },
  //paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
});
```
.16 onPress
``` jsx
import { Button, Text, View, StyleSheet } from 'react-native';
...
      <View style={styles.container}>
        <Button  title="Pick a Random Contact" onPress={() => {
            console.log('Pressed');
          }}
        />
      </View>
```
.17 Contacts & Permissions. 
docs.expo.io > contacts > https://docs.expo.io/versions/latest/sdk/contacts/
need permission for the contacts
``` jsx
import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Expo from 'expo' // .17
import * as Contacts from 'expo-contacts'; // .17
import * as Permissions from 'expo-permissions';  // .17

export default class App extends React.Component {
  _getRandomContactAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CONTACTS);
    if (status !== 'granted') {
      console.error("Permission not granted");
      return;
    } // .17
  }

```
.18 to getContactAsync.  contacts to paginated or by ID.
Contacts.getContactAsync https://docs.expo.io/versions/latest/sdk/contacts/#contactsgetcontactsasynccontactquery
``` jsx 
...
    } // .17
    console.log("ok?"):// debug
    let contacts = await Contacts.getContactsAsync({
      pageSize: 1,
    }); // .18
    console.log(contacts) 
  }

  render () {
    return (
      <View style={styles.container}>
        <Button  title="Pick a Random Contact" onPress={() => {
            this._getRandomContactAsync(); // .18
          }}
        />
      </View>
...
```
Snack console
``` console
SM-G5510:
    ▼{hasPreviousPage:false,total:111,hasNextPage:true,data:[…]}
        hasPreviousPage:false
        total:111
        hasNextPage:true
        ▼data:[{…}]
            ►0:{lookupKey:"627i3",firstName:"Alvin",imageAvailable:false,name:"Alvin AtronEE",id:"10",emails:[…],contactType:"person",lastName:"AtronEE"}
            length:1
```
ExpoCli console
``` js
      Object {
        "data": Array [
          Object {
            "contactType": "person",
            "emails": Array [
              Object {
                "email": "alvin@atronee.com.sg",
                "id": "12",
                "isPrimary": 1,
                "label": "unknown",
              },
            ],
            "firstName": "Alvin",
            "id": "10",
            "imageAvailable": false,
            "lastName": "AtronEE",
            "lookupKey": "627i3",
            "name": "Alvin AtronEE",
          },
        ],
        "hasNextPage": true,
        "hasPreviousPage": false,
        "total": 110,
      }
```

.19 More contacts if pageSize or pageOffset change    
Contants: https://docs.expo.io/versions/latest/sdk/contacts/#constants.    
Contact Fields > Deprecated: Use Contacts.Fields. > still work
``` jsx
    let contacts = await Contacts.getContactsAsync({
      pageSize: 1,
      pageOffset: 0,
      fields: ['PHONE_NUMBERS'],
    }); // .18 .19
    console.log(contacts) 
  }
```

.20 random,
``` jsx
    let {total} = contacts;
    let n = Math.floor(Math.random() * total); // .20
    console.log(n) // .20
```
.21 fetch random contact
``` jsx
export default class App extends React.Component {
  _getRandomContactAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CONTACTS);
    if (status !== 'granted') {
      console.error("Permission not granted");
      return;
    } // .17
    let contacts = await Contacts.getContactsAsync({
      pageSize: 3,
      pageOffset: 0,
      fields: ['PHONE_NUMBERS'],
    }); // .18 .19

    let {total} = contacts;
    let n = Math.floor(Math.random() * total); // .20
    console.log(n) 
  
    let randomContact = await Contacts.getContactsAsync({
      pageSize: 3,
      pageOffset: n,
      fields: ['PHONE_NUMBERS'],
    }); // .21
    console.log(randomContact);
  }
```
.22 Contacts.PHONE_NUMBERS
``` jsx
...
      fields: [Contacts.PHONE_NUMBERS], // .22
...
      fields: [Contacts.PHONE_NUMBERS], // .22
    }); // .21
```
.22b c = data[n]
``` jsx
    console.log(n) 
    let randomContacts = await Contacts.getContactsAsync({
      pageSize: 100, // .22b
      pageOffset: n,
      fields: [Contacts.PHONE_NUMBERS], // .22
    }); // .21

    let {data} = randomContacts;
    let c = data[n]; // .22b

    console.log(c);
  }
```
ExpoCli console, work well with Andriod device
``` js
INFO 01:12
          47
INFO 01:12
          Object {
            "contactType": "person",
            "firstName": "Tenaga",
            ...
```

.23 setState
``` jsx
export default class App extends React.Component {
  state = {
    randomContact:null,
  } // .23
...

    this.setState({
      randomContact: c,
    }) // .23
    console.log(c);
  }

  render () {
    return (
      <View style={styles.container}>
        <Button  title="Pick a Random Contact" onPress={() => {
            this._getRandomContactAsync(); // .18
          }}
        />
        {(this.state.randomContact && 
          (<Text>{this.state.randomContact.name}</Text>) || null
        )} 
      </View>
    )
  }
} // .15 // .23
```
[:top: Top](#top)
[39:16].   

---
### A Compass
- Magnetometer
- DeviceMotion

check on [09_ExpoCompass.js](#09_expocompassjs)

to  use `Magnetometer.addListener(listener)`
https://docs.expo.io/versions/latest/sdk/magnetometer/

Expo components installation
``` console
$ expo install expo-sensors
```


App.js default
``` jsx
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8, },
  //paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
});
```
get CompassFace.png and CompassNeedle.png from Google Images, amd cropped.

.24 image, get image and background image
``` jsx
import * as React from 'react';
import { Image, ImageBackground, Text, View, StyleSheet } from 'react-native'; //.24
import Constants from 'expo-constants';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
      <ImageBackground source={require("./assets/CompassFace.png")} style={{
        height: 320,
        width: 320,
      }}>
      <Image source={require("./assets/CompassNeedle.png")} style={{
        height: 420,
        width: 420,
      }} />
      </ImageBackground>
      </View>
    )
  }
}
```
.25 Align and Opacity for Needle
```jsx
      <View style={styles.container}>
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
        }} />
        </ImageBackground>
      </View>
```
ExpoCli andriod device > ok

.26 ExpoCli of device, Iphone8 working good :+1: 
``` jsx
export default class App extends React.Component {
  state = {
    isReady: false,
    v: null,
  } // .26  .26b as vector

  _setupMagnetometerAsync = async () => {
    Magnetometer.addListener((v) =>{
      this.setState({ v })
    })
  } // .26 

  componentDidMount() {
    this._setupMagnetometerAsync();
  } //.26

  render () {
    return (
      <View style={styles.container}>
      <Text>{JSON.stringify(this.state.v)}</Text>
      ... //.26
```

.27 Theta
``` jsx

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
        <Text>{ JSON.stringify(theta + 'rad')}  {/*.27 */} </Text>
```
https://reactnative.dev/docs/transforms#transform   
The rotate transformations require a string so that the transform may be expressed in degrees (deg) or radians (rad).

.28 ExpoCli device iphone8 work
``` jsx
        <Text>{ //.27 .28b
          JSON.stringify(theta + 'rad')}</Text>
        ...
        <Image source={require("./assets/CompassNeedle.png")} style={{
          height: 403,  // actual height
          width: 51,    // actuals width
          opacity: 0.65, //.25
          transform: [{ rotate: (theta + 'rad') }], //.28b
        }} />        
```

There's not just the magnetometer, but there's
an accelerometer, a gyroscope, a pedometer, GPS, and a camera
And so that whole study of that is called sensor fusion.
And there's sort of a standardized output
from that that's called device motion that has been exposed in iOS APIs
and also in Android APIs.

[:top: Top](#top)

#### Device motion
[47:22]

.29 Image source.   
remove the compass, and add in image
``` jsx
import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native'; //.24
import Constants from 'expo-constants';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Image source={require("./assets/upBalloons.png")} style={{
          height: 727 * 0.7, // .29
          width: 434 * 0.7,
        }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8, },
});

```
https://docs.expo.io/versions/latest/sdk/devicemotion/

.30 image rotate, work on iphone8
``` jsx
...
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
  } // .30

  componentDidMount() {
    this._setupDeviceMotionAsync();
  } //.26 .30

  render () {
    let angle = 0;
    if (this.state.dm && this.state.dm.rotation) {
      angle = this.state.dm.rotation.gamma;
    } // .30 -tive the ballon always up 

    return (
      <View style={styles.container}>
        <Image 
          source={require("./assets/upBalloons.png")} style={{
          height: 727 * 0.7, // .29
          width: 434 * 0.7,
          transform: [{rotate: (angle + 'rad')}],
          }} // .30
        />
      </View>
...
```
To prevent chaky. using  
setupdateInterval(16).   
The reason we do 16 is that iPhones and Android phones
tend to render stuff at, like, 60 frames per second, which is
pretty good for viewing the human eye.
So if you divide 1,000 milliseconds by 60 frames,
you end up with 16 milliseconds.  
.31 App.js device motion
``` jsx
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

```
ExpoCli console
``` js
INFO 00:26
      Object {
        "acceleration": Object {
          "x": 0.7013482583053161,
          "y": -0.015718193428511995,
          "z": 0.1562224061555071,
        },
        "accelerationIncludingGravity": Object {
          "x": -1.318897141902852,
          "y": -4.721281855592565,
          "z": -8.211117822682013,
        },
        "orientation": 0,
        "rotation": Object {
          "alpha": -0.10908095745156736,
          "beta": 0.5002786711124568,
          "gamma": -0.2369100280649448,
        },
        "rotationRate": Object {
          "alpha": -0.03547642379999161,
          "beta": -0.21059390902519226,
          "gamma": -0.1541500687599182,
        },
      }
```
[:top: Top](#top)
[54:38]

---
### A Multimedia Board
- Video
- Audio
- Fonts

check on [09_ExpoMultimedia.js](#09_expomultimediajs)

Expo components installation
``` console
$ expo install expo-av expo-font
```

09_Expo Multimedia, start from .15 App.js  
https://docs.expo.io/versions/latest/sdk/video/  
.32 Video, played once
``` jsx
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Video } from 'expo-av'; // .32

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Cat Sounds</Text>
        <Video source={require("./assets/1.mp4")} style={{
          width: 400,
          height: 400,
        }} //.32

        shouldPlay = {true} 
        />
      </View>
    )
  } //.32
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8, },
  //paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
});
```
.33 Audio silent
``` jsx
import { Video, Audio } from 'expo-av'; // .33

export default class App extends React.Component {
  _setAudioModeAsync = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    })
  } // .33

  UNSAFE_componentWillMount() {
    this._setAudioModeAsync();
  } // .33
  ...
```
.34 Audio setup, can switch to play when on silent mode
``` jsx
  _setAudioModeAsync = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
    })
  } // .33 .34
```
.35 resize
``` jsx
        <Video source={require("./assets/1.mp4")} style={{
          width: 400, height: 400,
        }} //.32
        resizeMode="cover" // .35
        shouldPlay = {true} 
        />
```
.36 CatVideoButton
``` jsx
...
  render() {
    let size = 100; //.36
    return (
      <View style={styles.container}>
        <Text>Cat Sounds</Text>
        <CatVideoButton source={require("./assets/1.mp4")} size={size} /> 
      </View>
    );
  } //.32 .36
}

class CatVideoButton extends React.Component {
  render() {
    return (
      <Video
        source={this.props.source} // .36
        style={{
          width: this.props.width || this.props.size || 400,
          height: this.props.height || this.props.size || 400,
        }} //.32
        resizeMode="cover" // .35
        shouldPlay={true}
      />
    );
  }
} // .36
```
.37 back to first frame
``` jsx
class CatVideoButton extends React.Component {
  resetAync= async () => {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  } // .37

  render() {
    return (
      <Video
        source={this.props.source} // .36
        style={{
          width: this.props.width || this.props.size || 400,
          height: this.props.height || this.props.size || 400,
        }} //.32
        resizeMode="cover" // .35
        shouldPlay={true}
        ref={(c) => {this._video= c;}} // .37
        onPlaybackStatusUpdate={(status => {
          if (status.didJustFinish) {
            this.resetAync();
          } // .37
        })}
      />
    );
  }
} // .36
```
.38 TouchableHighlight, touch the video to play.
``` jsx
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';//.3
...
  render() {
    return (
      <View>
        <TouchableHighlight onPress={()=>{
          console.log("Pressed the cat.")
        }}>
          <View>
            <Video
              source={this.props.source} // .36
...
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  } // .38
```
ExpoCli console
``` js
INFO 14:48
      Pressed the cat.
INFO 14:48
      Pressed the cat.
```

.39 playAsync   
play back status update, https://docs.expo.io/versions/latest/sdk/av/#parameters-1
``` jsx
...

  playAsync = async () => {
    await this._video.replayAsync();
  } // .39

  render() {
    return (
      <View>
        <TouchableHighlight onPress={()=>{
          //console.log("Pressed the cat.")
          this.playAsync(); // .39
        }}>
          <View>
```
.40 style
``` jsx
import { Video, Audio } from 'expo-av'; // .32

let green = "#477009";
let yellow = "#fcd602";
...
  render() {
    let size = 100; //.36
    return (
      <View style={styles.container}>
        <Text style={{color: yellow, fontSize: 42,}}>Cat Sounds</Text>
        <CatVideoButton source={require('./assets/1.mp4')} size={size} />
      </View>
    );
  } //.32 .36
}
...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: green, //.40
    alignItems: "center",
  },
});
```

.41 custom font, AppLoading.    
ExpoCli web ok, but device Android error.
``` jsx
import * as Font from 'expo-font'; // .41
import { AppLoading } from 'expo'; // .41
...
export default class App extends React.Component {
  state = {
    isReady: false,
  } // .41
...

  _loadFontsAsync = async () => {
    await Font.loadAsync({
      CooperBlackRegular: require("./assets/CooperBlackRegular.ttf")
    });
  };// .41

  _setupAsync = async () => {
    await Promise.all([this._setAudioModeAsync(), this._loadFontsAsync()]);
    this.setState({ isReady: true });
  }; // .41b

  UNSAFE_componentWillMount() {
    this._setupAsync();
  } // .33 .41b

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    } // .41 if remove this function, all ok

    let size = 100; //.36
    return (
      <View style={styles.container}>
        <Text style={{ 
          color: yellow, fontSize: 42, fontFamily: "CooperBlackRegular" // .41c
          }}>Cat Sounds</Text>
        <CatVideoButton source={require('./assets/1.mp4')} size={size} />
      </View>
    );
  } //.32 .36
}
```
once error probably due to using `;` rather than misspell.   
:+1: Now ok for Web and devices.

[:top: Top](#top)
[01:20:36]

.42 prelord video
``` jsx
import { Asset } from 'expo-asset'; // .42
...
  _loadAssetsAsync = async () => {
    await Asset.loadAsync([
      require("./assets/1.mp4"),
      require("./assets/4.mp4"),
    ])
  } //.42

  _setupAsync = async () => {
    await Promise.all([
      this._loadAssetsAsync(), // .42
      this._setAudioModeAsync(),
      this._loadFontsAsync(),
    ]);
    this.setState({ isReady: true });
  }; // .41b
...
```
.43 load videos
``` jsx
    let size = 100; //.36
    return (
      <View style={styles.container}>
        <Text style={{ 
          color: yellow, fontSize: 42, fontFamily: "CooperBlackRegular" // .41c
          }}>Cat Sounds</Text>
        <View style={{
          flexDirection: 'row' // .43
        }}>
          <CatVideoButton source={require('./assets/1.mp4')} size={size} />
          <CatVideoButton source={require('./assets/4.mp4')} size={size} />
        </View>
      </View>
    );
  } //.32 .36 .43
}
...
  render() {
    return (
      <View style={{
        margin: 10, // .43c
      }}>
        <TouchableHighlight
```
.44 add more videos, :+1: ok for Web and devices.
``` jsx
  _loadAssetsAsync = async () => {
    await Asset.loadAsync([
      require("./assets/1.mp4"),
      require("./assets/2.mp4"),
      require("./assets/3.mp4"),
      require("./assets/4.mp4"),
      require("./assets/5.mp4"),
      require("./assets/6.mp4"),
    ])
  } //.42
...
    let size = 100; //.36
    return (
      <View style={styles.container}>
        <Text style={{ 
          color: yellow, fontSize: 42, fontFamily: "CooperBlackRegular" // .41c
          }}>Cat Sounds</Text>
        <View style={{
          flexDirection: 'row' // .43
        }}>
          <CatVideoButton source={require('./assets/1.mp4')} size={size} />
          <CatVideoButton source={require('./assets/2.mp4')} size={size} />
          <CatVideoButton source={require('./assets/3.mp4')} size={size} />
        </View>
        <View style={{
          flexDirection: 'row' 
        }}>
          <CatVideoButton source={require('./assets/4.mp4')} size={size} />
          <CatVideoButton source={require('./assets/5.mp4')} size={size} />
        </View>
        <View style={{
          flexDirection: 'row' 
        }}>
          <CatVideoButton source={require('./assets/6.mp4')} size={size} />
        </View>
      </View>
    );
  } //.32 .36 .43 .44
}
```
[:top: Top](#top)
[1:20:36]

---
### A Photo Editor
- ImagePicker
- Simple Camera
- Camera View
- GestureHandler

check on [09_ExpoPhotoEdit.js](#09_expophotoeditjs)

Expo components installation
``` console
$ expo install expo-permissions expo-image-picker expo-image-manipulator expo-camera
```

.45 start
``` jsx
import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Photo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center',
  paddingTop: Constants.statusBarHeight, backgroundColor: '#ecf0f1',},
  paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
}); // .45
```
.46 add photos
``` jsx
export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Photos
        </Text>
        <View style={{flexDirection:'row'}}>
          <Image source={require("./assets/CompassFace.png")} style={{height:200, width:200}} />
          <Image source={require("./assets/upBalloons.png")} style={{height:200, width:200}} />
        </View>
      </View>
    );
  } // .46
}
```
#### Image Picker
: https://docs.expo.io/versions/latest/sdk/imagepicker/

To deal with images and the camera and those kind of things in Expo,
there's kind of two layers of stuff.
ImagePicker.launchImageLibraryAsync(options), 
ImagePicker.launchCameraAsync(options), &
need permission first  

.47 ImagePicker  
``` jsx
import * as React from 'react';
import { Button, Image, Text, View, StyleSheet } from 'react-native'; //.47
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker'; // .47
import * as Permissions from 'expo-permissions'; // .47

export default class App extends React.Component {
  _launchCameraRollAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status != 'granted') {
      console.error("Camera roll perms not granted!");
      return
    }

    let img = ImagePicker.launchImageLibraryAsync();
    console.log(img);
  } // .47

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Photos
        </Text>
        <View style={{flexDirection:'row'}}>
          <Image source={require("./assets/CompassFace.png"")} style={{height:200, width:200}} />
          <Image source={require("./assets/upBalloons.png")} style={{height:200, width:200}} />
        </View>
        <Button title="Launch Camera Roll" onPress={() => {
          this._launchCameraRollAsync();
        }} //.47
        />
      </View>
    );
  } // .46
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center',
  paddingTop: Constants.statusBarHeight, backgroundColor: '#ecf0f1',},
  paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
}); // .45
```
ExpoCli console on web Chrome dev tool
``` js
    index.js:1 Camera roll perms not granted!
```
ExpoCli console on device Andriod
``` js
      Running application on SM-G5510.
      Promise {
        "_40": 0,
        "_55": null,
        "_65": 0,
        "_72": null,
      }
```
``` jsx
    let img = await ImagePicker.launchImageLibraryAsync(); // .47b
    console.log(img);
```
ExpoCli console on device Andriod
``` js
      Object {
        "cancelled": false,
        "height": 901,
        "type": "image",
        "uri": "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540awesome2%252FJun18/ImagePicker/20621e14-0e38-4601-9c01-90de796a04f1.jpg",
        "width": 1600,
      }
```
.48 Pick photo into phone. Photo was picked to screen using ExpoCli device Andriod. 
``` jsx
export default class App extends React.Component {
  state = {
    chosenImage: null,
  } // .48

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

  render () {
    ...

        {(this.state.chosenImage && <Image
            source={{uri: this.state.chosenImage.uri }}
            style={{height: 200, width:200,
            }} />) || null } 
      </View>
    );
  } // .46 .47 //.48
}
```
[1:29:23]
#### launch camera

.49 launch camera
``` jsx
    this.setState({chosenImage: img}); //.48
  } // .47 
  
  _launchCameraAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA)
    if (status != 'granted') {
      console.error("Camera perms not granted!");
      return
    } //.49

    let img = await ImagePicker.launchCameraAsync({}); // .49
    this.setState({takenImage: img});
  } // .49

  render () {
  ...
        }} //.47
        />
        
        <Button title="Launch Camera" onPress={() => {
          this._launchCameraAsync();
        }} //.49
        />
      </View>  
```
.50 allow editing
``` jsx
    let img = await ImagePicker.launchCameraAsync({allowsEditing: true}); // .49 .50
    this.setState({takenImage: img});
  } // .49
```
.51 taken photo on the view. ok > Took photo from camera, and placed onto screen. 
``` jsx
...
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
  } // .46 .47 //.48
}
```
Flip the photo, via ImageManipution   
https://docs.expo.io/versions/v37.0.0/sdk/imagemanipulator/.    
.52 ok can flipped! 
``` jsx
import * as ImageManipulator from "expo-image-manipulator"; // .52

export default class App extends React.Component {
...
    let img = await ImagePicker.launchCameraAsync({allowsEditing: true}); // .49 .50
    let flippedImage= await ImageManipulator.manipulateAsync(
      img.uri,
      [{ flip: ImageManipulator.FlipType.Vertical }],
    );
    this.setState({takenImage: flippedImage});
  } // .49
```

https://docs.expo.io/versions/latest/sdk/camera/  
the actual camera component that's much more customizable.  
.53 camera  
``` jsx
import { Camera } from 'expo-camera'; // .53
...
  _launcCustomCameraAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA);
    if (status != 'granted') {
      console.error("Camera roll perms not granted!");
      return;
    }

    this.setState({
      customCameraReady: true,
    }) 
  } //.53

  render () {
```
.54 launch camera on view
``` jsx
import { Camera } from 'expo-camera'; // .53

export default class App extends React.Component {
  state = {
    chosenImage: null,
    customCameraReady: false, // .54
  } // .48

  componentDidMount() {this._launcCustomCameraAsync();} // .54
...
  _launcCustomCameraAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA)
    if (status != 'granted') {
      console.error("Camera perms not granted!");
      return
    }

    this.setState({
      customCameraReady: true,
    }) 
  } //.53

  render () {
...

        {(this.state.customCameraReady && (
          <Camera style={{ width: 400, height: 400,}}  //.54
          type={Camera.Constants.Type.back} />
        ) || null )}
        
        {(this.state.chosenImage && <Image
```
So one thing we can do is we can make it flip back and forth between modes just
by having you tap on it.
.55 state cameraType
``` jsx
export default class App extends React.Component {
  state = {
    chosenImage: null,
    customCameraReady: false, // .54
    cameraType: Camera.Constants.Type.back, //.55
  } // .48
...
        {(this.state.customCameraReady && (
          <Camera style={{ width: 400, height: 400,}}  //.54  .55
          type={this.state.cameraType} />
        ) || null )}
```
.55b TouchableHighlight. Unable to work on device Andriod, but work on iphone8
``` jsx
import * as React from 'react';
import {Button,Image,Text,TouchableHighlight,View,StyleSheet} from 'react-native'; //.47.55b
...
        {(this.state.customCameraReady && 
          <TouchableHighlight 
            onPress={() => {
            console.log("Tapped??")
          }}>
          <Camera style={{ width: 400, height: 400,}}  //.54  .55 .55b
          type={this.state.cameraType} />
          </TouchableHighlight>
        ) || null}
```
.56 flied camera to and fro.
``` jsx
        {(this.state.customCameraReady && 
          <TouchableHighlight 
            onPress={() => {
              console.log(this.state.cameraType);
              if (this.state.cameraType === Camera.Constants.Type.back) {
                this.setState({ cameraType: Camera.Constants.Type.front});
              } else {
                this.setState({ cameraType: Camera.Constants.Type.back});
              } // .56
          }}>
          <Camera style={{ width: 400, height: 400,}}  //.54  .55 .55b
          type={this.state.cameraType} />
          </TouchableHighlight>
        ) || null}
```
.57 flipCamera. It only work on ExpoCli device iphone8
``` jsx
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
...
        {(this.state.customCameraReady && 
          <TouchableHighlight 
            onPress={() => {
              this._flipCamera(); // .57
          }}>
          <Camera style={{ width: 400, height: 400,}}  //.54  .55 .55b
          type={this.state.cameraType} />
          </TouchableHighlight>
        ) || null}
```
[:top: Top](#top)

---
### Other APIs
- Push Notifications
- Calendar
- Gyroscope, Accelerometer, Pedometer
- OpenGL View
- Facebook Login, Google Login
- Ads (AdMob/Google, Facebook)
- Fingerprint Scanner
- SecureStore
- SQLite
- Analytics (Amplitude, Segment)
- Sentry (stacktraces)
* See https://docs.expo.io/

[:top: Top](#top)

#### Notes
https://github.com/ccheever/harvard-guest-lecture


---
my Source Code
---
All tested good thru Expo Cli, with device iPhone8.   
Some tested ok thru Snack, with Andriod device, sometime simulator.
#### 09_Expo
App.js
``` jsx
//import Example from './09_ExpoMap';  // ok
//import Example from './09_ExpoContacts';  // ok
//import Example from './09_ExpoCompass'; // device iphone8 ok
//import Example from './09_ExpoDeviceMotion'; // device iphone8 ok
import Example from './09_ExpoMultimedia'; // good
//import Example from './09_ExpoPhotoEdit'; // good
//import Example from './09_ExpoEmpty'; // ok
export default Example;
```
[:top: Top](#top)

#### 09_ExpoMap.js
``` jsx
// last updated Jun20,'20

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

```
[:top: Top](#top)

#### 09_ExpoContacts.js
``` jsx
// last updated on Jun20,'20
import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Contacts from 'expo-contacts'; // .17
import * as Permissions from 'expo-permissions';  // .17

export default class App extends React.Component {
  state = {
    randomContact:null,
  } // .23

  _getRandomContactAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.CONTACTS);
    if (status !== 'granted') {
      console.error("Permission not granted");
      return;
    } // .17
    //console.log("ok?")
    let contacts = await Contacts.getContactsAsync({
      pageSize: 3,
      pageOffset: 0,
      fields: [Contacts.PHONE_NUMBERS], // .22
    }); // .18 .19
    
    let {total} = contacts;
    let n = Math.floor(Math.random() * total); // .20
    console.log(n) 

    let randomContacts = await Contacts.getContactsAsync({
      pageSize: 100, // .22b
      pageOffset: n,
      fields: [Contacts.PHONE_NUMBERS], // .22
    }); // .21

    let {data} = randomContacts;
    let c = data[n]; // .22b

    this.setState({
      randomContact: c,
    }) // .23
    console.log(c);  
  }

  render () {
    return (
      <View style={styles.container}>
        <Button  title="Pick a Random Contact" onPress={() => {
            this._getRandomContactAsync(); // .18
          }}
        />
        {(this.state.randomContact &&
          (<Text>{this.state.randomContact.name}</Text>) || null
        )}
      </View>
    )
  }
} // .15 // .23

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8, },
  //paragraph: { margin: 24, fontSize: 18, fontWeight: 'bold', textAlign: 'center', },
});
```
[:top: Top](#top)

#### 09_ExpoCompass.js
``` jsx
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

```
[:top: Top](#top)

#### 09_ExpoDeviceMotion.js
``` jsx
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

```
[:top: Top](#top)

#### 09_ExpoMultimedia.js
``` jsx
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
```
[:top: Top](#top)

#### 09_ExpoPhotoEdit.js
``` jsx
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

```
[:top: Top](#top)

#### 09_ExpoEmpty.js
``` jsx
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ExpoEmpty extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>09_ExpoEmpty, for testing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#ecf0f1' },
  paragraph: { fontSize: 18, textAlign: 'center' },
});
```
#### snack> package.json
``` js
{
  "dependencies": {
    "expo-av": "8.1.0",
    "expo-font": "8.1.1",
    "expo-sensors": "8.1.0",
    "expo-contacts": "8.1.0",
    "expo-location": "8.1.0",
    "expo-permissions": "8.1.0",
    "react-navigation": "2.0.0",
    "react-native-maps": "0.27.1",
    "react-native-paper": "3.6.0",
    "expo-image-manipulator": "8.1.0",
    "expo-image-picker": "8.1.0",
    "expo-camera": "8.2.0"
  }
}
```
[:top: Top](#top)

---
cs50 Source Code
---
#### App.js
``` jsx
// revised from original App.js. Last updated Jun23,'20
import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
//import Constants from 'expo-constants';
import { Video, Audio } from 'expo-av';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

let green = "#477009";
let yellow = "#fcd602";

export default class App extends React.Component {
  state = {
    isReady: false
  };

  _setAudioModeAsync = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
    });
  };

  _loadFontsAsync = async () => {
    await Font.loadAsync({
      CooperBlackRegular: require("./assets/CooperBlackRegular.ttf")
    });
  };

  _loadAssetsAsync = async () => {
    await Asset.loadAsync([
      require("./assets/1.mp4"),
      require("./assets/2.mp4"),
      require("./assets/3.mp4"),
      require("./assets/4.mp4"),
      require("./assets/5.mp4"),
      require("./assets/6.mp4"),
      require("./assets/7.mp4"),
      require("./assets/8.mp4"),
      require("./assets/9.mp4")
    ]);
  };

  _setupAsync = async () => {
    await Promise.all([
      this._loadAssetsAsync(),
      this._setAudioModeAsync(),
      this._loadFontsAsync()
    ]);
    this.setState({ isReady: true });
  };

  UNSAFE_componentWillMount() {
    this._setupAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    let size = 100;
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: yellow,
            fontSize: 42,
            fontFamily: "CooperBlackRegular"
          }}
        >
          Cat Sounds
        </Text>

        <View
          style={{
            flexDirection: "row"
          }}
        >
          <CatVideoButton source={require("./assets/1.mp4")} size={size} />
          <CatVideoButton source={require("./assets/2.mp4")} size={size} />
          <CatVideoButton source={require("./assets/3.mp4")} size={size} />
        </View>

        <View
          style={{
            flexDirection: "row"
          }}
        >
          <CatVideoButton source={require("./assets/4.mp4")} size={size} />
          <CatVideoButton source={require("./assets/5.mp4")} size={size} />
          <CatVideoButton source={require("./assets/6.mp4")} size={size} />
        </View>

        <View
          style={{
            flexDirection: "row"
          }}
        >
          <CatVideoButton source={require("./assets/7.mp4")} size={size} />
          <CatVideoButton source={require("./assets/8.mp4")} size={size} />
          <CatVideoButton source={require("./assets/9.mp4")} size={size} />
        </View>
      </View>
    );
  }
}

class CatVideoButton extends React.Component {
  resetAsync = async () => {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  };

  playAsync = async () => {
    await this._video.replayAsync();
  };

  render() {
    return (
      <View
        style={{
          margin: 10
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.playAsync();
          }}
        >
          <View>
            <Video
              source={this.props.source}
              style={{
                width: this.props.width || this.props.size || 400,
                height: this.props.height || this.props.size || 400
              }}
              resizeMode="cover"
              shouldPlay={true}
              ref={c => {
                this._video = c;
              }}
              onPlaybackStatusUpdate={status => {
                if (status.didJustFinish) {
                  this.resetAsync();
                }
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: green,
    alignItems: "center",
    justifyContent: "center"
  }
});
```

[:top: Top](#top)

#### package.json
from ExpoCli
``` jsx
{
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "expo": "~37.0.3",
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-37.0.1.tar.gz",
    "react-native-web": "~0.11.7",
    "react-navigation": "^2.0.0",
    "react-native-maps": "0.26.1",
    "expo-permissions": "~8.1.0",
    "expo-location": "~8.1.0",
    "expo-sensors": "~8.1.0",
    "expo-contacts": "~8.1.0",
    "expo-av": "~8.1.0",
    "expo-image-manipulator": "~8.1.0",
    "expo-font": "~8.1.0",
    "expo-image-picker": "~8.1.0",
    "expo-camera": "~8.2.0"
  },
  "devDependencies": {
    "babel-preset-expo": "~8.1.0",
    "@babel/core": "^7.8.6"
  },
  "private": true
}
```

[:top: Top](#top)

---
myNote
---
### Expo components installation
```
ctrl-C at the Expo Cli terminal to exit 
$ expo --version
3.21.5
$ expo install react-native-maps expo-permissions expo-location
$ expo install expo-contacts
$ expo install expo-sensors
$ expo install expo-av expo-font
$ expo install expo-image-picker expo-image-manipulator expo-camera
$ npm start
```

### my expo.io/ snacks: https://expo.io/snacks/@awesome2/.  
https://expo.io/@react-navigation/NavigationPlayground  
https://reactnative.dev/docs/getting-started  

### MarkDown
:joy: https://www.markdownguide.org/basic-syntax/     
:sunny: https://www.markdownguide.org/extended-syntax/  

GitHub Flavored Markdown Spec https://github.github.com/gfm/

---
### debug
.20 random,
``` jsx
    let {total} = contacts;
    let n = Math.floor(Math.random() * total); // .20
    console.log(n) // .20
```
.22b c = data[n]
``` jsx
    let {data} = randomContacts;
    let c = data[n]; // .22b
    console.log(c);
```
.26
``` jsx
      <Text>{JSON.stringify(this.state.v)}</Text>
```
[:top: Top](#top)

#### Git branch 09_ExpoComponents
```
    Ts-MacBook-Pro:cs50m twng$ cat .gitignore
    .DS_Store
    /Jun18
    /before
    /after
    .gitignore
    Ts-MacBook-Pro:cs50m twng$ git branch -v
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push -u origin 09_ExpoComponents
```
checked on github, https://github.com/alvinng222/cs50m/tree/09_ExpoComponents

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   
back to previous: [08_Data](https://github.com/alvinng222/cs50m/tree/08_Data)  
continue to next: [10_Redux](https://github.com/alvinng222/cs50m/tree/10_Redux).

---
[:top: Top](#top)
