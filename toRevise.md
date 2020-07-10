to Revise
===
[top]: topOfThePage


* [to be revise at](#to-be-revise-at)
* Good to remember
* myQuickRef
  * Git
  * Expo Cli
  * eslint prettier
  * vim
  * debug
  * Terminal
  * markdown.md
  * myBookMarks

link file test: [01_Javascript](/01_Javascript)

---
## to be revise at
#### 05_ListsUserInput
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

#### Lecture 7: Data
HTTP Methods.  
Unable to login. Access to fetch at 'http://localhost:8000/' has been block

#### Lecture 10: Async Redux, Tools
Server error, unable to fetch

[:top: Top](#top)

see https://github.com/alvinng222/cs50-mobile/blob/master/vimtutor.md

Good to remember
---

myQuickRef
---
Jul09,'20, initial expo start, minimum   
package.json
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
    "@babel/core": "^7.8.6",
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
---
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   

---
