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
