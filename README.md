Exercises 6
===
[top]: topOfThePage
[Source Code](#source-code)

README-1.md
App.js

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

#### README.md
``` markdown
# Navigation
In lecture we introduced navigation concepts and the react-navigation library.

This exercise will walk though basic usage of the library, usage of route params, 
and demonstrate a common pitfall with nested navigators.

## Installation
This exercise was bootstrapped using the [Expo XDE]
(https://docs.expo.io/versions/latest/introduction/xde-tour.html).
To run it, open this directory as a project in the XDE.

## Exercise
For this exercise, there are a few buggy files located in [/bugs](./bugs). 
Replace the import in [App.js](./App.js) with the buggy file to run it. 
Make sure not to change the lines that the files say not to change.

## Solution
See the solution code in the [solutions directory](./solutions), 
or run them without looking at the code to play with the functionality.
```

#### App.js
``` jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Bug from './bugs/1';

export default class App extends React.Component {
  render() {
    return <Bug />;
  }
}
```
[:top: Top](#top)

---
### bugs/...
#### bugs/1.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

/////
// Do not edit anything above this line
/////

const HomeScreen = props => (
  <View style={styles.screen}>
    <Text style={styles.label}>Home Screen</Text>
    <Button title="Go to Contact Screen" onPress={() => {}} />
  </View>
);

const ContactScreen = props => (
  <View style={styles.screen}>
    <Text style={styles.label}>Contact Screen</Text>
    <Button title="Go back" onPress={() => {}} />
  </View>
);

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```
[:top: Top](#top)

#### bugs/2.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Home Screen</Text>
    <Button
      title="Go to Jane's Contact Screen"
      onPress={() => {
        navigation.navigate('ContactScreen', { name: 'Jane' });
      }}
    />
  </View>
);

/////
// Do not edit anything above this line
/////

const ContactScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>FIXME's Contact Screen</Text>
    <Button
      title="Go to Lucy's Contact screen"
      onPress={() => {
        navigation.navigate('ContactScreen', { name: 'Lucy' });
      }}
    />
  </View>
);

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```
[:top: Top](#top)

#### bugs/3.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Home',
  };
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>Home Screen</Text>
        <Button
          title="Go to Jane's Contact Screen"
          onPress={() => {
            this.props.navigation.navigate('ContactScreen', { name: 'Jane' });
          }}
        />
        <Button
          title="Edit Bob's Contact Screen"
          onPress={() => {
            this.props.navigation.navigate('ContactScreen', {
              name: 'Bob',
              isEditing: true,
            });
          }}
        />
      </View>
    );
  }
}

/////
// Do not edit anything above this line
/////

class ContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Jane',
    headerRight: <Button onPress={() => {}} title="Edit" />,
  };

  render() {
    const isEditing = this.props.navigation.getParam('isEditing', false);
    const message = isEditing
      ? 'Now editing. Press the upper right "Done" button to go back.'
      : 'Press "Edit" to start editing.';
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>{message}</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```
[:top: Top](#top)

#### bugs/4.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createTabNavigator, createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Home Screen</Text>
    <Button
      title="Go to Jane's Contact Screen"
      onPress={() => {
        navigation.navigate('ContactScreen', { name: 'Jane' });
      }}
    />
  </View>
);

const InfoScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Contact Info</Text>
  </View>
);

const FriendsScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Friends</Text>
    <Button
      title="Go to Bob's Contact Screen"
      onPress={() => {
        navigation.push('ContactScreen', { name: 'Bob' });
      }}
    />
  </View>
);

/////
// Do not edit anything above this line
/////

const ContactNavigator = createTabNavigator({
  InfoScreen,
  FriendsScreen,
});

const ContactScreen = () => (
  <View style={styles.screen}>
    <ContactNavigator />
  </View>
);

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;

```
[:top: Top](#top)

---
### solutions/...
#### solutions/1.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

/////
// Do not edit anything above this line
/////

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Home Screen</Text>
    <Button
      title="Go to Contact Screen"
      onPress={() => {
        navigation.navigate('ContactScreen');
      }}
    />
  </View>
);

const ContactScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Contact Screen</Text>
    <Button
      title="Go back"
      onPress={() => {
        navigation.goBack();
      }}
    />
  </View>
);

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```
[:top: Top](#top)

#### solutions/2.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Home Screen</Text>
    <Button
      title="Go to Jane's Contact Screen"
      onPress={() => {
        navigation.navigate('ContactScreen', { name: 'Jane' });
      }}
    />
  </View>
);

/////
// Do not edit anything above this line
/////

const ContactScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>
      {navigation.getParam('name')}'s Contact Screen
    </Text>
    <Button
      title="Go to Lucy's Contact screen"
      onPress={() => {
        navigation.push('ContactScreen', { name: 'Lucy' });
      }}
    />
  </View>
);

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```
[:top: Top](#top)

#### solutions/3.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Home',
  };
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>Home Screen</Text>
        <Button
          title="Go to Jane's Contact Screen"
          onPress={() => {
            this.props.navigation.navigate('ContactScreen', { name: 'Jane' });
          }}
        />
        <Button
          title="Edit Bob's Contact Screen"
          onPress={() => {
            this.props.navigation.navigate('ContactScreen', {
              name: 'Bob',
              isEditing: true,
            });
          }}
        />
      </View>
    );
  }
}

