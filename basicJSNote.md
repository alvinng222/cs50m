

is good to memorise this:
``` javascript
// IIFEs can also be used to create variables that are inaccessible from the global scope
const counter = function(){
  let count = 0;
  return {
    inc: function() {count = count + 1},
    get: function() {console.log('count ' + count)},
  };
} ();

counter.get();
counter.inc();
counter.get();
```
OR
``` js
// IIFEs can also be used to create variables
// that are inaccessible from the global scope

function calCount() {
  let count = 0;

  const showCount = {
    inc: function() {
      count = count + 1;
    },
    get: function() {
      console.log('count ' + count);
    },
  };

  return showCount;
}

const counter = calCount();   // const counter = (calCount)();

counter.get();
counter.inc();
counter.get();
```
---
* 3 different ways to create object
  * ` const o = new object() `
  * ` const o2 = {} `
  * ` const o3 = { ... } `, 
---

First-Class Functions: **map(), filter(), reduce()**

at browser' Javascript console, or at IDE Node.js console
``` Javascript console
    > x.map
    VM27:1 Uncaught ReferenceError: x is not defined
        at <anonymous>:1:1
    > const x = [0,1,2,3]
    undefined
    > function addOne(number) {return number + 1}
    undefined
    > x.map
    ƒ map() { [native code] }
    > x.map(addOne)
    (4) [1, 2, 3, 4]
    > function isGreaterThanOne(num) {return num > 1}
    undefined
    > x.filter(isGreaterThanOne)
    (2) [2, 3]
    > function add(x, y) {return x +y}
    undefined
    > x.reduce(add)
    6
    > z = x.map(addOne)
    [ 1, 2, 3, 4 ]
```


### Mozilla Javascript
**Details of the object model**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
The employee example, Object properties, More flexible constructors, Property inheritance revisited  
Enter multiple lines in Chrome JS console. - After typing out the first line, instead of hitting enter, hit shift + enter. This will bring you the next line without executing the code.  
for now, remember to always include the ```(function(){"use strict";``` before your code, and add ```})();``` to the end of your code. 

#### Defining functions
A **function definition** (also called a **function declaration**, or **function statement**) consists of the ```function``` keyword, followed by:  
- The name of the function.
- A list of parameters to the function, enclosed in parentheses and separated by commas.
- The JavaScript statements that define the function, enclosed in curly brackets, ```{...}```.

#### Function expressions
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions 

In the following code, the function receives a function defined
by a function expression and executes it for every element of 
the array received as a second argument.

``` js
function map(f, a) {
  let result = []; // Create a new Array
  let i; // Declare variable
  for (i = 0; i != a.length; i++)
    result[i] = f(a[i]);
  return result;
}
const f = function(x) {
   return x * x * x;
}
let numbers = [0, 1, 2, 5, 10];
let cube = map(f,numbers);
console.log(cube); // [ 0, 1, 8, 125, 1000 ]
```
#### Calling functions
**Calling** the function actually performs the specified actions with the indicated parameters. For example, if you define the function square, you could call it as follows:  
` square(5);`

#### Scope and the function stack
**Recursion**: 
A function can refer to and call itself. There are three ways for a function to refer to itself:
- The function's name
- ```arguments.callee```
- An in-scope variable that refers to the function

recursion itself uses a stack: the function stack. The stack-like behavior can be seen in the following example:
``` js
function foo(i) {
  if (i < 0)
    return;
  console.log('begin: ' + i);
  foo(i - 1);
  console.log('end: ' + i);
}
foo(3);
// begin: 3 // begin: 2 // begin: 1 // begin: 0 // end: 0 // end: 1 // end: 2 // end: 3
```

#### Nested functions and closures
You may nest a function within another function. The nested (inner) function is private to its containing (outer) function.  
It also forms a *closure*. A closure is an expression (most commonly, a function) that can have free variables together with an environment that binds those variables (that "closes" the expression).  
Since a nested function is a closure, this means that a nested function can "inherit" the arguments and variables of its containing function. In other words, the inner function contains the scope of the outer function.

To summarize:  
- The inner function can be accessed only from statements in the outer function.
- The inner function forms a closure: the inner function can use the arguments and variables of the outer function, while the outer function cannot use the arguments and variables of the inner function.

The following example shows nested functions:
``` js
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
a = addSquares(2, 3); // returns 13
b = addSquares(3, 4); // returns 25
c = addSquares(4, 5); // returns 41
```
Since the inner function forms a closure, you can call the outer function and specify arguments for both the outer and inner function:
``` js
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
result = fn_inside(5); // returns 8
result1 = outside(3)(5); // returns 8
```
---
#### Closures
Closures are one of the most powerful features of JavaScript. JavaScript allows for the nesting of functions and grants the inner function full access to all the variables and functions defined inside the outer function (and all other variables and functions that the outer function has access to).

