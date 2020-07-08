Lecture 2: React, Props, State
====
[top]: topOfThePage

Lecture: http://video.cs50.net/mobile/2018/spring/lectures/2

Slides: http://cdn.cs50.net/mobile/2018/spring/lectures/2/lecture2.pdf
- [Classes](#classes)
- [React](#react)
- [Imperative vs Declarative](#imperative-vs-declarative)
- [React is Declarative](#react-is-declarative)
- [React is Easily Componentized](#react-is-easily-componentized)
- [React is Performant](#react-is-performant)
- [Writing React](#writing-react)
- [Props](#props)
- [State](#state)
- [todoApp.js](#todoappjs)
- But why limit React to just web?
- [React Native](#react-native)


[Source Code](#source-code)  
files: src2.zip

[1-Set.js](1-Set.js)
[2-Set.js](2-Set.js)
[3-Todo.js](3-Todo.js)
[4-imperativeGuitar.js](4-imperativeGuitar.js)
[5-declarativeGuitar.js](5-declarativeGuitar.js)
[6-imperativeSlide.js](6-imperativeSlide.js)
[7-declarativeSlide.js](7-declarativeSlide.js)
[8-slideshow.html](8-slideshow.html)
[9-slideshowComponents.js](9-slideshowComponents.js)
[a-props.js](a-props.js)
[b-state.js](b-state.js)
[todoApp0.js](#todoApp0js)
[todoApp1.js](todoApp1.js)
[todoApp2.js](todoApp2.js)
[todoApp3.js](todoApp3.js)
[todoApp4-react.js](todoApp4-react.js)

[codesandbox.io](#codesandboxio)  
[increase Count](#increase-Count).   
[steps by steps for todoApp4-react.js](#steps-by-steps)

---
[:top: Top](#top)
### Classes

#### Classes
- Syntax introduced in ES6
- Simplifies the defining of complex objects with their own
  prototypes
- Classes vs instances
- Methods vs static methods vs properties
- new, constructor, extends, super

for examples of classes:
```
          > Date
          > const d = new Date()
          > d
          > d.toString()
```
Date is class,  
d is intances.

method
```
          > Date.now()
          > d
          > const d2 = new Date(1234)
          > d2
          > d2.toString()
```
**constructor** is defined within the classes.
#### Set
set is a list, a data structure that suppport add, delete and inclusion
where cannot have multiple thing of the same value.

implement of **Set** as classes:

[:top: Top](#top)
#### 1-Set.js
``` js
// Set should maintain a list of unique values and should support add, delete, and inclusion
// It should also have the ability to get its size

class Set {
  constructor(arr) {            // myNote: constructor
    this.arr = arr
  }

  add(val) {
    if (!this.has(val)) this.arr.push(val)
  }

  delete(val) {
    this.arr = this.arr.filter(x => x !== val)
  }

  has(val) {
    return this.arr.includes(val)         // myNote: includes
  }

  get size() {
    return this.arr.length
  }
}

const s = new Set([1,2,3,4,5])

// trying to add the same value shouldn't work
s.add(1)
s.add(1)
s.add(1)
console.log('s should have 5 members and actually has:', s.size)

console.log('s should contain 5:', s.has(5))

s.add(6)
console.log('s should contain 6:', s.has(6))
console.log('s should have 6 members and actually has:', s.size)

s.delete(6)
console.log('s should no longer contain 6:', !s.has(6))
console.log('s should have 5 members and actually has:', s.size)
```
``` js
          ~/cs50m/ $ node temp.js
          s should have 5 members and actually has: 5
          s should contain 5: true
          s should contain 6: true
          s should have 6 members and actually has: 6
          s should no longer contain 6: true
          s should have 5 members and actually has: 5
          ~/cs50m/ $ 
```
Javascript already have the **Set** class, ```> Set ```

#### extends and super
native implimentation of Set to add some stuff into it. 
* **extends**, to start with a base class and actually add to it, extend this class.
* **super** is when we are writing that class, we can refer to its original class.
#### 2-Set.js
``` js
// We can also extend the native implementation of Set if we wanted to do something
// like log on addition or create new methods

class MySet extends Set {
  constructor(arr) {
    super(arr)
    this.originalArray = arr
  }

  add(val) {
    super.add(val)
    console.log(`added ${val} to the set!`)
  }

  toArray() {
    return Array.from(this)
  }

  reset() {
    return new MySet(this.originalArray)
  }
}

const s = new MySet([1,2,3,4,5])
console.log('===') // my markers
s.add(6)
s.add(7)
console.log(s.toArray())

const reset = s.reset()
console.log(reset.toArray())
```
```
          Ts-MacBook-Pro:cs50m twng$ node tt.js
          added 1 to the set!
          added 2 to the set!
          added 3 to the set!
          added 4 to the set!
          added 5 to the set!
          ===
          added 6 to the set!
          added 7 to the set!
          [
            1, 2, 3, 4,
            5, 6, 7
          ]
          added 1 to the set!
          added 2 to the set!
          added 3 to the set!
          added 4 to the set!
          added 5 to the set!
          [ 1, 2, 3, 4, 5 ]
          Ts-MacBook-Pro:cs50m twng$ 
```
[:top: Top](#top)
### React

React
- Allows us to write declarative views that “react” to
  changes in data
- Allows us to abstract complex problems into smaller
  components
- Allows us to write simple code that is still performant

#### 3-Todo.js
``` js
class Todo {
  constructor(configuration) {
    this.text = configuration.text || 'New TODO'
    this.checked = false
  }

  render() {
    return (
      <li>
        <input type="checkbox" checked={this.checked} />
        <span>{this.text}</span>
      </li>
    )
  }
}
```
### Imperative vs Declarative

Imperative vs Declarative
- How vs What
- Imperative programming outlines a series of steps to get
  to what you want
- Declarative programming just declares what you want

What would be a more declarative ways of creating the guitar?   
The **pseudo code** would be like this:
``` js
// assume createElement() exists, similar in abstraction to document.createElement()

const strings = ['E', 'A', 'D', 'G', 'B', 'E']

function Guitar() {
  // create head and add pegs
  // create neck and add frets
  // create body and add strings
}
```
imperative way to create guitar:
#### 4-imperativeGuitar.js
``` js
// assume createElement() exists, similar in abstraction to document.createElement()

const strings = ['E', 'A', 'D', 'G', 'B', 'E']

function Guitar() {
  // create head and add pegs
  const head = createElement('head')
  for (let i = 0; i < 6; i++) {
    const peg = createElement('peg')
    head.append(peg)
  }


  // create neck and add frets
  const neck = createElement('neck')
  for (let i = 0; i < 19; i++) {
    const fret = createElement('fret')
    head.append(fret)
  }


  // create body and add strings
  const body = createElement('body')
  body.append(neck)
  strings.forEach(tone => {
    const string = createElement('string')
    string.tune(tone)
    body.append(string)
  })

  return body
}
```
declarative way to create guitar
``` js
const strings = ['E', 'A', 'D', 'G', 'B', 'E']

function Guitar() {
  return (
    <Guitar>
      <String note={strings[0]} />
      <String note={strings[0]} />
      <String note={strings[0]} />
      <String note={strings[0]} />
      <String note={strings[0]} />
      <String note={strings[0]} />
    </Guitar>
  )
}
```
there is another better way ...
#### 5-declarativeGuitar.js
``` js
const strings = ['E', 'A', 'D', 'G', 'B', 'E']

function Guitar() {
  return (
    <Guitar>
      {strings.map(note => <String note={note} />)}
    </Guitar>
  )
}
```
### React is Declarative

React is Declarative
- Imperative vs Declarative
- The browser APIs aren’t fun to work with
- React allows us to write what we want, and the library will
  take care of the DOM manipulation

``` js
const SLIDE = {
  title: 'React is Declarative',
  bullets: [
    'Imeritive vs Declaraive ...',
  ],
}

const CLASSNAMES = {title: 'title', bullet: 'bullet'}

function createSlide(slide) {
  const slideElement = document.createElement('div')

  // TODO: add to slide

  return slideElement
}
```
[:top: Top](#top)
#### 6-imperativeSlide.js
``` js
const SLIDE = {
  title: 'React is Declarative',
  bullets: [
    'Imeritive vs Declaraive',
    "The browser APIs are't fun to work with",
    'React allows us to write what we want, and the library will take care of the DOM manipulation',
  ],
}

const CLASSNAMES = {title: 'title', bullet: 'bullet'}

function createSlide(slide) {
  const slideElement = document.createElement('div')

  const title = document.createElement('h1')
  title.className = CLASSNAMES.title
  title.innerHTML = slide.title
  slideElement.appendChild(title)

  const bullets = document.createElement('ul')
  slide.bullets.forEach(bullet => {
    const bulletElement = document.createElement('li')
    bulletElement.className = CLASSNAMES.bullet
    bulletElement.innerHTML = bullet
    bullets.appendChild(bulletElement)
  })
  slideElement.appendChild(bullets)

  return slideElement
}
```
React is alot easiler ...
#### 7-declarativeSlide.js
``` js
const SLIDE = {
  title: 'React is Declarative',
  bullets: [
    'Imeritive vs Declaraive',
    "The browser APIs are't fun to work with",
    'React allows us to write what we want, and the library will take care of the DOM manipulation',
  ],
}

function createSlide(slide) {
  return (
    <div>
      <h1>{SLIDE.title}</h1>
      <ul>
        {SLIDE.bullets.map(bullet => <li>{bullet}</li>)}
      </ul>
    </div>
  )
}
```

### React is Easily Componentized

React is Easily Componentized
- Breaking a complex problem into discrete components
- Can reuse these components
  - Consistency
  - Iteration speed
- React’s declarative nature makes it easy to customize
  components


#### 8-slideshow.html
``` html
<div>
  <div>
    <h1>React</h1>
    <ul>
      <li>Allows us to write declarative views that "react" to changes in data</li>
      <li>Allows us to abstract complex problems into smaller components</li>
      <li>Allows us to write simple code that is still performant</li>
    </ul>
  </div>
  <div>
    <h1>React is Declarative</h1>
    <ul>
      <li>Imerative vs Declarative</li>
      <li>The browser APIs aren't fun to work with</li>
      <li>React allows us to write what we want, and the library will take care of the DOM manipulation</li>
    </ul>
  </div>
  <div>
    <h1>React is Easily Componentized</h1>
    <ul>
      <li>Breaking a complex problem into discrete components</li>
      <li>Can reuse these components
      <li>React's declarative nature makes it easy to customize components</li>
    </ul>
  </div>
</div>
```
broken up into separate components ..

[:top: Top](#top)
#### 9-slideshowComponents.js
``` js
const slides = [
  {
    title: 'React',
    bullets: [
      'Allows us to write declarative views that "react" to changes in data',
      'Allows us to abstract complex problems into smaller components',
      'Allows us to write simple code that is still performant',
    ],
  },
  {
    title: 'React is Declarative',
    bullets: [
      'Imerative vs Declarative',
      "The browser APIs aren't fun to work with",
      'React allows us to write what we want, and the library will take care of the DOM manipulation',
    ],
  },
  {
    title: 'React is Easily Componentized',
    bullets: [
      'Breaking a complex problem into discrete components',
      'Can reuse these components',
      "React's declarative nature makes it easy to customize components",
    ],
  },
]

// TODO implement slideshow           // myNote: was
const slideShow = (
  <div>
    {slides.map(slide => <Slide slide={slide} />)}
  </div>
)

// note that this pseudocode differs from react.
// in react, accessing the slide title would be done with {slide.slide.title}
// and accessing the bullets would be {slide.slide.bullets}
const Slide = slide => (
  <div>
    <h1>{slide.title}</h1>
    <ul>
      {slide.bullets.map(bullet => <li>{bullet}</li>)}
    </ul>
  </div>
)
```
---
### React is Performant

#### React is Performant
- We write what we want and React will do the hard work
- Reconciliation - the process by which React syncs
  changes in app state to the DOM
  - Reconstructs the virtual DOM
  - Diffs the virtual DOM against the DOM
  - Only makes the changes needed

#### Writing React
- JSX
  - XML-like syntax extension of JavaScript
  - Transpiles to JavaScript
  - Lowercase tags are treated as HTML/SVG tags, uppercase are treated
    as custom components
- Components are just functions
  - Returns a node (something React can render, e.g. a `<div />`)
  - Receives an object of the properties that are passed to the element

#### Props
- Passed as an object to a component and used to compute
  the returned node
- Changes in these props will cause a recomputation of the
  returned node (“render”)
- Unlike in HTML, these can be any JS value

#### [codesandbox.io](https://new.codesandbox.io/) 
<https://codesandbox.io/s/blissful-black-uf7ng>

index.js of SandBox
``` jsx
import React from 'react';
import { render } from 'react-dom';
import Hello from '.Hello'; // to be remove.

const styles = { 
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <h2>{props.count}</h2>
  </div>
);

render(<App count={1} />, document.getElementById('root'))
```

index.js in codesandbox - 2
``` jsx
import React from 'react';
import { render } from 'react-dom';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = (props) => (
  <div style={styles}>
    <h2>{props.count}</h2>
  </div>
);

let count = 0

setInterval(
  () => render(<App count={count++} />, document.getElementById('root')),
  1000
)
```
[:top: Top](#top)
#### a-props.js
``` js
import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';  // need to remove in codesandbox

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = (props) => (
  <div style={styles}>
    <h2>{props.count}</h2>
  </div>
);

const App2 = function(props) {
  return (
    <div style={styles}>
      <h2>{props.count}</h2>
    </div>
  )
}
let count = 0

setInterval(
  function() {render(<App2 count={count++} />, document.getElementById('root'))},
  1000
)
```

#### State
- Adds internally-managed configuration for a component
- `this.state` is a class property on the component instance
- Can only be updated by invoking `this.setState()`
  - Implemented in React.Component
  - setState() calls are batched and run asynchronously
  - Pass an object to be merged, or a function of previous state
- Changes in state also cause re-renders

rather than having app be a function that takes props and returns something,   
actually writing a class for app.
`React.component`, that base class, goes ahead and attached the props. [43:58]   
`React.component` automatically take the props, and attached it to that instances of the class.
``` jsx
import React from 'react';
import { render } from 'react-dom';
//import Hello from './Hello'; 

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class App extends React.Component {
  render () {
    return (
      <div style={styles}>
        <h2>{this.props.count}</h2>
      </div>
    )
  }
};

let count = 0;

setInterval(
  function() {render(<App count={count++} />, document.getElementById('root'))},
  1000
);
```
`React.component` automatically take the `props`, and attached it to that instances of the class.  
And so in order for us to get them in the render method, we do this dot props dot count.

We instroduce state.   
we want to create s `state`, we use `contructor,  
`super`, which means allow `React.Component` to do stuff with the `props`.  
intiaite this thing call state, 'this.state`. 
``` jsx
import React from 'react';
import { render } from 'react-dom';
//import Hello from './Hello'; 

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    count : 0,
    }
  }

  increaseCount () {
    this.setState({count: this.state.count + 1})
  }

  render () {
    return (
      <div style={styles}>
        <div>
          <button onClick={() => this.increaseCount()}>increase</button>
        </div>
        <h2>{this.state.count}</h2>
      </div>
    )
  }
  
};

let count = 0;
render(<App count={count++} />, document.getElementById('root'))
```
use arrow notation.  
`<button onClick={() => this.increaseCount()}>increase</button>`   
was use `bind`.   
`<button onClick={this.increaseCount.bind(this)}>increase</button>`

[:top: Top](#top)
#### b-state.js
``` js
import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  increaseCount() {
    this.setState(prevState => ({count: prevState.count + 1}))
    this.setState(prevState => ({count: prevState.count + 1}))
    console.log(this.state.count)
  }

  render() {
    return (
      <div style={styles}>
        <div>
          <button onClick={() => this.increaseCount()}>Increase</button>
        </div>
        <h2>{this.state.count}</h2>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
```
### increase Count

on codesandbox 
``` jsx
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  increaseCount () {
    this.setState ({count: this.state.count + 1})
  }

  render () {
    return (
      <div>
        <button onClick={()=>this.increaseCount()}>increase</button>
        <h2>{this.state.count}</h2>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
___
[:top: Top](#top)

todoApp.js
----------
[35:50].  
implement in all React,   
strategy to create a few functions, doing in a very imperative way:

Reference to [project 0: TODO App](https://github.com/alvinng222/cs50m/tree/project0)

#### todoApp1.js
to abstrat out the creating of the to do itself
``` js
const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

//  <li>
//    <input type="checkbox" />
//    <button>delete</button>
//    <span>text</span>
//  </li>

function createTodo() {
  // make li

  // make input

  // make button

  // make span
}

function newTodo() {
  // get text

  // invoke createTodo()

  // update counts

  // apend to list
}

function deleteTodo() {
  // find the todo to delete
  // remove
  // update counts
}
```
[:top: Top](#top)

write that all somewhat declaractively, do something called **innerHTML**
#### todoApp2.js
``` js
const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

//  <li>
//    <input type="checkbox" />
//    <button>delete</button>
//    <span>text</span>
//  </li>

function createTodo() {
  const li = document.createElement('li')
  li.innerHTML = `
    <input type="checkbox" />
    <button>delete</button>
    <span>text</span>
  `
  return li
}

function newTodo() {
  // get text

  // invoke createTodo()

  // update counts

  // apend to list
}

function deleteTodo() {
  // find the todo to delete
  // remove
  // update counts
}
```

store that *todos* in JavaScript in some sort of data, write a method that
store the memory as an array. use concept of **render**, that renders all of
todos. Appending that to DOM.
#### todoApp3.js
``` js
// store todos in memory
let todos = []

function renderTodo(todo) {
  // render a single todo
}

function render() {
  // render the todos in memory to the page
  list.innerHTML = ''
  todos.map(renderTodo).forEach(todo => list.appendChild(todo))

  // update counts

  return false
}

function addTodo(name) {
  const todo = new Todo(name)
  todos.push(todo)
  return render()
}

function removeTodo(todo) {
  todos = todos.filter(t => t !== todo)
  return render()
}
```
paste from b-state.js to CodeSandbox
```
  constructor() {
    super()
    this.state = {
      todos: [],
    }
```

dot dot dot notation  
`      todos: [...this.state.todos,`

it pull out all the arrays  
`<button>Add Todo</button>`  
`<button onClick>Add Todo</button>`  
`<button onClick={this.addTodo}>Add Todo</button>`  
`<button onClick={() => this.addTodo()}>Add TODO</button>`

[:top: Top](#top)
#### todoApp4-react.js
``` js
import React from 'react';
import { render } from 'react-dom';

let id = 0

const Todo = props => (
  <li>
    <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle} />
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  addTodo() {
    const text = prompt("TODO text please!")
    this.setState({
      todos: [
        ...this.state.todos,
        {id: id++, text: text, checked: false},
      ], 
    })
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <div>
        <div>Todo count: {this.state.todos.length}</div>
        <div>Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</div>
        <button onClick={() => this.addTodo()}>Add TODO</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    )
  }
}


render(<App />, document.getElementById('root'));
```

But why limit React to   
just web?

### React Native
* A framework that relies on React core
* Allows us build mobile apps using only JavaScript
  * “Learn once, write anywhere”
* Supports iOS and Android

---
[:top: Top](#top)

steps by steps
--------------
for todoApp4-react.js on [codesandbox.io](https://codesandbox.io/s/blissful-black-uf7ng).   
1. [01:00:00] index.js a blank ToDo list   
extends to React to give the dot state, in order to update.
``` jsx
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render () {
    return (
      <div>
        <ul>

        </ul>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
2. track the ToDo via create 'state'.   
to track the todo, via create state, first invoke the contructors, super
``` jsx
class App extends React.Component {
 constructor () {
    super()
    this.state = {
      todos : [],
    }
  }
```
wrap in single curly braces to execute in javascript, mapping out all todos. 
and uppercase tag means React component
``` jsx
        <ul>
          {this.state.todos.map(todo => <Todo todo={todo} />)}
        </ul>
```
3. properties.  
adstrached out all the concept of creating todos. variable, props is React component called.
``` jsx
const Todo = props => (
  <li>
    <input type="checkbox" />
    <button>delete</button>
    <span>{props.text}</span>
  </li>
)
```

4. Add Todo items.   
create the *method* called addTodo, it update via mutates the props by creating these dot dot dot new array
``` jsx
  addTodo() {
    const text = prompt("TODO text please!")
    this.setState({
      todos : [...this.state.todos, {text: text}],
    })
  }
  
  render () {
    return (
      <div>
        <button onClick={() => this.addTodo()}>Add TODO</button>
        <ul>
```
passing something called todo from object props
``` jsx
    <span>{props.todo.text}</span>
```
5. add id.   
give *id* to recognise them for check and delete
``` jsx
let id = 0
```
everytime you just create a new one, you just increase the *id*.
``` jsx
   this.setState({
      todos : [...this.state.todos, {id : id++, text: text}],
    })
```
6. Delete todo.   
remove by the `id`, and use `setState` to update via filter them
``` jsx
removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }
```
passed a function when click
``` jsx
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              onDelete={() => this.removeTodo(todo.id)} 
              todo={todo} 
            />
          ))}
        </ul>
```
to fire the removeTodo via click
``` jsx
    <button onClick={props.onDelete}>delete</button>
```

8. Tracking of Checked.   
add a field to track `checked`
```jsx
   this.setState({
      todos : [
        ...this.state.todos, 
        {id: id++, text: text, checked: false}],
    })
```
to set that `checked` field to check whether to check or not
``` jsx
    <input type="checkbox" checked={props.todo.checked} />
```
toggle via using map
``` jsx
  toggleTodo (id) {
    this.setState ({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }
```
``` jsx
        <ul>
          {this.state.todos.map(todo => (<Todo 
          onToggle={() => this.toggleTodo(todo.id)}
          onDelete={() => this.removeTodo(todo.id)}
          todo={todo} />))}
        </ul>
```
``` jsx
    <input type="checkbox" checked={props.todo.checked}
      onChange={props.onToggle} />
```
9. toggle checked Count
``` jsx
  render () {
    return (
      <div>
        <div>Todo count: {this.state.todos.length}</div>
        <div>Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</div>
```
can add data to try:
```
       todos: [
        {id: 0, text: "ABC", checked: false},
        {id: 1, text: "DEF", checked: false},
       ],
```

---
myNote
---


[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   
back to last branch: [02_JS_ES6](https://github.com/alvinng222/cs50m/tree/02_JS_ES6)    
continue to next branch: [04_ReactNative](https://github.com/alvinng222/cs50m/tree/04_ReactNative)   

---

