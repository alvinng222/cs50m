Exercises 5
===
[top]: topOfThePage

[Source Code](#source-code)
file: exercises5.zip

App.js
README-1.md

[**bugs/...**](#bugs)
  1.js
  2.js
  3.js
  4.js  
[**solutions/...**](#solutions)
  1.js
  2.js
  3.js
  4.js
  
[**myNote**](#mynote)

---
Source Code
---
App.js
``` jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Bug from './bugs/1'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Bug />
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
[:top: Top](#top)

README-1.md
``` markdown
# Lists
In lecture we talked about debugging.

The goal of this exercise is to practice the various debugging strategies that we
discussed in lecture.

## Installation
This exercise was bootstrapped using the [Expo XDE](https://docs.expo.io/versions/latest/introduction/xde-tour.html).
To run it, open this directory as a project in the XDE.

## Exercise
For this exercise, there are a few buggy files located in [/bugs](./bugs). Replace
the import in [App.js](./App.js) with the buggy file to run it. Make sure not to
change the lines that the files say not to change.

## Solution
See the solution code in the [solutions directory](./solutions), or run them
without looking at the code to play with the functionality.

```
[:top: Top](#top)

---
### bugs/...
#### bugs/1.js
``` jsx
import React from 'react'
import {StyleSheet,  Text, View} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    alignSelf: 'center',
  },
  greeting: {
    color: 'red',
  },
})

const Container = props => (
  <View style={styles.container}>
    <Greeting style={styles.center} />
  </View>
)

/////
// Do not edit anything above this line
/////

const Greeting = props => (
  <Text style={styles.greeting}>
    This text should be red and centered vertically
  </Text>
)

export default () => <Container />

```
[:top: Top](#top)

#### bugs/2.js
``` jsx
import React from 'react'
import {Button, Text, View} from 'react-native'

const shallowEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) return false
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i]
    if (obj1[key] !== obj2[key]) return false
  }

  return true
}

class ListText extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props)
  }

  render() {
    return (
      <Text>
        This list should add the next number to the list when button is pressed: {JSON.stringify(this.props.list)}
      </Text>
    )
  }
}


/////
// Do not change anything above this line
/////

export default class Bug extends React.Component {
  state = {
    list: [],
  }

  addNumber() {
    const newList = this.state.list.push(this.state.list.length)
    this.setState({list: newList})
  }

  render() {
    return (
      <View>
        <ListText list={this.state.list} />
        <Button title="Increment" onPress={() => this.addNumber} />
      </View>
    )
  }
}

```
[:top: Top](#top)

#### bugs/3.js
``` jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderColor: '#ddd',
    width: 100,
    borderWidth: 1,
  },
  messageContainer: {
    flexDirection: 'column',
  },
  messageHeader: {
    fontWeight: 'bold',
  },
});

export default class BugThree extends React.Component {
  state = {
    message: {
      owner: '',
      content: '',
    },
  }

  /////
  // Do not edit anything above this line
  /////

  handleOwnerChange = owner => {
    this.setState({ message: {owner}});
  }

  handleContentChange = content => {
    this.setState({ message: {content}});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.message.owner}
          onChangeText={this.handleOwnerChange}
        />
        <TextInput
          style={styles.input}
          value={this.state.message.content}
          onChangeText={this.handleContentChange}
        />
        <View style={styles.messageContainer}>
          <Text style={styles.messageHeader}>Current Message</Text>
          <Text>Owner: {this.state.message.owner}</Text>
          <Text>Content: {this.state.message.content}</Text>
        </View>
      </View>
    );
  }
}

```
[:top: Top](#top)

#### bugs/4.js 
``` jsx
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
})

const BoldText = props => (
  <Text style={styles.boldText}>
    {props.value}
  </Text>
);

/////
// Do not edit anything above this line
/////

export default class Bug extends React.Component {
  greeting = {
    value: 'Hello, world!',
    valueChanged: false,
  }

