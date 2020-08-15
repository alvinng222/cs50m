Lecture 11: Performance
===
[top]: topOfThePage

lecture: http://video.cs50.net/mobile/2018/spring/lectures/11

slides: http://cdn.cs50.net/mobile/2018/spring/lectures/11/lecture11.pdf
- [Performance](#performance-1)
- [Trade-Offs](#trade-offs)
- [Measuring Performance](#measuring-performance)
- [Common Inefficiencies](#common-inefficiencies)
- [Rerendering Too Often](#rerendering-too-often)
- [Unnecessarily Changing Props](#unnecessarily-changing-props)
- [Unnecessary Logic in Mount/Update](#unnecessary-logic-in-mountupdate)
- [Reminder: Trade-Offs](#reminder-trade-offs)
- [Animations](#animations)
- [Animated](#animated)

[Source Code](#source-code)
files: src11.zip

[before/contacts/...](#beforecontacts)
[App.js](#beforecontactsappjs)
[Row.js](#beforecontactsrowjs)
SectionListContacts.js
api.js
contacts.js
[package.json](#beforecontactspackagejson)      
before/contacts/redux/...
    [actions.js](#beforecontactsreduxactionsjs.)
    [reducer.js](#beforecontactsreduxreducerjs)
    [store.js](#beforecontactsreduxstorejs)   
before/contacts/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    [ContactListScreen.js](#beforecontactsscreenscontactlistscreenjs)
    LoginScreen.js
    SettingsScreen.js       
[before/pomodoro-timer/...](#beforepomodoro-timer)
[App.js](#beforepomodoro-timerappjs)
package.json    
before/pomodoro-timer/components/...
    Countdown.js
    TimeInput.js
    TimerToggleButton.js
    index.js   
before/pomodoro-timer/utils/...
    Timer.js
    index.js
    vibrate.js

[after/contacts/...](#aftercontacts)
App.js
[PureButton.js](#aftercontactspurebuttonjs)
[PureButtonScreen.js](#aftercontactspurebuttonscreenjs)
Row.js
SectionListContacts.js
api.js
contacts.js
package.json   
after/contacts/redux/...
    actions.js
    reducer.js
    store.js   
after/contacts/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    LoginScreen.js
    SettingsScreen.js   
[after/pomodoro-timer/...](#afterpomodoro-timer)
App.js
[ProgressBar.js](#beforepomodoro-timerprogressbarjs)
ProgressBarAnimated.js
package.json   
after/pomodoro-timer/components/...
      Countdown.js
      TimeInput.js
      TimerToggleButton.js
      index.js   
after/pomodoro-timer/utils/...
    [Timer.js](#afterpomodoro-timerutilstimerjs)
    index.js
    vibrate.js

[**myNote**](#mynote)  

[:top: Top](#top)

---
### Previous Lecture [11_AsyncRedux_Tools](https://github.com/alvinng222/cs50m/tree/11_AsyncRedux_Tools). 
- Async simpleRedux/
- Redux Middleware
- redux-persist
- Container vs Presentational Components
- ESLint
- Prettier

### Performance
- How quickly and efficiently something works
- Performance optimization is the process of making
something work as efficiently as possible
- Performance optimization is a very wide field
    - Today we’ll discuss optimizing on the JavaScript side of things
    - Mostly high-level, with examples

### Trade-Offs
- Performance optimization usually comes at a complexity
cost
    - In most cases, optimization is not worth the cost in complexity and
maintainability
- Don’t over-optimize until a bottleneck is found
- How do we measure for bottlenecks?

### Measuring Performance
- Be mindful of the environment setting of your application
- React Native Perf Monitor
    - Shows you the refresh rate on both the UI and JS threads
    - Anything below 60 means frames are being dropped
- Chrome Performance Profiler
    - Shows you a flame chart of all of your components
    - Only available in development mode

[:top: Top](#top)

Using [before/contacts](https://github.com/alvinng222/cs50m/tree/12_Performance/before/contacts)   
& based on [before/contacts/package.json](#beforecontactspackagejson)   
App.js
``` jsx
import Constants from 'expo-constants'; //import {Constants} from 'expo'  
```

There are actually two different enviroments, one is production, another is   
non-production, which most people consider development mode.

React actually has a few optimizations that it does when it's in production mode.
And so things like prop types aren't necessarily checked.
And warnings and errors are not necessarily displayed.

#### Show Performance Monitor
[4:43] If i shake the device on Expo, iPhone8, can bring up this menu:
```
            . Reload
            . Copy link to clipboard
            . Go to Home
            ---
            . Disable Fast Refresh
            . Debug Remote JS
            . Show Performance Monitor
            . Show Element Inspector
```
in Expo Andriod phone, after clicked the `Show Performance Monitor` Toggling, will see the JS's frame droped to 2fps.
``` console
            UI: 60.0 fps
            12 dropped so far
            0 stutters (4+) so far
            JS: 58.9 fps
```
[0:05:43] And in this case, shown ScrollView actually render everthing. Which shown the JS frame droped.

#### Frame Chart
Chrome Performance Profiler    
Expo-Cli, Run in Web browser, right click for Inspect, that bring up he 
Developer Tool > **Permformance** > click the Record button.

It record and shown running Javascrip inside the Google Chrome.

for this contacts, toggle off the contact, start record, and toggle on.   
And then Chrome will analyze things and show us this chart here.
And so we see Frames, Interactions, Main, Raster, GPU, User Timing.
If we dive into User **Timing**, we can see a few things.

Timing from Frame Chart, *ScrollViewContacts*
``` console
        . (React Tree Reconsilation: Completed Root) 993.06ms
        . ContactListScreen [Update] 992.18ms
        . View [Update] 991.56ms
        . ScrollViewContact [Update] 989.59ms
        . ScrollView [mount] 980.00ms
        . ScrollViewBase [mount] 979.03ms
        . View [mount] 978.48ms
        . View [mount] 978.00ms
        . Row [mount] 0.76ms
        . View [mount] 0.50ms
        . Text [mount] 0.16ms
```
ContactListScreen.js, change to FlatListContacts [16:01]
``` jsx
const ContactsList = true ? FlatListContacts : ScrollViewContacts
```
See the difference of rendering..   
Timing from Frame Chart, *FlatListContacts*
``` console
        . (React Tree Reconsilation: Completed Root) 22.61ms
        . ContactListScreen [Update] 22.04ms
        . View [Update] 21.63ms
        . FlatListContact [Update] 20.00ms
        . FlatList [mount] 19.72ms
        . VirtaulizedList [mount] 18.85ms
        . ScrollView [mount] 16.69ms
        . ScrollViewBase [mount] 15.07ms
        . View [mount] 14.38ms
        . View [mount] 14.09ms
        . CellRenderer [mount] 1.56ms
        . View [mount] 1.26ms
        . Row [mount] 1.09ms
        . View [mount] 0.69ms
        . Text [mount] 0.28ms
```

### Common Inefficiencies
- Rerendering too often
- Unnecessarily changing props
- Unnecessary logic in mount/update

[:top: Top](#top)
### Rerendering Too Often
- Components will automatically rerender when they receive
new props
    - Sometimes, a prop that isn’t needed for the UI will change and cause an
unnecessary rerender
- If you use redux, only subscribe to the part of state that is
necessary
- keys in arrays/lists
- shouldComponentUpdate() and React.PureComponent
    - A PureComponent has a predefined shouldComponentUpdate() that
does a shallow diff of props

#### To render just only the first contact
[27:06] Let just changes the first person in the app. Add a button.
And presumably, we won't need to re-render all 999 other people.
And we're going to use something like shouldComponentUpdate.

created Snack's `12_was 11_src10ZipBefore`from 11_src10Zip  
App.js update from [before/contacts/appjs](#beforecontactsappjs)  
Redux/reducers.js from [before/contacts/redux/reducerjs](#beforecontactsreduxreducerjs)  
store.js from [before/contacts/redux/storejs](#beforecontactsreduxstorejs).  
ContactListScreens.js from [before/contacts/screens/ContactListScreen.js](#beforecontactsscreenscontactlistscreenjs). 


actions.js [28:39]
``` jsx
export const CHANGE_FIRST_CONTACT = 'CHANGE_FIRST_CONTACT' // .01
...
export const changeFirstContact = () => ({type: CHANGE_FIRST_CONTACT }) //.01

// async action creator
```
reducer.js [30:12]
``` jsx
import {CHANGE_FIRST_CONTACT, UPDATE_USER, UPDATE_CONTACT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions' //.01b
...
const contactReducer = (state = contacts, action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  if (action.type === CHANGE_FIRST_CONTACT){
    const [firstContact, ... rest]= state
    // [{name: 'Jordan', phone: '1234567890' }]
    // firstContact, rest = []
    if (!firstContact) return state
    const newContact= {...firstContact, name: 'Jordan Hayashi'}
    return [newContact, ...rest]
  } //.01b
  return state
}
```
contactListScreens.js
``` jsx
import {changeFirstContact} from '../redux/actions' // .01c 
...
  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="change first contacts" onPress={changeFirstContact}//.01c
         />
        {this.state.showContacts && <ContactsList contacts={this.props.contacts} />}
      </View>
    )
```
.02 contactListScreen.js [38:00]
``` jsx
  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="change first contacts" onPress={this.props.changeFirstContact}//.01c .02
         />
        {this.state.showContacts && <ContactsList contacts={this.props.contacts} />}
      </View>
...

export default connect(mapStateToProps,
{changeFirstContact})(ContactListScreen) //.02
```
[:top: Top](#top)
#### React.PureComponent
we see that it take a litttle bit of time to change the first contact.
because it render the whole list.

let's try to **optimise** that. if props dont change dont render

[40:12] And right now, row is just a stateless functional component.
Row.js from [before/contacts/Row.js](#beforecontactsrowjs).

.03 Row.js, So make it stateful. now the first contact on the screen changed immediately.
``` jsx
/* eslint-disable */
...
class Row extends React.PureComponent {
  render () {
    const {props} = this //const props = this.props
    return (
      <View style={styles.row}>
        <Text>{props.name}</Text>
        <Text>{props.phone}</Text>
      </View>
    )
  }
} // .03

Row.propTypes = {
...
```
[42:55]

#### shouldComponentUpdate
.04 Row.js, shouldComponentUpdate
``` jsx
// class Row extends React.PureComponent {
class Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.name !== this.props.name) {
      return true
    } else {
      return false
    }
  } //.04

  render () {
```
.05 Row.js, short hand
``` jsx
class Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name
  } //.04 .05

  render () {
```
[:top: Top](#top)

---
### Unnecessarily Changing Props
- Unnecessarily changing a value that is passed to a child
could cause a rerender of the entire subtree
- If you have any object (or array, function, etc.) literals in
your render() method, a new object will be created at
each render
    - Use constants, methods, or properties on the class instance

.06 PureButton.js, from  after/contacts/PureButton.js
``` jsx
import React from 'react'
import {Button} from 'react-native'

export default class PureButton extends React.PureComponent {
  state = {
    color: null,
  }

  componentDidUpdate() {
    this.setState({color: 'red'}) // eslint-disable-line
  }

  render() {
    return <Button {...this.props} color={this.state.color} />
  }
}
```

.07 PureButtonScreen.js
``` jsx
import React from 'react'
import { View, Text } from 'react-native'

import PureButton from './PureButton'

export default class PureButtonScreen extends React.Component {
  state = {
    count: 0,
  }

  render () {
    return (
      <View style={{flex: 1}}>
      <Text>{this.state.count}</Text>
        <PureButton
            title="increment count"
          style={{alignSelf: 'center'}}
          onPress={() => this.setState(prevState=> ({count: prevState.count + 1}))} 
        />
      </View>
    )
  }
}
```

.08 App.js, changed to run PureButton
``` jsx
// .08 import ContactListScreen from './screens/ContactListScreen'
import PureButtonScreen from './PureButtonScreen' //.08
...
export default () => (
  <Provider store={store}>
    <View style={styles.app}>
      <PureButtonScreen />
    </View>
  </Provider>
) // .08
```
.09 PureButtonScreen.js
``` jsx
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import PureButton from './PureButton'

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },
}) //.09

export default class PureButtonScreen extends React.Component {
  state = {
    count: 0,
  }

  inc = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  } //.09b

  render () {
    return (
      <View style={{flex: 1}}>
      <Text>{this.state.count}</Text>
        <PureButton
          title="increment count"
          style={styles.button} //.09
          onPress={this.inc} //.09c 
        />
      </View>
    )
  }
}
```
[59:50]

.10
`$ npx eslint PureButtonScreen.js --fix`


### Unnecessary Logic in Mount/Update
- Adding properties to class instance instead of methods on
the class
    - Properties are created at each mount whereas methods are one time
ever

### Reminder: Trade-Offs
- Performance optimization usually comes at a complexity
cost
    - In most cases, optimization is not worth the cost in complexity and
maintainability
- Don’t over-optimize until a bottleneck is found

[:top: Top](#top)
[1:04:33]

---
### Animations
- Let’s add a progress bar to our Project 1 timer
- Animations require both the JS and UI threads
    - Sending messages over the bridge 10s of times per second is expensive
    - Blocking either thread impacts the UX
- We could implement the animation in native
    - Requires knowing Obj-C/Swift and Java
- What if we could declare the animation in JS and have it
execute on the native thread?

.> unable to run on Expo-Cli's run-on-web. ExpoCli's device ok. But, I run on Snack
#### .11 before/pomodoro-timer/App.js
``` jsx
const DEFAULT_WORK_MINS = 0.1 // .11 6sec
const DEFAULT_BREAK_MINS = 0.1 // .11 6sec
```
#### empty View
.12 new before/pomodoro-timer/ProgressBar.js, rendered empty View
``` jsx
import React from 'react'
import {StyleSheet, View} from 'react-native'

export default props => (
  <View />
)
```
.13 App.js
``` jsx
import ProgressBar from './ProgressBar' //.13
...
        <ProgressBar />
        <View style={[styles.buttonGroup, styles.center]}>
```
#### styles the bar
14. ProgressBar.js, we styles the bar.
``` jsx
import React from 'react'
import {StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'blue',
    height: 10,
    width: 100,
  },
}) //.14

export default props => (
  <View style={styles.progress}/>
) //.14
```
#### get `state`
.15 App.js timing, pass the timings into progressBar
``` jsx
  getTimeTotal = () => {
    const {workTime, breakTime} = this.state // short hand for
    //const workTime = this.state.workTime
    //const breakTime = this.state.breakTime
    return (this.state.activeTimer === 'work' ? workTime : breakTime) * 1000
  } //.15
  
  render() {
...
        <ProgressBar 
          timeRemaining={this.state.timeRemaining} 
          timeTotal= {this.getTimeTotal()} //.15
          isRunning={this.state.isRunning} //.15b
        />
```
.15c ProgressBar.js PropTypes, that we can remember exactly what props we have.
``` jsx
import React from 'react'
import {StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types' // .15c

const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'blue',
    height: 10,
    width: 100,
  },
}) //.14

const ProgressBar = props => (
  <View style={styles.progress}/>
) //.14 .15c

ProgressBar.propTypes = {
  timeRemaining: PropTypes.number,
  timeTotal: PropTypes.number,
  isRunning: PropTypes.bool,
} //.15x

export default ProgressBar // .15c
```
[1:17:43]

How to get the bar to show the correct width?
Import **Dimensions** from react native

.16 ProgressBar.js Dimensions from react native. first window width, and some maths
``` jsx
import {Dimensions, StyleSheet, View} from 'react-native' //.16
...
const ProgressBar = props => {
  //const width = Dimensions.get('window').width
  const {width} = Dimensions.get('window') //.16
  const percent = 1- (props.timeRemaining / props.timeTotal)
  return (
    <View style={[styles.progress, {width: percent * width}] }/>
    )
} //.14 .15c .16 
```
.17 utils/Timer.js reduce ticking, by 60 fps
``` jsx
//const TICK_DURATION = 1000 //.17
const TICK_DURATION = 1000 /60 
//.17 .17b

export default class Timer {
...
      const nextTick = this.timeRemaining % TICK_DURATION // .17
```
---
[1:23:02]  Write a function that random block the JavaScript,
to stimulate a lot of work being done.

.18 App.js And so now we'll see it's getting really jittery. It blocks for 200 milliseconds, and then goes again.
``` jsx
  block() {
    const doneTime = Date.now() + 200
    while (Date.now() < doneTime) {}
  } //.18

  render() {
    if (Math.round(Math.random())) this.block()// .18b
    return (
```
[:top: Top](#top)


### Animated
- Allows us to declare a computation in JS and compute it
on the native thread
    - JS thread no longer needs to compute anything
    - JS thread can be blocked and the animation will still run
- Cannot use native driver for layout props
* https://facebook.github.io/react-native/docs/animated.html

new 
`$ cp ProgressBar.js ProgressBarAnimated.js`

.19 before/pomodoro-timer/App.js
``` jsx
import ProgressBar from './ProgressBarAnimated' //.13 .19
```
#### import Animated
.20 ProgressBarAnimated.js, need to change to class component.   
Add in `const {props} = this` to work.
``` jsx
import {Animated, Dimensions, Easing, StyleSheet, View} from 'react-native' //.20
...
class ProgressBar extends React.Component { //.20
  render () {
    const {props} = this
    const {width} = Dimensions.get('window') 
    const percent = 1- (props.timeRemaining / props.timeTotal)
    return (
      <View style={[styles.progress, {width: percent * width}] }/>
      )
  }
} //.20
```
#### new Animated.Value(0)
.21 ProgressBarAnimated.js Easing from react native. `new Animated.Value(0),` going to chance in high frequency, and computed all native thread.  
import Easing.
``` jsx
import React from 'react'
import {Animated, Dimensions, Easing, StyleSheet, View} from 'react-native' //.20 .21
import PropTypes from 'prop-types' 

const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'blue',
    height: 10,
    width: 100,
  },
}) 

class ProgressBar extends React.Component {
  state = {
    percent: new Animated.Value(0),
  } //.21

  componentDidMount () {
    this.animation = Animated.timing(
      this.state.percent,
      {
        toValue: 100,
        duration: this.props.timeRemaining,
        easing: Easing.linear,
        useNativeDriver: true,
      } //.21
    )

    this.animation.start()
  } //.21

  render () {
    //onst {props} = this
    const {percent} = this.state //.21b
    const {width} = Dimensions.get('window') 
    //const percent = 1- (props.timeRemaining / props.timeTotal)
    return (
      <View 
        style={[
          styles.progress, 
          {transform: [{scaleX: percent * width}]},
        ] }
      />
    )
  }  //.20 //.21b
}

ProgressBar.propTypes = {
  timeRemaining: PropTypes.number,
  timeTotal: PropTypes.number,
  isRunning: PropTypes.bool,
} //.15x

export default ProgressBar 
```

.21c ProgressBarAnimated.js Animated.View
``` jsx
...

const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'blue',
    height: 10,
    //width: 1, //.21C
    width: 2, //.21d
  },
}) 

...

  render () {
    const {percent} = this.state //.21b
    const {width} = Dimensions.get('window') 
    return (
      <Animated.View //.21c
        style={[
          styles.progress, 
          {transform: [{scaleX: percent.interpolate({
            inputRange: [0, 100],
            outputRange: [0, width],
          })    }]},
        ] } //.21c
      />
    )
  }  //.20 //.21b 
}

...
```
.22 ProgressBarAnimated.js componentDidMount
``` jsx
class ProgressBar extends React.Component {
  state = {
    percent: new Animated.Value(0),
  } //.21

  componentDidMount() {
    this.startAnimation()
  } //.22

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.timeRemaining > this.props.timeRemaining) {
      this.setState({percent: new Animated.Value(0)}, this.startAnimation)
    }
  } //.22

  startAnimation = () => { //.22
    this.animation = Animated.timing(
      this.state.percent,
      {
        toValue: 100,
        duration: this.props.timeRemaining,
        easing: Easing.linear,
        useNativeDriver: true,
      } //.21
    )

    this.animation.start()
  } //.21
```
.> still jarky at Snack, and bug when Pause.

[:top: Top](#top)

---
---
Source Code
---
[:top: Top](#top) 
[before/contacts/...](#beforecontacts)
[after/contacts/...](#aftercontacts) 
### before/contacts/...
before/contacts/.eslintrc.yml
``` yml
extends: kensho
```
before/contacts/.gitignore
``` git
node_modules/**/*
.expo/*
npm-debug.*
```

#### before/contacts/App.js
``` jsx
import React from 'react'
import {Provider} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Constants} from 'expo'

import {PersistGate} from 'redux-persist/integration/react' // eslint-disable-line

import ContactListScreen from './screens/ContactListScreen'
import store from './redux/store'

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})

export default () => (
  <Provider store={store}>
    <View style={styles.app}>
      <ContactListScreen />
    </View>
  </Provider>
)

```
#### before/contacts/Row.js
``` jsx
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  row: {padding: 20},
})

const Row = props => (
  <View style={styles.row}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </View>
)

Row.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
}

export default Row

```
[:top: Top](#top) [before/contacts/...](#beforecontacts)
#### before/contacts/package.json
Snack, last update Jul 01, 2020, src11zipBeforeContacts
``` yaml
{
  "dependencies": {
    "redux": "^4.0.0",
    "react-redux": "7.2.0",
    "redux-thunk": "2.3.0",
    "redux-persist": "6.0.0",
    "react-native-paper": "3.6.0",
    "redux-persist/lib/storage": "6.0.0",
    "redux-persist/integration/react": "6.0.0"
  }
}
```
Expo-Cli, last update Jul 01, 2020
``` yaml
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
[:top: Top](#top)  [before/contacts/...](#beforecontacts)
#### before/contacts/redux/actions.js
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
#### before/contacts/redux/reducer.js
``` jsx
import {combineReducers} from 'redux'

import contacts from '../contacts'

import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = contacts, action) => {
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
#### before/contacts/redux/store.js
``` jsx
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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

// non-persistent store
export default createStore(reducer, applyMiddleware(thunk))

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
[:top: Top](#top)  [before/contacts/...](#beforecontacts)
#### before/contacts/screens/ContactListScreen.js
``` jsx
/* eslint-disable react/prop-types */

import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import FlatListContacts from '../FlatListContacts'
import ScrollViewContacts from '../ScrollViewContacts'

// eslint-disable-next-line no-constant-condition
const ContactsList = false ? FlatListContacts : ScrollViewContacts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class ContactListScreen extends React.Component {
  state = {
    showContacts: true,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && <ContactsList contacts={this.props.contacts} />}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
})

export default connect(mapStateToProps)(ContactListScreen)

```
[:top: Top](#top) 
[before/pomodoro-timer/...](#beforepomodoro-timer) [after/pomodoro-timer/...](#afterpomodoro-timer)
### before/pomodoro-timer/...
#### before/pomodoro-timer/App.js
``` jsx
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import {Countdown, TimeInput, TimerToggleButton} from './components'
import {Timer, vibrate} from './utils'

const DEFAULT_WORK_MINS = 25
const DEFAULT_BREAK_MINS = 5

const minToSec = mins => mins * 60
const nextTimer = {work: 'break', break: 'work'}

export default class App extends React.Component {
  state = {
    // in seconds
    workTime: minToSec(DEFAULT_WORK_MINS),
    breakTime: minToSec(DEFAULT_BREAK_MINS),
    // in ms
    timeRemaining: minToSec(DEFAULT_WORK_MINS) * 1000,
    isRunning: false,
    activeTimer: 'work',
  }

  componentDidMount() {
    this.timer = new Timer(this.state.timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
    this.setState({isRunning: this.timer.isRunning})
  }

  componentWillUnmount() {
    if (this.timer) this.timer.stop()
  }

  updateTime = target => (time, shouldStartTimer) => {
    if (this.state.activeTimer === target) {
      if (this.timer) this.timer.stop()
      const timeRemaining = +time * 1000
      this.timer = new Timer(timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
      if (!shouldStartTimer) this.timer.stop()
      this.setState({[`${target}Time`]: time, timeRemaining, isRunning: this.timer.isRunning})
    } else {
      this.setState({[`${target}Time`]: time, isRunning: this.timer.isRunning})
    }
  }

  // hack: if an event is passed (ie is button press), stop timer
  resetTimer = shouldStopTimer => {
    const {activeTimer} = this.state
    this.updateTime(activeTimer)(this.state[`${activeTimer}Time`], !shouldStopTimer)
  }

  updateTimeRemaining = timeRemaining => {
    this.setState({timeRemaining})
  }

  toggleTimer = () => {
    if (!this.timer) return
    if (this.timer.isRunning) this.timer.stop()
    else this.timer.start()

    this.setState({isRunning: this.timer.isRunning})
  }

  handleTimerEnd = () => {
    vibrate()
    this.setState(prevState => ({activeTimer: nextTimer[prevState.activeTimer]}), this.resetTimer)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.center]}>{this.state.activeTimer.toUpperCase()} TIMER</Text>
        <Countdown style={styles.center} timeRemaining={this.state.timeRemaining} onToggleTimer={this.toggleTimer} />
        <View style={[styles.buttonGroup, styles.center]}>
          <TimerToggleButton onToggle={this.toggleTimer} isRunning={this.state.isRunning} />
          <Button title="Reset" onPress={this.resetTimer} />
        </View>
        <TimeInput
          title="WORK TIME:"
          onChange={this.updateTime('work')}
          value={this.state.workTime}
        />
        <TimeInput
          title="BREAK TIME:"
          onChange={this.updateTime('break')}
          value={this.state.breakTime}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  center: {
    alignSelf: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
  },
});

```
[:top: Top](#top) [before/pomodoro-timer/...](#beforepomodoro-timer)
#### before/pomodoro-timer/app.json
``` yaml
{
  "expo": {
    "name": "pomodoro-timer",
    "description": "Timer that tracks time working and break time.",
    "slug": "pomodoro-timer",
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
#### before/pomodoro-timer/package.json
``` yaml
{
  "name": "jhhayashi-pomodoro-timer",
  "version": "1.0.0",
  "main": "./node_modules/expo/AppEntry.js",
  "author": "Jordan Hayashi <jordan@jordanhayashi.com>",
  "scripts": {
    "prebuild": "rm -rf lib || true",
    "build": "mkdir lib && babel --copy-files --out-dir lib/ --ignore node_modules,package.json,app.json,package-lock.json .",
    "prepublish": "npm run build"
  },
  "dependencies": {
    "expo": "^25.0.0",
    "prop-types": "^15.6.0",
    "react": "16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-cli": "^6.26.0"
  },
  "files": [
    "lib"
  ]
}

```
package.json for Snack, last updated, Jul 03, 2020
``` yaml
{
  "dependencies": {
    "react-native-paper": "3.6.0"
  }
}
```
package.json Expo-Cli init from *bare* template, Aug 15, 2020
``` yml
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
    "react-native-web": "~0.11.7"
  },
  "devDependencies": {
    "@babel/core": "^7.8.6",
    "babel-preset-expo": "~8.1.0"
  },
  "private": true
}

```

#### before/pomodoro-timer/components/Countdown.js
**revised** Aug 15, 2020. `style: PropTypes.object,` was `style: PropTypes.number,`
``` jsx
import React from 'react'
import {StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  text: {fontSize: 72},
})

const Countdown = props => {
  const totalSecs = Math.round(props.timeRemaining / 1000)
  const mins = Math.floor(totalSecs / 60)
  const secs = totalSecs % 60
  const paddedZero = secs < 10 ? '0' : ''
  return <Text style={[styles.text, props.style]}>{mins}:{paddedZero}{secs}</Text>
}

Countdown.propTypes = {
  onToggleTimer: PropTypes.func.isRequired,
  // in ms
  timeRemaining: PropTypes.number.isRequired,
  style: PropTypes.object,
}

export default Countdown

```
[:top: Top](#top) [before/pomodoro-timer/...](#beforepomodoro-timer)
#### before/pomodoro-timer/components/TimeInput.js
``` jsx
import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
  },
  controls: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  bold: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    paddingHorizontal: 5,
    minWidth: 50,
  },
})

class TimeInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
  }

  state = {
    mins: Math.floor(this.props.value / 60),
    secs: this.props.value % 60,
  }

  handleMinChange = minString => {
    const mins = +minString
    this.setState({mins})
    this.props.onChange(mins * 60 + this.state.secs)
  }

  handleSecChange = secString => {
    const secs = +secString
    this.setState({secs})
    this.props.onChange(this.state.mins * 60 + secs)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.title && <Text style={styles.bold}>{this.props.title}</Text>}
        <View style={styles.controls}>
          <Text>Mins: </Text>
          <TextInput
            defaultValue={`${this.state.mins}`}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={this.handleMinChange}
          />
          <Text>Secs: </Text>
          <TextInput
            defaultValue={`${this.state.secs}`}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={this.handleSecChange}
          />
        </View>
      </View>
    )
  }
}

export default TimeInput

```
[:top: Top](#top) [before/pomodoro-timer/...](#beforepomodoro-timer)
#### before/pomodoro-timer/components/TimerToggleButton.js
``` jsx
import React from 'react'
import {Button} from 'react-native'
import PropTypes from 'prop-types'

const TimerToggleButton = props => {
  const title = props.isRunning ? 'Pause' : 'Start'
  return <Button title={title} onPress={props.onToggle} />
}

TimerToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
}

export default TimerToggleButton

```
#### before/pomodoro-timer/components/index.js
``` jsx
export Countdown from './Countdown'
export TimeInput from './TimeInput'
export TimerToggleButton from './TimerToggleButton'

```
[:top: Top](#top) [before/pomodoro-timer/...](#beforepomodoro-timer)
#### before/pomodoro-timer/utils/Timer.js
``` jsx
export default class Timer {
  constructor(duration, onTick, onEnd) {
    this.duration = duration
    this.onTick = onTick
    this.onEnd = onEnd
    this.endTime = Date.now() + duration
    this.tick()
  }

  get timeRemaining() {
    return this.endTime - Date.now()
  }

  get isRunning() {
    return !!this.endTime
  }

  clearTick = () => {
    clearTimeout(this.timeout)
    this.timeout = null
  }

  tick = () => {
    if (this.endTime < Date.now()) {
      this.onTick(0)
      this.onEnd()
    } else {
      this.onTick(this.timeRemaining)

      // account for any delays or time drift
      const nextTick = this.timeRemaining % 1000

      this.timeout = setTimeout(this.tick, nextTick)
    }
  }

  stop = () => {
    if (!this.isRunning) return
    this.clearTick()
    this.duration = this.timeRemaining
    this.endTime = null
  }

  start = () => {
    if (this.isRunning) return
    this.endTime = Date.now() + this.duration
    this.tick()
  }
}

```
[:top: Top](#top) [before/pomodoro-timer/...](#beforepomodoro-timer)
#### before/pomodoro-timer/utils/index.js
``` jsx
export Timer from './Timer'
export vibrate from './vibrate'

```
#### before/pomodoro-timer/utils/vibrate.js
``` jsx
import {Vibration} from 'react-native'

export default () => Vibration.vibrate([500, 500, 500])

```
[:top: Top](#top)  [before/contacts/...](#beforecontacts) [after/contacts/...](#aftercontacts)

---
### after/contacts/...
#### after/contacts/App.js
``` jsx
import React from 'react'
import {Provider} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Constants} from 'expo'

import {PersistGate} from 'redux-persist/integration/react' // eslint-disable-line

// import ContactListScreen from './screens/ContactListScreen'
import PureButtonScreen from './PureButtonScreen'
import store from './redux/store' // eslint-disable-line

const styles = StyleSheet.create({
  app: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})

export default () => (
  <Provider store={store}>
    <View style={styles.app}>
      <PureButtonScreen />
    </View>
  </Provider>
)

```
[:top: Top](#top) [after/contacts/...](#aftercontacts)
#### after/contacts/PureButton.js
``` jsx
import React from 'react'
import {Button} from 'react-native'

export default class PureButton extends React.PureComponent {
  state = {
    color: null,
  }

  componentDidUpdate() {
    this.setState({color: 'red'}) // eslint-disable-line
  }

  render() {
    return <Button {...this.props} color={this.state.color} />
  }
}

```
[:top: Top](#top) [after/contacts/...](#aftercontacts)
#### after/contacts/PureButtonScreen.js
``` jsx
import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

import PureButton from './PureButton'

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },
})

export default class PureButtonScreen extends React.Component {
  state = {
    count: 0,
  }

  inc() {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{this.state.count}</Text>
        <PureButton title="increment count" style={styles.button} onPress={this.inc} />
      </View>
    )
  }
}

```
[:top: Top](#top) [after/contacts/...](#aftercontacts)
#### after/contacts/Row.js
``` jsx
/* eslint-disable */

import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  row: {padding: 20},
})

class Row extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name
  }

  render() {
    const {props} = this
    return (
      <View style={styles.row}>
        <Text>{props.name}</Text>
        <Text>{props.phone}</Text>
      </View>
    )
  }
}

Row.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
}

export default Row

```
[:top: Top](#top) [after/contacts/...](#aftercontacts)
#### after/contacts/package.json
Files ./after/contacts/package.json and ./before/contacts/package.json are identical
#### after/contacts/redux/actions.js
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
[:top: Top](#top) [after/contacts/...](#aftercontacts)
#### after/contacts/redux/reducer.js
``` jsx
import {combineReducers} from 'redux'

import contacts from '../contacts'

import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = contacts, action) => {
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
[:top: Top](#top) [after/contacts/...](#aftercontacts)
#### after/contacts/redux/store.js
Files ./after/contacts/redux/store.js and ./before/contacts/redux/store.js are identical

#### after/contacts/screens/ContactListScreen.js
``` jsx
/* eslint-disable react/prop-types */

import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import FlatListContacts from '../FlatListContacts'
import ScrollViewContacts from '../ScrollViewContacts'

// eslint-disable-next-line no-constant-condition
const ContactsList = false ? FlatListContacts : ScrollViewContacts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class ContactListScreen extends React.Component {
  state = {
    showContacts: true,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && <ContactsList contacts={this.props.contacts} />}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
})

export default connect(mapStateToProps)(ContactListScreen)

```
[:top: Top](#top) [after/contacts/...](#aftercontacts)
[before/pomodoro-timer/...](#beforepomodoro-timer)  [after/pomodoro-timer/...](#afterpomodoro-timer)
### after/pomodoro-timer/...
#### after/pomodoro-timer/App.js
``` jsx
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import {Countdown, TimeInput, TimerToggleButton} from './components'
import {Timer, vibrate} from './utils'
import ProgressBar from './ProgressBarAnimated'

const DEFAULT_WORK_MINS = 0.1
const DEFAULT_BREAK_MINS = 0.1

const minToSec = mins => mins * 60
const nextTimer = {work: 'break', break: 'work'}

export default class App extends React.Component {
  state = {
    // in seconds
    workTime: minToSec(DEFAULT_WORK_MINS),
    breakTime: minToSec(DEFAULT_BREAK_MINS),
    // in ms
    timeRemaining: minToSec(DEFAULT_WORK_MINS) * 1000,
    isRunning: false,
    activeTimer: 'work',
  }

  componentDidMount() {
    this.timer = new Timer(this.state.timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
    this.setState({isRunning: this.timer.isRunning})
  }

  componentWillUnmount() {
    if (this.timer) this.timer.stop()
  }

  updateTime = target => (time, shouldStartTimer) => {
    if (this.state.activeTimer === target) {
      if (this.timer) this.timer.stop()
      const timeRemaining = +time * 1000
      this.timer = new Timer(timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
      if (!shouldStartTimer) this.timer.stop()
      this.setState({[`${target}Time`]: time, timeRemaining, isRunning: this.timer.isRunning})
    } else {
      this.setState({[`${target}Time`]: time, isRunning: this.timer.isRunning})
    }
  }

  // hack: if an event is passed (ie is button press), stop timer
  resetTimer = shouldStopTimer => {
    const {activeTimer} = this.state
    this.updateTime(activeTimer)(this.state[`${activeTimer}Time`], !shouldStopTimer)
  }

  updateTimeRemaining = timeRemaining => {
    this.setState({timeRemaining})
  }

  toggleTimer = () => {
    if (!this.timer) return
    if (this.timer.isRunning) this.timer.stop()
    else this.timer.start()

    this.setState({isRunning: this.timer.isRunning})
  }

  handleTimerEnd = () => {
    vibrate()
    this.setState(prevState => ({activeTimer: nextTimer[prevState.activeTimer]}), this.resetTimer)
  }

  getTimeTotal = () => {
    const {workTime, breakTime} = this.state
    return (this.state.activeTimer === 'work' ? workTime : breakTime) * 1000
  }

  block() {
    const doneTime = Date.now() + 200
    while (Date.now() < doneTime) {}
  }

  render() {
    if (Math.round(Math.random())) this.block()
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.center]}>{this.state.activeTimer.toUpperCase()} TIMER</Text>
        <Countdown style={styles.center} timeRemaining={this.state.timeRemaining} onToggleTimer={this.toggleTimer} />
        <ProgressBar
          timeRemaining={this.state.timeRemaining}
          timeTotal={this.getTimeTotal()}
          isRunning={this.state.isRunning}
        />
        <View style={[styles.buttonGroup, styles.center]}>
          <TimerToggleButton onToggle={this.toggleTimer} isRunning={this.state.isRunning} />
          <Button title="Reset" onPress={this.resetTimer} />
        </View>
        <TimeInput
          title="WORK TIME:"
          onChange={this.updateTime('work')}
          value={this.state.workTime}
        />
        <TimeInput
          title="BREAK TIME:"
          onChange={this.updateTime('break')}
          value={this.state.breakTime}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  center: {
    alignSelf: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
  },
});

```
[:top: Top](#top)  [after/pomodoro-timer/...](#afterpomodoro-timer)
#### after/pomodoro-timer/ProgressBar.js
``` jsx
import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'blue',
    height: 10,
  },
})

const ProgressBar = props => {
  const {width} = Dimensions.get('window')
  const percent = 1 - (props.timeRemaining / props.timeTotal)
  return (
    <View style={[styles.progress, {width: percent * width}]} />
  )
}

ProgressBar.propTypes = {
  timeRemaining: PropTypes.number,
  timeTotal: PropTypes.number,
  isRunning: PropTypes.bool,
}

export default ProgressBar

```
[:top: Top](#top)  [after/pomodoro-timer/...](#afterpomodoro-timer)
#### after/pomodoro-timer/ProgressBarAnimated.js
``` jsx
import React from 'react'
import {Animated, Dimensions, Easing, StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'blue',
    height: 10,
    width: 2,
  },
})

class ProgressBar extends React.Component {
  state = {
    percent: new Animated.Value(0),
  }

  componentDidMount() {
    this.startAnimation()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timeRemaining > this.props.timeRemaining) {
      this.setState({percent: new Animated.Value(0)}, this.startAnimation)
    }
  }

  startAnimation = () => {
    this.animation = Animated.timing(
      this.state.percent,
      {
        toValue: 100,
        duration: this.props.timeRemaining,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    )

    this.animation.start()
  }

  render() {
    const {percent} = this.state
    const {width} = Dimensions.get('window')
    return (
      <Animated.View
        style={[
          styles.progress,
          {transform: [{scaleX: percent.interpolate({
            inputRange: [0, 100],
            outputRange: [0, width],
          })}]},
        ]}
      />
    )
  }
}

ProgressBar.propTypes = {
  timeRemaining: PropTypes.number,
  timeTotal: PropTypes.number,
  isRunning: PropTypes.bool,
}

export default ProgressBar

```
[:top: Top](#top)  [after/pomodoro-timer/...](#afterpomodoro-timer)
#### after/pomodoro-timer/package.json
Files ./after/pomodoro-timer/package.json and ./before/pomodoro-timer/package.json are identical
#### after/pomodoro-timer/components/Countdown.js
Files ./after/pomodoro-timer/components/Countdown.js and ./before/pomodoro-timer/components/Countdown.js are identical
#### after/pomodoro-timer/components/TimeInput.js
Files ./after/pomodoro-timer/components/TimeInput.js and ./before/pomodoro-timer/components/TimeInput.js are identical
#### after/pomodoro-timer/components/TimerToggleButton.js
Files ./after/pomodoro-timer/components/TimerToggleButton.js and ./before/pomodoro-timer/components/TimerToggleButton.js are identical
#### after/pomodoro-timer/components/index.js
Files ./after/pomodoro-timer/components/index.js and ./before/pomodoro-timer/components/index.js are identical

#### after/pomodoro-timer/utils/Timer.js
``` jsx
const TICK_DURATION = 1000 / 60

export default class Timer {
  constructor(duration, onTick, onEnd) {
    this.duration = duration
    this.onTick = onTick
    this.onEnd = onEnd
    this.endTime = Date.now() + duration
    this.tick()
  }

  get timeRemaining() {
    return this.endTime - Date.now()
  }

  get isRunning() {
    return !!this.endTime
  }

  clearTick = () => {
    clearTimeout(this.timeout)
    this.timeout = null
  }

  tick = () => {
    if (this.endTime < Date.now()) {
      this.onTick(0)
      this.onEnd()
    } else {
      this.onTick(this.timeRemaining)

      // account for any delays or time drift
      const nextTick = this.timeRemaining % TICK_DURATION

      this.timeout = setTimeout(this.tick, nextTick)
    }
  }

  stop = () => {
    if (!this.isRunning) return
    this.clearTick()
    this.duration = this.timeRemaining
    this.endTime = null
  }

  start = () => {
    if (this.isRunning) return
    this.endTime = Date.now() + this.duration
    this.tick()
  }
}

```
#### after/pomodoro-timer/utils/index.js
Files ./after/pomodoro-timer/utils/index.js and ./before/pomodoro-timer/utils/index.js are identical
#### after/pomodoro-timer/utils/vibrate.js
Files ./after/pomodoro-timer/utils/vibrate.js and ./before/pomodoro-timer/utils/vibrate.js are identical

[:top: Top](#top)  [after/pomodoro-timer/...](#afterpomodoro-timer)

---
myNote
---

---
[:top: Top](#top)
 
#### revised before/pomodoro-timer
work on andriod device
``` console
        $ expo init
        ? Choose a template: expo-template-blank
        ? What would you like to name your app? my-app

        $ cd my-app
        my-app $ ls
        App.js			assets			node_modules		package.json
        app.json		babel.config.js		package-lock.json

        my-app $ cd ..
        $ npm install -g expo-cli
        my-app $ cd ..
        $ expo --version
        3.24.0
        $ cd my-app
        my-app $ npm install prop-types
        + prop-types@15.7.2
        my-app $ expo start
        
        Run on Andriod device
```
see [before/pomodoro-timer/package.json](#beforepomodoro-timerpackagejson)   
and use revised [before/pomodoro-timer/components/Countdown.js](#beforepomodoro-timercomponentscountdownjs) 

[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)  
back to previous:  [11_AsyncRedux_Tools](https://github.com/alvinng222/cs50m/tree/11_AsyncRedux_Tools).   
continue to next:  [13_Deploying_Testing](https://github.com/alvinng222/cs50m/tree/13_Deploying_Testing).

---
