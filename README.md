Lecture 10: Async Redux, Tools
===
[top]: topOfThePage
lecture: http://video.cs50.net/mobile/2018/spring/lectures/10

Slides: http://cdn.cs50.net/mobile/2018/spring/lectures/10/lecture10.pdf
* [Review: react-redux](#review-react-redux)
* [Supporting Async Requests](#supporting-async-requests)
* [Redux Middleware](#redux-middleware)
* [Persisting State](#persisting-state)
* [redux-persist](#redux-persist)
* [Container vs Presentational Components](#container-vs-presentational-components)
* [Do I need Redux?](#do-i-need-redux)
* [JavaScript Tools](#javascript-tools)
* [ESLint](#eslint)
* [ESLint: Setup](#eslint-setup)
* [ESLint: Running](#eslint-running)
* [Prettier](#prettier)

[Source Code](#source-code)  
files: src10.zip

[**before/...**](#before)
  AddContactForm.js
  [App.js](#beforeappjs)
  contacts.js
  Row.js
  SectionListContacts.js
  [api.js](#beforeapijs)
  [package.json](#beforepackagejson)   
before/authServer/...
      README.md
      [index.js](#beforeauthserverindexjs)
      package.json  
[before/redux/...](#beforeredux)
      [actions.js](#beforereduxactionsjs)
      [reducer.js](#beforereduxreducerjs)
      [store.js](#beforereduxstorejs)  
[before/screens/...](#beforescreens)
      [AddContactScreen.js](#beforescreensaddcontactscreenjs)
      ContactDetailsScreen.js
      [ContactListScreen.js](#beforescreenscontactlistscreenjs)
      [LoginScreen.js](#beforescreensloginScreenjs)
      SettingScreen.js  
[before/simpleRedux/...](#beforesimpleredux)
      reducer.js
      store.js
      [store2.js](#beforesimplereduxstore2js)

[**after/...**](#after)
  AddContactForm.js
  [App.js](#afterappjs)
  contacts.js
  Row.js
  SectionListContacts.js
  [api.js](#afterapijs)
  [package.json](#afterpackagejson)   
after/authServer/...
      README.md
      [index.js](#afterauthserverindexjs)
      package.json  
[after/redux/...](#afterredux)
      [actions.js](#afterreduxactionsjs)
      [reducer.js](#afterreduxreducerjs)
      [store.js](#afterreduxstorejs)  
[after/screens/...](#afterscreens)
      AddContactScreen.js
      ContactDetailsScreen.js
      ContactListScreen.js
      [LoginScreen.js](#afterscreensloginscreenjs)
      SettingsScreen.js  
[after/simpleRedux/...](#aftersimpleredux)
      reducer.js
      store.js
      store2.js
      [store3.js](#aftersimplereduxstore3js)
`$ ls -1`

[**myNote**](#mynote)

[:top: Top](#top)

---
### Previous Lecture [10_Redux](https://github.com/alvinng222/cs50m/tree/10_Redux)  
- Scaling Complexity
- Flux
- Redux
- simpleRedux/
- Reducers
- Store
- Actions
- react-redux

---
### Review: react-redux
- React bindings for redux
  - `<Provider />`
  - `connect()`
- Provider gives children access to our redux store
- connect() helps us subscribe to any subset of our store
and bind our action creators

for instance `ContactListScreen.js`  
.01 ContactListScreen.js
``` jsx
...
const getPropsFromState = state => ({
  contacts: state.contacts,
})

// connect(getPropsFromState, bindDispatchToActions, ContactListScreen)
// connect(getPropsFromState)(ContactListScreen)

export default connect(getPropsFromState)(ContactListScreen)
```
.02 AddContactScreen.js
``` jsx
...
export default connect(null, {addContact: addContact})(AddContactScreen)
```
[:top: Top](#top)

---
### Supporting Async Requests
- Where do we want to add this support? How do we
change our API?
  - Reducers
  - Store
  - Actions
  - Action creators
- We need to change more than just the action creators
- Store.dispatch() needs to accept other types
- Our addition is unideal, since we had to change our redux
implementation

[:top: Top](#top)
[17:00]

cp store2.js store3.js
``` terminal
        simpleRedux $ node store3.js
        {
          user: {
            foo: 'baz',
            bar: 'bar',
            prevContact: { name: 'david m', number: '5050505050' }
          },
          contacts: [ 
            { name: 'jordan h', number: '1234567890' },
            { name: 'jordan h', number: '1234567890' },
            { name: 'david m', number: '5050505050' }
          ]
        }
```
.03 simpleRedux/store3.js it donest do anything.
``` jsx
// async action creator
const logInUser = () => {
  return {type: 'LOG_IN_SUCCESS'}
} //.03

const store = new Store(reducer, DEFAULT_STATE); 
store.dispatch(logInUser()) // .03
```
.04 store3.js this donest work either
``` jsx
// async action creator
const logInUser = () => {
  fetch().then(() => ({type: 'LOG_IN_SUCCESS'}))
  return 
} //.03 .04
```
.05 store3.js, work as normal
``` jsx
// async action creator
const logInUser = () => dispatch => {
  fetch().then(() => ({type: 'LOG_IN_SUCCESS'}))
  return 
} //.03 .04 .05

logInUser() // returns dispatch => {} .05
```
.06 store3.js as usual
``` jsx
// async action creator
const logInUser = () => dispatch => {
  dispatch({type: 'LOG_IN_SENT'})
  /*
  fetch().then(() => ({type: 'LOG_IN_SUCCESS'}))
  return
  */
} //.03 .04 .05 .06
```
.07 store3.js starting to resemble an asynchronous action. > as usual
``` jsx
// async action creator
const logInUser = () => dispatch => {
  dispatch({type: 'LOG_IN_SENT'})
  fetch().then(() => {
    dispatch({type: 'LOG_IN_SUCCESS'})
  }).catch(err => {
    dispatch({type: 'LOG_IN_REJECTED'})
  }) 
} //.03 .04 .05 .06 .07
```
.08 store.js > error
``` jsx
    dispatch(action) {
      if (typeof action === 'function') {
        action(this.dispatch.bind(this)) 
      } else {
        this.state = this.reducer(this.state, action)
      }
    } // .08
```
[25:38] check if server acctually running, see myNote [authServer](#authserver)
``` console
            authServer $ npm start  
```
[:top: Top](#top)

.09 simpleRedux/store3.js, copied from api.js..  working [26:15]
```jsx
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
} // from api.js // .09

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
    } // .08 .09
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
} //.03 .04 .05 .06 .07 .09

const store = new Store(reducer, DEFAULT_STATE)

store.dispatch(logInUser('username', 'password')) // .09
/* .09
logInUser() // returns dispatch => {} .05
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
store.dispatch(addContact({name: 'david m', number: '5050505050'}))
*/
console.log(store.getState())
```
[29:10] shown LOG_IN_REJECTED, because node does not have any concept of 'fetch'.
Fetch was acctually part of browser API.
``` console
            simpleRedux $ node store3.js
            received an action: LOG_IN_SENT
            { user: {}, contacts: [] }
            received an action: LOG_IN_REJECTED
```
[:top: Top](#top)

isomorphic-fetch is a package for implement fetch that can use on node JS enviroment.
``` console
      simpleRedux $ npm install isomorphic-fetch.   
```

.10 store3.js, node version of import
``` jsx
const fetch = require('isomorphic-fetch') // node version of import .10

export const login = async (username, password) => {
...
console.log(store.getState());
/*
// will respone:
received an action: LOG_IN_SENT
{user: {}, contacts: [] }
received an action: LOG_IN_SUCCESS
*/
```
[30:22] should see that Log-in success. See myNote [authServer](#authserver)

.11 store3.js use **switch**
``` jsx
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
  } // .11
}
```
[:top: Top](#top)
[33.11]

---
### Redux Middleware
- This allows us to extend redux without having to touch the
implementation
- Any function with this prototype can be middleware
  - `({getState, dispatch}) => next => action => void`
- We can reimplement our feature as middleware
- https://github.com/gaearon/redux-thunk
  - “A thunk is a function that wraps an expression to delay its evaluation”

copied files from **src10/before/*.* to Snack**, update JSON 
from 10_Redux

.11 package.json
``` jsx
{
  "dependencies": {
    "redux": "4.0.5",
    "react-redux": "5.0.7",
    "react-navigation": "2.0.0",
    "react-native-paper": "3.6.0",
    "react-native-vector-icons": "6.6.0",
    "react-native-vector-icons/Ionicons": "6.6.0"
  }
}
```

*middleware* is a chain by which can just keep passing the action down the chain, and modify how we want, like eg thunk, log.

.12  redux/store.js Snack, no error with _applyMiddle**w**are_ :+1:
``` jsx
import { createStore, applyMiddleware } from 'redux'; //.12
import {addContact} from './actions' 
import reducer from './reducer' 

const thunkMiddleWare = store => next => action => {
  if (typeof action === 'function') {
    action(store.dispatch)
  } else {
    next(action)
  }
} //.12

// const store = createStore(reducer); 
const store = createStore(reducer, applyMiddleware(thunkMiddleWare)) //.12b


/*
store.dispatch(updateUser({foo: 'foo'})); 
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))
*/

store.dispatch(addContact({name: 'Jorhan', phone:'1234567890'})) 
store.dispatch(addContact({name: 'Jorhan', phone:'1234567890'})) 
store.dispatch(addContact({name: 'David M', phone:'50505050505'})) 

console.log(store.getState());

export default store
```
[44:50]

``` console
            Jun24 $ npm install redux-thunk
```

.13 redux/store.js Snack, no error with _applyMiddle**w**are_ :+1:
``` jsx
import { createStore, applyMiddleware } from 'redux'; //.12
import thunk from 'redux-thunk' //.13
import {addContact} from './actions' 
import reducer from './reducer' 

/*
const thunkMiddleWare = store => next => action => {
  if (typeof action === 'function') {
    action(store.dispatch)
  } else {
    next(action)
  }
} //.12
*/

const store = createStore(reducer, applyMiddleware(thunk)); //.13

/*
...
```
[45:12] re-add login screen to application, that removed last time.

.14 App.js, Login bug: **Failed to fetch**  :disappointed: . :tired_face: . :exclamation: 
``` jsx
...
  render() {
    return (
      <Provider store={store}>
      <AppNavigator />
      </Provider>
    )
  } //.14 was <MainTabs /> which work without Login
}
```
now the screen:
```
      username
      password
                    PRESS TO LOG IN
```
So let's now start to use Redux here, rather than using the logic directly on this class.

.15 redux/actions.js 
``` jsx
import {login} from '../api' // .16

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOG_IN_SENT = 'LOG_IN_SENT' //.15
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED' //.15
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED' //.15

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
export const logInUser = (username, password) => dispatch => {
  dispatch({type: LOG_IN_SENT})
  login(username, password)
    .then(() => {
      dispatch({type: LOG_IN_FULFILLED})
    })
    .catch(err => {
      dispatch({type: LOG_IN_REJECTED})
    })
} // .15b from after/simpleRedux/store3.js
```
.15d screens/LoginScreen.js
``` jsx
import React from 'react'
import {Button, View, StyleSheet, Text, TextInput} from 'react-native'
import {connect} from 'react-redux' //.15c

import {logInUser} from '../redux/actions' //.15c
// .15c import {login} from '../api'

class LoginScreen extends React.Component { //.15d
  state = {
    username: '',
    password: '',
  }

  _login = async () => {
    try {
      this.props.logInUser(this.state.username, this.state.password) //.15c
      //.15e const success = await login(this.state.username, this.state.password)
      this.props.navigation.navigate('Main')
    } catch (err) {
      const errMessage = err.message
      this.setState({err: errMessage})
    }
  }
  
...

export default connect(null, {logInUser})(LoginScreen)//.15d [53:45]
```
login fialed.. 
able to login, even without username.

lecture shown able to username: username, & password: password

.17 reducer.js
``` jsx
import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_SENT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions' //.17

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
  } //.17
}

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export default reducer
```
.18 actions.js
``` jsx
// async action creator
export const logInUser = (username, password) => dispatch => {
  dispatch({type: LOG_IN_SENT})
  login(username, password)
    .then(token => {
      dispatch({type: LOG_IN_FULFILLED, payload: token}) //.18
    })
    .catch(err => {
      dispatch({type: LOG_IN_REJECTED, payload: err.message}) //.18
    })
} // .15b from after/simpleRedux/store3.js
```
.19 authServer/index.js. Do note was **`return res.status(200).send()`** :exclamation: [1:00:10]
``` jsx
  if (!username || !password) return res.status(400).send('Missing username or password')
  // in practice, this is potentially revealing too much information.
  // an attacker can probe the server to find all of the usernames.
  if (!users[username]) return res.status(403).send('User does not exist')
  if (users[username] !== password) return res.status(403).send('Incorrect password')
  //return res.status(200).send()
  return res.json({token: 'thisIsARealToken'}) //.19
  //.19 return res.status(200).send() 
})
```
.20 api.js
``` jsx
/*
  if (response.ok) {
    const json = await response.json() //.20
    return json.token //.20
  } */

    if (response.ok) {
    const {token} = await response.json() //.20a
    return token //.20a
  }
````
.21 actions.js
``` jsx
// async action creator
export const logInUser = (username, password) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await login(username, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token}) //.18
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message}) //.18
  }
}// .15b from after/simpleRedux/store3.js //.21
```
.22 LoginScreen.js > unable to login, also no error message
``` jsx
import PropTypes from 'prop-types' //.22

import {logInUser} from '../redux/actions' //.15c

//import {login} from '../api'

class LoginScreen extends React.Component { //.15d
  static propTypes = {
    err: PropTypes.string,
    token: PropTypes.string,
    logInUser: PropTypes.func,
  } //.22

  state = {
    username: '',
    password: '',
  }

  _login = async () => {
      this.props.logInUser(this.state.username, this.state.password) 
  } //.22
/* delete
  _login = async () => {
    try {
      this.props.logInUser(this.state.username, this.state.password) 
      this.props.navigation.navigate('Main')
    } catch (err) {
      const errMessage = err.message
      this.setState({err: errMessage})
    }
  }
*/ //.22  
...

const mapStateToProps = state => ({
  err: state.user.loginErr,
  token: state.user.token,
}) //.22

export default connect(mapStateToProps, {logInUser})(LoginScreen)//.15d [53:45] .22b
```
Lecture: if wrong username to alert 'Missing username or password'
and update the error message correctly. And if we refresh with the correct username and password combo, nothing actually happens.

.22c LoginScreen.js > Failed to fetch. > fail to go to main screen.
``` jsx
... // .22c
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.props.err}</Text>
...
```
add some sort of listener
that says, hey, if we get a new token, then maybe we
**should navigate to our main screen.**

.23 loginScreen.js > Failed to fetch
``` jsx
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.navigation.navigate('Main')
    }
  } //.23

  _login = async () => {
```
If closed the App, and we logout again, need to login, unideal.   
So how might we go ahead and store the state of our app

[:top: Top](#top)

---
### Persisting State
- Our app can now be a pure function of the redux store
- If we can persist the store, we can reload the app into the
current state
- React Native provides AsyncStorage
  - “Use an abstraction on top of AsyncStorage instead of using it directly
for anything more than light usage since it operates globally.”

---
### redux-persist
- Abstracts out the storage of the store into AsyncStorage
- Gives us persistStore, persistReducer, PersistGate
  - Automatically stores the state at every change
  - Automatically rehydrates the store when the app is re-opened
  - Will display loading screen while waiting for store to rehydrate
- https://github.com/rt2zz/redux-persist

`screens $ npm install redux-persist` 

.24 store.js
``` jsx
import { createStore, applyMiddleware } from 'redux'; //.12
import thunk from 'redux-thunk' //.13
import { persistStore, persistReducer } from 'redux-persist' //.24
import storage from 'redux-persist/lib/storage' //.24

import {addContact} from './actions' 
import reducer from './reducer' 

const persistConfig = {
  key: 'root',
  storage,
} //.24

const persistedReducer = persistReducer(persistConfig, reducer) //.24

export const store = createStore(persistedReducer, applyMiddleware(thunk)); //.13 .24
export const persistor = persistStore(store) //.24

```
.25 App.js > no error
``` jsx
import { PersistGate } from 'redux-persist/integration/react' //.25
...
import {store, persistor} from './redux/store' //.25
...
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  } //.14 was <MainTabs /> which work without Login //.25
```
:disappointed: .> still unable to login.   
[:top: Top](#top)

---
### Container vs Presentational Components
- As an application grows in size and complexity, not all
components need to be aware of application state
- Container components are aware of redux state
- Presentational components are only aware of their props
* https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

---
### Do I need Redux?
- Redux helps apps scale, but does add complexity
- Sometimes, the complexity overhead isn’t worth it
- Do as much as you can with local component state, then
add redux if you hit pain points
  - Forgetting to pass a prop
  - Directly managing deeply nested state
  - Duplicated information in state
  - Not updating all dependent props
  - Components with large number of props
  - Uncertainty where a piece of data is managed

[:top: Top](#top)

---
### JavaScript Tools
- NPM
- Babel
- @std/esm
- Chrome devtools
- React/Redux devtools
- ESLint
- Prettier
- Flow/TypeScript

Babel - which allows us to write JavaScript as if it has all of the language
features that we need and then transpile down to JavaScript
that all browsers will understand.

@std/esm - And what that allows us to do is use our import statements
and our export statements in Node.

Flow/TypeScript - Those are both things that allow us to statically check
the types of all of our functions.
And so it helps us eliminate bugs where maybe we
changed the function prototype somewhere but forgot to update
wherever we use those functions.

[:top: Top](#top)

---
### ESLint
- “A fully pluggable tool for identifying and reporting on
patterns in JavaScript”
- Allows us to enforce code style rules and statically
analyze our code to ensure it complies with the rules
  - Ensure style consistency across a codebase
  *https://github.com/eslint/eslint

[1:32:23] May be there is hundred of people using the same code base, and everybody write Javascript slightly different,
we can use Eslint to yell at our developers.

### ESLint: Setup
- Install
  - Per project: `npm install --save-dev eslint`
  - Globally: `npm install -g eslint`
- Create your own config
  - Per project: `./node_modules/.bin/eslint --init`
  - Globally: `eslint init`
- Or extend an existing config
  - https://github.com/airbnb/javascript
  - https://github.com/kensho/eslint-config-kensho


To install in our project.    
ExpoCli > see [Working eslint](#working-eslint) below.  
``` console
Jun24 twng$ npm install -D eslint
Jun24 twng$ ./node_modules/.bin/eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · YAML
The config that you've selected requires the following dependencies:
eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now with npm? · Yes
Installing eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
+ eslint-plugin-react@7.20.1
+ @typescript-eslint/eslint-plugin@3.4.0
+ @typescript-eslint/parser@3.4.0
Successfully created .eslintrc.yml file
```

``` jsx
Jun24 twng$ ls -a
Jun24 twng$ vim .eslintrc.yml
  1 env:
  2   browser: true
  3   es2020: true
  4 extends:
  5   - 'eslint:recommended'
  6   - 'plugin:react/recommended'
  7   - 'plugin:@typescript-eslint/recommended'
  8 parser: '@typescript-eslint/parser'
  9 parserOptions:
 10   ecmaFeatures:
 11     jsx: true
 12   ecmaVersion: 11
 13   sourceType: module
 14 plugins:
 15   - react
 16   - '@typescript-eslint'
 17 rules: {}
```
can run on any file, > but error. > see [Working eslint](#working-eslint) below.
``` console
Jun24 twng$ ./node_modules/.bin/eslint api.js
Warning: React version not specified ....
```
**install Kenso config**
``` console
Jun24 twng$ npm install -D eslint-config-kensho
```

.eslintrc.yml delete the whole file and replace with
``` jsx
extends: kensho
```
**npx** is a short cut for ./node_modules/.bin/eslint
``` terminal
$ npx eslint api.js
```
Error: Failed to load plugin '@typescript-eslint' ... >  see [Working eslint](#working-eslint) below. 
  
### ESLint: Running
- Run on a file/directory
  - Per project: `./node_modules/.bin/eslint <path>`
  - Globally: `eslint <path>`
- Lint whole project by adding as an NPM script
- Most text editors have an integration

[:top: Top](#top)

---
### Prettier
- “Prettier is an opinionated code formatter”
- Prettier will rewrite your files to adhere to a specified code
style
- It can integrate with ESLint
  - Specify an eslint config and pass --fix to eslint to have prettier
auto-fix improper styling
* https://github.com/prettier/prettier

``` terminal
$ npm install -D prettier
$ npx eslint api.js
```
#### Working eslint
 https://github.com/kensho-technologies/eslint-config-kensho   
**`$ npm i -D eslint prettier typescript eslint-config-kensho`** :+1: 
``` console
Jun24 $ npm i -D eslint prettier typescript eslint-config-kensho
+ eslint-config-kensho@17.0.2
+ eslint@7.3.1
+ prettier@2.0.5
+ typescript@3.9.5
...
Jun24 $ vim .eslintrc.yml
    extends: kensho

Jun24 $ npx eslint api.js

Jun24/api.js
   1:24  error  Replace `contact` with `(contact)`                            prettier/prettier
  25:1   error  Delete `··`                                                   prettier/prettier
  26:43  error  Expected exception block, space or tab after '//' in comment  spaced-comment
  27:18  error  Expected exception block, space or tab after '//' in comment  spaced-comment

✖ 4 problems (4 errors, 0 warnings)
  4 errors and 0 warnings potentially fixable with the `--fix` option.
Jun24 $ npx eslint api.js --fix
```

.26 api.js to add code for test
``` jsx
  ...
  throw new Error(errMessage)
}

export const poorlyFormatted = (usedVar, unusedVar) => { return usedVar}
```
can automatic fixed the file, using **npx eslint api.js --fix**
``` terminal
Jun24 $ npx eslint api.js --fix

Jun24/api.js
  34:42  error  'unusedVar' is defined but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

:+1: - Lint whole project by adding as an NPM script

Example, the reason of it server work,
``` terminal
$ cd authServer
authServer$ npm start
authServer$ vim package.json
```
 because package.json got this
``` js
  "scripts": {
    "start": "node index"
  },
```
It defined a script called `start` that just runs that index file.

we can also in 
``` terminal
$ cd ..
$ vim package.js
```
we can change  
package.json
``` json
  "scripts": {
    "lint": "eslint api.js simpleRedux/"
  },
```
**npm run lint**.   
And now this will automatically lint all of the files that we want for us. For this example we lint api.js and simpleRedux/
``` console
Ts-MacBook-Pro:Jun24 twng$ npm run
Scripts available in my_nm via `npm run-script`:
  lint
    eslint api.js simpleRedux/
Ts-MacBook-Pro:Jun24 twng$ npm run lint

> @ lint /Users/twng/cs50m/Jun24
> eslint api.js simpleRedux/
...
...
/Users/twng/cs50m/Jun24/simpleRedux/store3.js
   36:7   warning  Unexpected console statement                                      no-console
   44:31  error    Use an object spread instead of `Object.assign` eg: `{ ...foo }`  prefer-object-spread
   70:7   error    'updateUser' is assigned a value but never used                   no-unused-vars
   70:20  error    Replace `update` with `(update)`                                  prettier/prettier
   75:7   error    'addContact' is assigned a value but never used                   no-unused-vars
   75:20  error    Replace `newContact` with `(newContact)`                          prettier/prettier
   81:43  error    Replace `dispatch` with `(dispatch)`                              prettier/prettier
   87:12  error    Replace `err` with `(err)`                                        prettier/prettier
   87:12  error    'err' is defined but never used                                   no-unused-vars
   90:2   error    Delete `⏎`                                                        prettier/prettier
   97:1   error    Delete `··`                                                       prettier/prettier
  108:1   warning  Unexpected console statement                                      no-console
...
...
```
[:top: Top](#top)

---
Source Code
---

### before/...

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

import AddContactScreen from './screens/AddContactScreen'
import SettingsScreen from './screens/SettingsScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import {fetchUsers} from './api'
import contacts from './contacts'
import store from './redux/store'

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
        <MainTabs />
      </Provider>
    )
  }
}

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
    return true
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

```

#### before/package.json
updated from [10_Redux](https://github.com/alvinng222/cs50m/tree/10_Redux#afterpackagejson)
``` js
{
  "dependencies": {
    "react-navigation": "2.0.0",
    "react-native-paper": "3.6.0",
    "react-native-vector-icons": "6.6.0",
    "react-native-vector-icons/Ionicons": "6.6.0",
    "redux": "4.0.5",
    "react-redux": "5.0.7"
  }
}
```  
[:top: Top](#top)

### before/authServer/...
#### before/authServer/index.js
Last update Jun 30, 2020.  .19 was before lecture.
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
  return res.status(200).send() // .19
  // return res.json({token: 'thisIsAToken'})
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
// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

```
#### before/redux/reducer.js
``` jsx
import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT} from './actions'

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
import {createStore} from 'redux'

import {addContact} from './actions'
import reducer from './reducer'

const store = createStore(reducer)

/*
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))
*/

store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'david m', phone: '5050505050'}))

console.log(store.getState())

export default store

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
[:top: Top](#top)

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

---
### after/...

#### after/App.js
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
    const {token} = await response.json()
    return token
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

export const poorlyFormatted = usedVar => usedVar

```
[:top: Top](#top)

#### after/package.json
Expo Cli, last updated Jun 30, 2020
``` jsx
{
  "main": "index.js",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "web": "expo start --web",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint api.js simpleRedux/"
  },
  "dependencies": {
    "expo": "~37.0.3",
    "expo-splash-screen": "^0.2.3",
    "expo-updates": "~0.2.0",
    "isomorphic-fetch": "^2.2.1",
    "prop-types": "^15.7.2",
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-native": "~0.61.5",
    "react-native-gesture-handler": "~1.6.0",
    "react-native-reanimated": "~1.7.0",
    "react-native-screens": "~2.2.0",
    "react-native-unimodules": "~0.9.0",
    "react-native-web": "~0.11.7",
    "react-navigation": "^2.0.0",
    "react-redux": "^5.0.7",
    "redux": "^4.0.5",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.3.0"
  },
  "devDependencies": {
    "@babel/core": "~7.9.0",
    "@typescript-eslint/eslint-plugin": "^3.4.0",
    "@typescript-eslint/parser": "^3.4.0",
    "babel-jest": "~25.2.6",
    "eslint": "^7.3.1",
    "eslint-config-kensho": "^17.0.2",
    "eslint-plugin-react": "^7.20.1",
    "jest": "~25.2.6",
    "prettier": "^2.0.5",
    "react-test-renderer": "~16.9.0",
    "typescript": "^3.9.5"
  },
  "jest": {
    "preset": "react-native"
  },
  "private": true
}

```
[:top: Top](#top)
### after/authServer/...

#### after/authServer/index.js
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
[:top: Top](#top)

#### after/authServer/package.json 
Files ./after/authServer/package.json and ./before/authServer/package.json are identical

### after/redux/...
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
[:top: Top](#top)

#### after/redux/reducer.js
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
[:top: Top](#top)

#### after/redux/store.js
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
### after/screens/...
#### after/screens/AddContactScreen.js
Files ./after/screens/AddContactScreen.js and ./before/screens/AddContactScreen.js are identical

#### after/screens/ContactListScreen.js
Files ./after/screens/ContactListScreen.js and ./before/screens/ContactListScreen.js are identical

#### after/screens/LoginScreen.js
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
[:top: Top](#top)

### after/simpleRedux/...
#### after/simpleRedux/reducer.js
Files ./after/simpleRedux/reducer.js and ./before/simpleRedux/reducer.js are identical

#### after/simpleRedux/store2.js
Files ./after/simpleRedux/store2.js and ./before/simpleRedux/store2.js are identical

#### after/simpleRedux/store3.js
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
[:top: Top](#top)

---
myNote
---

#### my expo.io/ snacks: https://expo.io/snacks/@awesome2/. 
#### Expo Cli, Contacts
``` console
        $ cd ..
        $ expo init
        $ cd Jun24
        Jun24 $ npm install react-navigation@2.0.0 --save
        Jun24 $ npm install prop-types, redux
        Jun24 $ npm install react-redux@5.0.7 --save
        Jun24 $ npm install redux-thunk
       
        Jun24 $ npm install redux-persist
        Jun24 $ npm run web
```

#### authServer
Terminal - LEFT
``` console
            simpleRedux $ ..  
            ...
            authServer $ npm install
            authServer $ npm start
            authServer $ exit (if error due to background is running other)
            authServer $ npm start
            > authserver@1.0.0 start /Users/twng/cs50m/Jun24/authServer
            > node index
            Listening at http://localhost:8000
```
Terminal - Right
``` console
            simpleRedux $ npm install isomorphic-fetch.   
            ...
            simpleRedux $ node store3.js
            received an action: LOG_IN_SENT
            { user: {}, contacts: [] }
            received an action: LOG_IN_SUCCESS
```
[:top: Top](#top)

#### markdown.md
:joy: markdownGuide https://www.markdownguide.org/basic-syntax/     
:sunny: https://www.markdownguide.org/extended-syntax/

:+1: emoji short code: https://gist.github.com/rxaviers/7360908
``` markdown
        table
        |---|
```

#### terminal, compare files
``` terminal
    ~/cs50m/src10/ $  diff -qsr ./after/ ./before/
      -q, --brief                   report only when files differ
      -s, --report-identical-files  report when two files are the same
      -r, --recursive               recursively compare any subdirectories found
```

#### eslint prettier
```
            $ npm i -D eslint prettier typescript eslint-config-kensho
            $ vim .eslintrc.yml
                extends: kensho
            $ npx eslint file.js
            ...
            $ npx eslint file.js --fix
```

---
#### Git branch 11_AsyncRedux_Tools
```
    Ts-MacBook-Pro:cs50m twng$ cat .gitignore
    .DS_Store
    /Jun24
    .gitignore
    Ts-MacBook-Pro:cs50m twng$ git branch -v
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push -u origin 11_AsyncRedux_Tools
```
checked on github, https://github.com/alvinng222/cs50m/tree/11_AsyncRedux_Tools

[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)  
back to previous: [10_Redux](https://github.com/alvinng222/cs50m/tree/10_Redux)   
continue to next: [12_Performance](https://github.com/alvinng222/cs50m/tree/12_Performance)

---