  handleGreetingChange = () => {
    const newGreeting = 'Howdy, sir!'
    this.greeting = { value: newGreeting, valueChanged: true };
  }

  render() {
    return (
      <View>
        <BoldText
          value={this.greeting.value}
        />
        <Button
          title='Press me to change greeting one time'
          disabled={this.greeting.valueChanged}
          onPress={this.handleGreetingChange}
        />
      </View>
    );
  }
}

```
[:top: Top](#top)

---
### solutions/...
#### solutions/1.js
``` jsx
import React from 'react'
import {StyleSheet,  Text, View} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    alignSelf: 'center',
  },
  greeting: {
    color: 'red',
  },
})


const Container = props => (
  <View style={styles.container}>
    <Greeting style={styles.center} />
  </View>
)

/////
// Do not edit anything above this line
/////

const Greeting = props => (
  <Text style={[styles.greeting, props.style]}>
    This text should be red and centered vertically
  </Text>
)

export default () => <Container />

```
[:top: Top](#top)

#### solutions/2.js
``` jsx
import React from 'react'
import {Button, Text, View} from 'react-native'

const shallowEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) return false
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i]
    if (obj1[key] !== obj2[key]) return false
  }

  return true
}

class ListText extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props)
  }

  render() {
    return (
      <Text>
        This list should add the next number to the list when button is pressed: {JSON.stringify(this.props.list)}
      </Text>
    )
  }
}


/////
// Do not change anything above this line
/////

export default class Bug extends React.Component {
  state = {
    list: [],
  }

  addNumber() {
    this.setState(prevState => ({list: [...prevState.list, prevState.list.length]}))
  }

  render() {
    return (
      <View>
        <ListText list={this.state.list} />
        <Button title="Increment" onPress={() => this.addNumber()} />
      </View>
    )
  }
}

```
[:top: Top](#top)

#### solutions/3.js
``` jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderColor: '#ddd',
    width: 100,
    borderWidth: 1,
  },
  messageContainer: {
    flexDirection: 'column',
  },
  messageHeader: {
    fontWeight: 'bold',
  },
});

export default class BugThree extends React.Component {
  state = {
    message: {
      owner: '',
      content: '',
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.message.owner}
          onChangeText={this._onOwnerChange}
        />
        <TextInput
          style={styles.input}
          value={this.state.message.content}
          onChangeText={this._onContentChange}
        />
        <View style={styles.messageContainer}>
          <Text style={styles.messageHeader}>Current Message</Text>
          <Text>Owner: {this.state.message.owner}</Text>
          <Text>Content: {this.state.message.content}</Text>
        </View>
      </View>
    );
  }

  /////
  // Do not edit anything above this line
  /////

  _onOwnerChange = (owner) => {
    this.setState({ message: {...this.state.message, owner}});
  }

  _onContentChange = (content) => {
    this.setState({ message: {...this.state.message, content}});
  }
}

```
[:top: Top](#top)

#### solutions/4.js
``` jsx
import React from 'react';
import { Button, Text, View } from 'react-native';

const BoldText = props => (
  <Text style={{fontWeight: 'bold'}}>
    {props.value}
  </Text>
);

/////
// Do not edit anything above this line
/////

export default class Bug extends React.Component {
  state = {
    value: 'Hello, world!',
    valueChanged: false,
  }

  _changeGreeting = () => {
    const newGreeting = 'Howdy, sir!'
    this.setState({ value: newGreeting, valueChanged: true });
  }

  render() {
    return (
      <View>
        <BoldText
          value={this.state.value}
        />
        <Button
          title='Press me to change greeting one time'
          disabled={this.state.valueChanged}
          onPress={this._changeGreeting}
        />
      </View>
    );
  }
}

```
[:top: Top](#top)

---
myNote
---
Lecture: https://github.com/alvinng222/cs50m/tree/06_UserInputDebugging

---

