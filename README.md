Lecture 5: User Input, Debugging
===
[top]: topOfThePage

lecture: http://video.cs50.net/mobile/2018/spring/lectures/5

slides: http://cdn.cs50.net/mobile/2018/spring/lectures/5/lecture5.pdf
- [User Input](#user-input)
- [Handling multiple inputs](#handling-multiple-inputs)
- [Validating Input](#validating-input)
- [KeyboardAvoidingView](#keyboardavoidingview)
- [Debugging](#debugging)
- [React Errors and Warnings](#react-errors-and-warnings)
- [Chrome Devtools](#chrome-devtools)
- [React Native Inspector](#react-native-inspector)
- [react-devtools](#react-devtools)
- [External Libraries](#external-libraries)

[**Source Code**](#source-code)
files: src5.zip
.  
before/...
    [AddContactForm.js](#beforeaddcontactformjs)
    [App.js](#beforeappjs)
    [Row.js](#beforerowjs)
    [SectionListContacts.js](#beforesectionlistcontactsjs)
    [contacts.js](#beforecontactsjs)
.  
after/...
    [AddContactForm.js](#afteraddcontactformjs)
    [App.js](#afterappjs)
    [Row.js](#afterrowjs)
    SectionListContacts.js
    contacts.js

**exercises 5**: https://github.com/alvinng222/cs50m/tree/exercises5

[**myNote**](#mynote)

---
### Previous Lecture, [05_ListsUserInput](https://github.com/alvinng222/cs50m/tree/05_ListsUserInput)
- ScrollView
- FlatList
- SectionList
- Controlled vs Uncontrolled components
- TextInput

[:top: Top](#top)
### User Input
- Controlled vs uncontrolled components
    - Where is the source of truth for the value of an input?
- React recommends always using controlled components
- Pass value and onChangeText props
- https://facebook.github.io/react-native/docs/textinput.html

And so, where we left off last week, we could type into the name here.
But nothing actually happens with those values.

### Handling multiple inputs
- <form> exists in HTML, but not in React Native
- With controlled components, we maintain an object with
all inputs’ values
- We can define a function that handles the data to submit

from [AddContactForm.js](#beforeaddcontactformjs)

.01 AddContactForm.js added handleSubmit
``` jsx
        <Button title="Submit" onPress={this.handleSubmit} /> {/*.01*/}
```
add in handleSubmit
``` jsx
  handleSubmit = () => {
    this.props.onSubmit({name: this.state.name, phone: this.state.phone,})
  } // .01

  render() {
```
shorthand
``` jsx
  handleSubmit = () => {
    this.props.onSubmit({...this.state})
  } // .01
```
or simply
``` jsx
  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }// .01
```

App.js revised for addContact. >> nothing happen 
``` jsx
  addContact = newContact => {
    this.setState(prevState => ({contacts: [...prevState.contacts, newContact]}))
  } // .01
  
  toggleContacts = () => {
...
  render() {
    if (this.state.showForm) return <AddContactForm onSubmit={this.addContact} />; {/*.01*/}
```
App.js, showForm: false. >> now it work, added new contact
``` jsx
    this.setState(prevState => ({showForm: false, contacts: [...prevState.contacts, newContact]}))
```
change the contacts.js, `const NUM_CONTACTS = 1`, for better observation

[:top: Top](#top) [11:01]
### Validating Input
- Conditionally set state based on input value
- Validate form before submitting
- Validate form after changing single input value
    - this.setState() can take a callback as the second argument
    - componentDidUpdate()

.02 validating the phone no.  
There are actually many different ways and I'll show you one possible way.
So this plus notation, if you do plus some string,
it will try to cast that to a number.
#### +str
``` jsx
        $ node
        > const str = "123"
        > +str
        123
        > +"123a"
        Nan
        >+ ""
        0
```
AddContactForm.js validating phone no if greater than zero
``` jsx
  handlePhoneChange = phone => {
    if (+phone >= 0) {
      this.setState({phone})
    } // .02
  }
```
    ... check length
``` jsx
    if (+phone >= 0 && phone.length <= 10) {
```
and add validate on available of name upon submit
``` jsx
  handleSubmit = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3) {
      this.props.onSubmit(this.state)
    }
  }// .01 .02
```
.03 Button to be clickable or not clickable,
We can pass a *prop* called **disabled**.
``` jsx
        <Button title="Submit" onPress={this.handleSubmit} disabled={true /*.03*/ }/> {/*.01*/}
```
Well, we can actually continuously check, hey, if the form's valid. 
And so we've been using this `this.setState()`, to disabled button if *not to* isValidForm, {**!** ...
``` jsx
  state = {
    name: '',
    phone: '',
    isFormValid: false, /* .03b */
  } 
  ...
        <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid}/> {/*.01 .03 .03b*/}
```
.04 It should be disabled when the form is not valid.
``` jsx
  validateForm = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3)  {
      return true
    } else {
      return false
    }
  } // .04

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }// .01 .02 .04
```
    ... this.setState ...
``` jsx
  handleNameChange = name => {
    this.setState({name}, this.validateForm)
  } // .04

  handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10) {
      this.setState({phone}, this.validateForm)
    } // .02 .04
  }

  validateForm = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3)  {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  } // .04 .04b

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }// .01 .02 .04
```
:+1: now, the submit button work!   
for the yellow warning signal from device, see myNote.

#### componentDidUpdate (prevProps, prevState) {}
.05 another method for react component to validate
``` jsx
  componentDidUpdate (prevProps, prevState) {
    if (this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
      this.validateForm()
    }
  } // .05

  handleNameChange = name => {
    this.setState({name})
  } // .04 .05

  handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10) {
      this.setState({phone})
    } // .02 .04 .05
  }
```
.06 AddContactForm, input and submit to justify center.
``` jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center' // .06
  },
```
 But is too close to the keyboards, if have many inputs, the keyboard will cover up the input 


[:top: Top](#top)
[36:00]
### KeyboardAvoidingView
- Native component to handle avoiding the virtual keyboard
- Good for simple/short forms
    - The view moves independent of any of its child TextInputs

.07 AddContactFrom.js .
Changed `View` to `KeyboardAvoidingView behaviour=`, shown lower typing area for many inputs
``` jsx
import {Button, KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native' // .07
    ...
  render() {
    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}> {/*.07*/}
        <TextInput
        ...
        />
        <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid}/> {/*.01.03.03b.04.07*/}
      </KeyboardAvoidingView>
    )
  }
```
But, don't work well for more inputs on the phone

[:top: Top](#top)
[39:06] half time break

##### to handle more inputs
AddContactForm.js 
``` jsx
  handleUpdate = key => {
    val => {
      this.setState({[key]: val})
    }
  }

  handleNameChange = this.handleUpdate('name')
  
  /*
  handleNameChange = name => {
```
this  ` this.handleUpdate('name')` will returned function, 
`val => { this.setState({name: val}) }`


.08 AddContactForm.js
``` jsx
  getHandler = key => val => {
    this.setState({[key]: val})
  } // .08b
  
  /*
  getHandler = key => {
    return val => {
      this.setState({[key]: val})
    }
  } // .08 */

  handleNameChange = this.getHandler('name') // val => { this.setState({name: val}) }
  handlePhoneChange = this.getHandler('phone') // .08
  /*
  handleNameChange = name => {
    this.setState({name})
  } // .04 .05
  */
  ...
          onChangeText={this.getHandler('name')} // .08
          ...
          onChangeText={this.getHandler('phone')} // .08
          ...
```
[:top: Top](#top)
[47:08]

---
### Debugging
- React errors/warnings
- Chrome Developer Tools (devtools)
- React Native Inspector
- react-devtools

lecturer use console.log

### React Errors and Warnings
- Errors show up as full page alerts
    - Trigger with console.error()
- Warnings are yellow banners
    - Trigger with console.warn()
    - Does not appear in production mode

.09 AddContactForm.js - shown full error on device, not on web
``` jsx
  render() {
    console.error('This is a full page alert') // .09
    return (
```
.10 throw new Error - shown Error: ... on device, also on web
``` jsx
    throw new Error('This is also an error') // .10
```
the above two are very aggressive way to debug,  not the best way
.11 less aggressive warning, shown yellow banner on below the device, not on web
``` jsx
    console.warn("This is a less aggresive warning"); // .11
```
Better way to debug ...

[:top: Top](#top)
### Chrome Devtools
- Google Chrome has amazing developer tools (debugger)
- We can run the JavaScript inside a Chrome tab
    - Separate threads for native and JavaScript
    - Communicate asynchronously through bridge
    - No reason that the JavaScript needs to be run on device

[53:10] simulator > Shake Gesture

#### shake device for menu, 2nd screen
click on or off `Debug Remote JS` the android phone with expo app   
2nd screen:
```
            name
            * Reload
            * Copy link to clipboard
            * Go to Home
            * Disable Fast Refresh
            * Debug Remote JS
            * Show Performance Monitor
            * Show Element Inspector
```
clicked on the `Debug Remote JS` get this 2ns screen. A new chrome editor, **React Native Debugger** will be up in Chrome tap.  
Open the Developer tool via right-click on screen > Inspect >
Sources >  debuggerWorker js > Users/... > select any of the code files, eg Row.js, App.js ...

.12 Using Chrome Dev Took. to determine firstName and lastName   
AddContactForm.js, to check if splited names a valid name
``` jsx
  validateForm = () => {
    const names = this.state.name.split(' ') // .12
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && names.length >=2) {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }
```
To debug, via **breakpoints** for stepping thru the codes.  
Right click for `inspect` to bring out DevTool's screen, > Sources> AddContactForm.js> clicked at line number to set BreakPoint.
As soon as typing input into the device, it trigger the line.   
Check on the **Call Stack**, and **Scope** see where the code from.
We can `Resume script ...`, `Step over ...`, `Step into ...`,  

AddContactForm.js, names[0], names[1]
```
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && names.length >=2 && names[0] && names[1]) {
```
:exclamation: :remember: to click off the `Debug Remote JS` get this 2ns screen to stop debug.

>> :disappointed: :tired_face: Not easy to use. once hang on my macbook during background update.


[:top: Top](#top)
[1:08:59]

##### console debug 
create `console.log()`:   
on `Run in Web browser` check from the chrome console.  :+1:   
on LAN, running in device, check from `Expo Dev Tool` > device, or check from Terminal.   

.13 AddContactsForm.js
``` jsx
  validateForm = () => {
    console.log(this.state) // .13
```
circular JSON   
But what happens if that object is pretty complicated?
Than need to debug in Chrome Dev
``` jsx
  state = {
    name: '',
    phone: '',
    isFormValid: false, /* .03b */
    //this: this,  /* circular JSON .13 */ need to remove after demo
  }
```
myNote: 
Chrome Developer Tool, on the web simulator, > source > can create BreakPoint to pause, step.

[:top: Top](#top)
### React Native Inspector
- Analogous to the Chrome element inspector
- Allows you to inspect data associated with elements, such
as margin, padding, size, etc.
- Does not allow you to live-edit elements

What happens if the bug is in the layout?   
.14 suppose to center, but is not
``` jsx
  container: {
    // flex: 1, .14
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center' // .06 .14
  },
```
The InputText at the top like it was at the beginning. 
And say now we want to try to get it to the center.

:+1: Toggle Element Inspector, *shake* the device to bring 2nd screen, select the **Show Element Inspector**, tap the **Inspect**.    
great tool to inspect the layout.
``` jsx
    flex: 1, .14
```

[:top: Top](#top)
[1:18:25]
### react-devtools
- “Inspect the React component hierarchy, including
component props and state.”
- Install with `npm install -g react-devtools`
- Run with `react-devtools`
- Allows us to make live-edits to style, props, etc.
* https://github.com/facebook/react-devtools

.15 probably need to install. I yet to install...
```
    $ npm install -g react-devtools
    ...
    $ react-devtools
```
mynote: need to run with the simulator. Ref:  https://www.npmjs.com/package/react-devtools

Great tool!  
So this is all around great tool for inspecting state, setting state, making
sure things happen when you set state.
You can go ahead and inspect style and go ahead and quickly prototype,
so that you don't have to type all of your style into your text editor.

So how did we get React dev tools onto our computer?


[:top: Top](#top)
### External Libraries
- Libraries are code written outside the context of your
project that you can bring into your project
- Since React Native is just JavaScript, you can add any
JavaScript library
- Install using 'npm install <library>'
    - Use the --save flag for npm@"<5"
    - Use the -g flag to install things globally
- Import into your project
    - import React from 'react'

The way you that you install these things
is by using NPM, or Node Package Manager.

` $ npm --version`

Row.js
``` jsx
import PropTypes from 'prop-types'
...
Row.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
}

export default Row
```
installing prop-types - to illustrate **npm install** 
```
Ts-MacBook-Pro:exercise twng$ npm install prop-types
```
package.json, now it shown
``` json
   {
     "main": "node_modules/expo/AppEntry.js",
     "scripts": {
       "start": "expo start",
```
[:top: Top](#top)

---
Source Code
---
####  before/AddContactForm.js
``` jsx
import React from 'react'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import Constants from 'expo-constants'; //import {Constants} from 'expo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  handleNameChange = name => {
    this.setState({name})
  }

  handlePhoneChange = phone => {
    this.setState({phone})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleNameChange}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handlePhoneChange}
          placeholder="Phone"
        />
        <Button title="Submit" />
      </View>
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
    if (this.state.showForm) return <AddContactForm />
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
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const styles = StyleSheet.create({
  row: {padding: 20},
})

const Row = props => (
  <View style={styles.row}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </View>
)

export default Row
```
[:top: Top](#top)

####  before/SectionListContacts.js
``` jsx
import React from 'react'
import {SectionList, Text} from 'react-native'
import PropTypes from 'prop-types'

import Row from './Row'

const renderItem = ({item}) => <Row {...item} />

const renderSectionHeader = ({section}) => <Text>{section.title}</Text>

const SectionListContacts = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})

  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    data: contactsByLetter[letter],
    title: letter,
  }))

  return <SectionList sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />
}

SectionListContacts.propTypes = {
  contacts: PropTypes.array,
}

export default SectionListContacts
```
[:top: Top](#top)

####  before/contacts.js
``` jsx
const NUM_CONTACTS = 1; //was 100

const firstNames = ['Emma','Noah','Olivia','Liam','Ava','William','Sophia','Mason','Isabella','James','Mia','Benjamin','Charlotte','Jacob','Abigail','Michael','Emily','Elijah','Harper','Ethan','Amelia','Alexander','Evelyn','Oliver','Elizabeth','Daniel','Sofia','Lucas','Madison','Matthew','Avery','Aiden','Ella','Jackson','Scarlett','Logan','Grace','David','Chloe','Joseph','Victoria','Samuel','Riley','Henry','Aria','Owen','Lily','Sebastian','Aubrey','Gabriel','Zoey','Carter','Penelope','Jayden','Lillian','John','Addison','Luke','Layla','Anthony','Natalie','Isaac','Camila','Dylan','Hannah','Wyatt','Brooklyn','Andrew','Zoe','Joshua','Nora','Christopher','Leah','Grayson','Savannah','Jack','Audrey','Julian','Claire','Ryan','Eleanor','Jaxon','Skylar','Levi','Ellie','Nathan','Samantha','Caleb','Stella','Hunter','Paisley','Christian','Violet','Isaiah','Mila','Thomas','Allison','Aaron','Alexa','Lincoln']

const lastNames = ['Smith','Jones','Brown','Johnson','Williams','Miller','Taylor','Wilson','Davis','White','Clark','Hall','Thomas','Thompson','Moore','Hill','Walker','Anderson','Wright','Martin','Wood','Allen','Robinson','Lewis','Scott','Young','Jackson','Adams','Tryniski','Green','Evans','King','Baker','John','Harris','Roberts','Campbell','James','Stewart','Lee','County','Turner','Parker','Cook','Mc','Edwards','Morris','Mitchell','Bell','Ward','Watson','Morgan','Davies','Cooper','Phillips','Rogers','Gray','Hughes','Harrison','Carter','Murphy']

// generate a random number between min and max
const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

// generate a name
const generateName = () => `${firstNames[rand(firstNames.length - 1)]} ${lastNames[rand(lastNames.length - 1)]}`

// generate a phone number
const generatePhoneNumber = () => `${rand(999, 100)}-${rand(999, 100)}-${rand(9999, 1000)}`

// create a person
const createContact = () => ({name: generateName(), phone: generatePhoneNumber()})

// compare two contacts for alphabetizing
export const compareNames = (contact1, contact2) => contact1.name > contact2.name

// add keys to based on index
const addKeys = (val, key) => ({key, ...val})

// create an array of length NUM_CONTACTS and add keys
export default Array.from({length: NUM_CONTACTS}, createContact).map(addKeys)

```
[:top: Top](#top)

####  after/AddContactForm.js
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

```
[:top: Top](#top)

####  after/App.js
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

####  after/Row.js
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

####  after/SectionListContacts.js
Files ./after/SectionListContacts.js and ./before/SectionListContacts.js are identical

####  after/contacts.js
Files ./after/contacts.js and ./before/acontacts.js are identical

[:top: Top](#top)

---
myNote
---
### Debugging
##### Chrome Developer Tool
myNote: on the web simulator, > source > create BreakPoint to pause, step > check at *Scope Local*.


##### console debug 
on `Run in Web browser` check from the chrome console.  :+1:
on run in LAN device, check from Expo Dev Tool device, or Terminal.  

##### console.log(this.state)
try to inplement at app.js
``` jsx
  render() {
    console.log('mylog_app: ', this.state)
    if (this.state.showForm) return <AddContactForm onSubmit={this.addContact}/>
    return (
```
Snack's log return, for contacts.js's NUM_CONTACTS = 2:
```
Chrome: mylog_app:
    ▼{showContacts:true,showForm:false,contacts:[…]}
    showContacts:true
    showForm:false
    ▼contacts:[{…},{…},{…}]
        ►0:{key:0,name:"Emma Davis",phone:"459-713-9593"}
        ►1:{key:1,name:"Ella Williams",phone:"593-330-8816"}
        ►2:{name:"Test",phone:"1231231231",isFormValid:true}
        length:3
        ...
```
[:top: Top](#top)

##### issues on:   
` VirtualizedList: missing keys for items, make sure to specify a key or id property on each item ...`.   
resolved. but `Warning: Encountered two children with the same key`
``` jsx
    handleSubmit = (key) => {
      if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3) {
        this.props.onSubmit({ key: key, ...this.state})
      }
    } // .01
```
    or
``` jsx
    handleSubmit = (key) => {
      this.props.onSubmit({ key: key, ...this.state})
    } // my
```
atleast the device not showing of yellow warning.

#### Git branch 06_UserInputDebugging
```
    Ts-MacBook-Pro:cs50m twng$ cat .gitignore
    .DS_Store
    /expo-app
    .gitignore
    Ts-MacBook-Pro:cs50m twng$ git branch -v
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push -u origin 06_UserInputDebugging
```
checked on github, https://github.com/alvinng222/cs50m/tree/06_UserInputDebugging

[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)  
back to previous:  [05_ListsUserInput](https://github.com/alvinng222/cs50m/tree/05_ListsUserInput).   
continue to next:  [07_Navigation](https://github.com/alvinng222/cs50m/tree/07_Navigation).

---
