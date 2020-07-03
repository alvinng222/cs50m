Source Code files: src12.zip
===
[top]: topOfThePage
Date: 2019

[before/...](#before)
`~/cs50m/src12/before/ $ ls -1`
AddContactForm.js
App.js
FlatListContacts.js
Row.js
ScrollViewContacts.js
SectionListContacts.js
api.js
app.json
contacts.js
package-lock.json
package.json
assets/icon.png
assets/splash.png

before/authServer/...
    README.md
    index.js
    package-lock.json
    package.json

before/redux/...
    actions.js
    reducer.js
    store.js

before/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    LoginScreen.js
    SettingsScreen.js

before/simpleRedux/...
    reducer.js
    store.js
    store2.js
    store3.js



[after/...](#after)
`~/cs50m/src12/after/ $ ls -1`
AddContactForm.js
App.js
FlatListContacts.js
Row.js
ScrollViewContacts.js
SectionListContacts.js
api.js
app.json
contacts.js
package-lock.json
package.json
assets/icon.png
assets/splash.png

after/authServer/...
    README.md
    index.js
    package-lock.json
    package.json

after/components/...
    MyButton.js
    MyButton.test.js
    __snapshots__/MyButton.test.js.snap

after/redux/...
    __snapshots__/
    actions.js
    actions.test.js
    reducer.js
    reducer.test.js
    store.js
  
after/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    LoginScreen.js
    SettingsScreen.js

after/simpleRedux/...
    reducer.js
    store.js
    store2.js
    store3.js

after/testing/...
    sum.js
    sum.test.js

[**myNote**](#mynote)

---
---
Source Code
---
[:top: Top](#top) 
[before/...](#before)
[after/...](#after) 
### before/...
####  before/AddContactForm.js
``` jsx
import React from 'react'
import {Button, KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native'

export default class AddContactForm extends React.Component {
  state = {
    name: '',
    phone: '',
    isFormValid: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
      this.validateForm()
    }
  }

  getHandler = key => val => {
    this.setState({[key]: val})
  }

  handleNameChange = this.getHandler('name') // val => { this.setState({name: val}) }
  handlePhoneChange = this.getHandler('phone')

  /*
  handleNameChange = name => {
    this.setState({name})
  }
  */

  handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10) {
      this.setState({phone})
    }
  }

  validateForm = () => {
    console.log(this.state)
    const names = this.state.name.split(' ')
    if (
      +this.state.phone >= 0 &&
      this.state.phone.length === 10 &&
      names.length >= 2 &&
      names[0] &&
      names[1]
    ) {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  validateForm2 = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3) {
      return true
    }
    return false
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.getHandler('name')}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.getHandler('phone')}
          placeholder="Phone"
        />
        <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
})

```
[:top: Top](#top) 

#### before/App.js
``` jsx
import React from 'react'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AddContactScreen from './screens/AddContactScreen'
import SettingsScreen from './screens/SettingsScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import {fetchUsers} from './api'
import contacts from './contacts'
import {store, persistor} from './redux/store'

const MainStack = createStackNavigator(
  {
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen,
    AddContact: AddContactScreen,
  },
  {
    initialRouteName: 'ContactList',
    navigationOptions: {
      headerTintColor: '#a41034',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  }
)

MainStack.navigationOptions = {
  tabBarIcon: ({focused, tintColor}) => (
    <Ionicons name={`ios-contacts${focused ? '' : '-outline'}`} size={25} color={tintColor} />
  ),
}

const MainTabs = createBottomTabNavigator(
  {
    Contacts: MainStack,
    Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: '#a41034',
    },
  }
)

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabs,
})

export default class App extends React.Component {
  state = {
    contacts,
  }

  /*
  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
  }
  */

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }))
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}

```
[:top: Top](#top) 

#### before/contacts.js
``` jsx
const NUM_CONTACTS = 3

const firstNames = [ 'Emma', 'Noah', 'Olivia', 'Liam', 'Ava', 'William', 'Sophia', 'Mason', 'Isabella',
'James', 'Mia', 'Benjamin', 'Charlotte', 'Jacob', 'Abigail', 'Michael', 'Emily', 'Elijah', 'Harper',
'Ethan', 'Amelia', 'Alexander', 'Evelyn', 'Oliver', 'Elizabeth', 'Daniel', 'Sofia', 'Lucas', 'Madison',
'Matthew', 'Avery', 'Aiden', 'Ella', 'Jackson', 'Scarlett', 'Logan', 'Grace', 'David', 'Chloe', 'Joseph',
'Victoria', 'Samuel', 'Riley', 'Henry', 'Aria', 'Owen', 'Lily', 'Sebastian', 'Aubrey', 'Gabriel', 'Zoey',
'Carter', 'Penelope', 'Jayden', 'Lillian', 'John', 'Addison', 'Luke', 'Layla', 'Anthony', 'Natalie',
'Isaac', 'Camila', 'Dylan', 'Hannah', 'Wyatt', 'Brooklyn', 'Andrew', 'Zoe', 'Joshua', 'Nora',
'Christopher', 'Leah', 'Grayson', 'Savannah', 'Jack', 'Audrey', 'Julian', 'Claire', 'Ryan', 'Eleanor',
'Jaxon', 'Skylar', 'Levi', 'Ellie', 'Nathan', 'Samantha', 'Caleb', 'Stella', 'Hunter', 'Paisley',
'Christian', 'Violet', 'Isaiah', 'Mila', 'Thomas', 'Allison', 'Aaron', 'Alexa', 'Lincoln', ]

const lastNames = [ 'Smith', 'Jones', 'Brown', 'Johnson', 'Williams', 'Miller', 'Taylor', 'Wilson', 'Davis',
'White', 'Clark', 'Hall', 'Thomas', 'Thompson', 'Moore', 'Hill', 'Walker', 'Anderson', 'Wright', 'Martin',
'Wood', 'Allen', 'Robinson', 'Lewis', 'Scott', 'Young', 'Jackson', 'Adams', 'Tryniski', 'Green', 'Evans',
'King', 'Baker', 'John', 'Harris', 'Roberts', 'Campbell', 'James', 'Stewart', 'Lee', 'County', 'Turner',
'Parker', 'Cook', 'Mc', 'Edwards', 'Morris', 'Mitchell', 'Bell', 'Ward', 'Watson', 'Morgan', 'Davies',
'Cooper', 'Phillips', 'Rogers', 'Gray', 'Hughes', 'Harrison', 'Carter', 'Murphy', ]

// generate a random number between min and max
const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

// generate a name
const generateName = () =>
  `${firstNames[rand(firstNames.length - 1)]} ${lastNames[rand(lastNames.length - 1)]}`

// generate a phone number
const generatePhoneNumber = () => `${rand(999, 100)}-${rand(999, 100)}-${rand(9999, 1000)}`

// create a person
const createContact = () => ({
  name: generateName(),
  phone: generatePhoneNumber(),
})

// compare two contacts for alphabetizing
export const compareNames = (contact1, contact2) => contact1.name > contact2.name

// add keys to based on index
const addKeys = (val, key) => ({key, ...val})

// create an array of length NUM_CONTACTS and add keys
export default Array.from({length: NUM_CONTACTS}, createContact).map(addKeys)

```
[:top: Top](#async-redux-tools)

#### before/FlatListContacts.js
``` jsx
import React from 'react'
import {FlatList} from 'react-native'
import PropTypes from 'prop-types'

import Row from './Row'

const renderItem = ({item}) => <Row {...item} />

const FlatListContacts = props => <FlatList renderItem={renderItem} data={props.contacts} />

FlatListContacts.propTypes = {
  contacts: PropTypes.array,
}

export default FlatListContacts

```
#### before/Row.js
``` jsx
import React from 'react'
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  row: {padding: 20},
})

const Row = props => (
  <TouchableOpacity style={styles.row} onPress={() => props.onSelectContact(props)}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </TouchableOpacity>
)

Row.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
}

export default Row

```
[:top: Top](#top) 

#### before/ScrollViewContacts.js
``` jsx
import React from 'react'
import {ScrollView} from 'react-native'
import PropTypes from 'prop-types'

import Row from './Row'

const ScrollViewContacts = props => (
  <ScrollView>{props.contacts.map(contact => <Row {...contact} />)}</ScrollView>
)

ScrollViewContacts.propTypes = {
  contacts: PropTypes.array,
}

export default ScrollViewContacts

```
#### before/SectionListContacts.js
``` jsx
import React from 'react'
import {SectionList, Text} from 'react-native'
import PropTypes from 'prop-types'

import Row from './Row'

const renderSectionHeader = ({section}) => <Text>{section.title}</Text>

const SectionListContacts = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})

  const sections = Object.keys(contactsByLetter)
    .sort()
    .map(letter => ({
      data: contactsByLetter[letter],
      title: letter,
    }))

  return (
    <SectionList
      keyExtractor={item => item.phone}
      sections={sections}
      renderItem={({item}) => <Row {...item} onSelectContact={props.onSelectContact} />}
      renderSectionHeader={renderSectionHeader}
    />
  )
}

SectionListContacts.propTypes = {
  contacts: PropTypes.array,
}

export default SectionListContacts

```
[:top: Top](#top) 
#### before/api.js
``` js
const processContact = contact => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
})

export const fetchUsers = async () => {
  const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
  const {results} = await response.json()
  return results.map(processContact)
}

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8000', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username, password}),
  })

  if (response.ok) {
    const {token} = await response.json()
    return token
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

export const poorlyFormatted = usedVar => usedVar

```
#### before/app.json
``` js
{
  "expo": {
    "name": "list-examples",
    "description": "This project is really great.",
    "slug": "list-examples",
    "privacy": "public",
    "sdkVersion": "25.0.0",
    "platforms": ["ios", "android"],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    }
  }
}

```
#### before/package-lock.json
large file
#### before/package.json
``` js
{
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "scripts": {
    "lint": "eslint api.js screens/"
  },
  "dependencies": {
    "expo": "^25.0.0",
    "isomorphic-fetch": "^2.2.1",
    "prop-types": "^15.6.1",
    "react": "16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz",
    "react-native-vector-icons": "^4.5.0",
    "react-navigation": "2.0.0-beta.5",
    "react-redux": "^5.0.7",
    "redux": "^3.7.2",
    "redux-persist": "^5.9.1",
    "redux-thunk": "^2.2.0"
  },
  "devDependencies": {
    "eslint": "^4.19.1",
    "eslint-config-kensho": "^4.0.1",
    "eslint-plugin-react": "^7.7.0",
    "prettier": "^1.12.0"
  }
}

```
#### before/assets/icon.png
#### before/assets/splash.png   
[:top: Top](#top) 
### before/authServer/...
#### before/authServer/README.md
``` markdown
# Mock Authentication Server
This is a simple mock auth server. You can POST to any endpoint and it will act as a login.

There is only one user with username: `username` and password: `password`. There is no
way to add new users.

## Installation
- Install dependencies with `npm install`
- Run the server with `npm start`
- Visit [http://localhost:8000](http://localhost:8000)

You can optionally declare a `PORT` env variable to override the default port:
- `PORT=12345 npm start`
- Visit [http://localhost:12345](http://localhost:12345)

```
#### before/authServer/index.js
``` jsx
const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8000

// usernames are keys and passwords are values
const users = {
  username: 'password',
}

const app = express()
app.use(bodyParser.json())

app.post('*', (req, res) => {
  const {username, password} = req.body

  if (!username || !password) return res.status(400).send('Missing username or password')
  // in practice, this is potentially revealing too much information.
  // an attacker can probe the server to find all of the usernames.
  if (!users[username]) return res.status(403).send('User does not exist')
  if (users[username] !== password) return res.status(403).send('Incorrect password')
  return res.json({token: 'thisIsARealToken'})
})

// catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => res.status(err.status || 500).send(err.message || 'There was a problem'))

const server = app.listen(PORT)
console.log(`Listening at http://localhost:${PORT}`)

```
#### before/authServer/package-lock.json
large file
#### before/authServer/package.json  
``` js
{
  "name": "authserver",
  "version": "1.0.0",
  "description": "Simple auth server for a demo",
  "main": "index.js",
  "scripts": {
    "start": "node index"
  },
  "author": "Jordan Hayashi",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.2",
    "express": "^4.16.3"
  }
}

```
[:top: Top](#top) 
### before/redux/...
#### before/redux/actions.js
``` jsx
import {login} from '../api'

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

// async action creator
export const logInUser = (username, password) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await login(username, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message})
  }
}

```
#### before/redux/reducer.js
``` jsx
import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_SENT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
    case LOG_IN_FULFILLED:
      return merge(state, {token: action.payload})
    case LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload})
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export default reducer

```
#### before/redux/store.js  
``` jsx
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {addContact} from './actions'
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

  /*
const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    action(store.dispatch)
  } else {
    next(action)
  }
}
*/

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

/*
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'david m', phone: '5050505050'}))

console.log(store.getState())
*/

```
[:top: Top](#top) 
### before/screens/...
#### before/screens/AddContactScreen.js
``` jsx
import React from 'react'
import AddContactForm from '../AddContactForm'
import {connect} from 'react-redux'

import {addContact} from '../redux/actions'

class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'New Contact',
  }

  handleSubmit = formState => {
    this.props.addContact({name: formState.name, phone: formState.phone})
    this.props.navigation.navigate('ContactList')
  }

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />
  }
}

export default connect(null, {addContact: addContact})(AddContactScreen)

```
#### before/screens/ContactDetailsScreen.js
``` jsx
import React from 'react'
import {Button, Text, View} from 'react-native'

export default class ContactDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('name'),
  })

  render() {
    return (
      <View>
        <Text>{this.props.navigation.getParam('phone')}</Text>
        <Button title="Go to random contact" onPress={this.goToRandomContact} />
      </View>
    )
  }

  goToRandomContact = () => {
    const {contacts} = this.props.screenProps
    const phone = this.props.navigation.getParam('phone')
    let randomContact
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length)
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex]
      }
    }

    // this.props.navigation.navigate('ContactDetails', {
    //   ...randomContact,
    // });
    this.props.navigation.push('ContactDetails', {
      ...randomContact,
    })
  }
}

