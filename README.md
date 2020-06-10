Lists, User Input
===
[top]: topOfThePage

lecture: http://video.cs50.net/mobile/2018/spring/lectures/4

slide: http://cdn.cs50.net/mobile/2018/spring/lectures/4/lecture4.pdf
- [contacts.js](#contactsjs)
- [Lists](#lists)
- [ScrollView](#scrollview)
- [FlatList](#flatlist)
- [SectionList](#sectionlist)
- [User Input](#user-input)

[**Source Code**](#source-code)
files: src4.zip

~/cs50m/src4/before/ $ ls -1.      
before/...
  [App.js](#beforeappjs)
  [contacts.js](#beforecontactsjs)
.    
after/...
  [AddContactForm.js](#afteraddcontactformjs)
  [App.js](#afterappjs)
  [FlatListContacts.js](#afterflatlistcontactsjs)
  [Row.js](#afterrowjs)
  [ScrollViewContacts.js](#afterscrollviewcontactsjs)
  [SectionListContacts.js](#aftersectionlistcontactsjs)
  contacts.js

[**exercises 4**](https://github.com/alvinng222/cs50m/tree/exercises-4)  

[**myNote**](#mynote)

---

### Lists
- In web, browsers will automatically become scrollable for
content with heights taller than the window
- In mobile, we need to do that manually
  - ScrollView
  - ListView (deprecated)
  - FlatList, SectionList

### ScrollView
- The most basic scrolling view
- Will render all of its children before appearing
- To render an array of data, use .map()
  - Components in an array need a unique key prop
- https://facebook.github.io/react-native/docs/scrollview.html

### contacts.js 
[before/contacts.js](#beforecontactsjs).   
Generate a bunch of random contacts. It pulls from array of firstname and secondname.  
Use random to generate the sequence of names,   
and generate with random phone numbers.   
compareNames: to compare a couple of names.   
addKeys: `const addKeys = (val, key) => ({key, ...val})` shorthand for     
`const addKeys = (val, key) => ({key: key, ...val})`, 
to concatenate two new array's immutably.  
For instance, function of a contact and a key.
``` jsx
const addKeyToContact = (contact, key) => ({
  key: key,
  name: contact.name,
  phone: contact.phone,
})
```
object destructing, we do dot dot dot .. actually take all the key value pairs of contact
``` jsx
const addKeyToContact = (contact, key) => ({
  key: key,
  ...contact,
})
```
see others [arrow notation](#arrow-notation)

`export default Array.from({length: NUM_CONTACTS}, createContact).map(addKeys)`.   
It takes another argument.   
length: NUM_CONTACTS, shorthand for create an empty array of length and number,

see [Array.from()](#arrayfrom)

**App.js** from [before/App.js](#beforeappjs)
```jsx
import * as React from 'react'; // * was diff
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'; //* was diff

import contacts from './contacts'
```
1. state, toggleContacts properties binding was acutually shorthand for `constructor` with `this.`
Since we're not actually doing anything in the constructor other
than calling the super, then why not just use the class properties.  
Toggle contacts is a function, all it does is it toggles the show contacts
Boolean, which we store in the `state`.
``` jsx
export default class App extends React.Component {
  constructor(props) { // * 1.
    super(props)
    this.state = {
      showContacts: false,
    }
    
    this.toggleContacts = () => { //* 1.
      this.setState(prevState => ({showContacts: !prevState.showContacts}))
    }
  }
```
back to
``` jsx
export default class App extends React.Component {
  state = {
    showContacts: false,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }
```
**add** in View, Text & map for the import contacts array
``` jsx
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <View>
          {contacts.map(contact => (
            <Text>{contact.name}</Text>
          ))}
        </View>
```
[17:20] it start to see contacts.    

my note: work too, if changed to my data in my [contacts.js](#myContacts) 

2. map.   
Replacing `View` with `ScrollView`,

3. The warning at bottom of the mobile screen that need an unique key.  
In contacts.js, create an array of length NUM_CONTACTS and assign key.   
we pass React a key for each of the things in the array,

... ScrollView ...
- To render an array of data, use **.map()**
  - Components in an array need a unique **key prop**

App.js.  
``` jsx
        <ScrollView>
          {contacts.map(contact => (
            <Text key={contact.key}>{contact.name}</Text> // 3.
          ))}
        </ScrollView>
```
[:top: Top](#top)

4. displaying phone number, adding `View` and `Text` for phone
``` jsx
        <ScrollView>
          {contacts.map(contact => (  // 3. 4.
            <View key={contact.key}> 
              <Text>{contact.name}</Text>
              <Text>{contact.phone}</Text>
            </View>
          ))}
        </ScrollView>
```
[11:40]
   
5. React allow us to break into smaller component,
we now have a stateless functional component, and looking at `props`, & passing values to view:
``` jsx 
const Row = props => (  // .5
  <View key={props.key}> 
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </View>
)

export default class App extends React.Component {
...
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <ScrollView>
          {contacts.map(contact => <Row key={contact.key} name={contact.name} phone={contact.phone} />)}
        </ScrollView> 
```
>> warning: "Row":'key' is not a prop ...

can use **dot dot dot**, short cut
``` jsx
        <ScrollView>
          {contacts.map(contact => <Row {...contact} />)}
        </ScrollView> 
```
And so if we save and run that, we see a `key` is not a prop.
the key already passed in the dot dot dot.
``` jsx
const Row = props => (
  <View> 
``` 
  
6. break this apart and move `const row`
and add `import Row from './Row'` into `App.js`
 
Row.js, new file
``` jsx
import * as React from 'react';
import { View, Text} from 'react-native'

const Row = props => (  // .5 .6
  <View> 
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </View>
)

export default Row
```
and add `StyleSheet` to as in
[Row.js](#afterrowjs) .

[:top: Top](#top)

9. App.js, toggle on-off the contacts list, a few ways, to check state **`if (this.state.showContacts) {`**
``` jsx
  render() {           // 3. 4. .5 .9
    if (this.state.showContacts) {
      return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <ScrollView>
          {contacts.map(contact => <Row {...contact} />)}
        </ScrollView> 
      </View>
      )
    } //** else **
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
      </View>
    );
  }
```
change to short hand for these, use **ternary**. 
if `this.state.showContacts` is `true` use this, otherwise use the other.  
App.js
``` jsx
    render() {
      return (
        <View style={styles.container}>
          <Button title="toggle contacts" onPress={this.toggleContacts} />
          {this.state.showContacts ? ( 
            <ScrollView>
              {contacts.map(contact => <Row {...contact}/>)}
            </ScrollView>
          ) : null
          }
        </View>
      );
    }
```
[tenary](#tenary)
``` jsx
        {this.state.showContacts ? (
          ...
        ) : null
        }
```
and there is a better way, is to useing **and** :
``` jsx
        {this.state.showContacts && (
          ...
        )}
```
[:top: Top](#top)

11. App.js. ScrollView revised
``` jsx
import * as React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import contacts from './contacts'
import Row from './Row'  // .7

export default class App extends React.Component { // .1 .2
  state = {
    showContacts: false,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  render() {           // 3. 4. .5 .9 .10 .11
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && (
        <ScrollView>
          {contacts.map(contact => <Row {...contact} />)}
        </ScrollView> 
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
But now it taking too long too render, when we toggle

[:top: Top](#top)
### FlatList
- A performant scrolling view for rendering data
- “Virtualized:” only renders what’s needed at a time
  - Only the visible rows are rendered in first cycle
  - Rows are recycled, and rows that leave visibility may be unmounted
- Pass an array of data and a renderItem function as
props
- Only updates if props are changed
  - Immutability is important
- https://facebook.github.io/react-native/docs/flatlist.html

Pass an array of **data** and a **renderItem** function as
props. and pass down these **item** .


12. FlatList declare all the rows as children, and pass as props. **replaced** the ScrollView.
``` jsx
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
...
        {this.state.showContacts && (
            <FlatList //.12
              renderItem={obj => <Row {...obj.item} />}
              data={contacts}
            />
        )}
```
Now it render very instance.

**App.js FlatList** revised
``` jsx
import * as React from 'react';
import { Button, FlatList, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import contacts from './contacts'
import Row from './Row'

export default class App extends React.Component {
  state = {
    showContacts: false,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && (
          <FlatList
            renderItem={obj => <Row {...obj.item} />}
            data={contacts}
          />
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
#### .sort
13. To organise... sort in alphabetically, using   
**sort**, which will take a function that compare two values, and sort in increasing order.

add in `compareNames` from contacts.js.     

we need **`states`** in our contacts
``` jsx
import contacts, {compareNames} from './contacts'  //.13
...
  state = {
    showContacts: false,
    contacts: contacts, // .13
  }
...
  sort = () => { // .13
    this.setState(prevState => ({
      contacts: prevState.contacts.sort(compareNames),
      }))
  }
  
  // item: { name: String, phone: String, key: number }
  renderItem = obj => <Row {...(obj.item)} />
  
  render() {           // 3. 4. .5 .9 .10 .11 .13
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="sort" onPress={this.sort} />
        {this.state.showContacts && (
            <FlatList //.12
              renderItem={this.renderItem} // .13B
              data={this.state.contacts} // .13
            />
        )}
```
it did't sort at first, but toggle again, it sorted! Is a strange bug!! because    
FlatList ... Only updates if props are changed,  Immutability is important

**immutability** is the concept bywhich, if we are given some sort of object/value 
that value is guaranteed to not bemutated.  
If we want to change, that value need to be created a new value.

so to create a new array.  
Short-cut way, by passing brackets and dot dot dot, ie   
for every single value in prestate dot contacts clone that into new array.
``` jsx
  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames),
    })) 
  }
```
 
[57:44] Snack: unable to sort. Expo: work fine for Andriod phone, unable to sort that on web browser.

renderItem({item, index, separators});   
`renderItem = (obj) => <Row {...(obj.item)} />` short hand:    
`renderItem = ({item}) => <Row {...item} />`   
`renderItem = obj => <Row name={obj.item.name} phone={obj.item.phone} />`



[:top: Top](#top)
[1:04:14] half time
### SectionList
- Like FlatList with additional support for sections
- Instead of data prop, define sections
  - Each section has its own data array
  - Each section can override the renderItem function with their own
custom renderer
- Pass a renderSectionHeader function for section
headers
- https://facebook.github.io/react-native/docs/sectionlist.html

15. Instead of data prop, we define sections. Each section has its own data array.  
Unlike in FlatList where we had array called data,   
**`SectionList`** replace with `FlatList`, and add 'RenderSectionHeader'

App.js, no change, still work like FlatList
``` jsx
import { Button, SectionList, ScrollView, StyleSheet, Text, View } from 'react-native'; // .15
...
        {this.state.showContacts && (
          <SectionList
            renderItem={this.renderItem}
            sections={[{
              data: this.state.contacts,
            }]} 
          />  
        )}  
```
App.js, to display the section header 'A'
``` jsx
  renderItem = obj => <Row {...obj.item} />
  
  renderSectionHeader = obj => <Text>{obj.section.title}</Text>

  render() {
    ...
        {this.state.showContacts && (
            <SectionList //.12 .15
              renderItem={this.renderItem} // .13B
              renderSectionHeader={this.renderSectionHeader}
              sections={[{
                title: 'A',
                data: this.state.contacts, // .13
              }]}
            />
        )}
```
[:top: Top](#top) [1:09:10]

Created new file ContactsList.js. Cut and moved the SectionList from App.js to this new file.

16. To keep track of all these props. There's that package call [`PropTypes`](https://github.com/alvinng222/cs50m/tree/04_ReactNative#proptypes).
  This package allow us to self document things.   
  if don't remember what a prop should look like, like what data type is it,
  we can actually use PropTypes to one, check at runtime
  are we passing the correct props, and two,
  to just document for us so that when we open a new file, we know,
  oh, we should be passing this component, these particular [props](https://github.com/alvinng222/cs50m/tree/03_ReactPropsState#props).


ContactsList.js - new file, with PropTypes
``` jsx
import React from 'react';  // .16
import {SectionList} from 'react-native'
import PropTypes from 'prop-types'

const ContactsList = props => (
  <SectionList //.12 .15
    renderItem={props.renderItem} // .13B
    renderSectionHeader={props.renderSectionHeader}
    sections={[{
      title: 'A',
      data: props.contacts, // .13
    }]}
  />
)

ContactsList.PropTypes = {
  renderItem: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  contacts: PropTypes.array,
}

export default ContactsList
```
At App.js ... <ContactsList ... />
``` jsx
import ContactsList from './ContactsList' // .15
...
  render() {           // 3. 4. .5 .9 .10 .11 .13 .16
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="sort" onPress={this.sort} />
        {this.state.showContacts && <ContactsList renderItem={this.renderItem} 
          renderSectionHeader={this.renderSectionHeader}
          contacts={{}}
          />}
      </View>
    );
  }
```
we passed now nothing . And shown PropTypes error. ie PropTypes is working.
>> Warning: Failed prop type:

App.js 
``` jsx
            contacts={this.state.contacts} 
```


[:top: Top](#top)

17. `renderSectionHeader` just some text, doesn't have anything to do with the other logic it has on js. 
And so need a better place to implement this logic.

for one, maintainability, two, readability, and three, scalability.

renderItem is ContactsList need to care about.

Moved from App.js to ContactsList.js

ContactsList.js add in render...
``` jsx
import propTypes from 'prop-types'
renderItem = obj => <Row {...obj.item} />
renderSectionHeader = obj => <Text>{obj.section.title}</Text>
```
App.js removed render...
``` jsx
//  renderItem = obj => <Row {...obj.item} />
  
//  renderSectionHeader = obj => <Text>{obj.section.title}</Text>
...
        {this.state.showContacts && (
          <ContactsList
            // renderItem={this.renderItem} // .13B
            // renderSectionHeader={this.renderSectionHeader}
            contacts={this.state.contacts}  // .13
          />  
        )}  
```
or
``` jsx
...
        {this.state.showContacts && <ContactsList contacts={this.state.contacts} 
```

ContactsList.js with Row, and removed some render PropTypes
``` jsx
import React from 'react'; 
import {SectionList, Text } from 'react-native' // .17
import PropTypes from 'prop-types'

import Row from './Row' // .17

const renderItem = (obj) => <Row {...(obj.item)} /> 
  
const renderSectionHeader = obj => <Text>{obj.section.title}</Text>

const ContactsList = props => (
  <SectionList
    renderItem={renderItem} // .17
    renderSectionHeader={renderSectionHeader} // .17
    sections={[{
      title: 'A',
      data: props.contacts, // .13
    }]}
  />
)

ContactsList.PropTypes = { // .17
  contacts: PropTypes.array,
}

export default ContactsList
```

the code will be much neater. For Apps, ContactsList and Row.

For projects in the future,
can start to use these paradigms where you have a big complex problem,
can break it down into smaller components, such that each one is very maintainable.
Each one is very readable.

[:top: Top](#top)
[1:21:34]

To section out the first letter, and impliment that algorithm.    
go throuh the array, turn that into an object where the keys in the object
are the first letter of the values in that....
of all of the contacts with that letter, and turn that into this shape, section, data.   
[reduce()](https://github.com/alvinng222/cs50m/tree/02_JS_ES6#first-class-functions)

18. **ContactsByLetter**, start with empty object:
``` jsx
  const contactsByLetter = props.contacts.reduce((obj.contact) => {

  }, {})
```
So `Object.keys` takes all of the keys of an object and in array.

So grab its name, look at it's first letter and uppercase it.
So now, we've extracted the first letter of each contact.
``` jsx
  const firstLetter = contact.name[0].toUpperCase()
```

So we want to return some sort of object where
it maintains all the previous keys of object
and appends this particular contact to the key, which
matches it's first letter.
to clone all of the old keys of an object?
``` jsx
    return {
      ...obj,

    }
```
And so you can wrap it in brackets and just like, `[0]`,
this will evaluate zero `[0]` to become a string.
This `[firstLetter]` will evaluate this to become the key.
And the array `[]` is going to be all of the keys that used to be in that object.    
`[firstLetter]: [...obj[firstLetter]],`. We've just cloned that object.    

`[firstLetter]: [...obj[firstLetter], contact],`.    
And so how are we going to actually add that contact to this array?   
And so we override it with a new array where that new array is the old array `...obj[firstLetter]`,
but add that contact `contact`.

So object dot keys takes all of the keys of an object and in array.
`const sections = Object.keys(`
``` jsx
  const sections = Object.keys(contactsByLetter).sort().map(
    letter => ({
      title: letter,
      data: contactsByLetter[letter],
    })
  )
```



[33:42]
ContactList.js final revised with only contact
``` jsx
import React from 'react';  // .16
import {SectionList, Text} from 'react-native'

import Row from './Row'
const renderItem = (obj) => <Row {...(obj.item)} /> 
const renderSectionHeader = obj => <Text>{obj.section.title}</Text>

const ContactsList = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {}) // .18

  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    title: letter,
    data: contactsByLetter[letter],
  })) // .18

  return (
    <SectionList //.12 .15
      renderItem={renderItem} // .13B .17
      renderSectionHeader={renderSectionHeader} // .17
      sections={sections} // .18
    />
  )
}

export default ContactsList
```
check at [myNote](#mynote) for 
**App.js - reduced** to without sort.

[40:47]

To add new friend...

### User Input
- Controlled vs uncontrolled components
  - Where is the source of truth for the value of an input?
- React recommends always using controlled components
- Pass value and onChangeText props
- https://facebook.github.io/react-native/docs/textinput.htm

[43:30]
You have to use the React virtual Dom, which
will then write to the actual Dom.
And so in order to add contacts, we agreed
that we needed some sort of way, some sort of page to do so.   

[:top: Top](#top)

19. **AddContactForm.js** new file
``` jsx
import React from 'react'
import {Button, TextInput, View} from 'react-native'

export default class AddContactForm extends React.Component {
  render () {
    return (
      <View>
        <TextInput />
        <TextInput />
        <Button title="Add Contact"/>
      </View>
    )
  }
}
```
so we can state that we're expecting a prop called add contact.

But how are we going to keep track of the text inputs? Those values?
And so as you see on the slide, they expect two props.

20. And how do you update that value? So a function called, unchanged text.
``` jsx
import PropTypes from 'prop-types'

export default class AddContactForm extends React.Component {
  static propTypes = {
    addContact: PropTypes.func,
  }
  
  state = {
    name: '',
    phone: '',
  }  
...
        <TextInput value={this.state.name}/>
        <TextInput value={this.state.phone}/>
```
App.js revised for Add Contact and toggle, 
``` jsx
...
import AddContactForm from './AddContactForm' // .20

export default class App extends React.Component {
  state = { 
    showContacts: false,
    contacts: contacts, // .13
    showForm: false, // .20
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  toggleForm = () => {
    this.setState(prevState => ({showForm: !prevState.showForm}))
  } // .20 

  render() {           // 3. 4. .5 .9 .10 .11 .13 .16 .19
    if (this.state.showForm) return <AddContactForm /> /*.20*/
    
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="Add Contacts" onPress={this.toggleForm} />
          {this.state.showContacts && (<ContactsList contacts={this.state.contacts} />)}
      </View>
    );
  }
}
...
```
shown by clicking Add Contact, didn't next action.

AddContactForm.js add styles, type into nothing happen.
``` jsx
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native'; //.21
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
  }
}) //.21
...
      <View style={{paddingTop: 20}}>
         <TextInput style={styles.input} value={this.state.name} />
         <TextInput style={styles.input} value={this.state.phone}/>
```

.22 AddContactForm.js revised with HandleChange.   
``` jsx
...

export default class AddContactForm extends React.Component {
  static PropTypes = {
    addContact : PropTypes.func,
  }

  state = {
    name: '',
    phone: '',
  } // .20

  handleNameChange = name => {
    this.setState({name})
  } // .22

  handlePhoneChange = phone => {
    this.setState({phone})
  } //.22

  render() {
    return (
      <View style={{paddingTop: 20}}>
        <TextInput 
          style={styles.input} 
          onChangeText={this.handleNameChange} // .22
          value={this.state.name} 
        />
        <TextInput 
          style={styles.input} 
          value={this.state.phone} 
          onChangeText={this.handlePhoneChange} // .22
          keyboardType = 'numeric' // .23
        />
        <Button title="Add Contact" />
      </View>
    )
  } //.20
}
```

my final files:
```
Ts-MacBook-Pro:exercise twng$ ls *.js
AddContactForm.js	ContactsList.js		babel.config.js
App.js			Row.js			contacts.js
```
---
[:top: Top](#top)

---
Source Code
---
####  before/App.js
``` jsx
import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Constants} from 'expo'

import contacts from './contacts'

export default class App extends React.Component {
  state = {
    showContacts: false,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
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

---
[:top: Top](#top)
####  before/contacts.js
``` jsx
const NUM_CONTACTS = 1000

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

// create an array of length NUM_CONTACTS and alphabetize by name
export default Array.from({length: NUM_CONTACTS}, createContact).map(addKeys)
```
---

---
[:top: Top](#top)
####  after/AddContactForm.js
``` jsx
import React from 'react'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import {Constants} from 'expo'

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
---
[:top: Top](#top)
####  after/App.js
``` jsx
import React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Constants} from 'expo'

import contacts, {compareNames} from './contacts'
import ScrollViewContacts from './ScrollViewContacts'
import FlatListContacts from './FlatListContacts'
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
---
[:top: Top](#top)
#### after/FlatListContacts.js
``` jsx
import React from 'react'
import {FlatList} from 'react-native'
import PropTypes from 'prop-types'

import Row from './Row'

const renderItem = ({item}) => <Row {...item} />

const FlatListContacts = props => (
  <FlatList renderItem={renderItem} data={props.contacts} />
)

FlatListContacts.propTypes = {
  contacts: PropTypes.array,
}

export default FlatListContacts
```
---
[:top: Top](#top)
####  after/Row.js
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
---
[:top: Top](#top)
####  after/ScrollViewContacts.js
``` jsx
import React from 'react'
import {ScrollView} from 'react-native'
import PropTypes from 'prop-types'

import Row from './Row'

const ScrollViewContacts = props => (
  <ScrollView>
    {props.contacts.map(contact => <Row {...contact} />)}
  </ScrollView>
)

ScrollViewContacts.propTypes = {
  contacts: PropTypes.array,
}

export default ScrollViewContacts
```
---
[:top: Top](#top)
####  after/SectionListContacts.js
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
---

[:top: Top](#top)
####  after/contacts.js
Files ./after/contacts.js and ./before/acontacts.js are identical
``` jsx
...
// create an array of length NUM_CONTACTS and add keys
```
---


[:top: Top](#top)

---
myNote
---
### my expo.io/ snacks: https://expo.io/snacks/@awesome2/. 

If using **Snack**, replace
``` jsx
import {Constants} from 'expo'
```
with
```jsx
import Constants from 'expo-constants';
```

#### arrow notation
``` jsx
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(mat => mat.length));
// expected output: Array [8, 6, 7, 9]

// ** Shorter functions ** //
console.log(materials.map(function(mat){ return mat.length; })); // Array [8, 6, 7, 9]
console.log(materials.map(mat => { return mat.length; })); // Array [8, 6, 7, 9]
console.log(materials.map(mat => mat.length));
console.log(materials.map(({length: mat}) => mat)); // Array [8, 6, 7, 9]
console.log(materials.map(({length}) => length));   // Array [8, 6, 7, 9]
```
in this learning of contacts
``` jsx
          {contacts.map(contact => (
            <Text>{contact.name}</Text>
          ))}
```

#### tenary
``` jsx
        {this.state.showContacts ? (
          ...
        ) : null
        }
```
and there is a better way, is to useing **and** :
``` jsx
        {this.state.showContacts && (
          ...
        )}
```

#### Array.from()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
>> Syntax: Array.from(arrayLike [, mapFn [, thisArg]])
``` jsx
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```
What is map? from 02_JS_ES.md
``` jsx
function addOne(num) { return num + 1 }
const x = [0,1,2,3]
console.log(map(x, addOne))     // [ 1, 2, 3, 4 ]
```
App.js - I reduced to without sort.
``` jsx
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import contacts from './contacts'
import ContactsList from './ContactsList'

export default class App extends React.Component {
  state = { contacts: contacts, }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
          {this.state.showContacts && (<ContactsList contacts={this.state.contacts} />)}
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
##### myContacts
contacts.js
``` jsx
const NUM_CONTACTS = 2

const contacts = [
  {
    name: 'Chalie',
    phone: '1234567890', },
  {
    name: 'Benson',
    phone: '13123123123'},
  {
    name: 'Ali',
    phone: '1231313312', },
]

// compare two contacts for alphabetizing
export const compareNames = (contact1, contact2) => contact1.name > contact2.name

// add keys to based on index
const addKeys = (val, key) => ({key, ...val})

// create an array of length NUM_CONTACTS and alphabetize by name
export default Array.from(contacts).map(addKeys)
```

[:top: Top](#top)

---

#### Git branch: 05_ListsUserInput
```
    Ts-MacBook-Pro:cs50m twng$ git branch -v
    Ts-MacBook-Pro:cs50m twng$ git status
      On branch master
    Ts-MacBook-Pro:cs50m twng$ git branch 05_ListsUserInput
    Ts-MacBook-Pro:cs50m twng$ git checkout 05_ListsUserInput
    Ts-MacBook-Pro:cs50m twng$ git status
      On branch 05_ListsUserInput
    Ts-MacBook-Pro:cs50m twng$ cat .gitignore
    /exercise
    .DS_Store
    .gitignore  
```
Git commit & push
```
    Ts-MacBook-Pro:cs50m twng$ ls
      <files.js>
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push origin 05_ListsUserInput
checked on github,
```

#### expo cli
```
Ts-MacBook-Pro:cs50m twng$ expo init exercise
To run your project, navigate to the directory and run one of the following npm commands.

- cd exercise
- npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- npm run android
- npm run ios
- npm run web
Ts-MacBook-Pro:cs50m twng$ 
Ts-MacBook-Pro:cs50m twng$ cd exercise
Ts-MacBook-Pro:exercise twng$ npm run web
```
expo's console on screen of DEVICE 

---
#### vim
see https://github.com/alvinng222/cs50-mobile/blob/master/vimtutor.md

go to top of the page
```markdown
[top]: topOfThePage
[Go to top of the page](#top)
```

[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   
back to last branch: [04_ReactNative.md](https://github.com/alvinng222/cs50m/tree/04_ReactNative).    
continue to next branch: [06_UserInputDebugging](https://github.com/alvinng222/cs50m/tree/06_UserInputDebugging)   

---
