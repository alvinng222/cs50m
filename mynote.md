myNote
---
CS50's MobileApp Development with React Native
===
[top]: topOfThePage

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

#### Lecture 7: Data
HTTP Methods.  
Unable to login. Access to fetch at 'http://localhost:8000/' has been block

#### Lecture 10: Async Redux, Tools
Server error, unable to fetch

[:top: Top](#top)

see https://github.com/alvinng222/cs50-mobile/blob/master/vimtutor.md

[:top: Top](#top)

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
[:top: Top](#top)

---
myQuickRef
---
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
[:top: Top](#top)

---
#### snacks
my expo.io/ snacks: https://expo.io/snacks/@awesome2/.        

---
### Expo Cli
expo terminal commands
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
[:top: Top](#top)

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
```

to replace number with phone: `:'<,'>s/number/phone`.   
Note that the "'<,'>" will appear automatically when you press ":" in Visual
mode.

Vim CheatSheet https://github.com/hackjutsu/vim-cheatsheet

**CTRL-N** - It looks up words in the file you are editing.   

[:top: Top](#top)

---
### debug
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

[:top: Top](#top)

---

### Terminal
Use node, compare difference files, and Git diff
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

[:top: Top](#top)

---
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   
back to previous: [01_Javascript_src](https://github.com/alvinng222/cs50m/tree/01_Javascript_src)  
continue to next: [03_ReactPropsState](https://github.com/alvinng222/cs50m/tree/03_ReactPropsState).

---