```
#### before/screens/ContactListScreen.js
``` jsx
import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import SectionListContacts from '../SectionListContacts'

class ContactListScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Contacts',
    headerRight: (
      <Button title="Add" onPress={() => navigation.navigate('AddContact')} color="#a41034" />
    ),
  })

  state = {
    showContacts: true,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  handleSelectContact = contact => {
    this.props.navigation.push('ContactDetails', contact)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && (
          <SectionListContacts
            contacts={this.props.contacts}
            onSelectContact={this.handleSelectContact}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = state => ({
  contacts: state.contacts,
})

export default connect(mapStateToProps)(ContactListScreen)

```
#### before/screens/LoginScreen.js 
``` jsx
import React from 'react'
import {Button, View, StyleSheet, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {logInUser} from '../redux/actions'

class LoginScreen extends React.Component {
  static propTypes = {
    err: PropTypes.string,
    token: PropTypes.string,
    logInUser: PropTypes.func,
  }

  state = {
    username: '',
    password: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.navigation.navigate('Main')
    }
  }

  _login = async () => {
    this.props.logInUser(this.state.username, this.state.password)
  }

  handleUsernameUpdate = username => {
    this.setState({username})
  }

  handlePasswordUpdate = password => {
    this.setState({password})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.props.err}</Text>
        <TextInput
          placeholder="username"
          value={this.state.username}
          onChangeText={this.handleUsernameUpdate}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="password"
          value={this.state.password}
          onChangeText={this.handlePasswordUpdate}
          secureTextEntry
        />
        <Button title="Press to Log In" onPress={this._login} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
})

const mapStateToProps = state => ({
  err: state.user.loginErr,
  token: state.user.token,
})

export default connect(mapStateToProps, {logInUser})(LoginScreen)

```
#### before/screens/SettingScreen.js
``` jsx
import React from 'react'
import {Button, View, StyleSheet, Text} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
      <Ionicons name={`ios-options${focused ? '' : '-outline'}`} size={25} color={tintColor} />
    ),
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings coming soon.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
})

