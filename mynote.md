myNote
---
CS50's MobileApp Development with React Native
===
* Installed App on mobile phone
* [to be revise at](#to-be-revise-at)
* [Good to remember](#good-to-remember)
* [**myQuickRef**](#myquickref)
  * [Git](#git)
  * [Expo Cli](#expo-cli)
  * [eslint prettier](#eslint-prettier)
  * [vim](#vim)
  * [debug](#debug)
  * [Terminal](#terminal)
  * [markdown.md](#markdownmd)
  * [myBookMarks](#mybookmarks)
* [learning](#learning)
  * [SimpleRedux](#simpleredux)
     * [reducer.js](#reducerjs)
     * [store.js](#storejs)
     * [store2.js](#store2js)
     * [store3.js](#store3js)

---
[top]: topOfThePage

## Installed App on mobile phone
* Unable to install stand alone App on mobile phone
* Only to install(publised) running apps via Expo Client on mobile phone.
### Some reference that tried:
#### Installed App on Andriod device 
- https://developer.android.com/training/basics/firstapp/creating-project
   - installed Andriod Studio  >> very slow for my Mac
- https://developer.android.com/training/basics/firstapp/running-app
   - set the device at Developer Option, with USb debugging.
   - after changed usb cable, it able to detect the device.
   - installed the project, 'My First App' in the device. :+1:

### published
https://github.com/alvinng222/cs50m/tree/12_Performance#mynote   
clicked on Expo>publish. 
https://expo.io/@awesome2/pomodoro-timer

```
INFO
17:01
Building JavaScript bundle: finished in 300ms.
ERROR
17:05
Could not get status from Metro bundler. connect ECONNREFUSED 127.0.0.1:19001
ERROR
17:05
Connecting to Metro bundler failed.
```
expo build:android -t apk

expo build:android -t app-bundle
```
Ts-MacBook-Pro:my-app twng$ expo build:android -t apk

Now we need to know your Android package (​https://expo.fyi/android-package​). You can change this in the future if you need to.

? What would you like your Android package to be named? com.atronee.pomodoro

Your Android package is now: com.atronee.pomodoro

Checking if there is a build in progress...

Accessing credentials for awesome2 in project pomodoro-timer
✔ Would you like to upload a Keystore or have us generate one for you?
If you don't know what this means, let us generate it! :) › Generate new keystore
Failed to generate Android Keystore, it will be generated on Expo servers during the build
keytool exited with non-zero code: 1
Error: keytool exited with non-zero code: 1
```
```
To use the “keytool” command-line tool you need to install a JDK.
Click “More Info…” to visit the Java Developer Kit download website.
```

### Some url links
https://github.com/alvinng222/cs50m/tree/12_Performance/before/pomodoro-timer

https://docs.expo.io/get-started/create-a-new-app/

https://developer.android.com/studio/command-line/adb

https://docs.expo.io/workflow/expo-cli/

https://docs.expo.io/distribution/building-standalone-apps/

```
Ts-MacBook-Pro:my-app twng$ exp build:android
We've built a brand new CLI for Expo!
Expo CLI is a drop in replacement for exp.
Install: npm install -g expo-cli
Use: expo --help
Read more: https://blog.expo.io/expo-cli-2-0-released-a7a9c250e99c
[17:53:23] Checking if current build exists...

[17:53:25] No currently active or previous builds for this project.

? Would you like to upload a keystore or have us generate one for you?
If you don't know what this means, let us handle it! :)
 false
[17:53:32] Publishing to channel 'default'...
[17:53:39] Building iOS bundle
[17:53:39] Error: connect ECONNREFUSED 127.0.0.1:19001
[17:53:39] Set EXPO_DEBUG=true in your env to view the stack trace.
Ts-MacBook-Pro:my-app twng$ 

```

### publish on web
https://github.com/alvinng222/cs50m/blob/13_Deploying_Testing/README.md#publishing-httpsexpoioawesome2pomodoro-timer


---
## to be revise at
#### SectionListContacts.js
Yet do figure out:  
https://github.com/alvinng222/cs50m/blob/05_ListsUserInput/after/SectionListContacts.js
``` jsx
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})
```
#### 05_ListsUserInput, issues yet to resoive:
```
VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor., 
```
i tries by adding key, but `Warning: Encountered two children with the same key`
```jsx
  handleSubmit = (key) => {
    this.props.onSubmit({ key: key, ...this.state})
  } // .01

  //handleSubmit = (key) => {
  //  this.props.onSubmit({key: key, name: this.state.name, phone: this.state.phone,})
  //} // .01
```
ref:https://github.com/alvinng222/cs50m/tree/05_ListsUserInput#contactsjs

#### 06UserInputDebuggingAfter - done

        $ npm install prop-types

App.js, & AddContactForm.js
If using **Snack**
```jsx
import Constants from 'expo-constants'; //import {Constants} from 'expo'
```
If use **ExpoCli** @ 38.0.8, for code [after/...](/after)   
``` jsx
import Constants from 'expo-constants'; //import {Constants} from 'expo' 
```

#### 07_Navigation - done
was.  
HTTP Methods.   
Unable to login. Access to fetch at 'http://localhost:8000/' has been block

### App running
Shown list of random contacts, shown `Icons`. 
Able to `Toggle Contacts`, `Add` contact.    
Clicked on the list, lead to next page of name and phone, and `Go To Random Contact`.

Code used from [after/...](/after), start from   
**ExpoCli** init to *bare* template,   
install of components:
``` jsx
$ npm install react-navigation@2.0.0 --save
$ npm install react-native-vector-icons --save
$ npm run web
```
Last workable,Jul10,'20, see [package.json](#afterpackagejson).       
Web: ok; 
iPhone: ok;

update after/package.json
remove git

        $ npm install prop-types

#### Lecture 10: Async Redux, Tools
was.  
Server error, unable to fetch
##### error running on device
``` console
00:38
Error: Duplicated files or mocks. Please check the console for more info
    at setModule (/Users/twng/cs50m/JUl06/node_modules/jest-haste-map/build/index.js:620:17)
    at workerReply (/Users/twng/cs50m/JUl06/node_modules/jest-haste-map/build/index.js:691:9)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async Promise.all (index 57)
```

### Pomodoro Timer
from [package.json bare](#packagejson-bare)

    Ts-MacBook-Pro:Jul09 twng$ npm install prop-types
    + prop-types@15.7.2


| [:top: Top](#top)  | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |

see https://github.com/alvinng222/cs50-mobile/blob/master/vimtutor.md


---
Good to remember
---
#### JS Arrow Function
https://github.com/alvinng222/cs50m/blob/02_JS_ES6/README.md#js-arrow-function

w3schools.com, same functions
```
    hello = function() {
      return "Hello World!";
    }
    
    // same as
    hello = () => "Hello World!";
    
    // With Parameters:
    hello = (val) => "Hello " + val;
```

#### Closure counter
2-iife.js
https://github.com/alvinng222/cs50m/tree/02_JS_ES6#2-iifejs
no node

#### React's ToDo list
todoApp4-react.js
https://github.com/alvinng222/cs50m/blob/03_ReactPropsState/README.md#steps-by-steps
on CodeSandBox.io 

#### arrow notation
https://github.com/alvinng222/cs50-mobile/blob/master/00_CS50m.md#arrow-notation
``` jsx
          {contacts.map(contact => (
            <Text>{contact.name}</Text>
          ))}
```

| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |

---
myQuickRef
---
Jul 16,'20, initial expo start, bare   
#### package.json bare
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
    "react": "~16.11.0",
    "react-dom": "~16.11.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-38.0.2.tar.gz",
    "react-native-web": "~0.11.7"
  },
  "devDependencies": {
    "@babel/core": "^7.10.5",
    "babel-preset-expo": "~8.1.0"
  },
  "private": true
}
```
``` console
Ts-MacBook-Pro:Jul09 twng$ ls -a
.			.gitignore		node_modules
..			App.js			package-lock.json
.expo			app.json		package.json
.expo-shared		assets			web-build
.git			babel.config.js
Ts-MacBook-Pro:Jul09 twng$ 
```
To divert App to another folder
``` jsx                     
import myApp from './05ListsUserInputAfter/App';
//import myApp from './AppMin';
export default myApp;

```

#### Node JS, on Windows
installed node, https://nodejs.org/en/
``` console
        cs50m $ node --version
        v12.18.0
        cs50m $ npm --version
        6.14.4
```
---

### Git
git basic commands: https://github.com/alvinng222/cs50m/tree/01_Javascript_src#git

#### Git branch <newBranchName>
``` console
    Ts-MacBook-Pro:cs50m twng$ git branch -v
    Ts-MacBook-Pro:cs50m twng$ git status
      On <???>
    Ts-MacBook-Pro:cs50m twng$ git branch <newBranchName>
    Ts-MacBook-Pro:cs50m twng$ git checkout <newBranchName>
    Ts-MacBook-Pro:cs50m twng$ git status
      On branch <newBranchName>
    Ts-MacBook-Pro:cs50m twng$ cat .gitignore
    /exercise
    .DS_Store
    .gitignore 
```
#### Git commit & push
``` console
    Ts-MacBook-Pro:cs50m twng$ ls
      <files.js>
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push -u origin <newBranchName>
checked on github, 
```
#### Git removing cached and files
``` console
    Ts-MacBook-Pro:cs50m twng$ git status
    On branch master
    Ts-MacBook-Pro:cs50m twng$ git help
    Ts-MacBook-Pro:cs50m twng$ git rm --cached *.*
    rm 'README.md'
```
#### Git others
``` console
     $ git diff
     $ git diff -staged
     $ git mv file_from file_to     // rename file

     $ git log                      // log of all commited
     $ git log --stat               // log of files recent commited
     $ git log --pretty=oneline     // show  commits in single line
     $ git remote -v                // checked all the url links
     $ git fetch <remote>           // to get data from remote
     $ git remote show origin       // show all remote tracks, pull & push
```
#### Git local update from remote
``` console
    $ git remote show origin
        02_JS_ES6             pushes to 02_JS_ES6            (local out of date)
    $ git checkout 02_JS_ES6
    $ git pull origin 02_JS_ES6
    From https://github.com/alvinng222/cs50m
     * branch            02_JS_ES6  -> FETCH_HEAD
    Updating c2e1e45..7bfd918
    Fast-forward
     README.md | 51 ++++++++++++++++++++++-----------------------------
     1 file changed, 22 insertions(+), 29 deletions(-)
    $ git remote show origin
        02_JS_ES6             pushes to 02_JS_ES6             (up to date)    
```
#### view changes not yet stage
``` console
    $ git diff
    diff --git a/.gitignore b/.gitignore
    index 37d82f6..e617da4 100644
    --- a/.gitignore
    +++ b/.gitignore
    @@ -1,3 +1,3 @@
     .DS_Store
    -/expo-app
    -.gitignore
    +node_modules/
    +package-lock.json 
```

#### collaborate -- to be edit
``` console
C:\Users\Iris\Desktop\GithubTutorial>git init
C:\Users\Iris\Desktop\GithubTutorial>git remote add origin https://github.com/NgHuiLingIris/PapaTest.git

C:\Users\Iris\Desktop\GithubTutorial>git add .
C:\Users\Iris\Desktop\GithubTutorial>git commit -m "First commit hi"
C:\Users\Iris\Desktop\GithubTutorial>git push -u origin master

C:\Users\Iris\Desktop\GithubTutorial>git checkout -b branch2
C:\Users\Iris\Desktop\GithubTutorial>git add .
C:\Users\Iris\Desktop\GithubTutorial>git commit -m "In new branch, command prompts
C:\Users\Iris\Desktop\GithubTutorial>git push origin branch2

antw@Mac-mini learnGit % git clone https://github.com/NgHuiLingIris/PapaTest.git
Cloning into 'PapaTest'...

```



| [:top: Top](#top)  | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |

---
#### snacks
my expo.io/ snacks: https://expo.io/snacks/@awesome2/.        

---
### Expo Cli
#### to run on iPhone or Andriod   
Ensure the following:
- Node Server is running and available on the same network.
- Node server URL is correctly set in AppDelegate.
- Wifi is enabled and connected to the same netowrk as the Node Server.

https://reactnative.dev/docs/running-on-device

#### expo terminal commands
```
 › Press a to run on Android device/emulator, or i to run on iOS simulator, or w to run on web.
 › Press c to show info on connecting new devices.
 › Press d to open DevTools in the default web browser.
 › Press shift-d to disable automatically opening DevTools at startup.
 › Press e to send an app link with email.
 › Press p to toggle production mode. (current mode: development)
 › Press r to restart bundler, or shift-r to restart and clear cache.
 › Press o to open the project in your editor.
 › Press s to sign out. (Signed in as @awesome2.)
```
#### to install expo:
https://github.com/alvinng222/cs50m/tree/04_ReactNative#install-expo-cli
```
    - re-start my mac
    - up Chrome, and Terminal
    - cd igw > install expo
    - expo --version
    - cd exercise : change directory
    - expo init
    - npm run web
    error after if there is a Remote Debugger running, than need to ...
    - expo start
```
to init and run
```
Ts-MacBook-Pro:cs50m twng$ expo init exercise
To run your project, navigate to the directory and run one of the following npm commands.
```
init and run Jun16
``` console
    Ts-MacBook-Pro:cs50m twng$ expo --version
    3.21.5
    Ts-MacBook-Pro:cs50m twng$ expo init
    ? Choose a template: expo-template-bare-minimum
    ? What would you like to name your app? Jun18
    ...
    To run your project, navigate to the directory and run one of the following npm commands.

    - cd Jun18
    - npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
    - npm run android
    - npm run ios
    - npm run web
    Ts-MacBook-Pro:cs50m twng$ cd Jun18
    Ts-MacBook-Pro:Jun18 twng$ npm install react-navigation@2.0.0 --save
    Ts-MacBook-Pro:Jun18 twng$ npm run web
    Ts-MacBook-Pro:Jun18 twng$ ls 
    App.js			constants		package.json
    app.json		hooks			screens
    assets			navigation		web-build
    babel.config.js		node_modules
    components		package-lock.json
    Ts-MacBook-Pro:Jun18 twng$ 
```
expo's console on screen of DEVICE

package.json as on Jun 2020
``` yaml
{
  "main": "index.js",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "web": "expo start --web",
    "start": "react-native start",
    "test": "jest"
  },
  "dependencies": {
    "expo": "~37.0.3",
    "expo-splash-screen": "^0.2.3",
    "expo-updates": "~0.2.0",
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-native": "~0.61.5",
    "react-native-gesture-handler": "~1.6.0",
    "react-native-reanimated": "~1.7.0",
    "react-native-screens": "~2.2.0",
    "react-native-unimodules": "~0.9.0",
    "react-native-web": "~0.11.7"
  },
  "devDependencies": {
    "@babel/core": "~7.9.0",
    "babel-jest": "~25.2.6",
    "jest": "~25.2.6",
    "react-test-renderer": "~16.9.0"
  },
  "jest": {
    "preset": "react-native"
  },
  "private": true
}
```

| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |

---
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
### vim

``` console
                $ vimtutor
```

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
    
    cmd + - bigger
    
    /???? - to search word
    
    ce  deletes the word and places you in Insert mode.
```
#### vim set-up
$ vim ~/.vimrc
``` yaml
    set number
    syntax on
    set tabstop=4
    set shiftwidth=2
    set softtabstop=2
    set autoindent
    set expandtab
    set cursorline
    colorscheme ron 
```
ref: https://linuxhint.com/configure_vim_vimrc/

####  search for matches
https://vimhelp.org/pattern.txt.html#%2F%5C%25V.    
An example of how to search for matches with a pattern and change the match
with another word: 
```
        /foo<CR>        find "foo"
        c//e<CR>        change until end of match
        bar<Esc>        type replacement
        //<CR>          go to start of next match
        c//e<CR>        change until end of match
        beep<Esc>       type another replacement
                        etc.
```

to replace number with phone: `:'<,'>s/number/phone`.   
Note that the "'<,'>" will appear automatically when you press ":" in Visual
mode.

Vim CheatSheet https://github.com/hackjutsu/vim-cheatsheet

**CTRL-N** - It looks up words in the file you are editing.   


| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |

---

### debug
.20 random,

    let {total} = contacts;
    let n = Math.floor(Math.random() * total); // .20
    console.log(n) // .20
.22b c = data[n]

    let {data} = randomContacts;
    let c = data[n]; // .22b
    console.log(c);
.26

      <Text>{JSON.stringify(this.state.v)}</Text>
      
### console
      > console.clear()

##### console.log

        console.log(JSON.stringify(o))  // ***** 

ref: 07_Navigation#mynote
#### blank view to skip
:+1: to temporary blank view
``` jsx
render() { 
  return <View />;
  ... skipped 
```
#### debug using console.log
console.log( **this.state** )
``` jsx
  _goToRandom= () => {
    const { contacts } = this.props.screenProps;
    console.log('CDS ', this.props.screenProps.contacts) 
... // , it shown the full contact list

  validateForm = () => {
    console.log(this.state, 'AddContactForm');
    ...
```
#### debug placing **debugger;** 
will pause at Chrome Dev Tool
``` jsx
      onSelectContact={contact => {
        debugger; 
        props.onSelectContact(contact);
      }} 
...
    onPress={() => {
      debugger; 
      props.onSelectContact(props); 
    }}>
...
            onSelectContact={(contact) => {
              // debugger;
              this.props.navigation.navigate('ContactDetails'); 
            }}
```

#### debug using random, data, `JSON.stringify`
from 09_ExpoComponents/README.md#mynote
``` jsx
// random
    let {total} = contacts;
    let n = Math.floor(Math.random() * total); // .20
    console.log(n) // .20

// c = data[n]
    let {data} = randomContacts;
    let c = data[n]; // .22b
    console.log(c);

// stringify
      <Text>{JSON.stringify(this.state.v)}</Text>

// console
        console.log(JSON.stringify(o))  // ***** 
```

#### debug on node
10_Redux store.js on CS50 IDE
``` jsx
//import {createStore} from 'redux' // not support on node
const {createStore} = require('redux') //this for node
```
#### skip to folder
``` jsx
import myApp from './before/App';
export default myApp
```

#### How to start a new line in Chrome console window?
`shift`+`enter`

| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |


### Terminal
#### node help
try `console` dot, then Tab Tab
``` console
Ts-MacBook-Pro:Jul02 twng$ node
Welcome to Node.js v12.18.0.
Type ".help" for more information.
> console.
console.__defineGetter__      console.__defineSetter__      console.__lookupGetter__
console.__lookupSetter__      console.__proto__             console.constructor
 ...
console.debug                 console.dir                   console.dirxml
console.error                 console.group                 console.groupCollapsed
 ...
```
#### Use node, compare difference files, and Git diff
``` console
        simpleRedux twng$ node reducer.js
        { foo: 'baz', bar: 'bar' }
        
        $ diff --help
        $ diff -qs ./after/Row.js ./before/Row.js
        Files ./after/Row.js and ./before/Row.js are identical

        $ git diff App.js
```
Mac Terminal Cheat Sheet https://gist.github.com/poopsplat/7195274

Mac OS X :: VI Keyboard Shortcut Cheat Sheet https://trevorsullivan.net/wp-content/uploads/2015/11/Trevor-Sullivan-VI-Shortcuts.pdf

Mac keyboard shortcuts https://support.apple.com/en-us/HT201236  
Option–Left Arrow: Move the insertion point to the beginning of the previous word.   
Option–Right Arrow: Move the insertion point to the end of the next word.

---
### markdown.md
:joy: markdownGuide https://www.markdownguide.org/basic-syntax/     
:sunny: https://www.markdownguide.org/extended-syntax/

:+1: emoji short code: https://gist.github.com/rxaviers/7360908

GitHub Flavored Markdown Spec https://github.github.com/gfm/

#### go to top of the page
```markdown
[top]: topOfThePage
[Go to top of the page](#top) or [:top: Top](#top)
```
#### markdown for json
``` markdown
            ``` yaml
            {
              "name": "authserver",
```
---
### myBookMarks
- https://courses.edx.org/dashboard - pw:al???????2*gm
- https://ide.cs50.io/
- https://expo.io/snacks/@awesome2/ - my Snack platform
- https://codesandbox.io/s/quiet-moon-zq0dt - my sandbox
- https://ngteckwee.blogspot.com/ - my  blog


---
| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |

## learning
### SimpleRedux
#### reducer.js
``` jsx
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
Ts-MacBook-Pro:simpleRedux twng$ vim store2.js
Ts-MacBook-Pro:simpleRedux twng$ ls
reducer.js	store.js	store2.js
Ts-MacBook-Pro:simpleRedux twng$ cat reducer.js
const merge = (prev, next) => Object.assign({}, prev, next)

const reducer = (state, update) => merge(state, update)

let state = {}
state = reducer(state, {foo: 'foo'})
state = reducer(state, {bar: 'bar'})
state = reducer(state, {foo: 'baz'})

console.log(state)

// Ts-MacBook-Pro:simpleRedux twng$ node reducer.js
// { foo: 'baz', bar: 'bar' }
```

| [:top: Top](#top)  | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |
#### store.js
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

// Ts-MacBook-Pro:simpleRedux twng$ node store.js
// { foo: 'baz', bar: 'bar' }
```
| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |
#### store2.js
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

/* console
Ts-MacBook-Pro:simpleRedux twng$ node store2.js
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
Ts-MacBook-Pro:simpleRedux twng$
*/
```

| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |
#### store3.js
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

console.log(store.getState())

/* console
Ts-MacBook-Pro:simpleRedux twng$ node store3.js
received an action: LOG_IN_SENT
{ user: {}, contacts: [] }
received an action: LOG_IN_SUCCESS
*/
```



| [:top: Top](#top) | [Good to remember](#good-to-remember) |  [myQuickRef](#myquickref) | [learning](#learning) |

---
This master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   

---
