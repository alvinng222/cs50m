Lecture 3: React Native
===
[top]: topOfThePage

Lecture: http://video.cs50.net/mobile/2018/spring/lectures/3

Slides: http://cdn.cs50.net/mobile/2018/spring/lectures/3/lecture3.pdf
- [React Native](#react-native)
- [How does React Native work?](#how-does-react-native-work)
- [Differences between RN and Web](#how-does-react-native-work)
- [React Native Components](#how-does-react-native-work)
- [Style](#style)
- [Event Handling](#event-handling)
- [Components](#components)
- [Stateless Functional Component (SFC)](#stateless-functional-component-sfc)
- [React.Component](#reactcomponent)
- [Component Lifecycle](#component-lifecycle)
- [Mount](#mount)
- [Update](#update)
- [Unmount](#unmount)
- [Writing React Native](#writing-react-native)
- [Expo](#expo)
- [Import/Export](#importexport)
- [PropTypes](#proptypes)
- [How to Read Docs](#how-to-read-docs)

Source Code: was files src3.zip  
[0-rnBlockJs.js](0-rnBlockJs.js)
[1-todoApp-rn.js](1-todoApp-rn.js)
[2-mount.js](2-mount.js)
[3-update.js](3-update.js)
[4-unmount.js](4-unmount.js)
[5-expo-app/App.js](5-expo-app/App.js)
[5-expo-app/Count.js](5-expo-app/Count.js)

[my React to React-Native](#my-React-to-React-Native)

[Writing React Native](#Writing-React-Native)

[**myNote**](#mynote)

---
[:top: Top](#top)
### Previous Lecture : [03_ReactPropsState](https://github.com/alvinng222/cs50m/tree/03_ReactPropsState)

### React Native
- A framework that relies on React core
- Allows us build mobile apps using only JavaScript
  - “Learn once, write anywhere”
- Supports iOS and Android

### How does React Native work?
- JavaScript is bundled
  - Transpiled and minified
- Separate threads for UI, layout and JavaScript
- Communicate asynchronously through a “bridge”
  - JS thread will request UI elements to be shown
  - JS thread can be blocked and UI will still work

```
UI              Bridge             JS
[  ]  <-- 'I want a Button' ---  
      --- ' Button Pressed' -->
```

using https://snack.expo.io

to demonstrate the bridge, that UI running behind the scene
``` jsx
import * as React from 'react';
import { ScrollView, Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  blockJS() {
    console.log('blocking')
    const end = Date.now() + 5000
    while (Date.now() < end) {} // `end` was `done`
    console.log('unblocked')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title='block js' onPress={() => this.blockJS()} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1', padding: 8,
  },
  paragraph: {
    margin: 24, fontSize: 18,
    fontWeight: 'bold', textAlign: 'center',
  },
});

```
after five seconds came 'blocking' and 'unblocking'

[:top: Top](#top)
#### 0-rnBlockJs.js
shown that when block, its background still able to scroll
``` js
export default class App extends React.Component {
  state = {
    count: 0,
  }

  /* EDIT: this wasn't in the original lecture code, but it makes it more obvious
     that the JS thread gets locked */
  componentDidMount() {
    setInterval(() => this.setState(prevState => ({count: prevState.count + 1})), 500)
  }
...
        <Button title="block js thread" onPress={this.blockJS} />
        <Text style={styles.paragraph}>
          {this.state.count}
        </Text>
      </ScrollView>
    );
  }
}
...
```
---
[:top: Top](#top)
### Differences between RN and Web
- Base components
- Style
- No browser APIs
  - CSS animations, Canvas, SVG, etc.
  - Some have been polyfilled (fetch, timers, console, etc.)
- Navigation

### React Native Components
- Not globally in scope like React web components
  - Import from 'react-native'
- div → View
- span → Text
  - All text must be wrapped by a <Text /> tag
- button → Button
- ScrollView
- https://facebook.github.io/react-native/docs/components-and-apis.html

copy and paste todoApp4-react.js, ReactWeb to ReactNative

[:top: Top](#top)
#### my React to React-Native
from 03_ReactPropsState.md / [todoApp4-react.js](https://github.com/alvinng222/cs50m/blob/03_ReactPropsState/todoApp4-react.js). 

change:
- add `import {View, Text, Button, ScrollView} from 'react-native'; ` `import Constants from 'expo-constants'`
- replace `<li>` with `<View>`
- replace `<div>`,`<span>` with `<View>` or `<Text>`, `<ul>` with `<ScrollView>` at render()
- replace `<button onClick=` with `<Button onPress=`, and add `title="delete" />`
- add `export default class` before `class App`, remove `render(<App />, document.getElementById('root'));`
- change `prompt("TODO text please!")`to `' TODO number ${id}``(use backtick)
- add `id++` in addTodo(), change `id:id++,` to `id:id,`
- add style:   
``` jsx
const Todo = props => (
  <View style={{flexDirection: 'row', alignitems: 'center'}}>
```
``` jsx
  render() {
    return (
      <View style={{paddingTop: 50}}>
```
to give a exact height
``` jsx
import Constants from 'expo-constants'; // was import {Constants} from 'expo'
...
  render() {
    return (
      <View style={{paddingTop: Constants.statusBarHeight}}>
```

[:top: Top](#top)
### Style
- React Native uses JS objects for styling
- Object keys are based on CSS properties
- Flexbox layout
  - Default to column layout
- Lengths are in unitless numbers
- `style` prop can take an array of styles
- `StyleSheet.create()`
  - Functionally the same as creating objects for style
  - Additional optimization: only sends IDs over the bridge

``` jsx
import {StyleSheet
...
const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

const Todo = props => (
  <View style={styles.todoContainer}>
```
``` jsx
const styles = StyleSheet.create({
  ...
  addContainer: {
    paddingTop: Constants.statusBarHeight
    },
})
...
  render() {
    return (
      <View style={styles.addContainer}>
```

### Event Handling
- Unlike web, not every component has every interaction
- Only a few “touchable” components
  - Button
  - TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback
  - TouchableNativeFeedback (Android only)
- Web handlers will receive the event as an argument, but
React Native handlers often receive different arguments
  - Consult the docs


replace Switch with input
``` jsx
import {Switch ...
...
const Todo = props => (
  <View style={styles.todoContainer}>
    <Switch value={props.todo.checked} onValueChange={props.onToggle} />
```  
FlexBox
```
const styles = StyleSheet.create({
...
  fill: {
    flex: 1,
  }
})
...
      <View style={[styles.addContainer, styles.fill]}>
      ...
        <ScrollView style={styles.fill}>
```
#### final: [1-todoApp-rn.js](1-todoApp-rn.js)

---

[:top: Top](#top)
[32:10]
### Components
- Return a node (something that can be rendered)
- Represent a discrete piece of the UI
- “All React components must act like pure functions with
respect to their props.”
- Two types:
  - Stateless Functional Component (SFC) a.k.a. Pure Functional
Component
  - React.Component

SFC just a function with no state, eg Todo

### Stateless Functional Component (SFC)
- Simplest component: use when you don’t need state
- A function that takes props and returns a node
  - Should be “pure” (it should not have any side effects like setting values,
updating arrays, etc.)
- Any change in props will cause the function to be
re-invoked

it just take a props and return a value

### React.Component
- An abstract class that can be extended to behave
however you want
- These have additional features that SFCs don’t
  - Have instances
  - Maintain their own state
  - Have lifecycle methods (similar to hooks or event handlers) that are
automatically invoked
- Rendering now becomes a function of props and class
properties

provided by React library,
when invoke that class they returns an instance
they have their own state.

### Component Lifecycle
```
Component Life cycle
                    ------ 
                    ^    v
          Mount ->  Update  ->  Unmount
```


---
[:top: Top](#top)
[10:00]
### Mount
- #### constructor(props)
  - Initialize state or other class properties (bound methods, etc.)
- #### render()
  - The meat of a component
  - Return a node
- #### componentDidMount()
  - Do anything that isn’t needed for UI (async actions, timers, etc.)
  - Setting state here will cause a re-render before updating the UI

mounting, big number 0
``` jsx
import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  count: {
    fontSize: 48,
  }
});

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      count: 0,
    }
  }
  
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.count}>
          {this.state.count}
        </Text>
      </View>
    );
  }
}
```
number counting after add these within class App
``` jsx
  componentDidMount() {
    setInterval(() => this.inc(), 1000)
  }

  inc() {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  render () {  
```
also can bind `inc() {` to `inc = () => {', (but not work in my Snack).
``` jsx
  componentDidMount() {
    setInterval(this.inc(), 1000)
  }

  inc = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  render () {  
```

[:top: Top](#top)
#### [2-mount.js](2-mount.js)
class Counter in class App
``` js
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants'; // was import { Constants } from 'expo';

class Counter extends Component {
  state = {
    count: 0,
  }
  
  componentDidMount() {
    this.timer = setInterval(this.incrementCount, 1000)
  }
  
  incrementCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }
  
  render() {
    return <Text>{this.state.count}</Text>
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter />
      </View>
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
```
---
[:top: Top](#top) [51:23]
### Update
- componentWillReceiveProps(nextProps)
  - Update any state fields that rely on props
- shouldComponentUpdate(nextProps, nextState)
  - Compare changed values, return true if the component should rerender
    - If returned false, the update cycle terminates
  - Almost always a premature optimization
- render()
- componentDidUpdate(prevProps, prevState)
  - Do anything that isn’t needed for UI (network requests, etc.)

class Count
``` jsx
import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  count: {
    fontSize: 48,
  }
});

class Count extends React.Component {
  render () {
    return (
      <Text style={styles.count}>{this.props.count}</Text>
    )
  }
}

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    setInterval(() => this.inc(), 1000)
  }

  inc = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }
  
  render () {
    return (
      <View style={styles.container}>
        <Count count={this.state.count} />
      </View>
    );
  }
}
```
`shouldComponentUpdate(nextProps, nextState)`  
console shown updating, but the **UI** stuck at 0, which didnt call the render().
``` jsx
class CountEvenNumber extends React.Component {
  shouldComponentUpdate() {
    console.log('updateing?')
    return false
  }
  
  render () {
    return (
      <Text style={styles.count}>{this.props.count}</Text>
    )
  }
}
...
  render () {
    return (
      <View style={styles.container}>
        <CountEvenNumber count={this.state.count} />
```
`componentDidUpdate(prevProps, prevState)`
for count even.
``` jsx
class CountEvenNumber extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.count % 2)
  }
  
  componentDidUpdate() {
    console.log(this.props.count)
  }
  
  render () {  
```
[:top: Top](#top)

#### 3-update.js
revised from 2-mount.js
``` jsx
...
class OnlyUpdateOnEvens extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.count % 2)
  }
  
  componentDidUpdate() {
    console.log(this.props.count)
  }
  
  render() {
    return <Text>{this.props.count}</Text>
  }
}

class Counter extends Component {
...
  render() {
    return <OnlyUpdateOnEvens count={this.state.count} />
  }
}
...
```
---
[:top: Top](#top) [58:27]
### Unmount
- componentWillUnmount()
  - Clean up
    - Remove event listeners
    - Invalidate network requests
    - Clear timeouts/intervals

some bugs can create, if you are not careful.  
 [1:00:15]
``` jsx
import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, alignItems: "center", justifyContent: 'center',
  },
  count: { fontSize: 48, }
});

class Counter extends React.Component {
  constructor () {
    super()
    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    setInterval(() => this.inc(), 1000)
  }

  inc = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }
  
  render () {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.count}>{this.state.count}</Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Counter />
    );
  }
}
```

[1:03:02]
when toggle the Counter, we never actually tell this component, to stop increment.
the console.log shown counting if toggle off  counter. and shown faster and faster if toggles.
``` jsx
  inc = () => {
    console.log("Incrementing!")
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }
...
  render () {
    return (
        <Text style={styles.count}>{this.state.count}</Text>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCounter: true,
    }
  }

  toggleCounter = () => this.setState(prevState => ({
    showCounter: !prevState.showCounter,
  }))
/*
  // this was the render() code originally written in lecture
  render() {
    if (this.state.showCounter) {
      return (
        <View style={styles.appContainer}>
          <Button title="toggle" onPress={this.toggleCounter} />
          <Counter />
        </View>
      )
    } else {
      return (
        <View style={styles.appContainer}>
          <Button title="toggle" onPress={this.toggleCounter} />
        </View>
      )
    }
  }

  // this is a more concise version with the same functionality */
  render() {
    return (
      <View style={styles.appContainer}>
        <Button title="toggle" onPress={this.toggleCounter} />
        {this.state.showCounter && <Counter />}
      </View>
    )
  }
}
```
add this.interval, and `componentWillUnmount()`, if toggle the Counter will reset to 0, 
the Cconsole increment will stop. Need to rerun the snack.
``` jsx
  componentDidMount() {
    this.interval = setInterval(this.inc, 1000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  
```
#### [4-unmount.js](4-unmount.js)

-----------------------------------------------------------------
[:top: Top](#top)
## Writing React Native

[18:20]
### Expo
- “The fastest way to build an app”
- Suite of tools to accelerate the React Native development
process
  - Snack - runs React Native in the browser
  - XDE - a GUI to serve, share, and publish your Expo projects
  - CLI - a command-line interface to serve, share, and publish projects
  - Client - runs your projects on your phone while developing
  - SDK - bundles and exposes cross-platform libraries and APIs

see myNote on expo installation
- The commands listed below are derived from the latest version of Expo CLI. You can view the list of commands available with your version in your *terminal* using expo --help. To learn more about a specific command and its options use expo [command] --help.
```
Usage: expo [command] [options]
```

start project
```
Ts-MacBook-Pro:cs50m twng$ checkout 04_ReactNative
Ts-MacBook-Pro:cs50m twng$ expo init expo-app
Ts-MacBook-Pro:cs50m twng$ cd expo-app
Ts-MacBook-Pro:expo-app twng$ expo start

```
login for smooth performance

and it will create file in your directory, eg app.json, app.js

App.js is a bare bone of React Native stuffs

Expo CLI platform,  
click `Run in Web browser` to run web page at chrome. or  
at connection select `LAN` to link to expo client on the devise

### Import/Export
- Components are great for simplifying code
- We can split components into their own files
  - Helps organize project
  - Export the component from the file
- Import the component before using it in a file
- Default vs named import/export

default app.js from *Expo*
``` js
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working ...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
create new file Count.js to illustrate the **named export** [1:18:28]
``` jsx
import React from 'react' 
import {Text} from 'react-native'

export const Count = props => (
  <Text>{props.count}</Text>
)
```
initial App.js, 
``` jsx
import {Count} from './Count.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Count count = {0} />
      </View>
    );
  }
}
```

count.js, will *export two **named** variables*
``` jsx
export const num = 50

export const Count = props => (
```
on app.js
``` jsx
import {Count, num} from './Count.js'
...
<Count count={num} />
```


**export default** [1:22:00]

Count.js, set the default export of this file to be *Count*
``` jsx
export default props => (
```
or
``` jsx
const Count = props => (
  <Text style={styles.text}>{props.count}</Text>
)

export default Count
```
App.js, dropped those brackets for import default variable 
``` jsx
import Count from './Count.js'
...
      <Count count={0} />
```
App.js, or, import default variable *can call it any names*.
``` jsx
import CustomCount from './Count.js'
...
      <CustomCount count={0} />
```
But, when export default, limited to export only **one**.
  
App.js, also can export default and named vairables
``` jsx
import CustomCount, {num} from './Count.js'
```
also can import Component from `react`
``` jsx
import React, {Component} from 'react';
...
export default class App extends Component {

```
App.js
``` jsx
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomCount, {num} from './Count.js'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomCount count = {num} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
Count.js
``` jsx
import React from 'react' 
import {StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
  text: {fontSize: 72},
})

export const num = 50

const Count = props => (
  <Text style={styles.text}>{props.count}</Text>
)

export default Count
```
And return back to `import Count from './Count.js'`, `<Count count={0} />`

[1:27:11]

---
[:top: Top](#top)
### PropTypes
- React can validate the types of component props at
runtime
- Development tool that allows developers to ensure they’re
passing correct props
- Helps document your components’ APIs
- Only runs in development mode

PropTypes allow you to keep track of all these props.    

Count.js, attached the property called `propTypes`. `PropTypes` is the library.
``` jsx
import PropTypes from 'prop-types'
...
//export const num = 50

const Count = props => (
  <Text style={styles.text}>{props.count}</Text>
)

Count.propTypes = {
  count: PropTypes.number.isRequired,
}

export default Count 
```
>> warning: Failed prop type: ...

App.js, if remove `num`, shown, no error
``` jsx
import CustomCount from './Count.js' 
...
         <CustomCount count = {0} /> 
```

App.js,Simulating a mistake by passing string, the App still work, but shown error of Failed prop Type
``` jsx
         <CustomCount count = {"0"} /> 
```
>> warning: Failed prop type: ...   

So we can used this prop types in order to validate the props that passed. 

do a class component for Count, this.props in class component
``` jsx
class Count extends React.Component {
  render() {
    return (
      <Text style={styles.text}>
        {this.props.count}
      </Text>
    )
  }
}
```
>> warning: Failed prop type: ... because of string `{"0"}` at App.js, generally work

Convertion, is to use this **static** method or static property.
```
class Count extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
  }
```
[:top: Top](#top)
#### App.js
``` js
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CustomCount from './Count.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomCount count={0} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

#### Count.js
``` js
import React from 'react' 
import {StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  text: {fontSize: 72},
})

class Count extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Text style={styles.text}>
        {this.props.count}
      </Text>
    )
  }
}

export default Count
```
---
### How to Read Docs
- Have a goal in mind
- See what the library/framework/API offers
- Find something that solves your problem
- Configure using the exposed API

[:top: Top](#top)

---

myNote
---
Snack:  https://snack.expo.io/

https://github.com/facebook/react-native

https://docs.expo.io/versions/latest/get-started/installation/?redirected

https://expo.io/tools
### install expo cli
```
Ts-MacBook-Pro:cs50m twng$ git status
On branch master
Ts-MacBook-Pro:cs50m twng$ npm install expo-cli --global
npm ERR!     /Users/twng/.npm/_logs/2020-06-06T16_51_54_599Z-debug.log
```
https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory
```
Ts-MacBook-Pro:~ twng$ cd igw
Ts-MacBook-Pro:igw twng$ mkdir ~/.npm-global
Ts-MacBook-Pro:igw twng$ npm config set prefix '~/.npm-global'
Ts-MacBook-Pro:igw twng$ export PATH=~/.npm-global/bin:$PATH
Ts-MacBook-Pro:igw twng$ source ~/.profile
-bash: /Users/twng/.profile: No such file or directory
Ts-MacBook-Pro:igw twng$ npm install -g expo-cli
...
Ts-MacBook-Pro:igw twng$ expo --version
3.21.5
```

### my expo.io/ snacks: https://expo.io/snacks/@awesome2/.        

#### Git branch 04_ReactNative
.gitignore
```
    Ts-MacBook-Pro:cs50m twng$ git status
    On branch master
    Ts-MacBook-Pro:cs50m twng$ vim .gitignore
    Ts-MacBook-Pro:cs50m twng$ cat .gitignore
    .DS_Store
    /expo-app
    .gitignore
```
```
    Ts-MacBook-Pro:cs50m twng$ git branch 04_ReactNative
    Ts-MacBook-Pro:cs50m twng$ git checkout 04_ReactNative
    Ts-MacBook-Pro:cs50m twng$ git branch -v
    Ts-MacBook-Pro:cs50m twng$ ls
      <files.js>
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push -u origin 04_ReactNative
```
checked on github, 

[:top: Top](#top)

--
#### vim
see https://github.com/alvinng222/cs50-mobile/blob/master/vimtutor.md
```
Cursor movement
    gg - go to the first line of the document
    <num>G - go to the <num>/last line of the document
    zz - center cursor on screen

    e - jump forwards to the end of a word
    b - jump backwards to the start of a word

my take for vi
    i - to insert
    Esc - to quit insert

    u - to undo
    use visual mode (v) to delete, than copy,
    dd - to delete
    p - to put or copy
    
    vs <file> - to vertical split for another file
    w - to saved
    ctrl-W ctrl-W - to switch window
```
#### vim set-up
$ vim ~/.vimrc
```
set number
syntax on
set tabstop=4
set shiftwidth=2
set softtabstop=2
set autoindent
set expandtab
```
ref: https://linuxhint.com/configure_vim_vimrc/

---
:+1: emoji short code: https://gist.github.com/rxaviers/7360908

[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   
back to previous: [ 03_ReactPropsState ]( https://github.com/alvinng222/cs50m/tree/03_ReactPropsState )     
continue to next: [ 05_ListsUserInput ](     https://github.com/alvinng222/cs50m/tree/05_ListsUserInput )   

---