```

[:top: Top](#top) 
### before/simpleRedux/...
#### before/simpleRedux/reducer.js
``` jsx
const merge = (prev, next) => Object.assign({}, prev, next)

const reducer = (state, update) => merge(state, update)

let state = {}
state = reducer(state, {foo: 'foo'})
state = reducer(state, {bar: 'bar'})
state = reducer(state, {foo: 'baz'})

console.log(state)

```
#### before/simpleRedux/store.js
``` jsx
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer
    this.state = initialState
  }

  getState() {
    return this.state
  }

  dispatch(update) {
    this.state = this.reducer(this.state, update)
  }
}

const merge = (prev, next) => Object.assign({}, prev, next)

const reducer = (state, update) => merge(state, update)

const store = new Store(reducer)
store.dispatch({foo: 'foo'})
store.dispatch({bar: 'bar'})
store.dispatch({foo: 'baz'})

console.log(store.getState())

```
#### before/simpleRedux/store2.js
``` jsx
// action types
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_CONTACT = 'UPDATE_CONTACT'

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer
    this.state = initialState
  }

  getState() {
    return this.state
  }

  dispatch(update) {
    this.state = this.reducer(this.state, update)
  }
}

const DEFAULT_STATE = {user: {}, contacts: []}

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state, action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state, action) => {
  if (action.type === UPDATE_USER) return merge(state, action.payload)
  if (action.type === UPDATE_CONTACT) return merge(state, {prevContact: action.payload})
  return state
}

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
})

