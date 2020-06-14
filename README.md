Project 2: Movie Browser
====
[top]: topOfThePage
### Objectives
- Become more comfortable with JS and React Native.
- Develop workflow for developing mobile apps.
- Use live APIs for fetching data.
- Use external libraries for additional functionality.
- Create a multi-page application.

### Getting Started
Download the distro code from https://cdn.cs50.net/mobile/2020/x/projects/2/project2.zip and unzip project2.zip, which should yield a directory called project2.

Then, in a terminal window (located in /Applications/Utilities on Mac or by typing cmd in the Windows task bar), move to the directory where you extracted project2 (recall that the cd command can change your current directory), and run

cd project2
To get started, follow the directions in your project README.

### FAQs
- Do I need to use the API?
  - Yes. The goal of this assignment is to learn how to use live APIs for fetching data. The mock data in the repo was only for testing if you wanted to start the project before the lecture on data.
- What is the challenge for this project?
  - The challenge for this project is to add a settings screen (accessed via a tab navigator) that allows you to configure your results from the API.
- Is there extra credit for completing the challenge?
  - Nope, the challenge is just a fun feature that I recommend adding if you finish early!
- Do we need to test on both iOS and Android?
  - Nope, as long as it works on at least one of the platforms, you’re all set. We’ll assume iOS unless specified otherwise.
  
---
Source Code: 
files: project2.zip

[package.json](#packagejson)
[App.js](#appjs)
[README-1.md](#readme-1md)
[mockData.js](#mockdatajs)

---
#### package.json
``` jsx
{
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "dependencies": {
    "expo": "^25.0.0",
    "react": "16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz"
  }
}

```

#### App.js
``` jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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

#### README-1.md
``` markdown
# Project 2 - Movie Browser
For this project, you'll be implementing a movie browser. It will allow users to
search for movies included in the [Open Movie Database](http://www.omdbapi.com/)
and view additional information about any movies they select. Check out the
[staff solution](#staff-solution) for a working version.

## Requirements
- You may not import libraries other than the below:
  - `expo`
  - `react`
  - `react-native`
  - `prop-types`
  - `react-navigation`
  - Any library for icons
- There should be at least one `StackNavigator`
- There should be a search screen that allows users to search for movies
  - You should show more than 10 results if more than 10 results exist
- There should be a screen that shows additional information about a selected movie

The aesthetics of the app are up to you!

### Challenge (Not Required)
- Coming soon!

## Getting Started
First, head to [this link](https://docs.expo.io/versions/latest/get-started/installation/)
to install Expo. You'll need the XDE for your computer and the mobile client
(Expo app) on your phone. If you prefer, you can also install the iOS simulator
(Macs only) and/or the Android emulator.

You'll also need Node.js and NPM installed. You can check if you already have them
installed by opening a terminal and running `node --version` and `npm --version`.
If numbers are printed, you're good to go. If not, [install them](https://nodejs.org/en/).
You'll probably want the LTS version (v8.x.x). NPM will be installed automatically
when you install node.

After installing those software dependencies, you'll need to install your app's
"dependencies" (libraries that are required to run the app, such as `react`,
`react-native`, etc.). Fortunately, it's very easy to do! From a terminal, `cd`
into this directory and run the command `npm install`. NPM will look at the
[`package.json`](/package.json) file's `dependencies` key and install those
libraries, as well as all of those libraries' dependencies (and the dependencies'
dependencies and so on).

Now you have everything installed that you need to run the app! Open the Expo
XDE app and click the `Open existing project...` button. Select the folder that
contains this file (make sure you have the parent folder and not this file) and
press `Open`.

You should now see two panels with logs. The left will output some messeages,
hopefully including `Dependency graph loaded.`. If you see this message, then
your app is running (well technically the bundler that serves your app is running).

You can now open the app on your phone or simulator by clicking one of the buttons
in the top right. To open on your phone, click the `Share` button and scan the
QR code from the Expo app on your phone. To open in a simulator, click the `Device`
button and select the simulator into which you want to open your app.

When you have the app open in your phone or simulator, try opening [`App.js`](/App.js)
and changing a line. You should see it update on your phone!

If you want to get started before we talk about data fetching in the next lecture,
you can use the mock data defined in [`mockData.js`](./mockData.js).

Good luck!

## Staff Solution
If you want to play with the staff implementation, you can view it using
Snack at [@jhhayashi/project2-solution](https://snack.expo.io/@jhhayashi/project2-solution).

```
[:top: Top](#top)

#### mockData.js
``` jsx
export const search = {"Search":[{"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","imdbID":"tt0076759","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{"Title":"Star Wars: Episode V - The Empire Strikes Back","Year":"1980","imdbID":"tt0080684","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{"Title":"Star Wars: Episode VI - Return of the Jedi","Year":"1983","imdbID":"tt0086190","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Star Wars: The Force Awakens","Year":"2015","imdbID":"tt2488496","Type":"movie","Poster":"https://ia.media-imdb.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg"},{"Title":"Star Wars: Episode I - The Phantom Menace","Year":"1999","imdbID":"tt0120915","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Star Wars: Episode III - Revenge of the Sith","Year":"2005","imdbID":"tt0121766","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg"},{"Title":"Star Trek","Year":"2009","imdbID":"tt0796366","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg"},{"Title":"Star Wars: Episode II - Attack of the Clones","Year":"2002","imdbID":"tt0121765","Type":"movie","Poster":"https://ia.media-imdb.com/images/M/MV5BOWNkZmVjODAtNTFlYy00NTQwLWJhY2UtMmFmZTkyOWJmZjZiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"},{"Title":"Star Trek: Into Darkness","Year":"2013","imdbID":"tt1408101","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NzczOTgxNF5BMl5BanBnXkFtZTcwODQ5ODczOQ@@._V1_SX300.jpg"},{"Title":"Rogue One: A Star Wars Story","Year":"2016","imdbID":"tt3748528","Type":"movie","Poster":"https://ia.media-imdb.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg"}],"totalResults":"3049","Response":"True"}

export const movie = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 50 wins & 28 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.6/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"8.6","imdbVotes":"1,035,722","imdbID":"tt0076759","Type":"movie","DVD":"21 Sep 2004","BoxOffice":"N/A","Production":"20th Century Fox","Website":"http://www.starwars.com/episode-iv/","Response":"True"}

```
[:top: Top](#top)

---
myNote
ref:  [ 07_Navigation ]( https://github.com/alvinng222/cs50m/tree/07_Navigation)    
  
---
