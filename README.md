Lecture 7: Data
===
lecture: http://video.cs50.net/mobile/2018/spring/lectures/7

slides: http://cdn.cs50.net/mobile/2018/spring/lectures/7/lecture7.pdf
- [APIs](#api),
- [randomuser.me/ documentation](#randomuserme-documentation)
- [Making Network Requests](#making-network-requests),
- [Promises](#promises), [Async/Await](#asyncawait),
- [Data Transformations](#transforming-data),
- [Authentication](#authentication),
- [HTTP Methods](#http-methods),
- [HTTP Response Codes](#http-response-codes),
- [Expo Components](09_ExpoComponents.md)

[top]: topOfThePage
[Source Code](#source-code)
files: src07.zip   
[**before/...**](#before)
  contacts.js
  AddContactForm.js
  [App.js](#beforeappjs)
  Row.js
  SectionListContacts.js
  package.json     
before/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    [LoginScreen.js](#beforeloginscreenjs)
    SettingsScreen.js

[**after/...**](#after)
  [contacts.js](#aftercontactsjs)
  AddContactForm.js
  [App.js](#afterappjs)
  Row.js
  SectionListContacts.js
  [api.js](#afterapijs)
  [package.json](#afterpackagejson) 
after/...
    [authServer](#afterauthserverreadmemd)/README.md
    [authServer/index.js](#afterauthserverindexjs)
    authServer/package-lock.json
    [authServer/package.json](#afterauthserverpackagejson)   
after/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    [LoginScreen.js](#afterloginscreenjs)
    SettingsScreen.js

[**myNote**](#mynote)

---
[:top: Top](#top)
### Previous Lecture [07_Navigation](https://github.com/alvinng222/cs50m/tree/07_Navigation).  
- react-navigation
- SwitchNavigator
- navigation prop
- StackNavigator
- Configuring navigators
- TabNavigator
- Composing navigators

---
### Data
- Not all apps are self-contained
- Any app that wants to rely on information not computed
within the app needs to get it from somewhere
  - Communicate with other resources using an API

---
### API
- “Application Programming Interface”
- A defined set of ways with which a resource can be
interacted
  - React components have APIs; you interact by passing props
  - A class has an API; you interact by invoking methods
  - A web service has an API; you interact by making network requests
- Providers often get to decide on the API, but sometimes
it’s decided for them
- Consumers have to read docs to know how to use an API

---
### randomuser.me/ documentation
- https://randomuser.me/documentation

---
an API that is free in the cloud

lets say copy their `https://randomuser.me/api/?results=5000`
and copy and pass on new tab, will get a bunch of this stuff called JSON.
Or in other words, JavaScript Object Notation.

``` yaml
{"results":[{"gender":"female","name":{"title":"Mrs","first":"Isabella","last":"Thomsen"},"location":{"street":{"number":5813,"name":"Søndergårds Haver"},"city":"Assens", ...
``` 
And if we scroll down, we'll see 5,000 other randomlygenerated users.

If we only wanted females, we can do gender=female.
`https://randomuser.me/api/?gender=female`

So if we want to get the same results back every time, we can pass in a seed,
`https://randomuser.me/api/?seed=foobar`

We can determine the format, so we can get JSON or CSV, YAML, XML.

And lastly, we can determine nationalities.
`https://randomuser.me/api/?nat=gb`

[:top: Top](#top)
### Making Network Requests
- fetch() is polyfilled
  - It’s not natively part of JavaScript, but it is implemented to match the
usage of the browser fetch()
- fetch() expects an URL and optionally some config
- fetch() returns a Promise, which is fulfilled with a
Response object
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
* https://developer.mozilla.org/en-US/docs/Web/API/Response

---
And so fetch is a function that comes in all browsers,

Google Chorme console,
Going to do fetch that URL, enter, and I see this thing promise pending.
``` console
fetch('https://randomuser.me/api/?nat=gb')
  > Promise {<pending>}
```

### Promises
- Allows writing asynchronous, non-blocking code
- Allows chaining callbacks and/or error handlers
  - .then() - executed after the previous Promise block returns
  - .catch() - executed if the previous Promise block errors
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

---
*.then(response => console.log(response))*
``` console
fetch('https://randomuser.me/api/?nat=gb').then(response => console.log(response))
  > Promise {<pending>}
  v Response {type: "cors", url: "https://randomuser.me/api/?nat=gb", redirected: false, status: 200, ok: true, …}
    body: (...)
    bodyUsed: false
    > headers: Headers {} 
```
And if we inspect it, we see a bunch of stuff.
We see body, bodyUsed false, headers, and in it
are any headers, ok true, redirected false, status 200, type basic, URL.

#### response.json()
``` console
fetch('https://randomuser.me/api/?nat=gb').then(response => response.json()).then(result => console.log(result))
  > Promise {<pending>} 
  > {results: Array(1), info: {…}}
      > info: {seed: "c32bb1b866df3b53", results: 1, page: 1, version: "1.3"}
      v results: Array(1)
        > 0: {gender: "male", name: {…}, location: {…}, email: "tom.ellis@example.com", login: {…}, …} length: 1
        > __proto__: Array(0)
      > __proto__: Object
```
#### fetch more results
checked with documentation, we can have results = 50. will be use at .01
``` console
fetch('https://randomuser.me/api/?results=50&nat=gb').then(response => response.json()).then(result => console.log(result))
  > Promise {<pending>}
  v {results: Array(50), info: {…}}
    > info: {seed: "efd7bae302f932e2", results: 50, page: 1, version: "1.3"}
    > results: (50) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    > __proto__: Object
```
[:top: Top](#top)

### Async/Await
- Allows writing async code as if it were synchronous
  - Still non-blocking
- A function can be marked as async, and it will return a
Promise
- Within an async function, you can await the value of
another async function or Promise
- Use try/catch to handle errors
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

---
at chrome console, which is same as previous fetch(...). shift-Enter for new line during edting.
``` console
> async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=gb')
    const result = await response.json()
    console.log(result)
  }

> fetchUsers()
  > Promise {<pending>}
  v {results: Array(50), info: {…}}
    > info: {seed: "8964dd0830addddc", results: 50, page: 1, version: "1.3"}
    v results: Array(50)
      > 0: {gender: "male", name: {…}, location: {…}, email: "roberto.mccoy@example.com", login: {…}, …}
      > 1: {gender: "female", name: {…}, location: {…}, email: "debra.jones@example.com", login: {…}, …}
      > 2: {gender: "male", name: {…}, location: {…}, email: "wesley.herrera@example.com", login: {…}, …}
```

So if we wanted to add error handling to this fetchUsers, what we would do
``` jsx
async function fetchUsersWithErrorHandling() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=50&nat=gb')
        const result = await response.json()
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}

fetchUsersWithErrorHandling()
```
[:top: Top](#top)

installed source code [/before](/before)

##### for Expo Cli
react-navigation@2.0.0
```
      $ npm install react-navigation@2.0.0 --save
```
##### for Snack   
.01 package.json, changed json, 
``` yaml
{
  "dependencies": {
    "react-native-paper": "3.6.0",
    "react-native-vector-icons": "^4.5.0",
    "react-navigation": "2.0.0",
    "react-native-vector-icons/Ionicons": "latest"
  }
}
```

from [before/App.js](#beforeappjs)  [03:30]

.01 App.js, to fetch data. not working, but shown Array(50) on console.log
``` jsx
export default class App extends React.Component {
  state = {
    contacts: null, // .01
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=50&nat=gb')
      .then(response => response.json())
      .then(({results}) => {
        console.log(results)
        this.setState({contacts: results})
        })
  } // .01
```
Error due to, checked from console, the `name`  is an object. Need to Transforming Data, later...

.03 app.js, using Async/Await. atleast it shown data from console.log
``` jsx
export default class App extends React.Component {
  state = {
    contacts: null, // .01
  }

  componentDidMount() {
    this.fetchUsers()
  } // .03

  fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=gb')
    const {results} = await response.json()
    console.log(results)
    this.setState({contacts: results})
  } // .02 .03
  ...
```
[:top: Top](#top)
### Transforming Data
- Sometimes the shape of the data returned by an API isn’t
ideal
  - Where should we do this “transformation?”
- Doing it early gives us an abstraction barrier and is more
efficient

---
.new file
.04 **api.js**
``` jsx
export const fetchUsers = async () => {
  const response = await fetch('https://randomuser.me/api/?results=50&nat=gb');
  const { results } = await response.json();
  return results
}; // .02 .03 .04
```
.4b for app.js
``` jsx
 //import contacts from './contacts'
 import { fetchUsers } from './api'
 ...
  componentDidMount() {
    fetchUsers().then(results => this.setState({contacts: results}))
  } // .03 .04b
  /* or */
  async getUsers = () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
  } // .04b
```
.4c app.js we use the async. > it shown TypeError: Cannot read property 'toUpperCase' of undefined.
``` jsx
 //import contacts from './contacts'
 import { fetchUsers } from './api'
 ...
  componentDidMount() {
    this.getUsers()
  } // .03 .04b .04c

  getUsers = async () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
  } // .04b .04c
```
.4d api.js, we can do backticks, which allows us to create a string literal and within it. 
Now, it fixed the problem. :+1:
``` jsx
const processContact = contact => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
}) //.04d

export const fetchUsers = async () => {
  const response = await fetch('https://randomuser.me/api/?results=50&nat=gb');
  const { results } = await response.json();
  return results.map(processContact) // .04d
}; // .02 .03 .04 
```
[:top: Top](#top)

[46:50] Break!
### Authentication
- A process to determine if a user is who they say they are
- Generally done using a name and password
_ But how do we send the name and password in the
request?

---
### HTTP Methods
- GET
  - The default in browsers and in fetch()
  - Add parameters in the url by appending a **?** and chaining key=value
pairs separated by **&**
- POST
  - Submit data (e.g. a form) to an endpoint
  - Parameters are included in the request body
  - If POSTing JSON, must have content-type: application/json
header and body must be JSON string

---
check on the ./authServer/README.md for this server that provide username: `username` and password: `password`.  
Use this server as api.

.05 to install this server `authServer`. if we visit this `http://localhost:8000`, we can see it run. [47:53]
``` console
        $ authServer $  ls
        README.md	index.js	package.json
        $ authServer $  cat README.md
        $ authServer $ npm install
        $ authServer $ npm start
        $ authServer $ exit (if error due to background is running other)
        $ authServer $ npm start
        Listening at http://localhost:8000
```

- GET
  - The default in browsers and in fetch()
  - Add parameters in the url by appending a **?** and chaining key=value
pairs separated by **&**

eaxmples of passing parameters using ? & & :
`https://randomuser.me/api/?nat=gb&results=10&gender=female`

- POST
  - Submit data (e.g. a form) to an endpoint
  - Parameters are included in the request body
  - If POSTing JSON, must have content-type: application/json header and body must be JSON string

to send a post request to our API, in Chrome's console [56:43]
``` console
console.clear()
fetch('http://localhost:8000')
  > VM202:1 GET http://localhost:8000/ 404 (Not Found)
...
fetch('http://localhost:8000', {method: 'POST'})
  > VM368:1 POST http://localhost:8000/ 400 (Bad Request)
```
click on the Network > `localhost` > 
``` console
v General
    Request URL: http://localhost:8000/
    Request Method: POST
    Status Code: 400 Bad Request
    Remote Address: [::1]:8000
    ...
```


.06 LoginScreen.js [59:43],   
just able to key in with/without the correct username and password.
``` jsx
import React from 'react'
import {Button, View, StyleSheet, TextInput} from 'react-native' //.06

export default class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
  } // .06

  _login = () => {
    this.props.navigation.navigate('Main')
  }

  handleUsernameUpdate = username => {
    // this.setState({username: username}) // use shorthoad below
    this.setState({username})
  } // .06

  handlePasswordUpdate = password => {
    // this.setState({username: username}) // use shorthoad below
    this.setState({password})
  } // .06

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Username" 
          value={this.state.username}
          onChangeText={this.handleUsernameUpdate} // .06
        />
        <TextInput 
          placeholder="password"
          value={this.state.password}
          onChangeText={this.handlePasswordUpdate} // .06
        />
        <Button title="Press to Log In" onPress={this._login} />
      </View>
    )
  } // .06
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center',flex: 1,},
  //text: {textAlign: 'center',},
})
```
.07 LoginScreen.js add in localhost, but didnt work!! [1:05:00]
``` jsx
  _login = () => {
    fetch('http://localhost:8000', {
      method: 'POST',
      header: {'content-type': 'application/JSON'},
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password,
      }),
    }).then(res => console.log(res))
    this.props.navigation.navigate('Main')
  } // .06 .07
```

Error shown from my console:
`... has been blocked by CORS policy: Response ... `   
Issues resolved: See [myNote]((#mynote))  
``` console
> LoginScreen.js:11 POST http://localhost:8000/ 400 (Bad Request)
> Response {type: "opaque", url: "", redirected: false, status: 0, ok: false, …}
```

[:top: Top](#top)
### HTTP Response Codes
- Every network response has a “code” associated with it
  - 200: OK
  - 400: Bad Request
  - 403: Forbidden
  - 404: Not Found
  - 500: Internal Server Error
  - 418: I’m a teapot
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

---
my check on the Dev Tools, Network > All, the Local shown 404.  
Click on the LocalHost > Header show status Code: 404.

`if (response.ok)` is similar to    
`if (response.status === 400 || response.status === 401 || response.status === 402 || response.status === 403)`  

.08 loginscreen.js [1:22:40] > it dont work! Failed to load resource: net::ERR_FAILED.   
Issues resolved: See [myNote]((#mynote))  
``` jsx
import React from 'react'
import {Button, View, StyleSheet, Text, TextInput} from 'react-native' //.06 .08b

export default class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
  } // .06

  _login = async () => { // .08
    const response = await fetch('http://localhost:8000', { // .08
      method: 'POST',
      header: {'content-type': 'application/JSON'},
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password,
      }),
    })

    if (response.ok) {
      this.props.navigation.navigate('Main')
      return
    } // .08

    const errMessage = await response.text()
    this.setState({err: errMessage})
  } // .06 .07 .08

  handleUsernameUpdate = username => {
    // this.setState({username: username}) // use shorthoad below
    this.setState({username})
  } // .06

  handlePasswordUpdate = password => {
    this.setState({password})
  } // .06

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Username" 
          value={this.state.username}
          onChangeText={this.handleUsernameUpdate} // .06
        />
        <TextInput 
          placeholder="password"
          value={this.state.password}
          onChangeText={this.handlePasswordUpdate} // .06
        />
        <Button title="Press to Log In" onPress={this._login} />
      </View>
    )
  } // .06
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center',flex: 1,},
  //text: {textAlign: 'center',},
})
```
``` jsx
import {Button, View, StyleSheet, Text, TextInput} from 'react-native' //.06 .08b
...
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.err}</Text> {/*.08b*/}
...
const styles = StyleSheet.create({
  container: {justifyContent: 'center',flex: 1,},
  //text: {textAlign: 'center',},
  error: {
    textAlign: 'center',
    color: 'red',
  }, // .08b
})
```
.09 LoginScreen.js none capitalise, and invinsible password
``` jsx
        <TextInput 
          placeholder="Username" 
          value={this.state.username}
          onChangeText={this.handleUsernameUpdate} // .06
          autoCapitalize="none"  //.09
        />
        <TextInput 
          placeholder="password"
          value={this.state.password}
          onChangeText={this.handlePasswordUpdate} // .06
          secureTextEntry // short-hand .09
          //secureTextEntry="true" //.09
        />
```
[:top: Top](#top)

[1:30:05]

.10 api.js transfer from loginScreen.js, and edit
``` jsx
...
}; // .02 .03 .04 

export const login = async (username, password) => { 
      const response = await fetch('http://localhost:8000', { 
      method: 'POST',
      header: {'content-type': 'application/JSON'},
      body: JSON.stringify({username, password}),
    })

    if (response.ok) {
      return true
    } 

    const errMessage = await response.text()
    throw new Error(errMessage)
  } // .10
```
.10 cont loginScreen.js
``` jsx
import {login} from '../api'
...

  _login = async () => {
    try {
      const success = await login(this.state.username, this.state.password)
      this.props.navigation.navigate('Main')
    } catch (err) {
      const errMessage = err.message
      this.setState({err: errMessage})
    }
  } // .10

/*
  _login = async () => { // .08
  ...
*/ // .10

  handleUsernameUpdate = username => {
  ...
```
Still unable to login on Web, and device !!    
Issues resolved: See [myNote]((#mynote)) 


---
Source Code
---
[:top: Top](#top)

### before/...
#### before/App.js
Files ./after/App.js and ./before/App.js differ
see my note, using workable app.js, due to createBottomTabNavigator error
``` jsx
import React from 'react'
import {StatusBar, View} from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AddContactScreen from './screens/AddContactScreen'
import SettingsScreen from './screens/SettingsScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import contacts from './contacts'

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

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }))
  }

  render() {
    return (
      <AppNavigator
        screenProps={{
          contacts: this.state.contacts,
          addContact: this.addContact,
        }}
      />
    )
  }
}

```

[:top: Top](#top)

#### before/screens/LoginScreen.js
Files ./after/screens/LoginScreen.js and ./before/screens/LoginScreen.js differ
``` jsx
import React from 'react'
import {Button, View, StyleSheet, Text} from 'react-native'

export default class LoginScreen extends React.Component {
  _login = () => {
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You are currently logged out.</Text>
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
})

```
[:top: Top](#top)


---
### after/...

#### after/contacts.js
``` jsx
const NUM_CONTACTS = 3

const firstNames = ['Emma','Noah','Olivia','Liam','Ava','William','Sophia','Mason','Isabella','James','Mia',
'Benjamin','Charlotte','Jacob','Abigail','Michael','Emily','Elijah','Harper','Ethan','Amelia','Alexander',
'Evelyn','Oliver','Elizabeth','Daniel','Sofia','Lucas','Madison','Matthew','Avery','Aiden','Ella','Jackson',
'Scarlett','Logan','Grace','David','Chloe','Joseph','Victoria','Samuel','Riley','Henry','Aria','Owen','Lily',
'Sebastian','Aubrey','Gabriel','Zoey','Carter','Penelope','Jayden','Lillian','John','Addison','Luke','Layla',
'Anthony','Natalie','Isaac','Camila','Dylan','Hannah','Wyatt','Brooklyn','Andrew','Zoe','Joshua','Nora',
'Christopher','Leah','Grayson','Savannah','Jack','Audrey','Julian','Claire','Ryan','Eleanor','Jaxon','Skylar',
'Levi','Ellie','Nathan','Samantha','Caleb','Stella','Hunter','Paisley','Christian','Violet','Isaiah','Mila',
'Thomas','Allison','Aaron','Alexa','Lincoln']

const lastNames = ['Smith','Jones','Brown','Johnson','Williams','Miller','Taylor','Wilson','Davis','White',
'Clark','Hall','Thomas','Thompson','Moore','Hill','Walker','Anderson','Wright','Martin','Wood','Allen','Robinson',
'Lewis','Scott','Young','Jackson','Adams','Tryniski','Green','Evans','King','Baker','John','Harris','Roberts',
'Campbell','James','Stewart','Lee','County','Turner','Parker','Cook','Mc','Edwards','Morris','Mitchell','Bell',
'Ward','Watson','Morgan','Davies','Cooper','Phillips','Rogers','Gray','Hughes','Harrison','Carter','Murphy']

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
[:top: Top](#top)

#### after/App.js
``` jsx
import React from 'react'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AddContactScreen from './screens/AddContactScreen'
import SettingsScreen from './screens/SettingsScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import {fetchUsers} from './api'

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
    contacts: null,
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }))
  }

  render() {
    return (
      <AppNavigator
        screenProps={{
          contacts: this.state.contacts,
          addContact: this.addContact,
        }}
      />
    )
  }
}

```

#### after/Row.js
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

#### after/api.js
``` jsx
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
    return true
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

```

#### after/package.json
Last update on Expo-Cli, Jul14,'20 
``` yaml
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
    "expo": "~38.0.8",
    "expo-status-bar": "^1.0.2",
    "prop-types": "^15.7.2",
    "react": "~16.11.0",
    "react-dom": "~16.11.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-38.0.2.tar.gz",
    "react-native-vector-icons": "^7.0.0",
    "react-native-web": "~0.11.7",
    "react-navigation": "^2.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.8.6",
    "babel-preset-expo": "~8.1.0"
  },
  "private": true
}

```
[:top: Top](#top)
#### after/authServer/README.md
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
#### after/authServer/index.js
Last update on Expo-Cli, Jul14,'20 
``` jsx
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 8000

// usernames are keys and passwords are values
const users = {
  username: 'password',
}

const app = express()
app.use(bodyParser.json())
app.use(cors());
app.post('*', (req, res) => {
  const {username, password} = req.body

  if (!username || !password) return res.status(400).send('Missing username or password')
  // in practice, this is potentially revealing too much information.
  // an attacker can probe the server to find all of the usernames.
  if (!users[username]) return res.status(403).send('User does not exist')
  if (users[username] !== password) return res.status(403).send('Incorrect password')
  return res.status(200).send()
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
[:top: Top](#top)

#### after/authServer/package.json
Last update on Expo-Cli, Jul14,'20 
``` json
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
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1"
  }
}
```
[:top: Top](#top)

#### after/screens/LoginScreen.js
``` jsx
import React from 'react'
import {Button, View, StyleSheet, Text, TextInput} from 'react-native'

import {login} from '../api'

export default class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
  }

  _login = async () => {
    try {
      const success = await login(this.state.username, this.state.password)
      this.props.navigation.navigate('Main')
    } catch (err) {
      const errMessage = err.message
      this.setState({err: errMessage})
    }
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
        <Text style={styles.error}>{this.state.err}</Text>
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

```
[:top: Top](#top)

---
myNote
---

### App running
was Issues: .07 LoginScreen.js [1:05:00]

Code used run on ExpoCli, from [after/...](#after),   
Based on [after/package.json](#afterpackagejson)
##### install cors
``` console
        $ npm update
        $ npm install react-navigation@2.0.0 --save
        $ npm install prop-types
        $ cd authServer
        authServer $ npm update
        authServer $ npm install cors --save
        authServer $ vim index.js
        $ npm run web
```
[autherServer/index.js](#afterauthserverindexjs), add `app.use(cors());`
``` jsx
const express = require('express')                                              
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = process.env.PORT || 8000

// usernames are keys and passwords are values
const users = { 
  username: 'password',
}

const app = express()
app.use(cors());
app.use(bodyParser.json())
...
```
Last workable,Jul14,'20, see [after/package.json](#afterpackagejson), [after/authServer/package.json](#afterauthserverpackagejson).   
Web: ok; Andriod & iPhone: `Net request failed`;

ref on server:   
https://www.npmjs.com/package/cors    
https://www.npmjs.com/package/body-parser   
http://expressjs.com/en/resources/middleware/body-parser.html   
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Who_should_read_this_article

[:top: Top](#top)

after/screens/LoginScreen.js, To temporary without password
``` jsx
  _login = () => {
    this.props.navigation.navigate('Main')
  }
```
ExpoCli web: ok;   
Andriod & iPhone: failed

---
### console
> console.clear()

##### vim
to change word to next in vim, select the sentence first, then
```
:'<,'>s/username/password/g
```
?? `: noh`

#### How to compare to files:
```
~/cs50m/src7/ $ diff -qs ./after/Row.js ./before/Row.js                                                 
Files ./after/Row.js and ./before/Row.js are identical
```
[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)  
back to previous: [07_Navigation](https://github.com/alvinng222/cs50m/tree/07_Navigation)    
continue to next: [09_ExpoComponents](https://github.com/alvinng222/cs50m/tree/09_ExpoComponents)

---