// action creators
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

const store = new Store(reducer, DEFAULT_STATE)
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
store.dispatch(addContact({name: 'david m', number: '5050505050'}))

console.log(store.getState())

```
[:top: Top](#top) 

#### before/simpleRedux/store3.js
``` jsx
const fetch = require('isomorphic-fetch')

const login = async (username, password) => {
  const response = await fetch('http://localhost:8000', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username, password}),
  })

  if (response.ok) {
    return true
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

// action types
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_CONTACT = 'UPDATE_CONTACT'

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer
    this.state = initialState
  }

  getState() {
    return this.state
  }

  dispatch(action) {
    if (typeof action === 'function') {
      action(this.dispatch.bind(this))
    } else {
      console.log('received an action:', action.type)
      this.state = this.reducer(this.state, action)
    }
  }
}

const DEFAULT_STATE = {user: {}, contacts: []}

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state, action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
    case 'LOG_IN_SUCCESS':
      return merge(state, {token: 'fakeToken'})
    default:
      return state
  }
}

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
})

// action creators
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

// async action creator
const logInUser = (username, password) => dispatch => {
  dispatch({type: 'LOG_IN_SENT'})
  login(username, password)
    .then(() => {
      dispatch({type: 'LOG_IN_SUCCESS'})
    })
    .catch(err => {
      dispatch({type: 'LOG_IN_REJECTED'})
    })
}


