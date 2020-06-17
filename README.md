
Lecture 6: Navigation
===

lecture: http://video.cs50.net/mobile/2018/spring/lectures/6

slides: http://cdn.cs50.net/mobile/2018/spring/lectures/6/lecture6.pdf

. Introduction  
. What is Navigation?  
. React Navigation and Alternatives  
. Install React Navigation  
. Navigators, Routes, and Screen Components  
. [Switch Navigation](#switch-navigator)  
. Creating a Navigation   
. Rendering a Navigation  
. Higher Order Components  
. Navigating to Another Route  
. The Navigation Prop  
. [Switch Navigator Example](#switch-navigator-example)  
. screenProps  
. [Stack Navigator](#stack-navigator)  
. Creating a StackNavigator  
. Returning to the Previously Active Route  
. [StackNavigator Example](#stacknavigator-example)  
. Configuring navigationOptions  
. Passing Around State  
. Using the StackNavigator  
. Adding a Button  
. push  
. Stack-specific Navigation Options  
. Composing Navigators  
. [Tab Navigators](#tab-navigators)  

[top]: topOfThePage
[Source Code](#source-code)
file: src6.zip

[**before/...**](#before)
  package.json
  AddContactForm.js
  App.js
  Row.js
  SectionListContacts.js
  contacts.js

[**after/...**](#after)
  package.json
  AddContactForm.js
  App.js
  Row.js
  SectionListContacts.js
  contacts.js   
  after/examples/...
    0-Switch.js
    1-Stack.js   
  after/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    LoginScreen.js
    SettingsScreen.js

Exercise 6 https://github.com/alvinng222/cs50m/tree/exercises-6

[**myNote**](#mynote)

[Snack/07_Navigation app.js is workable](#snack07_navigation-appjs-is-workable)

---

### Previous Lecture [06_UserInputDebugging](https://github.com/alvinng222/cs50m/tree/06_UserInputDebugging). 
- User input with TextInput
- Simple input validation
- `KeyboardAvoidingView`
- Debugging
  - Errors and warnings
  - Chrome Developer Tools
  - React Native Inspector with react-devtools
- Installing external libraries with npm

[:top: Top](#top)
### What is navigation?
- Navigation is a broad term that covers topics related to how you move
between screens in your app
- Web navigation is oriented around URLs
- Mobile apps do not use URLs for navigating *within* the app
- Navigation APIs completely different on iOS and Android
  - Several React Native libraries provide a platform agnostic alternative
  - We will talk about one of them today, React Navigation 

* Linking into a mobile app with a URL is known as deep linking:
https://v2.reactnavigation.org/docs/deep-linking.html

myNote: https://reactnavigation.org/docs/getting-started


### React Navigation and alternatives
- Two distinct approaches
  1. Implement mainly in JavaScript with React
  2. Implement mostly in native, expose an interface to JavaScript for existing
native navigation APIs
- React Navigation takes approach #1
* Read more at https://v2.reactnavigation.org/docs/pitch.html and
https://v2.reactnavigation.org/docs/alternatives.html

### Install React Navigation
- `npm install react-navigation@2.0.0-beta.5 --save`
- This will install the latest *pre-release* version at the time of writing. Typically
you would just write npm install react-navigation --save to use the
latest *stable* version.
- If you refer back to this in the future, keep in mind that this material is all
specific to the 2.x series of releases.

### Navigators, routes, and screen components
- A navigator is a component that implements a navigation pattern (eg: tabs)
- Each navigator must have one or more routes.
  - A navigator is a parent of a route.
  - A route is a child of a navigator.
- Each route must have a name and a screen component.
  - The name is usually unique across the app
  - The screen component is a React component that is rendered when the route
is active.
  - The screen component can also be another navigator.

[:top: Top](#top)
### Switch Navigator
- Display one screen at a time
- Inactive screens are unmounted
- The only action a user can take to switch from one route to another

:exclamation: :point_right: : myNote: `createSwitchNavigator` not available on latest version.

### Creating a navigator
~~~
import { createSwitchNavigator } from 'react-navigation';
const AppNavigator = createSwitchNavigator({
  "RouteNameOne": ScreenComponentOne,
  "RouteNameTwo": ScreenComponentTwo,
});
~~~

### Rendering a navigator
~~~
//const AppNavigator = createSwitchNavigator({
//  "RouteNameOne": ScreenComponentOne,
//  "RouteNameTwo": ScreenComponentTwo,
//});
 
export default class App extends React.Component {
  render() {
    return <AppNavigator />
  }
}
~~~
- `createSwitchNavigator` is a function that returns a React component
- We render the component in our root App component. Usually we only explicitly
render one navigator per app because navigators are composable.

### Higher order components
- `createSwitchNavigator` is a Higher Order Component: it is a function that
returns a React component.
- “A higher-order component (HOC) is an advanced technique in React ***for reusing component logic***.”
- This is similar to higher order functions, which are functions that either take
functions as arguments or return a function as a result.
* Read more at https://reactjs.org/docs/higher-order-components.html

### Navigating to another route
~~~
class ScreenComponentOne extends React.Component {
  render() {
    return (
      <Button
        title="Go to two"
        onPress={() => this.props.navigation.navigate('RouteNameTwo')}
      />
    );
  }
}
~~~

### The navigation prop
  - **`navigate(..)`**
  - `goBack(..)`
  - `setParams(..)`
  - `getParam(..)`
  - `dispatch(..)`
  - `isFocused(..)`
  - `addListener(..)`
  - `state`
* The navigation prop is passed in to the screen component for each route.
- Full reference: https://v2.reactnavigation.org/docs/navigation-prop.html

[:top: Top](#top)
### Switch Navigator Example
[01:26] to  [02:16]

lecture:
```
~/s50/react-native-course/lexture/6-navigation exp start --ios
(open up Visual Studio Code)
~/s50/react-native-course/lexture/6-navigation code.
~/s50/react-native-course/lexture/6-navigation mkdir examples
~/s50/react-native-course/lexture/6-navigation touch examples/0-Switch.js
```

.new file **0-Switch.js**
``` jsx
import React from 'React';
import { createSwitchNavigator } from 'React-navigation';

export default class App extends React.Component{
  render() {
    // return ..
  }
}
```
0-Switch.js
---
``` jsx
import React from 'react';
import { Button, View } from 'react-native'; // .02
import { createSwitchNavigator } from 'react-navigation';

class ScreenComponentOne extends React.Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 25, borderColor: 'teal'} }>
        <Button title="Go to screen two" /> 
      </View>
    );
  }
} // .03

const AppNavigator = createSwitchNavigator({
  "RouteNameOne": ScreenComponentOne // .03
}) // .02

export default class App extends React.Component {
  render() {
    return ({})
  }
}
```
use yarn instead of npm (But, im using Snack.. )
```
~/s50/react-native-course/lexture/6-navigation yarn add react-navigator@2.0.0-beta.3
```
.04 update 0-Switch.js
``` jsx
export default class App extends React.Component {
  render() {
    return <AppNavigator />
  } // .04
}
```
#### myNote: on installing `react-navigation@2.0.0-beta.5`   
after I init and install Expo, with template: expo-template-tabs  
https://github.com/alvinng222/cs50m/tree/master  > init and run Jun16.

and tested with `import { createSwitchNavigator } from 'React-navigation';` on App.js first, if error than
```
    Ts-MacBook-Pro:Jun16 twng$ vim App.js
    Ts-MacBook-Pro:Jun16 twng$ npm install react-navigation@2.0.0-beta.5 --save
```


.04 App.js
``` jsx
import Example from './examples/0-Switch';
export default Example;
```
Expo ok, Snack error: 
The navigation prop is missing for this navigator. In react-navigation v3 and v4 you must set up your app container directly. More info: https://reactnavigation.org/docs/en/app-containers.html
[02:00]

.05 package.json (for Snack, i revised to)
``` json
{
  "dependencies": {
    "react-navigation": "2.0.0-beta.5",
    "react-native-paper": "3.6.0"
  }
}
```

.note: `this.props.navigation.navigate('')` with console.log( `this.props` )
``` jsx
        <Button
          title="Go to screen one"
          onPress={() => {
            //console.log('Compo-1', this.props)
            this.props.navigation.navigate('RouteNameOne');
          }}
        />
```
console
```
Compo-1 
v {screenProps: undefined, navigation: {…}}
  > navigation: {state: {…}, dispatch: ƒ, dangerouslyGetParent: ƒ, addListener: ƒ, isFocused: ƒ, …}
    screenProps: undefined
  > __proto__: Object
```

[:top: Top](#top)   
**my basic screens switch!**   
.06 ScreenComponentTwo added
``` jsx
import React from 'react';
import { Button, View } from 'react-native'; // .02
import { createSwitchNavigator } from 'react-navigation';

class ScreenComponentOne extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',borderWidth: 25,
          borderColor: 'teal',
        }}>
        <Button
          title="Go to screen two" onPress={() => {
            this.props.navigation.navigate('RouteNameTwo');
          }} // .06
        />
      </View>
    );
  }
} // .03

class ScreenComponentTwo extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',borderWidth: 25,
          borderColor: 'orange',
        }}>
        <Button 
          title="Go to screen one" onPress={() => {
            this.props.navigation.navigate('RouteNameOne');
          }} // .06
        />
      </View>
    );
  }
} // .06

const AppNavigator = createSwitchNavigator({
  RouteNameOne: ScreenComponentOne, // .03
  RouteNameTwo: ScreenComponentTwo, // .06
}); // .02

export default class App extends React.Component {
  render() {
    return <AppNavigator />
  } // .04
}
```
[22:02]

### contacts list

from [before/App.js](#beforeappjs)

create new screens/AddContactScreen.js, screens/ContactListScreens

---
.07 App.js revisted from before/...
``` jsx
import React from 'react';
import {
  Button, FlatList, ScrollView, StyleSheet, Text, View,
} from 'react-native';
//import { Constants } from 'expo';
import Constants from 'expo-constants';

import contacts, { compareNames } from './contacts';
//import ScrollViewContacts from './ScrollViewContacts';
//import FlatListContacts from './FlatListContacts';
import SectionListContacts from './SectionListContacts';
//import AddContactForm from './AddContactForm'; // .07

export default class App extends React.Component {
  state = {
    showContacts: true,
    //showForm: false,  // .07
    contacts: contacts,
  };

  addContact = newContact => {
    this.setState(prevState => ({
      showForm: false,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }));
  };

  sort = () => {
    this.setState(prevState => ({
      contacts: prevState.contacts.sort(compareNames),
    }));
  };

  showForm = () => {
    this.setState({ showForm: true });
  };

  render() {
    if (this.state.showForm)
      return 
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="add contact" onPress={this.showForm} />
        {this.state.showContacts && (
          <SectionListContacts contacts={this.state.contacts} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
```
.new file /screen/**AddContactScreen.js**   
.07 from [after/screen/AddContactScreen.js](#afterscreensaddcontactscreenjs)
``` jsx
import React from 'react';
import AddContactForm from '../AddContactForm';

export default class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'New Contact',
  };

  handleSubmit = formState => {
    // this.props.screenProps.addContact(formState);  // .07
    this.props.navigation.navigate('ContactList');
  };

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />;
  }
} // .07
```
.myNote AddContactForm from /after/AddContactForm.js

.new file /screen/**ContactListScreen.js**   
.07 from [after/screens/ContactDetailsScreen.js](#afterscreenscontactdetailsscreenjs)
``` jsx
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants'; //

import SectionListContacts from '../SectionListContacts';

export default class ContactListScreen extends React.Component {
  state = {
    showContacts: true,
  };

  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }));
  };

  // handleSelectContact = contact => {
  //  this.props.navigation.push('ContactDetails', contact);
  //};

  showForm = () => {
    this.props.navigation.navigate('AddContact')
  };

  render() {
    return <View />; {/**.10 */}
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title='add contact' onPress={this.showForm} />
        {this.state.showContacts && (
          <SectionListContacts contacts={this.props.screenProps.contacts} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); // .07 [24.09]
```
:+1: to temporary blank view
`**render() { return <View />; ... **`


on App.js removed those imports, state/showContacts, toggleContacts, sort, showForm, render(){... to return/**/,   
added createSwitchNavigator, const AppNavigator, render(){return <AppNavigator />}
 
.09 App.js revised with  AppNavigator
``` jsx
import React from 'react'; //
import {Button, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants'; //import { Constants } from 'expo';
import contacts, { compareNames } from './contacts';
import { createSwitchNavigator } from 'react-navigation';
import AddContactScreen from './screens/AddContactScreen'
import ContactListScreen from './screens/ContactListScreen'

const AppNavigator = createSwitchNavigator({
  AddContact: AddContactScreen,
  ContactList: ContactListScreen,
}, {
  initialRouteName: 'ContactList', 
})

export default class App extends React.Component {
  state = {
    contacts: contacts,
  };

  addContact = newContact => {
    this.setState(prevState => ({
      showForm: false,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
```
using react-navigation 2.0.0, for Snack to work
``` json
{
  "dependencies": {
    "react-native-paper": "3.6.0",
    "react-navigation": "2.0.0-beta.5",
  }
}
```
now the mobile shown something, a *blank Screen!*

[:top: Top](#top)
[25:50]
### screenProps
~~~
export default class App extends React.Component {
  render() {
    return <AppNavigator screenProps={/* object here */} /> 
  }
}
~~~
- Made available to every screen component in the navigator.
- Perfectly fine for very small applications and prototyping but inefficient for most
meaningful applications - **every route in your app will re-render when
screenProps changes**. Use a state management library or the React Context API
instead.

.10 screenProps at App.js
``` jsx
  render() {
    return <AppNavigator screenProps={{ contacts: this.state.contacts }}/>;
  } // .10
```
.10b ContactListScreen.js delete the *blank* View. Now the mobile screens shown contacts.
``` jsx
  render() {
    // return <View />; {/**.10b  delete**/}
    return (
      <View style={styles.container}>
```

.11 updating of contacts, App.js
``` jsx
  render() {
    return (
      <AppNavigator
        screenProps={{
          contacts: this.state.contacts,
          addContact: this.addContact,
        }} // .11
      />
    )
  } // .10 
```
AddContactScreen.js, now the mobile screen work with contacts!
```jsx
  handleSubmit = formState => {
    this.props.screenProps.addContact(formState);  // .07 .11
    this.props.navigation.navigate('ContactList');
  };
```
[:top: Top](#top) 
[30:40]

---
### Stack Navigator
- Display one screen at a time
- The state of inactive screens is **maintained** and they remain mounted
- **Platform-specific layout, animations, and gestures**
  - Screens are stacked on top of each other
  - iOS: screens slide in from right to left, can be dismissed with left to right
gesture. Modal screens slide in from bottom to top, can be dismissed with top
to bottom gesture.
  - Android: screens fade in on top of each other, no dismiss gesture. Hardware
back button dismisses the active screen.
- Users can push and pop items from the stack, replace the current item, and
various other

### Creating a StackNavigator
~~~
import { createStackNavigator } from 'react-navigation';

const AppNavigator = createStackNavigator({
  "RouteNameOne": ScreenComponentOne,
  "RouteNameTwo": ScreenComponentTwo,
});
~~~
Creating a Stack Navigator is very similar to Switch.
simply swap out the word Switch for Stack.

### Navigating to another route
~~~
class ScreenComponentOne extends React.Component {
  render() {
    return (
      <Button
        title="Go to two"
        onPress={() => this.props.navigation.navigate('RouteNameTwo')}
      />
    );
  }
}
~~~

### Returning to the previously active route
~~~
class ScreenComponentThree extends React.Component {
  render() {
    return (
      <Button
        title="Go back"
        onPress={() => this.props.navigation.goBack()}
      />
    );
  }
}
~~~
There is a small difference here in that Stack actually
supports a tracking history.
So when you call goBack, it will pop the topmost screen
from the stack and transition back to the screen before it.

[:top: Top](#top)
### StackNavigator Example

.12 example on App.js
``` jsx
// import Example from './examples/0-Switch'; // .12
import Example from './examples/1-Stack'; // .12
export default Example;
/*  ... */
```
new 1-Stack.js copied from 0-Switch.js, just changed to createStackNavigator
``` jsx
import { createStackNavigator } from 'react-navigation'; // .12
...
const AppNavigator = createStackNavigator({ // .12
...
```
should be easily *swipe* back from next screen. (but not mine).
And is the ability to customize the UI that surrounds the Stack Navigator.

### Configuring navigationOptions
- headerTitle
- headerStyle
- headerTintColor
- headerLeft
- headerRight
* Full list: https://v2.reactnavigation.org/docs/stack-navigator.html#navigationoptions...

.13 1-Stack.js added the headerTitle
``` jsx
class ScreenComponentOne extends React.Component {
  static navigationOptions = {
    headerTitle: 'First screen',
    headerTintColor: 'teal',
    headerStyle: {
      backgroundColor: '#ccc'
    }
  }; // .12
  ...
class ScreenComponentTwo extends React.Component {
  static navigationOptions = {
    headerTitle: 'Screen the second',
  }; // .12
  ...
```
[:top: Top](#top)
### Using params to pass state between routes
- navigate with params
~~~
  this.props.navigation.navigate('RouteName', {
    paramName: 'value-of-param'
  });
~~~
- setParams to update params for the route
~~~
  this.props.navigation.setParams({
    paramName: 'new-value-of-param',
  });
~~~
- getParam to read a param
~~~
  this.props.navigation.getParam('paramName', 'default-value');
~~~

.13 third screen with random numbers, 1-Stack.js
``` jsx
import React from 'react';
import { Button, Text, View } from 'react-native'; //.13
import { createStackNavigator } from 'react-navigation'; // .12

function randomNumber() {
  return Math.floor(Math.random() * 10);
} // .13

class ScreenComponentOne extends React.Component {
  static navigationOptions = {
    headerTitle: 'First screen', headerTintColor: 'teal',
  }; // .12

  render() {
    return (
      <View
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',borderWidth: 25, borderColor: 'teal',
        }}>
        <Button
          title="Go to screen two" 
          onPress={() => { this.props.navigation.navigate('RouteNameTwo');}}
        />
      </View>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  static navigationOptions = { headerTitle: 'Screen the second',}; // .12
  render() {
    return (
      <View
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',borderWidth: 25, borderColor: 'orange',
        }}>
        <Button 
          title="Go to screen three" 
          onPress={() => {
            this.props.navigation.navigate('RouteNameThree', {
              number: randomNumber(), 
              }); // .13
          }}
        />
      </View>
    );
  }
}

class ScreenComponentThree extends React.Component {
  static navigationOptions = { headerTitle: 'TODO', } // .13
  render() {
    return (
      <View
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',borderWidth: 25, borderColor: 'purple',
        }}>
        <Text style={{ fontSize: 25 }}>
          {this.props.navigation.getParam('number')} {/*.13 */}
        </Text>
        <Button
          title="Go back" 
          onPress={() => {
            this.props.navigation.goBack(); // .13
          }}
        />
      </View>
    );
  }
} // .13

const AppNavigator = createStackNavigator({ // .12
  RouteNameOne: ScreenComponentOne, 
  RouteNameTwo: ScreenComponentTwo, 
  RouteNameThree: ScreenComponentThree, 
});

export default class App extends React.Component {
  render() {
    return <AppNavigator />
  }
}
```
> shown that the screen with title, and able to slide,  not on my andriod phone.

.14 setParams. And so we're passing in random numbers every time we go to that screen.
``` jsx
  static navigationOptions = { headerTitle: 'TODO', } // .13
  ...
        <Button
          title="New number" 
          onPress={() => {
            this.props.navigation.setParams({ number: randomNumber() }); //.13.14 
          }}
        />
        <Button
          title="Go back" 
        ...
```

.15 can pass data between the header of your component and the actual screen component itself.
And so we know that, since we have that, we can say navigation getParam,
and get the parameter that's passed in, and use it inside of our title.   
 note using *back-tick*  `` ` ``.
``` jsx
class ScreenComponentThree extends React.Component {
  static navigationOptions = ({ navigation }) => { // .15
    return {
      headerTitle: `Number: ${navigation.getParam('number')}`, 
    } // .15
  } // .13
  render() {
    // this.props.navigation //.15
    return (
      <View
      ...
```

.16 `HeaderLeft`, `HeaderRigth` add button to the header
add on ScreenComponentTwo
``` jsx
class ScreenComponentTwo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Screen the second',
      headerRight: <Button title="Press me" onPress={() => alert('pressed')} />
    } // .16
  }; // .12
```

.17 we could make this say navigation.navigate RouteNameThree.
``` jsx
class ScreenComponentTwo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Screen the second',
      headerRight: (
        <Button
          title="Press me"
          onPress={() => navigation.navigate('RouteNameThree', { number: 11 })
          } // .17
        />
      ),
    }; // .16
  }; // .12
```

.18 change `headerTitle` with Button
``` jsx
class ScreenComponentTwo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Button title="My title button" onPress={() => alert('title')} />
      ), // .18
      headerRight: (
      ...
```
[:top: Top](#top)
### break time
~~~
    // It's time for us to take a short break
    this.props.navigation.navigate('BreakTime');
    // Break time is over
    this.props.navigation.goBack();
~~~
---
[5:00]

.19 App.js contacts, using Stack Navigator,
add contact, it pushes a screen
``` jsx
...
import { createStackNavigator } from 'react-navigation'; // .19
import AddContactScreen from './screens/AddContactScreen';
import ContactListScreen from './screens/ContactListScreen';

const AppNavigator = createStackNavigator( // .19
  {
    AddContact: AddContactScreen,
    ContactList: ContactListScreen,
```
.20 ContactListScreen.js.  
 just show the 'Contacts' in the header,
``` jsx
export default class ContactListScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Contacts',
  } // .20

  state = {
  ...
```
 and AddContactScreen.js.
 ``` jsx
 export default class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Add Contact',
  }; // .20

  handleSubmit
  ...
 ```
 
### Add button to header with navigationOptions
- headerLeft
- headerRight
* Full list: https://v2.reactnavigation.org/docs/stack-navigator.html#navigationoptions...

 .21 ContactListScreen, Add Button.  
``` jsx
    headerRight: <Button title="Add"  onPress={() => {} }/>
``` 
it donest do any thing. ..

So we can upgrade that by turning 'navigation' into a dynamic navigation options,
... And what we can do is, we can put parentheses around here
to signify that this is a function that's returning
this object of navigation options.

ContactListScreen, added navigation (things)
``` jsx
  static navigationOptions = ({ navigation }) => ({ // .21
    headerTitle: 'Contacts',
    headerRight: (
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate('AddContact');
        }}
      />
    ),
  }); // .20 .21
```
.22 Buttons deleted which dont need
``` jsx
  render() {
    return (
      <View style={styles.container}>
        {//.22 <Button title="toggle contacts" onPress={this.toggleContacts} />
        //.22 <Button title="add contact" onPress={this.showForm} />
        }
        {this.state.showContacts && (
          <SectionListContacts contacts={this.props.screenProps.contacts} />
        )}
      </View>
    );
  }
```
[:top: Top](#top)
### (jumps to new screen)
~~~
// Jump to a screen, identified by route name
navigate('MyRouteName', { paramName: 'param-value' });
// “Push” a new screen, even if it already is in the stack
push('MyRouteName');
~~~

create new ./screens/ContactDetailsScreen.js    
So now let's make it so that when you click on a contact,
you can actually go into a new Contact Details screen.

.23 App.js revised for ContactDetailsScreen
``` jsx
import ContactDetailsScreen from './screens/ContactDetailsScreen'; // .23

const AppNavigator = createStackNavigator( // .19
  {
    AddContact: AddContactScreen,
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen, // .23
  }, 
```
.new file **ContactDetailsScreen.js** , not doing anything yet till .24
``` jsx
import React from 'react';
import {Button, Text, View } from 'react-native'

export default class ContactDetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Phone # coming soon</Text>
        <Button title="Go to random contact" onPress={this._goToRandom} />
      </View>
    )
  }

  _goToRandom= () => {
    //todo_
  }
} // .23
```

ContactListsScreens.js   revised for ContactDetailsScreen.  [[54.40]   
``` jsx
  render() {
    return (
      <View style={styles.container}>
        {this.state.showContacts && (
          <SectionListContacts 
            contacts={this.props.screenProps.contacts}
            onSelectContact={() => {}}
            />
        )} 
      </View>
    );
  }
```

SectionListContacts.js [[55:12]
``` jsx
import Row from './Row';
//.24 const renderItem = ({ item }) => <Row {...item} />;
const renderSectionHeader = ({ section }) => <Text>{section.title}</Text>;

const SectionListContacts = props => {
  const renderItem = ({ item }) => (
    <Row 
      {...item} 
      onSelectContact={contact => {
        //debugger; // .24f
        props.onSelectContact(contact);
      }} // .24 .24e
    />
  );

```

Row.js TouchableOpacity  [56:12]
``` jsx
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'; // .24
...
const Row = props => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => {
      //debugger; // .24d
      props.onSelectContact(props); // .24
    }}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </TouchableOpacity>
); // .24
```

.24 ContactListsScreens.js whereby onSelectContact from the SectionListContacts.js
``` jsx
  render() {
    return (
      <View style={styles.container}>
        {this.state.showContacts && (
          <SectionListContacts 
            contacts={this.props.screenProps.contacts}
            onSelectContact={(contact) => {
              // debugger; // .24c
              this.props.navigation.navigate('ContactDetails'); // .24b
            }}
            />
        )} // .24
      </View>
    );
  }
```

**Debugger** [57:48]   
quick trip to debug. Go to device, and 2nd screen, on the 'Debug Remote JS'.
myNote: It just auto pause at the Chrome developer tool on web browser, didnt activate the Debug Remote. 

:+1: Now, it work!

[:top: Top](#top)

---
#### Passing param on contacts list
we pass params here, we can pass an arbitrary object
of various pieces of information, like contact dot phone number.

.25 ContactListScreen.js add information, phone number above name
``` jsx
            onSelectContact={(contact) => {
              this.props.navigation.navigate('ContactDetails', {
                phone: contact.phone, // .25
                name: contact.name,   // .25
              }); // .24b
```
.myNote: this also work:
``` jsx
              this.props.navigation.push('ContactDetails', contact); 
```
ContactDetailsScreen.js, it shown the phone contact on the top left.
``` jsx
  render() {
    return (
      <View>
        <Text>{this.props.navigation.getParam('phone') /** .25**/}</Text>
        ...
```

.26 ContactDetailScreen.js add header detail > shown header of name
``` jsx
export default class ContactDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('name')    
  }) //.26
  render() {
```

ContactDetailScreen.js add ramdonContact > TypeError: Cannot read property 'contacts' of null
``` jsx
  _goToRandom= () => {
    const { contacts } = null;
    const phone = null;
    let randomContact;
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }
  }
```
contacts.js
``` jsc
const NUM_CONTACTS = 3;
```

.27 ContactDetailScreen.js add ramdonContact
``` jsx
  _goToRandom= () => {
    const { contacts } = this.props.screenProps; // was this.props.screenProps.contacts;
    const phone = this.props.navigation.getParam('phone');
    ...
    } //.27
    
    debugger; // .27 React Native Debugger 
  }
```  

.27 ContactDetailScreen.js add ramdonContact
``` jsx
  _goToRandom= () => {
    const { contacts } = this.props.screenProps; // was this.props.screenProps.contacts;
    const phone = this.props.navigation.getParam('phone');
    let randomContact;
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    } //.27

    this.props.navigation.navigate('ContactDetails', { // .27b
      name: randomContact.name,
      phone: randomContact.phone,
    })
    //debugger; // .27 React Native Debugger 
    //todo
  }
```

.myNote, also work, if i changed to
``` jsx
  _goToRandom= () => {
  ...
    this.props.navigation.navigate('ContactDetails', randomContact)
  }
```
[:top: _Top](#top)

~~~
// “Push” a new screen, even if it already is in the stack
push('MyRouteName');
~~~
.27b ContactDetailScreen.js to push() :+1: , flip stack to next screens. (Snack, not working)
``` jsx
     this.props.navigation.push('ContactDetails', {
       name: randomContact.name,
       phone: randomContact.phone,
     })
```
### Stack specific navigation actions
- push(..)
- pop(..)
- popToTop(..)
- replace(..)
* More information: https://v2.reactnavigation.org/docs/navigation-prop.html#...

[:top: Top](#top)
### Composing navigators
- Navigators can be composed when one type of navigation visually appears to
be inside another navigator
- A navigator can be the Screen Component of another navigator
- The app should only contain one top-level navigator
- You can navigate() to any route in the app
- goBack() works for the whole app, supports Android back button

### Composing navigators
~~~
const MyStackNavigator = createStackNavigator({
  "Home": HomeScreen,
  "AddContact": AddContactScreen,
});
const AppNavigator = createSwitchNavigator({
  "Login": LoginScreen,
  "Main": MyStackNavigator,
});
~~~
[:top: Top](#top)
### **Do not render a navigator inside a screen**
~~~
class MyScreen extends React.Component {
  render() {
    return <MyStackNavigator />;
  }
}
~~~
**Instead, set as a screen within the AppNavigator**
~~~
const AppNavigator = createSwitchNavigator({
  "Main": MyStackNavigator,
});
~~~

.28 App.js add createdSwitchNavigator, login
``` jsx
import React from 'react'; //
import {Button, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants'; //import { Constants } from 'expo';
import contacts, { compareNames } from './contacts';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'; // .19 .28
import AddContactScreen from './screens/AddContactScreen';
import ContactListScreen from './screens/ContactListScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen'; // .23
import LoginScreen from './screens/LoginScreen'; // .28

const MainNavigator = createStackNavigator( // .19 .28
  {
    AddContact: AddContactScreen,
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen, // .23
  }, 
  {
    initialRouteName: 'ContactList',
  }
);

const AppNavigator = createSwitchNavigator({
    Main: MainNavigator,
    Login: LoginScreen,
}, {
    initialRouteName: 'Login',
}) // .28

export default class App extends React.Component {
...
```
.new file **LoginScreen.js**
``` jsx
import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You are currently logged out.</Text>
        <Button title="Press to Log In" onPress={this._login} />
      </View>
    );
  }
  _login = () => {
    // navigator to main navigator
  };
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", flex: 1 },
  text: { textAlign: "center" }
}); // .28
```

[07:28]

.29 LoginScreen.js navigate to main screen
``` jsx
  _login = () => {
    this.props.navigation.navigate('Main') ; // .29
    // navigator to main navigator
  };
```
.29b we could also explicitly navigate to the Contact List.
``` jsx
    this.props.navigation.navigate('ContactList') ; // .29 .29b
```
.29c Like let's explicitly navigate to Add Contact.
And it jumps you deep inside the stack, but it still
``` jsx
    this.props.navigation.navigate('AddContact') ; // .29 .29b .29c
```
[:top: Top](#top) [1:13:10]

### Tab navigators
- Display one screen at a time
- The state of inactive screens is maintained
- Platform-specific layout, animations, and gestures
  - createMaterialTopTabNavigator
  - createMaterialBottomTabNavigator
  - createBottomTabNavigator
- The navigate() action is used to switch to different tabs
- goBack() can be called to go back to the first tab
  - The tab navigator goBack behavior is configurable

### Creating a tab navigator
~~~
const AppNavigator = createBottomTabNavigator({
  "TabOne": ScreenComponentOne,
  "TabTwo": ScreenComponentTwo,
});

export default class App extends React.Component {
  render() {
    return <AppNavigator />
  }
}
~~~

[Snack/07_Navigation app.js is workable](#snack07_navigation-appjs-is-workable)
But sometime got error.

.30 App.js add some color ??
``` jsx
  {
    initialRouteName: 'ContactList',
    navigationOptions: {
      headerTintColor: '#a41034',
    }, // .30
  },
```
.31 ContactListScreen.js add color on the Add
``` jsx
      <Button
        title="Add"
        color='#a41034' // .31
        onPress={() => {
          navigation.navigate('AddContact');
        }}
      />
```

.32 App.js added Tabs
``` jsx
...
import {
  createStackNavigator,
  createSwitchNavigator,
  createTabNavigator,
} from 'react-navigation'; // .19 .28 .32
...
import SettingsScreen from './screens/SettingsScreen' // .32

const ContactsTab = createStackNavigator( // .19 .28 .32
  {
    AddContact: AddContactScreen,
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen, // .23
  }, 
  {
    initialRouteName: 'ContactList',
    navigationOptions: {
      headerTintColor: '#a41034',
    }, // .30
  },
);

const MainNavigator = createTabNavigator({
  contacts: ContactsTab,
  Settings: SettingsScreen, // .32
})

const AppNavigator = createSwitchNavigator({
...
...
```
.new file: **SettingsScreen.js**
``` jsx
import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {};
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings coming soon.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  }
}); // .32
```
### Configure tab bar settings
~~~
const MainTabs = createBottomTabNavigator(
  {
    ...
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034"
    }
  }
);
~~~
* Full reference for tabBarOptions: https://v2.reactnavigation.org/docs/tab-navigator.html#...

.33 App.js add color on tabs
``` jsx
const MainNavigator = createTabNavigator({
  Contacts: ContactsTab,
  Settings: SettingsScreen, // .32
}, {
  tabBarOptions: {
    activeTintColor: '#a41034',
  }, // .33
})
```
:+1: Tested. It work on Snack Web, Snack IOS device, Snack Andriod.

[:top: Top](#top)
### Configure tab icons
~~~
MainStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  )
};
~~~

### Use common icon packs
~~~
# Install it in your shell
npm install --save react-native-vector-icons

// Import a supported icon set in your code
import Ionicons from "react-native-vector-icons/Ionicons";

// Use it as a React component
<Ionicons name="md-checkmark" size={25} color="#000" />

See other icon sets that are included: https://expo.github.io/vector-icons/
~~~

``$ yarn add react-native-vector-icons``

.34 added Ionicons, into app.js
``` jsx
...
import {Ionicons} from 'react-native-vector-icons' // .34

const ContactsTab = createStackNavigator( // .19 .28 .32
...

ContactsTab.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  )
}; //.34

const MainNavigator = createTabNavigator({
...
```
It work on online IOS device, and web.    
it dont work on android!! Option to change package.json
``` json
{
  "dependencies": {
    "react-navigation": "2.0.0-beta.5",
    "react-native-paper": "3.6.0",
    "react-native-vector-icons": "^4.5.0"
  }
}
```
.35 SettingsScreen.js add icon on
``` jsx
import Ionicons from "react-native-vector-icons/Ionicons"; // .35 ?

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-options${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    )
  }; //.35
  ...
```

### React Navigation Resources
- React Navigation Documentation 
    https://v2.reactnavigation.org/
- React Navigation API Reference 
    https://v2.reactnavigation.org/docs/api-reference.html
- NavigationPlayground example source code 
    https://github.com/react-navigation/react-navigation/tree/master/examples/NavigationPlayground

[:top: Top](#top)

---
---
Source Code
---
### before/...
####  before/package.json
``` js
{
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "dependencies": {
    "expo": "^25.0.0",
    "prop-types": "^15.6.1",
    "react": "16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz"
  }
}

```
[:top: Top](#top)
####  before/AddContactForm.js
``` jsx
import React from 'react'
import {Button, KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native'
import Constants from 'expo-constants'; //import {Constants} from 'expo'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
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
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && names.length >= 2 && names[0] && names[1]) {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  validateForm2 = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3) {
      return true
    } else {
      return false
    }
  }

  // myNote, to resolve the VirtualizedList: missing keys for items ...
  handleSubmit = (key) => {
    this.props.onSubmit({key: key, ...this.state })
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

```
[:top: Top](#top)

####  before/App.js
``` jsx
import React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'; //import {Constants} from 'expo'

import contacts, {compareNames} from './contacts'
//import ScrollViewContacts from './ScrollViewContacts'
//import FlatListContacts from './FlatListContacts'
import SectionListContacts from './SectionListContacts'
import AddContactForm from './AddContactForm'

export default class App extends React.Component {
  state = {
    showContacts: true,
    showForm: false,
    contacts: contacts,
  }

  addContact = newContact => {
    this.setState(prevState => ({showForm: false, contacts: [...prevState.contacts, newContact]}))
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  sort = () => {
    this.setState(prevState => ({contacts: prevState.contacts.sort(compareNames)}))
  }

  showForm = () => {
    this.setState({showForm: true})
  }

  render() {
    if (this.state.showForm) return <AddContactForm onSubmit={this.addContact} />
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="add contact" onPress={this.showForm} />
        {this.state.showContacts && <SectionListContacts contacts={this.state.contacts} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});

```
[:top: Top](#top)

####  before/Row.js
``` jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  row: { padding: 20 },
});

const Row = props => (
  <View style={styles.row}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </View>
);

Row.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default Row;

```
[:top: Top](#top)

####  before/SectionListContacts.js
``` jsx
import React from 'react';
import { SectionList, Text } from 'react-native';
import PropTypes from 'prop-types';

import Row from './Row';

const renderItem = ({ item }) => <Row {...item} />;

const renderSectionHeader = ({ section }) => <Text>{section.title}</Text>;

const SectionListContacts = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    };
  }, {});

  const sections = Object.keys(contactsByLetter)
    .sort()
    .map(letter => ({
      data: contactsByLetter[letter],
      title: letter,
    }));

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

SectionListContacts.propTypes = {
  contacts: PropTypes.array,
};

export default SectionListContacts;

```
[:top: Top](#top)

####  before/contacts.js
``` jsx
const NUM_CONTACTS = 1;

const firstNames = ['Emma','Noah','Olivia','Liam','Ava','William','Sophia','Mason','Isabella','James','Mia','Benjamin','Charlotte','Jacob','Abigail','Michael','Emily','Elijah','Harper','Ethan','Amelia','Alexander','Evelyn','Oliver','Elizabeth','Daniel','Sofia','Lucas','Madison','Matthew','Avery','Aiden','Ella','Jackson','Scarlett','Logan','Grace','David','Chloe','Joseph','Victoria','Samuel','Riley','Henry','Aria','Owen','Lily','Sebastian','Aubrey','Gabriel','Zoey','Carter','Penelope','Jayden','Lillian','John','Addison','Luke','Layla','Anthony','Natalie','Isaac','Camila','Dylan','Hannah','Wyatt','Brooklyn','Andrew','Zoe','Joshua','Nora','Christopher','Leah','Grayson','Savannah','Jack','Audrey','Julian','Claire','Ryan','Eleanor','Jaxon','Skylar','Levi','Ellie','Nathan','Samantha','Caleb','Stella','Hunter','Paisley','Christian','Violet','Isaiah','Mila','Thomas','Allison','Aaron','Alexa','Lincoln']

const lastNames = ['Smith','Jones','Brown','Johnson','Williams','Miller','Taylor','Wilson','Davis','White','Clark','Hall','Thomas','Thompson','Moore','Hill','Walker','Anderson','Wright','Martin','Wood','Allen','Robinson','Lewis','Scott','Young','Jackson','Adams','Tryniski','Green','Evans','King','Baker','John','Harris','Roberts','Campbell','James','Stewart','Lee','County','Turner','Parker','Cook','Mc','Edwards','Morris','Mitchell','Bell','Ward','Watson','Morgan','Davies','Cooper','Phillips','Rogers','Gray','Hughes','Harrison','Carter','Murphy']

// generate a random number between min and max
const rand = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// generate a name
const generateName = () =>
  `${firstNames[rand(firstNames.length - 1)]} ${
    lastNames[rand(lastNames.length - 1)]
  }`;

// generate a phone number
const generatePhoneNumber = () =>
  `${rand(999, 100)}-${rand(999, 100)}-${rand(9999, 1000)}`;

// create a person
const createContact = () => ({
  name: generateName(),
  phone: generatePhoneNumber(),
});

// compare two contacts for alphabetizing
export const compareNames = (contact1, contact2) =>
  contact1.name > contact2.name;

// add keys to based on index
const addKeys = (val, key) => ({ key, ...val });

// create an array of length NUM_CONTACTS and add keys
export default Array.from({ length: NUM_CONTACTS }, createContact).map(addKeys);

```
[:top: Top](#top)

---
### after/...
####  after/package.json
``` js
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

####  after/AddContactForm.js
contents of ./after/AddContactForm.js and ./before/AddContactForm.js are identical


####  after/App.js
[Snack/07_Navigation app.js is workable](#snack07_navigation-appjs-is-workable)
But sometime got error.
``` jsx
// import Example from './examples/0-Switch';
// import Example from './examples/1-Stack';
// export default Example;

import React from "react";
import { StatusBar, View } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import AddContactScreen from "./screens/AddContactScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ContactListScreen from "./screens/ContactListScreen";
import ContactDetailsScreen from "./screens/ContactDetailsScreen";
import LoginScreen from "./screens/LoginScreen";
import contacts from "./contacts";

const MainStack = createStackNavigator(
  {
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen,
    AddContact: AddContactScreen
  },
  {
    initialRouteName: "ContactList",
    navigationOptions: {
      headerTintColor: "#a41034",
      headerStyle: {
        backgroundColor: "#fff"
      }
    }
  }
);

MainStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  )
};

const MainTabs = createBottomTabNavigator(
  {
    Contacts: MainStack,
    Settings: SettingsScreen
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034"
    }
  }
);

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabs
});

export default class App extends React.Component {
  state = {
    contacts
  };

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }));
  };

  render() {
    return (
      <AppNavigator
        screenProps={{
          contacts: this.state.contacts,
          addContact: this.addContact
        }}
      />
    );
  }
}

```
[:top: Top](#top)

####  after/Row.js
``` jsx
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  row: { padding: 20 },
});

const Row = props => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => props.onSelectContact(props)}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </TouchableOpacity>
);

Row.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default Row;

```
[:top: Top](#top)

####  after/SectionListContacts.js
``` jsx
import React from 'react';
import { SectionList, Text } from 'react-native';
import PropTypes from 'prop-types';

import Row from './Row';

const renderSectionHeader = ({ section }) => <Text>{section.title}</Text>;

const SectionListContacts = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    };
  }, {});

  const sections = Object.keys(contactsByLetter)
    .sort()
    .map(letter => ({
      data: contactsByLetter[letter],
      title: letter,
    }));

  return (
    <SectionList
      keyExtractor={item => item.phone}
      sections={sections}
      renderItem={({ item }) => <Row {...item} onSelectContact={props.onSelectContact} /> }
      renderSectionHeader={renderSectionHeader}
    />
  );
};

SectionListContacts.propTypes = {
  contacts: PropTypes.array,
};

export default SectionListContacts;

```

####  after/contacts.js
from before/contacts.js, just chance
``` jsx
const NUM_CONTACTS = 3;
...
```

[:top: Top](#top)

####  after/examples/0-Switch.js
``` jsx
import React from 'react';
import { Button, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <MyNavigator />;
  }
}

class ScreenComponentOne extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'teal',
        }}>
        <Button
          title="Go to two"
          onPress={() => this.props.navigation.navigate('routeNameTwo')}
        />
      </View>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'orange',
        }}>
        <Button
          title="Go to one"
          onPress={() => this.props.navigation.navigate('routeNameOne')}
        />
      </View>
    );
  }
}

const MyNavigator = createSwitchNavigator({
  routeNameOne: ScreenComponentOne,
  routeNameTwo: ScreenComponentTwo,
});

```
[:top: Top](#top)

####  after/examples/1-Stack.js
``` jsx
import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <MyNavigator />;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

class ScreenComponentOne extends React.Component {
  static navigationOptions = {
    title: 'First screen',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'teal',
        }}>
        <Button
          title="Go to two"
          onPress={() => this.props.navigation.navigate('routeNameTwo')}
        />
      </View>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  static navigationOptions = {
    title: 'Second screen',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'orange',
        }}>
        <Button
          title="Go to three"
          onPress={() =>
            this.props.navigation.navigate('routeNameThree', {
              randomNumber: getRandomNumber(),
            })
          }
        />
      </View>
    );
  }
}

class ScreenComponentThree extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Number: ${navigation.getParam('randomNumber')}`,
    };
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 25,
          borderColor: 'purple',
        }}>
        <Text style={{ fontSize: 25 }}>
          {this.props.navigation.getParam('randomNumber')}
        </Text>
        <Button
          title="Get a new random number"
          onPress={() => {
            this.props.navigation.setParams({
              randomNumber: getRandomNumber(),
            });
          }}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const MyNavigator = createStackNavigator(
  {
    routeNameOne: ScreenComponentOne,
    routeNameTwo: ScreenComponentTwo,
    routeNameThree: ScreenComponentThree,
  },
  {
    // headerTransitionPreset: 'uikit',
    // mode: 'modal',
  }
);

```
[:top: Top](#top)

####  after/screens/AddContactScreen.js
``` jsx
import React from 'react';
import AddContactForm from '../AddContactForm';

export default class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'New Contact',
  };

  handleSubmit = formState => {
    this.props.screenProps.addContact(formState);
    this.props.navigation.navigate('ContactList');
  };

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />;
  }
}

```
[:top: Top](#top)

####  after/screens/ContactDetailsScreen.js
``` jsx
import React from 'react';
import { Button, Text, View } from 'react-native';

export default class ContactDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('name'),
    };
  };

  render() {
    return (
      <View>
        <Text>{this.props.navigation.getParam('phone')}</Text>
        <Button title="Go to random contact" onPress={this.goToRandomContact} />
      </View>
    );
  }

  goToRandomContact = () => {
    const { contacts } = this.props.screenProps;
    const phone = this.props.navigation.getParam('phone');
    let randomContact;
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }

    // this.props.navigation.navigate('ContactDetails', {
    //   ...randomContact,
    // });
    this.props.navigation.push('ContactDetails', {
      ...randomContact,
    });
  };
}

```
[:top: Top](#top)

####  after/screens/ContactListScreen.js
``` jsx
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

import SectionListContacts from '../SectionListContacts';

export default class ContactListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Contacts',
      headerRight: (
        <Button
          title="Add"
          onPress={() => navigation.navigate('AddContact')}
          color="#a41034"
        />
      ),
    };
  };

  state = {
    showContacts: true,
  };

  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }));
  };

  handleSelectContact = contact => {
    this.props.navigation.push('ContactDetails', contact);
  };

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

```
[:top: Top](#top)

####  after/screens/LoginScreen.js
``` jsx
import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class LoginScreen extends React.Component {
  _login = () => {
    this.props.navigation.navigate("Main");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You are currently logged out.</Text>
        <Button title="Press to Log In" onPress={this._login} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  }
});

```
[:top: Top](#top)

####  after/screens/SettingsScreen.js
``` jsx
import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-options${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings coming soon.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  }
});

```
[:top: Top](#top)

---
myNote
---

concole.log revised on AddContactForm.js
``` jsx
  validateForm = () => {
    console.log(this.state, 'AddContactForm');
    ...
```
:+1: to temporary blank view
`**render() { return <View />; ... **`


before/AddContactForm.js style was
``` jsx
  container: {
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
```
changed to after//AddContactForm.js style
``` jsx
  container: {
    flex: 1,
  },
```

#### debug using console.log 
`console.log('CDS ', this.props.screenProps.contacts) `, it shown the full contact list
``` jsx
  _goToRandom= () => {
    const { contacts } = this.props.screenProps;
    console.log('CDS ', this.props.screenProps.contacts) 
    ...
```

#### debug placing **debugger;** [57:48]   
SectionListContacts.js [[55:12]
``` jsx
      onSelectContact={contact => {
        //debugger; // .24f
        props.onSelectContact(contact);
      }} // .24 .24e
```
Row.js
``` jsx
    onPress={() => {
      //debugger; // .24d
      props.onSelectContact(props); // .24
    }}>
```
.24 ContactListsScreens.js 
``` jsx
            onSelectContact={(contact) => {
              // debugger; // .24c
              this.props.navigation.navigate('ContactDetails'); // .24b
            }}
```



#### Some changes 
if necessary, **import Constants**
``` jsx
import Constants from 'expo-constants'; //import {Constants} from 'expo'
```

#### Snack/07_Navigation app.js is workable
But sometime got error.
``` jsx
// original from my Snack 07_Navigation Pro
import React from 'react'; 
import {StatusBar, View} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createTabNavigator,
} from 'react-navigation';
import {Ionicons} from 'react-native-vector-icons' 

import AddContactScreen from './screens/AddContactScreen';
import ContactListScreen from './screens/ContactListScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen'; 
import LoginScreen from './screens/LoginScreen'; 
import SettingsScreen from './screens/SettingsScreen' 

import contacts, { compareNames } from './contacts';

const ContactsTab = createStackNavigator( 
  {
    AddContact: AddContactScreen,
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen, 
  }, 
  {
    initialRouteName: 'ContactList',
    navigationOptions: {
      headerTintColor: '#a41034',
    }, // .30
  },
);

ContactsTab.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  )
}; 

const MainNavigator = createTabNavigator({
  Contacts: ContactsTab,
  Settings: SettingsScreen,
}, {
  tabBarOptions: {
    activeTintColor: '#a41034',
  }, // .33
})

const AppNavigator = createSwitchNavigator({
    Main: MainNavigator,
    Login: LoginScreen,
}, {
    initialRouteName: 'Login',
}) // .28

export default class App extends React.Component {
  state = {
    contacts: contacts,
  };

  addContact = newContact => {
    this.setState(prevState => ({
      showForm: false,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  render() {
    return (
      <AppNavigator
        screenProps={{
          contacts: this.state.contacts,
          addContact: this.addContact,
        }} 
      />
    );
  } 
}
```
Snack/07_Navigation  package.json
``` js
{
  "dependencies": {
    "react-navigation": "2.0.0",
    "react-native-paper": "3.6.0",
    "react-native-vector-icons": "^4.5.0",
    "react-native-vector-icons/Ionicons": "latest"
  }
}
```
---
[:top: Top](#top)

#### Git branch 07_Navigation
```
    Ts-MacBook-Pro:cs50m twng$ cat .gitignore
    .DS_Store
    /expo-app
    .gitignore
    Ts-MacBook-Pro:cs50m twng$ git branch -v
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push -u origin 07_Navigation
```
checked on github, https://github.com/alvinng222/cs50m/tree/07_Navigation

[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)  
back to previous:  [06_UserInputDebugging](https://github.com/alvinng222/cs50m/tree/06_UserInputDebugging).   
continue to next:  [08_Data](https://github.com/alvinng222/cs50m/tree/08_Data).

---
