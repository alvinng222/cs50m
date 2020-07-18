Lecture 9: Redux
===
[top]: topOfThePage
lecture: http://video.cs50.net/mobile/2018/spring/lectures/9

slides: http://cdn.cs50.net/mobile/2018/spring/lectures/9/lecture9.pdf

final project: http://docs.cs50.net/mobile/2020/x/projects/final/final.html
* [Scaling Complexity](#scaling-complexity)
* [Scaling Complexity: Facebook](#scaling-complexity-facebook)
* [Flux](#flux)
* [Redux](#redux)
* [simpleRedux/](#simpleredux)
* [Reducer](#reducer)
* [Store](#store)
* [Actions](#actions)
* [simpleRedux → redux](#simpleredux--redux)
* [Review: HOCs](#review-hocs)

[Source Code](#source-code)
files: src9.zip

[**before/...**](#before)
    AddContactForm.js
    [App.js](#beforeappjs)
    Row.js
    SectionListContacts.js
    api.js
    contacts.js
    package.json

before/screens/...
        [AddContactScreen.js](#beforescreensaddcontactscreenjs)
        [ContactDetailsScreen.js](#beforescreenscontactdetailsscreenjs)
        [ContactListScreen.js](#beforescreenscontactlistscreenjs)
        LoginScreen.js
        SettingsScreen.js

[**after/...**](#after)
    AddContactForm.js
    [App.js](#afterappjs)
    Row.js
    SectionListContacts.js
    contacts.js
    package.json

after/...
    [redux/actions.js](#reduxactionsjs)
    [redux/reducer.js](#reduxreducerjs)
    [redux/store.js](#reduxstorejs)
    [simpleRedux/reducer.js](#simplereduxreducerjs)
    [simpleRedux/store.js](#simplereduxstorejs)
    [simpleRedux/store2.js](#simplereduxstore2js)
    
after/screens/...
        [AddContactScreen.js](#afterscreensaddcontactscreenjs)
        ContactDetailsScreen.js
        [ContactListScreen.js](#afterscreenscontactlistscreenjs)
        SettingsScreen.js

[without React-Redux connect](#without-react-redux-connect)

final project: [Final Project: Self-Designed App](https://github.com/alvinng222/cs50m/tree/projectFinal)

[**myNote**](#mynote)

--------------------------------------

### Previous Lecture [08_Data](https://github.com/alvinng222/cs50m/tree/08_Data).   
- APIs
- Making Network Requests
- Promises, Async/Await
- Data Transformations
- Authentication
- HTTP Methods
- HTTP Response Codes
- Expo Components

### Scaling Complexity
- Our apps have been relatively simple, but we’re already
starting to see bugs related to app complexity
    - Forgetting to pass a prop
    - Directly managing deeply nested state
    - Duplicated information in state
    - Not updating all dependent props
    - Components with large number of props
    - Uncertainty where a piece of data is managed

### Scaling Complexity: Facebook
- Facebook found the MVC architecture too complex for
their scale
- The complexity manifested itself into bugs
- Facebook rearchitected into one-way data flow
* https://youtu.be/nYkdrAPrdcw?t=10m22s

### Flux
- “An application architecture for React utilizing a
unidirectional data flow”
    - The views react to changes in some number of “stores”
    - The only thing that can update data in a store is a “dispatcher”
    - The only way to trigger the dispatcher is by invoking “actions”
    - Actions are triggered from the views
- Many implementations
    - https://github.com/facebook/flux
    - https://github.com/reactjs/redux
        - Whether redux is an implementation of Flux is an opinion that can be argued either way

> ` [ Action ] → [dispatcher ] → [Store],[Store],[S] → [View],[View],[View] → back to Action `

[:top: Top](#top)

---
### Redux
- A data management library inspired by Flux
- Single source of truth for data
- State can only be updated by an action that triggers a
recomputation
- Updates are made using pure functions
- **Action → Reducer → Update Store**
* https://redux.js.org

> `[ Action ] → [ Store ] → [View],[View],[View] → back to Action `

[13:08]
[:top: Top](#top)
### simpleRedux/
mkdir simpleRedux

### Reducer
- Takes the previous state and an update and applies the
update
- Should be a pure function
    - Result is deterministic and determined exclusively by arguments
    - No side effects
- Should be immutable
    - Return a new object
- What is responsible for invoking the reducer?

.new 01 ./simpleRedux/reducer.js, simple reducer, on CS50 IDE
``` js
const reducer = (state, update) => ({
    ...state,
    ...update,
})
```
.02 reducer.js
``` js
const reducer = (state, update) => ({
    ...state,
    ...update,
})

let state ={}
state = reducer(state,{foo: 'foo'})
state = reducer(state,{bar: 'bar'})
state = reducer(state,{foo: 'baz'})
```
But first, since object spread `...state` is not yet supported by **node**,

.03 reducer.js
``` jsx
const merge = (prev, next) => Object.assign({}, prev, next)

const reducer = (state, update) => merge(state, update)

let state ={}
state = reducer(state, {foo: 'foo'})
state = reducer(state, {bar: 'bar'})
state = reducer(state, {foo: 'baz'})

console.log(state)
```
Terminal: **$ node reducer.js**
``` console
        simpleRedux twng$ vim reducer.js
        simpleRedux twng$ node reducer.js
        { foo: 'baz', bar: 'bar' }
```
And so to recap, all a reducer is is something
that takes some previous state and something that we want to update it
with and then returns a new state.  
And so like I alluded to earlier, we can make our reducer even simpler by
```
const reducer = (state, update) => state 
```
, which donesnt do any things  
[:top: Top](#top)
[20:01]

---
### Store
- Responsible for maintaining state
- Exposes getter via getState()
- Can only be updated by using dispatch()
- Can add listeners that get invoked when state changes

.new ./simpleRedux/store.js .04, So if we run that, we just get an empty object back, which is as expected.
``` jsx
const merge = (prev, next) => Object.assign({}, prev, next);

const reducer = (state, update) => merge(state, update);

class Store{
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
    }
    
    getState() {
        return this.state;
    }
}

const store = new Store(reducer, {});
console.log(store.getState());
/*  ~/cs50m/simpleRedux/ $ node store.js
    {} */
```
.05 store.js And if we add instead past its arbitrary object like foo foo, and then ran it,
``` jsx
...
const store = new Store(reducer, {foo: 'foo'});
console.log(store.getState()); // => { foo: 'foo' }
```
So first, and most importantly, we should have some sort of way
to update that state.
And the way that we do this in Redux is by dispatching an action
or by just invoking this method called dispatch with some way of updating.

And let's, for now, actually just not pass an initial value at all.
And so we dispatch a few updates, and then now let's
log some initials, or the state after those dispatches. And so we get back what we wanted.   
.06 store.js. 
``` jsx
class Store{
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    dispatch(update) {
        this.state = this.reducer(this.state, update)
    } // .06
}

const merge = (prev, next) => Object.assign({}, prev, next);

const reducer = (state, update) => merge(state, update);

const store = new Store(reducer); // .06

store.dispatch({foo: 'foo'}); // .06
store.dispatch({bar: 'bar'})
store.dispatch({foo: 'baz'})

console.log(store.getState()); 
//  $ node store.js
//  { foo: 'baz', bar: 'bar' }
```
[:top: Top](#top)
[29:43]


---
### Actions
- An action is a piece of data that contains the information
required to make a state update
    - Usually objects with a type key
    - https://github.com/redux-utilities/flux-standard-action
- Functions that create actions are called action creators
- Actions must be dispatched in order to affect the state

Example for FSA,   
**A basic Flux Standard Action:**
```
    {
      type: 'ADD_TODO',
      payload: {
        text: 'Do something.'  
      }
    }
```
Actions
An action MUST  
    . be a plain JavaScript object.  
    . have a type property.   
An action MAY  
    . have an error property.  
    . have a payload property.  
    . have a meta property.  
An action MUST NOT include properties other than type, payload, error, and meta.

[30:51]   
to keep track our contact, users; username, login or not, key values  ...    
**.new 08 ./simpleRedux/store2.js** on CS50 IDE.   
reducers handle contact and user. The main reducer will combine all these reducers.

 Consider an action in Flux. The object has a key called **type**, and **payload**.
``` jsx
class Store{
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    dispatch(update) {
        this.state = this.reducer(this.state, update)
    } // .06
}

const DEFAULT_STATE = {user: {}, contacts: []} //user:object; contacts:array .08

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state, newContact) => [...state, newContact] //.08
const userReducer = (state, update) => merge(state, update) //.08

/* will be syntax error on node
const reducer = (state, action) => {
  if (action.type === 'UPDATE_USER') {
    return {
      ... state,
      user: userReducer(state.user, action.payload)
    }
  }
*/
const reducer = (state, action) => {
  if (action.type === 'UPDATE_USER') {
    return merge(
      state,
      {user: userReducer(state.user, action.payload)}
    )
  }

  return state
} // .08

const store = new Store(reducer, DEFAULT_STATE); // .06 .08
store.dispatch({type: 'UPDATE_USER', payload: {foo: 'foo'}}); // .06 .08
store.dispatch({type: 'UPDATE_USER', payload: {bar: 'bar'}})
store.dispatch({type: 'UPDATE_USER', payload: {foo: 'baz'}})

console.log(store.getState());
//      $ node store2.js
//      { user: { foo: 'baz', bar: 'bar' }, contacts: [] }
```
[:top: Top](#top)
[47:14]

.09 store2.js allowing us to add ontacts. Using Reducer
``` jsx
class Store{
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    dispatch(update) {
        this.state = this.reducer(this.state, update)
    } // .06
}

const DEFAULT_STATE = {user: {}, contacts: []} // .08

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state, newContact) => [...state, newContact] //.08
const userReducer = (state, update) => merge(state, update) //.08

const reducer = (state, action) => {
  if (action.type === 'UPDATE_USER') {
    return merge(
      state,
      {user: userReducer(state.user, action.payload)}
      )
  }

  if (action.type === 'UPDATE_CONTACT') {
    return merge(
      state,
      {contacts: contactReducer(state.contacts, action.payload)}
      )
  } // .09

  return state
} // .08

const store = new Store(reducer, DEFAULT_STATE); // .06 .08
store.dispatch({type: 'UPDATE_USER', payload: {foo: 'foo'}}); // .06 .08
store.dispatch({type: 'UPDATE_USER', payload: {bar: 'bar'}})
store.dispatch({type: 'UPDATE_USER', payload: {foo: 'baz'}})

store.dispatch({type: 'UPDATE_CONTACT', payload:{name: 'Jorhan', number:'1234567890'}}) // .09
store.dispatch({type: 'UPDATE_CONTACT', payload:{name: 'Jorhan', number:'1234567890'}}) // .09b

console.log(store.getState());
/* >
        $ node store2.js
        {
          user: { foo: 'baz', bar: 'bar' },
          contacts: [
            { name: 'Jorhan', number: '1234567890' },
            { name: 'Jorhan', number: '1234567890' }
          ]
        } */
```
.10 store2.js action types, tidy up via creating objects. Creating Constants type.
``` jsx
// action types
const UPDATE_USER = 'UPDATE_USER' // .10
const UPDATE_CONTACT = 'UPDATE_CONTACT' //.10

class Store{
...
const reducer = (state, action) => {
  if (action.type === UPDATE_USER) { //.10
...

  if (action.type === UPDATE_CONTACT) { //.10
...

const store = new Store(reducer, DEFAULT_STATE); // .06 .08
store.dispatch({type: UPDATE_USER, payload: {foo: 'foo'}}); // .06 .08 .10
store.dispatch({type: UPDATE_USER, payload: {bar: 'bar'}})
store.dispatch({type: UPDATE_USER, payload: {foo: 'baz'}})

store.dispatch({type: UPDATE_CONTACT, payload:{name: 'Jorhan', number:'1234567890'}}) // .09
store.dispatch({type: UPDATE_CONTACT, payload:{name: 'Jorhan', number:'1234567890'}}) // .09b

console.log(store.getState()); 

```
But now, every single time we want to dispatch an action,
we have to type that entire action out.
And so maybe it might be better to create a function that
creates our actions for us.   
.11 store2.js
``` jsx
...
  return state
} // .08 

// action creators
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
}) //.11

const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
}) //.11b

const store = new Store(reducer, DEFAULT_STATE); // .06 .08
store.dispatch(updateUser({foo: 'foo'})); // .06 .08 .10 .11
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09 .11b
store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09b
```
[:top: Top](#top)
[59:40]

There is scalability problem. when we update, we need to change alot of code in our Reducers.

main reducer just pass the action to all of them smaller reducers.  
And now the previous contacts stored in the user
is indeed the most recently added contact.  

.12 store2.js
``` jsx
...
const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state, action) => {
   if (action.type === UPDATE_CONTACT) return [...state, action.payload]
   return state
} //.08 .12

const userReducer = (state, action) => {
  if (action.type === UPDATE_USER) return merge(state, action.payload)
  if (action.type === UPDATE_CONTACT) return merge(state, {prevContact: action.payload}) //.12b
  return state
} //.08 .12

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
}) //.12

// action creators
...
```
Terminal:
``` console
        $ node store2.js
        {
          user: {
            foo: 'baz',
            bar: 'bar',
            prevContact: { name: 'Jorhan', number: '1234567890' }
          },
          contacts: [
            { name: 'Jorhan', number: '1234567890' },
            { name: 'Jorhan', number: '1234567890' }
          ]
        }
```
[:top: Top](#top)
[1:10:00]

---
### simpleRedux → redux
- Our redux implementation has a very similar API
    - Missing a way to notify that state has updated
- How do we get the info from the store to our components?
    - store.getState()
- How do we update the store?
    - store.dispatch()
- How do we get the application to update when the store
changes?

Expo Cli install Redux
``` 
    $ npm install redux
``` 
can also install on CS50 IDE, `~/cs50m/Redux/`

.new .13 ./Redux/store.js copied from ./SimpleRedux/store2.js
```
$ mkdir redux
$ cd redux
redux $ cp ../simpleRedux/store2.js store.js
redux $ vim store.js
```
.14 store.js on CS50 IDE, working
``` jsx
//import {createStore} from 'redux' // not support on node //.14
const {createStore} = require('redux') //this for node //.14 

// action types
const UPDATE_USER = 'UPDATE_USER' // .10
const UPDATE_CONTACT = 'UPDATE_CONTACT' //.10

/* .14  delete class Store
class Store{
 ...
} */

const DEFAULT_STATE = {user: {}, contacts: []} // .08

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state, action) => {
   if (action.type === UPDATE_CONTACT) return [...state, action.payload]
   return state
} //.08 .12

const userReducer = (state, action) => {
  if (action.type === UPDATE_USER) return merge(state, action.payload)
  if (action.type === UPDATE_CONTACT) return merge(state, {prevContact: action.payload}) //.12b
  return state
} //.08 .12

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
}) //.12

// action creators
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
}) //.11

const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
}) //.11b

const store = createStore(reducer, DEFAULT_STATE); // .06 .08 .14
store.dispatch(updateUser({foo: 'foo'})); // .06 .08 .10 .11
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09 .11b
store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09b
store.dispatch(addContact({name: 'David M', number:'50505050505'})) //.12c

console.log(store.getState());
```
Terminal
``` console
        redux $ ls
        store.js
        redux $ node store.js
        {
          user: {
            foo: 'baz',
            bar: 'bar',
            prevContact: { name: 'David', number: '505050505050' }
          },
          contacts: [
            { name: 'Jorhan', number: '1234567890' },
            { name: 'Jorhan', number: '1234567890' },
            { name: 'David', number: '505050505050' }
          ]
        }
```
[:top: Top](#top)

Redux actually, also, gives us a few other goodies. **combineReducers**.   
.15 store.js
``` jsx
//import {createStore} from 'redux' //not support on node //.14
const {combineReducers, createStore} = require('redux') //this for node //.14 .15
...

const contactReducer = (state = [], action) => {
   if (action.type === UPDATE_CONTACT) return [...state, action.payload]
   return state
} //.08 .12 .15

const userReducer = (state = {}, action) => {
  if (action.type === UPDATE_USER) return merge(state, action.payload)
  if (action.type === UPDATE_CONTACT) return merge(state, {prevContact: action.payload}) //.12b
  return state
} //.08 .12 .15

const reducer = combineReducers({
    user: userReducer,
    contacts: contactReducer,
}) //.15

...
```
[:top: Top](#top)

And so let's start to **split those out into separate files**
> redux $ cp store.js reducer.js  
> redux $ cp store.js action.js

.new .16 actions.js
``` jsx
// action types
export const UPDATE_USER = 'UPDATE_USER' // .10 .16
export const UPDATE_CONTACT = 'UPDATE_CONTACT' //.10 .16

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
}) //.11 .16

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
}) //.11b .16
```
.new .17 reducer.js
``` jsx
import {combineReducers} from 'redux' //not support on node //.14 .17

import {UPDATE_USER, UPDATE_CONTACT} from './actions' //.17

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state = [], action) => {
   if (action.type === UPDATE_CONTACT) return [...state, action.payload]
   return state
} //.08 .12 .15

const userReducer = (state = {}, action) => {
  if (action.type === UPDATE_USER) return merge(state, action.payload)
  if (action.type === UPDATE_CONTACT) return merge(state, {prevContact: action.payload}) //.12b
  return state
} //.08 .12 .15

const reducer = combineReducers({
    user: userReducer,
    contacts: contactReducer,
}) //.15

export default reducer //.17

/* can be
const reducer = combineReducers({
    user: combineReducers({
      meta: userMetaReducer,
      logins: userLoginReducer,
    }),
    contacts: contactReducer,
}) //.15 .17 */
```
(.new) .18 store.js
``` jsx
import {createStore} from 'redux' //not support on node //.14

import reducer from './reducer' // .18

const store = createStore(reducer); // .14 .18

/*
store.dispatch(updateUser({foo: 'foo'})); // .06 .08 .10 .11
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09 .11b
store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09b
store.dispatch(addContact({name: 'David M', number:'50505050505'})) //.12c

console.log(store.getState());
*/

export default store
```
.19 reducers.js easier to read
``` jsx
...
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return merge(state, action.payload)
        case UPDATE_CONTACT:
            return merge(state, {prevContact: action.payload}) //.12b
        default:
            return state
    } //.19
} //.08 .12 .15
```
[:top: Top](#top)
[01:27:32]
### back to contacts

working on is this contacts app.
... namely that the login screen is gone and the asynchronous request
for fetching the contacts is gone.

myNote: 10_Redux via Snack, download [*before/...*](#before) except *LoginScreen.js, api.js*, FlatListContacts.js ScrollViewContacts.js/ To work, modify json &  
**.new 07 app.js**
``` jsx
//.07 import LoginScreen from './screens/LoginScreen'
//.07 import {fetchUsers} from './api'
...
const AppNavigator = createSwitchNavigator({
  //.07 Login: LoginScreen,
  Main: MainTabs,
})
```
.07 package.json
``` jsx
{
  "dependencies": {
    "react-navigation": "2.0.0",
    "react-native-paper": "3.6.0",
    "react-native-vector-icons": "6.6.0",
    "react-native-vector-icons/Ionicons": "6.6.0"
  }
}
```
Terminal, copied to store.js
``` console
        $ cp simpleRedux/store2.js store.js
        $ ls
        AddContactForm.js	api.js			node_modules
        app.json		package-lock.json
        App.js			babel.config.js		package.json
        Row.js			contacts.js		screens
        SectionListContacts.js	index.js		simpleRedux
        __tests__		ios			store.js
        android			metro.config.js		web-build
        $ 
```
[:top: Top](#top)

> ● How do we get the info from the store to our components? store.getState()

using Snack, 
cont from *.new 07 app.js*  
action.js, reducer.js & store.js

> **a space before 'action.js' costs my time to trace the bug!!!**

And so we don't really care about contacts in all of our pages.
We only care about it in the page that displays them.
And so let's delete this code that passes the contacts as a screen.  
.20 app.js, to change after .21 .22
``` jsx
  render() {
    return (
      <MainTabs />
    )
  } //.20
```

.22 contactListScreen.js, atleast shown that the actions reducer & store 
``` jsx
import store from '../redux/store' //.22
...
  render() {
    const contacts = store.getState().contacts //.22
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && (
          <SectionListContacts  
            contacts={contacts} // .22 was //contacts={this.props.screenProps.contacts}
            onSelectContact={this.handleSelectContact}
          />
        )}
      </View>
    )
  }
```

.21 store.js release contacts data, import {addContact}. It just shown listing.
```jsx
import {createStore} from 'redux' //not support on node //.14
import reducer from './reducer' // .18
import {addContact} from './actions' // .23

const store = createStore(reducer); // .14 .18

/*
store.dispatch(updateUser({foo: 'foo'})); // .06 .08 .10 .11
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))
*/
store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09 .11b //.21
store.dispatch(addContact({name: 'Jorhan', number:'1234567890'})) // .09b
store.dispatch(addContact({name: 'David M', number:'50505050505'})) //.12c

console.log(store.getState());

export default store
```

[01:33:23]  **so far so good**, contacts showing up, however phone are not, unable to update.

[:top: Top](#top)

.23 store.js changed number to phone.
``` jsx
...
store.dispatch(addContact({name: 'David M', phone:'50505050505'})) //.12c
```
[1:34:55]
> ● How do we update the store? ○ store.dispatch()

.24 AddContactScreen.js, it show up the new contact after trigger Toggle Contact
``` jsx
import React from 'react'
import AddContactForm from '../AddContactForm'

import store from '../redux/store'//.24
import {addContact} from '../redux/actions'  //.24

export default class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'New Contact',
  }

  handleSubmit = formState => {
    //store.dispatch(addContact(formState)) // .24b
    store.dispatch(addContact({name: formState.name, phone: formState.phone})) // .24b
    this.props.navigation.navigate('ContactList')
  }

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />
  }
}
```
> ● How do we get the application to update when the store
changes?

[:top: Top](#top)

---
### Review: HOCs
- Higher-Order Components take components as
arguments or return components
- We could create a HOC that does the following:
    - Check for state updates and pass new props when that happens
    - Automatically bind our action creators with store.dispatch()
- We’d also need to subscribe to store updates
* https://github.com/reactjs/react-redux

**Provider** & **Connect**

ExpoCli install `react-redux`, shown in package.json. Also can use Snack.
```
        $ npm install react-redux@5.0.7 --save
```        

.25 ContactListScreen.js `connect`, but it doens't work yet
``` jsx
import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux' // .25

import SectionListContacts from '../SectionListContacts'
//.25 import store from '../redux/store' //.22

class ContactListScreen extends React.Component { //.25
...

  render() {
    //.25b const contacts = store.getState().contacts // .22
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && (
          <SectionListContacts
            contacts={this.props.contacts} // .22 25b
            onSelectContact={this.handleSelectContact}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, },
})

const mapStateToProps = state => ({
  contacts: state.contacts,
}) //.25
export default connect(mapStateToProps)(ContactListScreen) //.25
```
.26 App.js  `Provider`
``` jsx
...
import {Provider} from 'react-redux' // .26

...
import store from './redux/store' // .26

...

  render() {
    return (
      <Provider store={store}>
      <MainTabs />
      </Provider>
    )
  } //.20 .26
}
```
It work now! my note need to change to `"react-redux": "5.0.7"`.    
package.json for Snack
``` js
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


.27 AddContactScreen.js
``` jsx
import React from 'react'
import AddContactForm from '../AddContactForm'
import {connect} from 'react-redux' //.27
//.27 import store from '../redux/store'//.24
import {addContact} from '../redux/actions'  //.24

//.27export default class AddContactScreen extends React.Component {
class AddContactScreen extends React.Component { //.27
  static navigationOptions = {
    headerTitle: 'New Contact',
  }

  handleSubmit = formState => {
    //store.dispatch(addContact(formState)) // .24b
    //store.dispatch(addContact({name: formState.name, phone: formState.phone})) // .24b
    this.props.addContact({name: formState.name, phone: formState.phone}) //.27
    this.props.navigation.navigate('ContactList')
  }

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />
  }
}

export default connect(null, {addContact: addContact})(AddContactScreen) //.27` 
```

It have error on other pages, such as gotoRandom.

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

import AddContactScreen from './screens/AddContactScreen'
import SettingsScreen from './screens/SettingsScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import {fetchUsers} from './api'
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
      <MainTabs
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

#### before/package.json
``` jsx
{
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "dependencies": {
    "expo": "^25.0.0",
    "prop-types": "^15.6.1",
    "react": "16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz",
    "react-native-vector-icons": "^4.5.0",
    "react-navigation": "2.0.0-beta.5"
  }
}

```
[:top: Top](#top)


### before/screens/...
#### before/screens/AddContactScreen.js
``` jsx
import React from 'react'
import AddContactForm from '../AddContactForm'

export default class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'New Contact',
  }

  handleSubmit = formState => {
    this.props.screenProps.addContact(formState)
    this.props.navigation.navigate('ContactList')
  }

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />
  }
}

```
[:top: Top](#top)

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
[:top: Top](#top)

#### before/screens/ContactListScreen.js
``` jsx
import React from 'react'
import {Button, View, StyleSheet} from 'react-native'

import SectionListContacts from '../SectionListContacts'

export default class ContactListScreen extends React.Component {
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
            contacts={this.props.screenProps.contacts}
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

#### after/package.json
Snack, last updated Jun25,'20
``` jsx
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

ExpoCli, last updated Jul 17, '20
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
    "react-navigation": "^2.0.0",
    "react-redux": "^5.0.7",
    "redux": "^4.0.5"
  },
  "devDependencies": {
    "@babel/core": "^7.8.6",
    "babel-preset-expo": "~8.1.0"
  },
  "private": true
}

```

[:top: Top](#top)
    
after/...
#### redux/actions.js
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
[:top: Top](#top)

#### redux/reducer.js
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
[:top: Top](#top)

#### redux/store.js
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

#### simpleRedux/reducer.js
``` jsx
const merge = (prev, next) => Object.assign({}, prev, next)

const reducer = (state, update) => merge(state, update)

let state = {}
state = reducer(state, {foo: 'foo'})
state = reducer(state, {bar: 'bar'})
state = reducer(state, {foo: 'baz'})

console.log(state)

```
[:top: Top](#top)

#### simpleRedux/store.js
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
[:top: Top](#top)

#### simpleRedux/store2.js
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
    
### after/screens/...
#### after/screens/AddContactScreen.js
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

#### after/screens/ContactDetailsScreen.js
Files ./after/screens/ContactDetailsScreen.js and ./before/screens/ContactDetailsScreen.js are identical

#### after/screens/ContactListScreen.js
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
[:top: Top](#top)

---
#### without React-Redux `connect`
##### after/screens/AddContactScreen.js without React-Redux
``` jsx
import React from 'react'
import AddContactForm from '../AddContactForm'

import store from '../redux/store'//.24
import {addContact} from '../redux/actions'  //.24

export default class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'New Contact',
  }

  handleSubmit = formState => {
    //store.dispatch(addContact(formState)) // .24b
    store.dispatch(addContact({name: formState.name, phone: formState.phone})) // .24b  
    this.props.navigation.navigate('ContactList')
  }

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />
  }
}

```

##### after/screens/ContactListScreen.js without React-Redux
``` jsx
import React from 'react'
import {Button, View, StyleSheet} from 'react-native'

import SectionListContacts from '../SectionListContacts'
import store from '../redux/store' //.22

export default class ContactListScreen extends React.Component {
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
    const contacts = store.getState().contacts //.22
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && (
          <SectionListContacts  
            contacts={contacts} // .22
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

```

---
myNote
---
### App running
Code used from [after/...](/after), start from   
**ExpoCli**, base on 08_Data/package.json,   
install of component:

    $ npm install redux react-redux@5.0.7
Last workable,Jul17,'20, see [package.json](#afterpackagejson).       
ExpoCli web: start ok; devices: not working 

Issue: bugs after the `go to random contact`. 

---
#### my expo.io/ snacks: https://expo.io/snacks/@awesome2/. 

---
#### debug on node
.14 store.js on CS50 IDE, working
``` jsx
//import {createStore} from 'redux' // not support on node //.14
const {createStore} = require('redux') //this for node //.14 
```
---
#### installing flash Expo Cli, Contacts
``` console
        $ cd ..
        $ expo init
        $ cd Jun24
        Jun24 $ npm install react-navigation@2.0.0 --save
        Jun24 $ npm install prop-types
        
        Jun24 $ npm install redux
        Jun24 $ npm install react-redux@5.0.7 --save
        Jun24 $ npm run web
```
To run lecture *Contacts* add from ./before:   
        AddContactForm.js	api.js			
        App.js	
        Row.js			contacts.js		screens
        SectionListContacts.js
``` console
        Jun24 $ ls -c
        AddContactForm.js	api.js			node_modules
        app.json		package-lock.json
        App.js			babel.config.js		package.json
        Row.js			contacts.js		screens
        SectionListContacts.js	index.js		web-build
        __tests__		ios
        android			metro.config.js
```

[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)  
back to previous: [09_ExpoComponents](https://github.com/alvinng222/cs50m/tree/09_ExpoComponents)   
continue to next: [11_AsyncRedux_Tools](https://github.com/alvinng222/cs50m/tree/11_AsyncRedux_Tools)

---