const store = new Store(reducer, DEFAULT_STATE)

store.dispatch(logInUser('username', 'password'))

  /*
store.dispatch(logInUser())
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
store.dispatch(addContact({name: 'david m', number: '5050505050'}))
*/

console.log(store.getState())

```
---
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)


---
### after/...

#### AddContactForm.js
Files ./after/AddContactForm.js and ./before/AddContactForm.js are identical

#### App.js
Files ./after/App.js and ./before/App.js are identical

#### FlatListContacts.js
Files ./after/FlatListContacts.js and ./before/FlatListContacts.js are identical

#### Row.js
Files ./after/Row.js and ./before/Row.js are identical

#### ScrollViewContacts.js
Files ./after/ScrollViewContacts.js and ./before/ScrollViewContacts.js are identical

#### SectionListContacts.js
Files ./after/SectionListContacts.js and ./before/SectionListContacts.js are identical

#### api.js
Files ./after/api.js and ./before/api.js are identical

#### app.json
Files ./after/app.json and ./before/app.json are identical

#### contacts.js
Files ./after/contacts.js and ./before/contacts.js are identical

#### package-lock.json
large file

#### package.json
``` jsx
{
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "scripts": {
    "lint": "eslint api.js screens/",
    "test": "jest --verbose",
    "test:watch": "jest --watch --verbose"
  },
  "dependencies": {
    "expo": "^25.0.0",
    "isomorphic-fetch": "^2.2.1",
    "prop-types": "^15.6.1",
    "react": "16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz",
    "react-native-vector-icons": "^4.5.0",
    "react-navigation": "2.0.0-beta.5",
    "react-redux": "^5.0.7",
    "redux": "^3.7.2",
    "redux-persist": "^5.9.1",
    "redux-thunk": "^2.2.0"
  },
  "devDependencies": {
    "eslint": "^4.19.1",
    "eslint-config-kensho": "^4.0.1",
    "eslint-plugin-react": "^7.7.0",
    "jest": "^22.4.3",
    "jest-expo": "^27.0.1",
    "prettier": "^1.12.0",
    "react-test-renderer": "^16.3.2"
  },
  "jest": {
    "preset": "jest-expo"
  }
}

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/authServer/README.md
Files ./after/authServer/README.md and ./before/authServer/README.md are identical

#### after/authServer/index.js
Files ./after/authServer/index.js and ./before/authServer/index.js are identical

#### after/authServer/package-lock.json
Files ./after/authServer/package-lock.json and ./before/authServer/package-lock.json are identical

#### after/authServer/package.json
Files ./after/authServer/package.json and ./before/authServer/package.json are identical

