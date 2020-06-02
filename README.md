Javascript, ES6
===
[top]: topOfThePage

lecture: http://video.cs50.net/mobile/2018/spring/lectures/1

slide: http://cdn.cs50.net/mobile/2018/spring/lectures/1/lecture1.pdf
- [Closures](#closures)
- [iife](#iife)
- [First-Class Functions](#first-class-functions)
- [Synchronous?](#synchronous)
- [Asynchronous JavaScript](#asynchronous-javascript)
- [Promises](#promises)
- [Async/Await](#asyncawait)
- [this](#this)

[Source Code](#source-code)  
files: src1.zip

[0-closureBug.js](0-closureBug.js)
[1-closureExample.js](1-closureExample.js)
[2-iife.js](2-iife.js)
[3-iifeClosure.js](3-iifeClosure.js)
[4-hof.js](4-hof.js)
[5-hang.js](5-hang.js)
[6-stack.js](6-stack.js)
[7-overflow.js](7-overflow.js)
[8-async.js](8-async.js)
[9-callbacks.js](9-callbacks.js)
[a-callbackAuth.js](a-callbackAuth.js)
[b-promises.js](b-promises.js)
[c-promiseAuth.js](c-promiseAuth.js)
[d-asyncAwaitAuth.js](d-asyncAwaitAuth.js)
[e-this.js](e-this.js)
[simple.html](simple.html)

[**myNote**](#mynote)

---
[:top: Top](#top)

ES5, ES6, ES2016, ES2017, ES.Next
- ECMAScript vs JavaScript
- What do most environments support? // support ES5
- Transpilers (Babel, TypeScript, CoffeeScript, etc.) // turn to ES5
- Which syntax should I use? // Generally use the future syntax

### Closures:

[04:14] Closures
- Functions that refer to variables declared by parent function still 
  have access to those variables
- Possible because of JavaScript’s scoping

##### 0-closureBug.js
``` js
function makeFunctionArray() {
  const arr = []

  for (var i = 0; i < 5; i++) {
    arr.push(function () { console.log(i) })
  }

  return arr
}

const functionArr = makeFunctionArray()

// we expect this to log 0, but it doesn't
functionArr[0]()
```
```
    ~/cs50m/src1/ $ node 0-closureBug.js
    5
```
```
Why? for 0-closureBug.js
console.log(I)  is underdefine
Line 5, if var change to let
   i is not exit
   It print out ‘0’
```
---
[:top: Top](#top)
##### 1-closureExample.js
``` js
function makeHelloFunction() {
  var message = 'Hello!'

  function sayHello() {
    console.log(message)
  }

  return sayHello
}

const sayHello = makeHelloFunction()

// the variable called message is not in scope here
console.log('typeof message:', typeof message)
// but the function sayHello still references a variable called message
console.log(sayHello.toString()) // ***** 

// because of the closure, sayHello still has access to the variables within scope
// when it was declared
sayHello()
```
```
    ~/cs50m/src1/ $ node 1-closureExample.js
    typeof message: undefined
    function sayHello() {
        console.log(message)
      }
    Hello!
```
---
[:top: Top](#top)
### iife

[14:01] Immediately Invoked Function Expression
- A function expression that gets invoked immediately
- Creates closure
- Doesn’t add to or modify global object

##### 2-iife.js
``` > cp 1-closureExample.js 2-iife.js ```
``` js
// this creates the same closure as in 1-closureExample.js, but doesn't pollute
// the global scope with a function called makeHelloFunction like that example
// MYNOTE: same result as in 1-closureExample.js, just without makeHelloFunction.
const sayHello = (function () {
  var message = 'Hello!'

  function sayHello() {
    console.log(message)
  }

  return sayHello
})()

// IIFEs can also be used to create variables that are inaccessible from the global
// scope
const counter = (function() {
  let count = 0

  return {
    inc: function() { count = count + 1 },
    get: function() { console.log(count) },
  }
})()

counter.get()
counter.inc()
counter.get()
```
```
    ~/cs50m/src1/ $ node 2-iife.js
    0
    1
```
Why iife be used?  
Counter.. keep track of some number, and that number not accessible to other.  
Object of ‘inc’ and ‘get’, nobody and access to line 12, the count variable 
not assess to other. So how to use this solve the closure problems 

---
[:top: Top](#top)
##### 3-iifeClosure.js
``` > cp 0-closureBug.js 3-iifeClosure.js ```
``` js
// we can create a closure around each anonymous function pushed to the array by
// turning them into IIFEs
function makeFunctionArray() {
  const arr = []

  for (var i = 0; i < 5; i++) {
    arr.push((function (x) {
      return function () { console.log(x) } // MYNOTE add 'return function(){...}'
    })(i))
  }

  return arr
}

const functionArr = makeFunctionArray()

// this now logs 0 as expected
functionArr[0]()
```
```
    ~/cs50m/src1/ $ node 3-iifeClosure.js
    0
```

[20:32] 3-iifeClosure.js.  
a bit crazy, is not use everyday, ... library get imported by using an iife.  
So that a lot of variables that they declare while creating a library don’t 
pollute the global. ????

---
[:top: Top](#top)
### First-Class Functions

[22:57]First-Class Functions
- Functions are treated the same way as any other value
    - Can be assigned to variables, array values, object values
    - Can be passed as arguments to other functions
    - Can be returned from functions
- Allows for the creation of higher-order functions
    - Either takes one or more functions as arguments or returns a function
    - map(), filter(), reduce()

##### map(), filter(), reduce()
```
      First-Class Functions
      language handle function,
      JavaScript, classes are first class citizens.

      3 famous higher order functions:

      what is map?
      > const x = [0,1,2,3]
      > function addOne(number) {return number  + 1}
      > addOne(1)
      2
      > x.map
      [Function: map]
      > x.map(addOne)
      [ 1, 2, 3, 4 ]

      [26:59]
      What is filter? 
      Filter does is retains the value that return true and get rid of the values that return false.

      > function isGreaterThanOne(num) { return num > 1 }
      > isGreaterThanOne(100)
      true
      > isGreaterThanOne(1)
      false 
      > x.filter(isGreaterThanOne)
      [ 2, 3 ]

      [28:18]
      What is ‘reduce’
      It take array of multiple values and reduces it into a single value

      > function add(x, y) { return x + y }
      > add(1, 2)
      3
      > x
      [0,1,2,3]
      > x.reduce(add)
      6

      > .exit
      > clear
      > ls

      [29:56] 4-hof.js higher order functions
```
[:top: Top](#top)
##### 4-hof.js
``` js
// Higher Order Functions take funcs as args or return funcs
function map(arr, fn) {
  const newArr = []

  arr.forEach(function(val) {     // ***** 'forEach'
    newArr.push(fn(val))
  })

  return newArr
}

function addOne(num) { return num + 1 }

const x = [0,1,2,3]

console.log(map(x, addOne))     // [ 1, 2, 3, 4 ]


function filter(arr, fn) {
  const newArr = []
  arr.forEach(val => {
    if (fn(val)) newArr.push(val)
  })

  return newArr
}

function isGreaterThanOne(num) { return num > 1 } // added
console.log(filter(x, isGreaterThanOne));         // added //  [ 2, 3 ]

function reduce(arr, fn, initialVal) {
  let returnVal = initialVal

  arr.forEach(val => {
    returnVal = fn(returnVal, val)
  })

  return returnVal
}

function addAll(x, y) { return x + y }    // added
console.log(reduce(x, addAll , 0));       // added // 6
```
```
    ~/cs50m/src1/ $ node 4-hof.js
    [ 1, 2, 3, 4 ]
    [ 2, 3 ]  // added
    6         // added
```
---
[:top: Top](#top) [34:19]
### Synchronous?
Synchronous? Async? Single-Threaded?  
- JavaScript is a single-threaded, synchronous language
- A function that takes a long time to run will cause a page
to become unresponsive
- JavaScript has functions that act asynchronously
- But how can it be both synchronous and asynchronous?

##### 5-hang.js
``` jsx
// this function will freeze a browser page if run in console
function hang(seconds = 5) {
  const doneAt = Date.now() + seconds * 1000
  while(Date.now() < doneAt) {}
}

hang(10); // added,  it hanged for 10sec!
```
---
[:top: Top](#top) [40:18]
### Asynchronous JavaScript

Asynchronous JavaScript
- Execution stack
- Browser APIs
- Function queue
- Event loop

Execution Stack
- Functions invoked by other functions get added to the call
  stack
- When functions complete, they are removed from the
  stack and the frame below continues executing

``` jsx
        // Execution stack
        function a() {
          console.log('hi');
        }

        function b() {
          a();
        }

        function c(){
          b();
        }

        c(); // hi
```
##### 6-stack.js
``` jsx
// when errors are thrown, the entire callstack is logged
function addOne(num) {
  throw new Error('oh no, an error!')
}

function getNum() {
  return addOne(10)
}

function c() {
  console.log(getNum() + getNum())
}

c()
```
```
    ~/cs50m/src1/ $ node 6-stack.js
    /home/ubuntu/cs50m/src1/6-stack.js:3
      throw new Error('oh no, an error!')
      ...
```
---
[:top: Top](#top)
##### 7-overflow.js
``` jsx
// this will recurse infinitely
function recurse() {
  console.log('recursion!')
  return recurse()
}

// this wall cause a stack overflow
recurse()
```
```
    ...
    recursion!
    recursion!
    recursion!
    ...
```
---
[:top: Top](#top)
[01:46]
### Asynchronous JavaScript
- Asynchronous functions
    - setTimeout()
    - XMLHttpRequest(), jQuery.ajax(), fetch()
    - Database calls


    timeout:  
    fetch: fetching network requests.  
    jQuery:asynchronous functions for fetching things like Ajax.  
    EXML HTTP request which is built into the browsers, like database calls.   
    Anything that that other than JavaScript is going to be asynchronous.

##### 8-async.js
``` jsx
function printOne() {
  console.log('one')
}

function printTwo() {
  console.log('two')
}

function printThree() {
  console.log('three')
}

// this may not print in the order that you expect, because of the way the JS
// function queue works
setTimeout(printOne, 1000)
setTimeout(printTwo, 0)
printThree()
```
```
    ~/cs50m/src1/ $ node 8-async.js
    three
    two
    one
```
---

Callbacks
- Control flow with asynchronous calls
- Execute function once asynchronous call returns value
  - Program doesn’t have to halt and wait for value

##### 9-callbacks.js
``` jsx
// this is a HOF that invokes the function argument on 1
function doSomethingWithOne(callback) {
  return callback(1)                      // 'return' optional ??
}

doSomethingWithOne(console.log)           // ***** another method for 'console.log' ??

// this is the same thing, but done asynchronously
function doSomethingWithOneAsync(callback) {
  setTimeout(() => callback(1), 1000)     // setTimeout(callback fn, ms)
}

doSomethingWithOneAsync(console.log)

// this simulates a database call that returns an object representing a person
function getUserFromDatabase(callback) {
    // simulates getting data from db
    setTimeout(() => callback({firstName: 'Jordan', lastName: 'Hayashi'}), 1000)
}

// this is a function that greets a user, which we pass as a callback to getUserFromDatabase
function greetUser(user) {
  console.log('Hi, ' + user.firstName)
}

getUserFromDatabase(greetUser)
```
```
    ~/cs50m/src1/ $ node 9-callbacks.js
    1
    1
    Hi, Jordan
```
---
[:top: Top](#top)
##### a-callbackAuth.js
``` jsx
// taken from a personal project of mine
// https://github.com/jhhayashi/coupon-api/blob/master/controllers/auth.js

function login(req, res, callback) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return callback(err)

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return callback(err)
      if (!isMatch) return res.status(401).send('Incorrect password')

      // add relevant data to token
      const payload = {id: user._id, email: user.email}

      jwt.sign(payload, config.secret, {}, function(err, token) {
        if (err) return callback(err)

        user.token = token
        user.save((err) => {
          if (err) return callback(err)
          res.json({token})
        })
      })
    })
  })
}
```
```
    ~/cs50m/src1/ $ node a-callbackAuth.js
    ~/cs50m/src1/ $ 
```
---
[:top: Top](#top)
[10:17]

### Promises
- Alleviate “callback hell”
- Allows you to write code that assumes a value is returned
  within a success function
- Only needs a single error handler

mynote: include "**.then (...**" & "**.catch(...**" 

##### b-promises.js
``` jsx
// this doesn't actually do anything, it's just a demo of Promise syntax

const url = ''

fetch(url)
  .then(function(res) {
    return res.json()
  })
  .then(function(json) {
    return ({
      importantData: json.importantData,
    })
  })
  .then(function(data) {
    console.log(data)
  })
  .catch(function(err) {
    // handle error
  })
```

##### c-promiseAuth.js
``` > cp a-callbackAuth.js c-promisesAuth.js ```
``` jsx
function login(req, res, callback) {
  User.findOne({email: req.body.email})
    .then(function(user) {
      return user.comparePassword(req.body.password)
    })
    .then(function(isMatch) {
      // have to throw in order to break Promise chain
      if (!isMatch) {
        res.status(401).send('Incorrect password')
        throw {earlyExit: true}
      }
      const payload = {id: user._id, email: user.email}
      return jwt.sign(payload, config.secret, {})
    })
    .then(function(token) {
      user.token = token
      return user.save()
    })
    .then(function() {
      res.json({token})
    })
    .catch(function(err) {
      if (!err.earlyExit) callback(err)
    })
}
```
```
    ~/cs50m/src1/ $ node c-promiseAuth.js
    ~/cs50m/src1/ $ 
```
---
[:top: Top](#top)
[21:02]

### Async/Await
- Introduced in ES2017
- Allows people to write async code as if it were
  synchronous

##### d-asyncAwaitAuth.js
``` > cp c-promiseAuth.js d-asyncAwaitAuth.js```

mynote: include "**try {...**" , "**await ...**"
``` jsx
async function login(req, res, callback) {
  try {
    const user = await User.findOne({email: req.body.email})
    const isMatch = await user.comparePassword(req.body.password)

    if (!isMatch) return res.status(401).send('Incorrect password')

    const payload = {id: user._id, email: user.email}
    const token = await jwt.sign(payload, config.secret, {})

    user.token = token
    const success = await user.save()

    res.json({token})
  } catch (err) {
    callback(err)
  }
}
```
```
    ~/cs50m/src1/ $ node d-asyncAwaitAuth.js
    ~/cs50m/src1/ $ 
```
---
[:top: Top](#top) [01:27:00]
### this
- Refers to an object that’s set at the creation of a new
  execution context (function invocation)
- In the global execution context, refers to global object
- If the function is called as a method of an object, `this` is
  bound to the object the method is called on


``` js
      ~/cs50m/ $ node
      Welcome to Node.js v13.7.0.
      Type ".help" for more information.
      > this
      <ref *1> Object [global] {
        global: [Circular *1],
        clearInterval: [Function: clearInterval],
        clearTimeout: [Function: clearTimeout],
        setInterval: [Function: setInterval],
        setTimeout: [Function: setTimeout] {
          [Symbol(util.promisify.custom)]: [Function (anonymous)]
        },
        queueMicrotask: [Function: queueMicrotask],
        clearImmediate: [Function: clearImmediate],
        setImmediate: [Function: setImmediate] {
          [Symbol(util.promisify.custom)]: [Function (anonymous)]
        }
      }
      > console.clear ()
      > this
```
[:top: Top](#top)

#### 12-this.js
``` jsx
greet: function() { console.log('Hi, ' + this.name) }
```

a method is just key where the value is a function. And so in this case, `person.greet` is considered
a method, because `greet` is this function.
``` jsx
const person = {
  name: 'Jordan',
  greet: function() { console.log('Hello, ' + this.name) }
}

person.greet()              // Hello, Jordan

const friend = {
  name: 'david',
}

friend.greet = person.greet
friend.greet()              // Hello, david

this.name = 'Yowone'        // it dont work here, work in console
const greet = person.greet
greet()                     // Hello, undefined
```

``` jsx
      > const person = {name:'Jordan',greet:function(){console.log('hi, ' + this.name)}}
      > person
      { name: 'Jordan', greet: [Function: greet] }
      > person.greet()
      hi, Jordan
      > const greet = person.greet
      > greet()
      hi, undefined
      > this.name = 'Yowone'
      'Yowone'
      > greet()
      hi, Yowone
      > this
      <ref *1> Object [global] {
        global: [Circular *1],
        clearInterval: [Function: clearInterval],
        clearTimeout: [Function: clearTimeout],
        setInterval: [Function: setInterval],
        setTimeout: [Function: setTimeout] {
          [Symbol(util.promisify.custom)]: [Function (anonymous)]
        },
        queueMicrotask: [Function: queueMicrotask],
        clearImmediate: [Function: clearImmediate],
        setImmediate: [Function: setImmediate] {
          [Symbol(util.promisify.custom)]: [Function (anonymous)]
        },
        name: 'Yowone'              // ***
      }
      > 
```

Setting `this` manually
- `bind()`, `call()`, `apply()`
- ES6 arrow notation

`const greet = person.greet.bind({name: this is a bound object'})`  
`person.greet.call ({name: this is a bound object'})`   
`person.greet.apply ({name: this is a bound object'})`

explicit bound

The difference between `bind`, `call`, `apply`. Bind returns a new function which 
we store in `greet` and involve `greet` later, and `call` and `apply` just immediately involved
that.

ES6 arrow notation 

[:top: Top](#top)
##### e-this.js
``` jsx
// NOTE: this doesn't work as a node script, since they are run as modules
// `this` in this case is equal to module.exports, which is an empty object
console.log(this)             // {}

// this logs the global object
function whatIsThis() {
  console.log(this)
}

whatIsThis()                // printed out the 'this' data

// =======================================

const person = {
  name: 'Jordan',
  greet: function() { console.log('Hi, ' + this.name) }
}

person.greet()              // Hi, Jordan

// =====================================

const friend = {
  name: 'David',
}

friend.greet = person.greet

friend.greet()              // Hi, david

// ====================================

const greetPerson = person.greet

greetPerson()               // Hi, undefined

// make greetPerson() work, but not in node
this.name = 'Global'

// browser console or node REPL: Hi, Global
// node script: Hi, undefined
greetPerson()               // Hi, undefined

const reallyGreetPerson = person.greet.bind(person)
reallyGreetPerson()         // Hi, Jordan

person.greet.call({name: 'Yowon'}) // Hi, Yowon
person.greet.apply({name: 'Raylen'}) // Hi, Raylen

// ====================================

const newPerson = {
  name: 'Jordan',
  // arrow notation binds `this` lexically
  greet: () => console.log('Hi, ' + this.name)
}

newPerson.greet()             // Hi, Global

// bound functions cannot be bound again
newPerson.greet.call(person)  // Hi, Global
```
```
    ~/cs50m/src1/ $ node e-this.js
    {}
    <ref *1> Object [global] {
      global: [Circular *1],
      clearInterval: [Function: clearInterval],
      clearTimeout: [Function: clearTimeout],
      setInterval: [Function: setInterval],
      setTimeout: [Function: setTimeout] {
        [Symbol(util.promisify.custom)]: [Function (anonymous)]
      },
      queueMicrotask: [Function: queueMicrotask],
      clearImmediate: [Function: clearImmediate],
      setImmediate: [Function: setImmediate] {
        [Symbol(util.promisify.custom)]: [Function (anonymous)]
      }
    }
    Hi, Jordan
    Hi, David
    Hi, undefined
    Hi, undefined
    Hi, Jordan
    Hi, Yowon
    Hi, Raylen
    Hi, Global
    Hi, Global
    ~/cs50m/src1/ $ 
```
---


Browsers and the DOM
- Browsers render HTML to a webpage
- HTML defines a tree-like structure
- Browsers construct this tree in memory before painting the
  page
- Tree is called the Document Object Model
- The DOM can be modified using JavaScript


##### simple.html
``` html

<!DOCTYPE html>
<html>
  <head>
    <title>This is a simple page</title>
  </head>
  <body>
    <h1>This is the title</h1>
    <p>And this is a paragraph</p>
  </body>
</html>
```
[:top: Top](#top)

---
myNote
---

#### JS Arrow Function  
w3schools.com  
Before:
```
hello = function() {
  return "Hello World!";
}
```
With Arrow Function:
```
hello = () => "Hello World!";
```
With Parameters:
```
hello = (val) => "Hello " + val;
```

#### Git branch 02_JS_ES6
```
    Ts-MacBook-Pro:cs50m twng$ git status
      On branch master
    Ts-MacBook-Pro:cs50m twng$ git branch 02_JS_ES6
    Ts-MacBook-Pro:cs50m twng$ git checkout 02_JS_ES6
    Ts-MacBook-Pro:cs50m twng$ git branch
    Ts-MacBook-Pro:cs50m twng$ ls
      <files.js>
    Ts-MacBook-Pro:cs50m twng$ git add .    
    Ts-MacBook-Pro:cs50m twng$ git status
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git push origin 02_JS_ES6
```
checked on github, 

--
vim, see https://github.com/alvinng222/cs50-mobile/blob/master/vimtutor.md

:joy: markdownGuide https://www.markdownguide.org/basic-syntax/     
:sunny: https://www.markdownguide.org/extended-syntax/

:+1: emoji short code: https://gist.github.com/rxaviers/7360908

go to top of the page
```markdown
[top]: topOfThePage
[Go to top of the page](#top)
```
[:top: Top](#top)

--- 
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)   
back to previous: [01_Javascript_src](https://github.com/alvinng222/cs50m/tree/01_Javascript_src)  
continue to next: [03_ReactPropsState](https://github.com/alvinng222/cs50m/tree/03_ReactPropsState).

---