/////
// Do not edit anything above this line
/////

class ContactScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name', false);
    const isEditing = navigation.getParam('isEditing', false);
    return {
      headerTitle: name,
      headerRight: isEditing ? (
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Done"
        />
      ) : (
        <Button
          onPress={() => {
            navigation.setParams({ isEditing: true });
          }}
          title="Edit"
        />
      ),
    };
  };

  render() {
    const isEditing = this.props.navigation.getParam('isEditing', false);
    const message = isEditing
      ? 'Now editing. Press the upper right "Done" button to go back.'
      : 'Press "Edit" to start editing.';
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>{message}</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```
[:top: Top](#top)

#### solutions/4.js
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createTabNavigator, createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Home Screen</Text>
    <Button
      title="Go to Jane's Contact Screen"
      onPress={() => {
        navigation.navigate('ContactScreen', { name: 'Jane' });
      }}
    />
  </View>
);

const InfoScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Contact Info</Text>
  </View>
);

const FriendsScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.label}>Friends</Text>
    <Button
      title="Go to Bob's Contact Screen"
      onPress={() => {
        navigation.push('ContactScreen', { name: 'Bob' });
      }}
    />
  </View>
);

/////
// Do not edit anything above this line
/////

// The reasoning for this solution is explained here:
// https://v2.reactnavigation.org/docs/common-mistakes.html#explicitly-rendering-more-than-one-navigator

const ContactScreen = createTabNavigator({
  InfoScreen,
  FriendsScreen,
});

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```
[:top: Top](#top)

---
myNote
---
#### Lectures
- [05_ListsUserInput.md](https://github.com/alvinng222/cs50-mobile/blob/master/05_ListsUserInput.md)
- [06_UserInputDebugging.md](https://github.com/alvinng222/cs50-mobile/blob/master/06_UserInputDebugging.md)
- [07_Navigation.md](https://github.com/alvinng222/cs50-mobile/blob/master/07_Navigation.md)

#### my expo.io/ snacks: https://expo.io/snacks/@awesome2/. 

---
#### .01 Set json
``` jsx
{
  "dependencies": {
    "react-native-paper": "3.6.0",
    "react-navigation": "2.0.0"
  }
}
```
.02 passing content to next screen
``` jsx
{navigation.getParam('name')}
```
---
#### .solution/3.js rearrange for ?() :()
``` jsx
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', },
  label: { textAlign: 'center', },
});

class HomeScreen extends React.Component {
  static navigationOptions = { headerTitle: 'Home', };

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>Home Screen</Text>
        <Button title="Go to Jane's Contact Screen" onPress={() => {
            this.props.navigation.navigate('ContactScreen', { name: 'Jane' });
          }}
        />
        <Button title="Edit Bob's Contact Screen"
          onPress={() => {
            this.props.navigation.navigate('ContactScreen', {
              name: 'Bob',
              isEditing: true,
            });
          }}
        />
      </View>
    );
  }
}

/////
// Do not edit anything above this line
/////

class ContactScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name', false);
    const isEditing = navigation.getParam('isEditing', false);
    return {
      headerTitle: name,
      headerRight: (
        isEditing 
          ? <Button onPress={()=>{navigation.goBack() }} title="Done" />
          : (<Button title="Edit" onPress={()=>{
                navigation.setParams({isEditing: true });
              }} />
            )
      ),
    }
  };

  render() {
    const isEditing = this.props.navigation.getParam('isEditing', false);
    const message = isEditing
      ? 'Now editing. Press the upper right "Done" button to go back.'
      : 'Press "Edit" to start editing.';
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>{message}</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen,
  ContactScreen,
});

export default AppNavigator;
```

[:top: Top](#top)

---