[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/components/MyButton.js
``` jsx
import React from 'react'
import {Button} from 'react-native'
import PropTypes from 'prop-types'

const MyButton = props => <Button title="test" onPress={() => {}} color={props.color || 'green'} />

MyButton.propTypes = {
  color: PropTypes.string,
}

export default MyButton

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/components/MyButton.test.js
``` jsx
/* eslint-disable */

import React from 'react'
import {Button} from 'react-native'
import renderer from 'react-test-renderer'

import MyButton from './MyButton'

const getUnderlyingButton = testInstance => testInstance.root.findByType(Button)

describe('MyButton', () => {
  it('renders', () => {
    const button = renderer.create(<MyButton />).toJSON()
    expect(button).toMatchSnapshot()
  })

  it('correctly overrides default color', () => {
    const color = 'red'
    const button = getUnderlyingButton(renderer.create(<MyButton color={color} />))
    expect(button.props.color).toBe(color)

    const color2 = 'blue'
    const button2 = getUnderlyingButton(renderer.create(<MyButton color={color2} />))
    expect(button2.props.color).toBe(color2)
  })
})

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/components/__snapshots__/MyButton.test.js.snap
``` jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`MyButton renders 1`] = `
<View
  accessibilityComponentType="button"
  accessibilityLabel={undefined}
  accessibilityTraits={
    Array [
      "button",
    ]
  }
  accessible={true}
  collapsable={undefined}
  hasTVPreferredFocus={undefined}
  hitSlop={undefined}
  isTVSelectable={true}
  nativeID={undefined}
  onLayout={undefined}
  onResponderGrant={[Function]}
  onResponderMove={[Function]}
  onResponderRelease={[Function]}
  onResponderTerminate={[Function]}
  onResponderTerminationRequest={[Function]}
  onStartShouldSetResponder={[Function]}
  style={
    Object {
      "opacity": 1,
    }
  }
  testID={undefined}
  tvParallaxProperties={undefined}
>
  <View
    style={
      Array [
        Object {},
      ]
    }
  >
    <Text
      accessible={true}
      allowFontScaling={true}
      disabled={undefined}
      ellipsizeMode="tail"
      style={
        Array [
          Object {
            "color": "#007AFF",
            "fontSize": 18,
            "padding": 8,
            "textAlign": "center",
          },
          Object {
            "color": "green",
          },
        ]
      }
    >
      test
    </Text>
  </View>
</View>
`;

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/__snapshots__/actions.test.js.snap
``` jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`logInUser returns actions dispatches LOG_IN_FULFILLED with correct creds 1`] = `
Array [
  Object {
    "payload": "thisIsATestToken",
    "type": "LOG_IN_FULFILLED",
  },
]
`;

exports[`logInUser returns actions dispatches LOG_IN_REJECTED with incorrect creds 1`] = `
Array [
  Object {
    "payload": "incorrect creds",
    "type": "LOG_IN_REJECTED",
  },
]
`;

exports[`updateUser returns actions handles empty name 1`] = `
Object {
  "payload": Object {
    "name": "",
  },
  "type": "UPDATE_USER",
}
`;

exports[`updateUser returns actions handles empty object 1`] = `
Object {
  "payload": Object {},
  "type": "UPDATE_USER",
}
`;

exports[`updateUser returns actions returns an action 1`] = `
Object {
  "payload": Object {
    "name": "test name",
  },
  "type": "UPDATE_USER",
}
`;

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/__snapshots__/reducer.test.js.snap
``` jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`contact reducer successfully adds new user 1`] = `
Object {
  "contacts": Array [
    Object {
      "name": "test user",
      "phone": "1234567890",
    },
  ],
  "user": Object {
    "prevContact": Object {
      "name": "test user",
      "phone": "1234567890",
    },
  },
}
`;

exports[`user reducer successfully updates user 1`] = `
Object {
  "contacts": Array [],
  "user": Object {
    "name": "test user",
  },
}
`;

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/actions.js
``` jsx
import {login} from '../api'

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