However, the outer function does not have access to the variables and functions defined inside the inner function. This provides a sort of encapsulation for the variables of the inner function.

Also, since the inner function has access to the scope of the outer function, the variables and functions defined in the outer function will live longer than the duration of the outer function execution, if the inner function manages to survive beyond the life of the outer function. A closure is created when the inner function is somehow made available to any scope outside the outer function.
``` js
var pet = function(name) {   // The outer function defines a variable called "name"
  var getName = function() {
    return name;             // The inner function has access to the "name" variable of the outer 
                             //function
  }
  return getName;            // Return the inner function, thereby exposing it to outer scopes
}
myPet = pet('Vivie');
   
myPet();                     // Returns "Vivie"
```
---
#### Using the arguments object
The arguments of a function are maintained in an array-like object. Within a function, you can address the arguments passed to it as follows:  
   `arguments[i]`
   
where `i` is the ordinal number of the argument, starting at 0. So, the first argument passed to a function would be `arguments[0]`. The total number of arguments is indicated by `arguments.length`.

Using the arguments object, you can call a function with more arguments than it is formally declared to accept.

``` js
function myConcat(separator) {
   var result = ''; // initialize list
   var i;
   // iterate through arguments
   for (i = 1; i < arguments.length; i++) {
      result += arguments[i] + separator;
   }
   return result;
}

// returns "red, orange, blue, "
myConcat(', ', 'red', 'orange', 'blue');

// returns "elephant; giraffe; lion; cheetah; "
myConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah');

// returns "sage. basil. oregano. pepper. parsley. "
myConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley');
```
Note: The arguments variable is "array-like", but not an array. It is array-like in that it has a numbered index and a length property. However, it does not possess all of the array-manipulation methods.

---
#### Arrow functions
An *arrow function expression* (previously, and now incorrectly known as **fat arrow function**) has a shorter syntax compared to function expressions and does not have its own ```this```, *arguments, super, or new.target*. Arrow functions are always anonymous. See also this hacks.mozilla.org blog post: "ES6 In Depth: Arrow functions".

Two factors influenced the introduction of arrow functions: shorter functions and non-binding of ```this```.

##### Shorter functions
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
``` javascript
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

##### No separate ```this```
Until arrow functions, every new function defined its own ```this``` value (a new object in the case of a constructor, undefined in *strict mode* function calls, the base object if the function is called as an "object method", etc.). This proved to be less than ideal with an object-oriented style of programming.
``` js
function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this` 
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

var p = new Person();
```
...

An arrow function does not have its own ```this```; the ```this``` value of the enclosing execution context is used. Thus, in the following code, the ```this``` within the function that is passed to ```setInterval``` has the same value as ```this``` in the enclosing function:
``` js
function Person() {
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
```
---
### Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.

a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

##### Guarantees
Unlike "old-style", *passed-in* callbacks, a promise comes with some guarantees:

- Callbacks will never be called before the **completion of the current run** of the JavaScript event loop.
- Callbacks added with ```then()``` even after the success or failure of the asynchronous operation, will be called, as above.
- Multiple callbacks may be added by calling ```then()``` several times. Each callback is executed one after another, in the order in which they were inserted.
One of the great things about using promises is **chaining**.

Chaining - A common need is to execute two or more asynchronous operations back to back, where each subsequent operation starts when the previous operation succeeds, with the result from the previous step. We accomplish this by creating a **promise chain**.

Here's the magic: the ```then()``` function returns a new promise, different from the original:
``` js
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
```
or
``` js
const promise2 = doSomething().then(successCallback, failureCallback);
```
... modern functions, we attach our callbacks to the returned promises instead, forming a promise chain:
``` js
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```
The arguments to ```then``` are optional, and ```catch(failureCallback)``` is short for ```then(null, failureCallback)```. You might see this expressed with **arrow functions** instead:
``` js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```
Important: Always return results, otherwise callbacks won't catch the result of a previous promise (with arrow functions ```() => x``` is short for ```() => { return x; })```.

Error propagation...
 read more about the syntax 
- https://developers.google.com/web/fundamentals/primers/async-functions

See Also
- Promises.then() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
- async/await https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

---
### Modules
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

Basic example structure
https://github.com/mdn/js-examples/tree/master/modules/basic-modules

---
