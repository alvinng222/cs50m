Overview, Javascript
===
[top]: topOfThePage

Lecture: http://video.cs50.net/mobile/2018/spring/lectures/0

Slides: http://cdn.cs50.net/mobile/2018/spring/lectures/0/lecture0.pdf
- JavaScript is Interpreted
- Syntax
- Types
- Typecasting? Coercion
- Objects, Arrays, Functions, Objects
- Primitive vs Objects
- Prototypal Inheritance
- Scope
- The JavaScript Engine
- The Global Object
- Closures



[Source Code](#source-code)  
files: src0.zip

`Ts-MacBook-Pro:cs50m twng$ ls -1`
0-syntax.js
1-types.js
2-objects.js
3-objectMutation.js
4-scopeVariables.js
5-scopeFunctions.js


[**myNote**](#mynote)

---
[:top: Top](#top)
### JavaScript is Interpreted
* They each implement the ECMAScript standard, but may differ for anything not defined by the standard
* Each browser has its own JavaScript engine, which either interprets the code, or uses some sort of lazy compilation
  * V8: Chrome and Node.js
  * SpiderMonkey: Firefox
  * JavaScriptCore: Safari
  * Chakra: Microsoft Edge/IE

### Syntax
``` js
const firstName = "jordan";
const lastName = 'Hayashi';
const arr = ['teaching', 42, true, function() {
console.log('hi') }];
// hi I'm a comment
for (let i = 0; i < arr.length; i++) {
 console.log(arr[i]);
}
```

### Types
* Primitive types (no methods, immutable)
  * undefined
  * null
  * boolean
  * number
  * string
  * (symbol)
* Objects

### Typecasting? Coercion
* Explicit vs. Implicit coercion
   * `Const x + 42;`
   * `Const explicit = string(x); // explicit === “42”`
   * `Const implicit = x + “”; // implicit === “42”`

terminal:
* `typeof null  // object`
* never use double equal, '=='

Coercion, cont.
* which values are falsy?
  * undefined
  * null
  * false
  * +0, -0, Nan
  * ""
* Which values are truthy?
  * {}
  * []
  * Everything else

### Objects, Arrays, Functions, Objects
* Did I put Objects twice?
* Nope, I put it 4 times
*
* Everything else is an object
* Prototype Inheritance

### Primitive vs Objects
* Primitives are immutable
* Objects are mutable and stored by reference
* Passing by reference vs. passing by value

terminal:
* 3 different ways to create object
  * `const o = new object()`
  * `const o2 = {}`
  * `const o3 = { ... },`

Chrome Console:
``` 
  > o3.address.number
  > o3.address[‘number’]
  > o3[“1”] // “test”
  > o3[1] // “test”
```
terminal:
```
  > const o2 = Object.assign({}.o)
  > o2.obj.key = ‘new value’
  > console.log(o.obj.key)
```
### Prototypal Inheritance 
* Non-primitive types have a few properties/methods associated with them
  * Array.prototype.push()
  * String.prototype.toUpperCase()
* Each object stores a reference to its prototype
* Properties/methods defined most tightly to the instance have priority

* Most primitive types have object wrappers
  * String()
  * Number()
  * Bo0lean()
  * Object()
  * (Symbol())

example:
```
  > const arr =[]
  > arr.push(‘value’) // 1
  > arr // > [“value”]
  > arr.push(‘value1’) // 2
  > arr // > (2) [“value”, “value1”]
  > arr.__proto__
  > arr.__proto__.__proto__
    >{...}
```
JS will automatically “box” (wrap) primitive values so you have access to methods 
* `42.toString() // Errors`
* `const x = 42; // “42”`
* `x.__proto__ // [Number: 0]`
* `x instanceof Number // false`

[54.00] console:
```
  > const num = 42
  > num.toString() // “42”
  > num.__proto__
    > Number{...}
```
Prototypal Inheritance
* Why use reference to prototype?
* What’s the alternative
* What's the danger?

FYI: changing the Prototype is NOT recommended
```
  > Number.prototype.toString = function() { return “100” }
  > num.toString() // “100”
  > const num2 = 50
  > num2.toString() // “100”
```

[57.56] 
### Scope
* Variable lifetime
  * Lexical scoping (var): from when they’re declared until when their function ends
  * Block scoping (const, let): until the next } is reached
* Hoisting
  * Function definitions are hoisted, but not lexically-scoped initializations
  
mynote:
* const - cannot update
* let - can be updated 
* JavaScript interpreters reading top to bottom

Hosting -take the definition of something and host it to the TOP, 
such as function definition, `var`

[13:39]
### The JavaScript Engine
* Before executing the code, the engine reads the entire file and will throw a syntax error if one is found
  * Any function definitions will be saved in memory
  * Variable initializations will not be run, but lexically-scoped variable names will be declared

myNote:
* There is not a good reason to use `var`.
* `thisIsAlsoAVariable = ‘hello’ // no reason to do it`

### The Global Object
* All variables and functions are actually parameters and methods on the global object
  * Browser global object is the `window` object
  * Node.js global object is the `global` object

At the browser env, console:
```
  > console.clear
  > window
  v Window {...} //a lot in its 
  // anythings u declared get it into this window object
```
console: brand new tag will be a lot fewer variables 
```
  > const x = ‘this is a new variable’
  > x // “this is a new variable”
  > window.x
  > undefined 
  > var y = ‘this is a new variable’
  > window.y // “this is a new variable”` // that how JavaScript keep track of all variable
```
In Terminal:
* `window` not define in the ‘node’ environment 
  * `> global`

In window console:
* `global` not define in the console

[24:40]
### Closures
* Function that refer to variables declared by parent function
* Possible because of scoping
``` js
function makeFunctionArray() {
   const arr = []

   for (var i = 0; i < 5; i ++) {
      arr.push(function() { console.log(i) })
   }
   return arr
  // arr[0] ()
}

const arr = makeFunctionArray()

arr[0] ()

 // 5
```
---
[:top: Top](#top)

---
Source Code:
---
#### 0-syntax.js
``` js
// comments are prefixed with double slashes
/*
 * Multi-line comments look like this
 */

// camelCase is preferred
// double-quotes create strings
const firstName = "jordan";

// semicolons are optional
// single-quotes also create strings
const lastName = 'Hayashi'

// arrays can be declared inline
// arrays can have multiple types (more on types later)
const arr = [
  'string',
  42,
  function() { console.log('hi') },
]

// this returns the element at the 2nd index and invokes it
arr[2]()

// this will iterate through the array and console log each element
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```
``` 
    ~/cs50m/src0/ $ node 0-syntax.js
    hi
    string
    42
    [Function (anonymous)]
    jordan Hayashi
```
---

#### 1-types.js
``` js
const x = 42

// get type by using "typeof"
console.log(typeof x)
console.log(typeof undefined)

// this may surprise you...
console.log(typeof null)
```
```
    ~/cs50m/src0/ $ node 1-types.js
    number
    undefined
    object
```
---

#### 2-objects.js  *****
``` js

const o = new Object()
o.firstName = 'Jordan'
o.lastName = 'Hayashi'
o.isTeaching = true
o.greet = function() { console.log('Hello!') }

console.log(JSON.stringify(o))  // *****

const o2 = {}
o2['firstName'] = 'Jordan'
const a = 'lastName'
o2[a] = 'Hayashi'

const o3 = {
  firstName: 'Jordan',
  lastName: 'Hayashi',
  greet: function() {
    console.log('hi')
  },
  address: {
    street: "Main st.",
    number: '111'
  }
}

// see 3-objectsMutation.js for more objects
```
```
    ~/cs50m/src0/ $ node 2-objects.js
    {"firstName":"Jordan","lastName":"Hayashi","isTeaching":true}
```
---

#### 3-objectMutation.js
```js
const o = {
  a: 'a',
  b: 'b',
  obj: {
    key: 'key',
  },
}

const o2 = o

o2.a = 'new value'

// o and o2 reference the same object
console.log(o.a)

// this shallow-copies o into o3  *****
const o3 = Object.assign({}, o)

// deep copy
function deepCopy(obj) {
  // check if vals are objects
  // if so, copy that object (deep copy)
  // else return the value
  const keys = Object.keys(obj)

  const newObject = {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (typeof obj[key] === 'object') {
      newObject[key] = deepCopy(obj[key])
    } else {
      newObject[key] = obj[key]
    }
  }

  return newObject
}

const o4 = deepCopy(o)

o.obj.key = 'new key!'
console.log(o4.obj.key)
```
```
    ~/cs50m/src0/ $ node 3-objectMutation.js
    new value
    key
```
``` js
    // LEARNING from 3-objectMutation.js
    const o = {
        a: 'a',
        b: 'b',
        obj: {
            key: 'key',
        }
    };

    // deep copy
    function deepCopy(obj) {
        const keys = Object.keys(obj);
        const newObject = {};
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (typeof obj[key] === 'object') {
                newObject[key] = deepCopy(obj[key]);
            } else {
                newObject[key] = obj[key];
            }
        }

        return newObject;
    }

    // normal copy, o2 = o
    const o2 = o;
    // shallow copy, o3, only independent at 1st level
    const o3 = Object.assign({},o);
    // deepcopy, independent at all levels
    const o4 = deepCopy(o);

    o.obj.key = 'oo key!'; o2.obj.key = 'o2 key';
    o3.obj.key = 'o3key'; // it equal to o.obj & o2.obj
    o4.obj.key = 'o4key'; // dont duplicate
    o2.b = 'o2b'; o3.a = 'o3a'; o4.a = 'o4a'; o.c = 'oc';
    console.log('json o:  ' + JSON.stringify(o));
    console.log('json o2: ' + JSON.stringify(o2));
    console.log('json o3: ' + JSON.stringify(o3));
    console.log('json o4: ' + JSON.stringify(o4));
    /*
    json o:  {"a":"a","b":"o2b","obj":{"key":"o3key"},"c":"oc"}
    json o2: {"a":"a","b":"o2b","obj":{"key":"o3key"},"c":"oc"}
    json o3: {"a":"o3a","b":"b","obj":{"key":"o3key"}}
    json o4: {"a":"o4a","b":"b","obj":{"key":"o4key"}}
    */
```
---

#### 4-scopeVariables.js
``` js
// "var" is lexically scoped, meaning it exists from time of declaration to end of func
if (true) {
  var lexicallyScoped = 'This exists until the end of the function'
}

console.log(lexicallyScoped)

// "let" and "const" are block scoped
if (true) {
  let blockScoped = 'This exists until the next }'
  const alsoBlockScoped = 'As does this'
}

// this variable doesn't exist
console.log(typeof blockScoped)

thisIsAlsoAVariable = "hello"

const thisIsAConst = 50

// thisIsAConst++ // error!

const constObj = {}

// consts are still mutable
constObj.a = 'a'

let thisIsALet = 51
thisIsALet = 50

// let thisIsALet = 51 // errors!

var thisIsAVar = 50
thisIsAVar = 51
var thisIsAVar = 'new value!'
```
```
    ~/cs50m/src0/ $ node 4-scopeVariables.js
    This exists until the end of the function
    undefined
```
``` js
    // LEARNING from  4-scopeVariablies.js
    const constObj = {};

    if (true) {
        var lexicallyScoped = "This var exits ...";
        let blockScoped = 'THis exists until the next }';
        const alsoBlockScoped = 'As does this';
        constObj.a = 'this is mutated';
    }

    console.log (lexicallyScoped);      // This var exits ...
    console.log (typeof blockScoped);   // undefined
    console.log (typeof alsoBlockScoped); // undefined
    console.log (constObj.a);       // this is mutated
    console.log (constObj);     // { a: 'this is mutated' }
```
---

#### 5-scopeFunctions.js
``` js
// functions are hoisted
thisShouldWork() // was hoistedFunction() // mynote: protocol for function tobe create

// but only if they are declared as functions and not as variables initialized to
// anonymous functions
console.log("typeof butNotThis: " + typeof butNotThis)

function thisShouldWork() {
    console.log("functions are hoisted")
}

var butNotThis = function() {
    console.log("but variables aren't")
}
```
```
    ~/cs50m/src0/ $ node 5-scopeFunctions.js
    functions are hoisted
    typeof butNotThis: undefined
```

---
myNote
---
#### Git
Video: https://youtu.be/SWYqp7iY_Tc

Basic commands
* $ git init // Initialise local Git depository
* $ git add <file> // add file(s) to index
* $ git status // check status of working tree 
* $ git commit // commit changes in index
* $ git push // push to remote depository
* $ git pull // pull latest from remote depository
* $ git clone // clone depository to a new Directory

create git, depository
``` 
on mac auto install `Install Command Line Development Tools`
    Ts-MacBook-Pro:~ twng$ mkdir cs50m
    Ts-MacBook-Pro:cs50m twng$ git --help
    Ts-MacBook-Pro:cs50m twng$ git --version
    git version 2.21.0 (Apple Git-122)
    Ts-MacBook-Pro:cs50m twng$ git config --global user.name "alvinng222"
    Ts-MacBook-Pro:cs50m twng$ git config --global user.email alvinng222@gmail.com

    Ts-MacBook-Pro:cs50m twng$ git remote add origin https://github.com/alvinng222/cs50m.git
    Ts-MacBook-Pro:cs50m twng$ git remote -v
    origin	https://github.com/alvinng222/cs50m.git (fetch)
    origin	https://github.com/alvinng222/cs50m.git (push)
    vim README.md
    Ts-MacBook-Pro:cs50m twng$ git commit
    Ts-MacBook-Pro:cs50m twng$ git status
```
Git branch 01_Javascript_src
```
    Ts-MacBook-Pro:cs50m twng$ git branch 01_Javascript_src
    Ts-MacBook-Pro:cs50m twng$ git checkout 01_Javascript_src
    Ts-MacBook-Pro:cs50m twng$ git status
    On branch 01_Javascript_src
    nothing to commit, working tree clean
```

https://nodejs.org/en/


--

:joy: markdownGuide https://www.markdownguide.org/basic-syntax/     
:sunny: https://www.markdownguide.org/extended-syntax/

:+1: emoji short code: https://gist.github.com/rxaviers/7360908

go to top of the page
```markdown
[top]: topOfThePage
[Go to top of the page](#top)
```

---
[:top: Top](#top)

---
back to previous: [13_Deploying_Testing](13_Deploying_Testing.md).   
continue to next: [02_JS_ES6.md](02_JS_ES6.md).