// async action creator
export const logInUser = (username, password, loginFn = login) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await loginFn(username, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message})
  }
}

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/actions.test.js
``` jsx
/* global jest, expect, describe, it */
/* eslint-disable */

import * as actions from './actions'

describe('updateUser returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateUser({name: 'test name'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateUser({})).toMatchSnapshot()
  })

  it('handles empty name', () => {
    expect(actions.updateUser({name: ''})).toMatchSnapshot()
  })
})

describe('logInUser returns actions', () => {
  const errMessage = 'incorrect creds'
  const fakeToken = 'thisIsATestToken'
  const mockLogin = (username, password) => {
    if (username === 'u' && password === 'p') {
      return fakeToken
    }
    throw new Error(errMessage)
  }

  it('dispatches LOG_IN_SENT', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('', '')(mockDispatch)
    // mockDispatch.mock.calls all the args that the mock fn was invoked on
    expect(mockDispatch.mock.calls[0][0]).toEqual({type: actions.LOG_IN_SENT})
  })

  it('dispatches LOG_IN_FULFILLED with correct creds', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('u', 'p', mockLogin)(mockDispatch)

    expect(mockDispatch.mock.calls[1][0]).toEqual({type: actions.LOG_IN_FULFILLED, payload: fakeToken})
    expect(mockDispatch.mock.calls[1]).toMatchSnapshot()
  })

  it('dispatches LOG_IN_REJECTED with incorrect creds', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('', '', mockLogin)(mockDispatch)

    expect(mockDispatch.mock.calls[1][0]).toEqual({type: actions.LOG_IN_REJECTED, payload: errMessage})
    expect(mockDispatch.mock.calls[1]).toMatchSnapshot()
  })
})

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/reducer.js
``` jsx
import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
    case LOG_IN_FULFILLED:
      return merge(state, {token: action.payload})
    case LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload})
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export default reducer

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/reducer.test.js
``` jsx
/* eslint-disable */

import reducer from './reducer'
import * as actions from './actions'

const DEFAULT_STATE = {
  user: {},
  contacts: [],
}

describe('contact reducer', () => {
  it('successfully adds new user', () => {
    expect(reducer(DEFAULT_STATE, actions.addContact({
      name: 'test user',
      phone: '1234567890',
    }))).toMatchSnapshot()
  })
})

describe('user reducer', () => {
  it('successfully updates user', () => {
    expect(reducer(DEFAULT_STATE, actions.updateUser({
      name: 'test user',
    }))).toMatchSnapshot()
  })
})

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/store.js
Files ./after/redux/store.js and ./before/redux/store.js are identical

#### after/screens/AddContactScreen.js
Files ./after/screens/AddContactScreen.js and ./before/screens/AddContactScreen.js are identical

#### after/screens/ContactDetailsScreen.js
Files ./after/screens/ContactDetailsScreen.js and ./before/screens/ContactDetailsScreen.js are identical

#### after/screens/ContactListScreen.js
Files ./after/screens/ContactListScreen.js and ./before/screens/ContactListScreen.js are identical

#### after/screens/LoginScreen.js
Files ./after/screens/LoginScreen.js and ./before/screens/LoginScreen.js are identical

#### after/screens/SettingsScreen.js
Files ./after/screens/SettingsScreen.js and ./before/screens/SettingsScreen.js are identical

#### after/simpleRedux/reducer.js
Files ./after/simpleRedux/reducer.js and ./before/simpleRedux/reducer.js are identical

#### after/simpleRedux/store.js
Files ./after/simpleRedux/store.js and ./before/simpleRedux/store.js are identical

#### after/simpleRedux/store2.js
Files ./after/simpleRedux/store2.js and ./before/simpleRedux/store2.js are identical

#### after/simpleRedux/store3.js
Files ./after/simpleRedux/store3.js and ./before/simpleRedux/store3.js are identical

[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/testing/sum.js
``` jsx
/* eslint-disable no-console */

function sum(x, y) {
  return x + y
}

module.exports = sum

```
#### after/testing/sum.test.js
``` jsx
/* global test, expect */

const sum = require('./sum.js')

test('sums 1 and 1', () => {
  expect(sum(1, 1)).toBe(2)
})

test('sums 0 and 0', () => {
  expect(sum(0, 0)).toBe(0)
})

test('sums 20 and 30', () => {
  expect(sum(20, 30)).toBe(50)
})

test('sums 20 and 22', () => {
  expect(sum(20, 22)).toBe(42)
})

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)


---
myNote
---

go to top of the page
```markdown
[top]: topOfThePage
[Go to top of the page](#top)
```

---
``` terminal
~/cs50m/src10/ $  diff -qsr ./after/ ./before/
  -q, --brief                   report only when files differ
  -s, --report-identical-files  report when two files are the same
  -r, --recursive                 recursively compare any subdirectories found
```


---
[:top: Top](#top)

