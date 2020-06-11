[top]: topOfThePage
## project 0: TODO App
* [index.html](#indexhtml)
* [readme.md](#readmemd)
* [script.js](#scriptjs)
* [styles.ss](#stylesss)
* [solution](#solution)

---
## Objectives
Become more comfortable with JS and DOM manipulation.
Gain experience reading and adding to source code.
Getting Started
Download the distro code from 
https://cdn.cs50.net/mobile/2020/x/projects/0/project0.zip and unzip project0.zip, 
which should yield a directory called project0.

Then, in a terminal window (located in /Applications/Utilities on Mac or by typing 
cmd in the Windows task bar), move to the directory where you extracted project0 
(recall that the cd command can change your current directory), and run

cd project0
To get started, follow the directions in your project README.

[:top: Top](#top)

---
### index.html
``` html
<!DOCTYPE html>
<html>
  <head>
    <title>TODO App</title>
    <link rel="stylesheet" type="text/css" href="./styles.css" />
  </head>
  <body>
    <div class="container center">
      <h1 class="center title">My TODO App</h1>
      <div class="flow-right controls">
        <span>Item count: <span id="item-count">0</span></span>
        <span>Unchecked count: <span id="unchecked-count">0</span></span>
      </div>
      <button class="button center" onClick="newTodo()">New TODO</button>
      <ul id="todo-list" class="todo-list"></ul>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```
[:top: Top](#top)

---
### readme.md
``` markdown
# Project 0

The goal of this project is to practice JavaScript and its paradigms by creating
a TODO app. This app should be able to add TODOs and track the number of total
TODOs as well as the number of unchecked TODOs.

## Instructions
Inside of [index.html](/index.html), you'll find some starter HTML. You shouldn't
need to edit this file at all. Open this file on your computer into any browser
to run the project. Make sure that [script.js](/script.js) and [styles.css](/styles.css)
are in the same local directory. With the file open in your browser, you should
see a `New TODO` button, which `alert`s when clicked. Your goal will be to get
this button to create new TODOs.

Inside [styles.css](/styles.css), you'll find some pre-written CSS for your
convenience. You shouldn't need to edit this file at all, but feel free to if
desired.

[script.js](/script.js) is where most of your work will be done. There is some
starter code for you in the file. The `classNames` variable can be used to link
any elements you create in js with the associated CSS class names. The next 3
lines of code are the HTML elements that you'll need to update when creating new
TODOs. Lastly, you'll see the `addTodo()` function. This gets executed when
creating a new TODO. You should replace the `alert()` call with logic to create
new TODOs.

Good luck!

## Challenge! (Not Required)
If you finish early and are up for a challenge, try adding delete functionality.
This should be in the form of a button within each TODO that removes that TODO
when clicked. 
```
[:top: Top](#top)

---
### script.js
``` js
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  alert('Hello!, New TODO button clicked!')
}
```
[:top: Top](#top)

---
### styles.ss
``` js
* {
  box-sizing: border-box;
}

html, body {  background-color: #eee; margin: 0;  padding: 0; }

ul {  margin: 0;  padding: 0; list-style-type: none;}

.center {  align-self: center; }

.flow-right {  display: flex; justify-content: space-around; }

.container {
  max-width: 800px; margin: 0 auto; padding: 10px; display: flex;
  flex-direction: column; background-color: white; height: 100vh;
}

.title, .controls, .button { flex: none; }

.button {  padding: 10px 20px; }

.todo-list {  flex: 1 1 0; margin-top: 20px; padding: 20px; overflow-y: auto; }
.todo-delete {  margin: 10px; }
.todo-checkbox {  margin: 10px; }
.todo-container {  padding: 20px; border-bottom: 1px solid #333; }
.todo-container:first-of-type {  border-top: 1px solid #333; }

```
[:top: Top](#top)

---
### solution
script.js   
from https://github.com/jhhayashi/react-native-course/blob/master/project0/solution/basic/script.js.   
just to add listings without name change
``` jsx
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
}

const list = document.getElementById('todo-list')
const itemCountDiv = document.getElementById('item-count')
const uncheckedCountDiv = document.getElementById('unchecked-count')

let itemCount = 0
let uncheckedCount = 0

function updateItemCount(difference) {
  itemCount += difference
  itemCountDiv.innerHTML = itemCount
}

function updateUncheckedCount(difference) {
  uncheckedCount += difference
  uncheckedCountDiv.innerHTML = uncheckedCount
}

function createTodo(name) {
  const checkbox = document.createElement('input')
  checkbox.className = classNames.TODO_CHECKBOX
  checkbox.type = 'checkbox'
  checkbox.onchange = toggleCheckbox

  const span = document.createElement('span')
  span.className = classNames.TODO_TEXT
  span.setAttribute('contenteditable', 'true')
  span.innerHTML = name || 'New TODO'

  const li = document.createElement('li')
  li.className = classNames.TODO_ITEM
  li.appendChild(checkbox)
  li.appendChild(span)

  return li
}

function newTodo(name) { // was  addTodo(name) {
  const todo = createTodo(name)
  list.appendChild(todo)
  updateItemCount(1)
  updateUncheckedCount(1)
}

function toggleCheckbox() {
  if (this.checked) updateUncheckedCount(-1)
  else updateUncheckedCount(1)
}
```
[:top: Top](#top)

---
### myNote
using CS50 IDE to test
```
~/cs50m/project0/ $ http-server
Starting up http-server, serving ./
Available on:
  ...
```
script.js - my simple script that count 
``` jsx
// script.js Feb 17,2020
/*
The `classNames` variable can be used to link any elements you create in js
with the associated CSS class names.

The next 3 lines of code are the HTML elements that you'll need to update when
creating new TODOs.

Lastly, you'll see the `addTodo()` function. This gets executed when creating
a new TODO. You should replace the `alert()` call with logic to create new TODOs.
*/
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let count = 0

function newTodo() {
  //alert('New TODO button clicked!')
  count = count + 1
  itemCountSpan.innerHTML = count
}
```
[:top: Top](#top)
