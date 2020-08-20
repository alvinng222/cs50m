Lecture 12: Deploying, Testing
===
[top]: topOfThePage

lecture: http://video.cs50.net/mobile/2018/spring/lectures/12

slides: http://cdn.cs50.net/mobile/2018/spring/lectures/12/lecture12.pdf

- [Deploying](#deploying)
- [Deploying, cont.](#deploying-cont)
- [Testing](#testing)
- [Test Pyramid](#test-pyramid)
- [Unit Tests](#unit-tests)
- [Jest](#jest)
- [Jest: Testing Redux Actions](#jest-testing-redux-actions)
- [Jest: Testing Async Redux Actions](#jest-testing-async-redux-actions)
- [Integration Tests](#integration-tests)
- [Code Coverage](#code-coverage)
- [End-To-End Tests](#end-to-end-tests)
- Thanks!


[Source Code](#source-code)
files: src12.zip

[before/...](#before)
AddContactForm.js
App.js
FlatListContacts.js
Row.js
ScrollViewContacts.js
SectionListContacts.js
api.js
contacts.js
[package.json](#beforepackagejson)   
before/authServer/...
    README.md
    index.js
    package.json   
before/redux/...
    [actions.js](#beforereduxactionsjs)
    [reducer.js](#beforereduxreducerjs)
    [store.js](#beforereduxstorejs)   
before/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    LoginScreen.js
    SettingsScreen.js   
before/simpleRedux/...
    reducer.js
    store.js
    store2.js
    store3.js   

[after/...](#after)
AddContactForm.js
App.js
FlatListContacts.js
Row.js
ScrollViewContacts.js
SectionListContacts.js
api.js
contacts.js
[package.json](#afterpackagejson)   
after/authServer/...
    README.md
    index.js
    package.json   
after/components/...
    [MyButton.js](#aftercomponentsmybuttonjs)
    [MyButton.test.js](#aftercomponentsmybuttontestjs)    
after/redux/...
    [actions.js](#afterreduxactionsjs)
    [actions.test.js](#afterreduxactionstestjs)
    [reducer.js](#afterreduxreducerjs)
    [reducer.test.js](#afterreduxreducertestjs)
    store.js   
after/screens/...
    AddContactScreen.js
    ContactDetailsScreen.js
    ContactListScreen.js
    LoginScreen.js
    SettingsScreen.js   
after/simpleRedux/...
    reducer.js
    store.js
    store2.js
    store3.js   
after/testing/...
    [sum.js](#aftertestingsumjs)
    [sum.test.js](#aftertestingsumtestjs)

[**myNote**](#mynote)

---
[:top: Top](#top)
### Previous Lecture [12_Performance](https://github.com/alvinng222/cs50m/tree/12_Performance)
- Performance Trade-Offs
- React Native Perf Monitor
- Chrome Performance Profiler
- Common Inefficiencies
    - Rerendering too often
    - Unnecessarily changing props
    - Unnecessary logic
- Animated

### Deploying
- Deploy to the appropriate store by building the app and
uploading it to the store
- Set the correct metadata in app.json
    - https://docs.expo.io/versions/latest/workflow/configuration
- Build the app using exp (command-line alternative to the
XDE)
    - Install with `npm install --global exp`
    - Build with `exp build:ios` or `exp build:android`
    - Expo will upload the build to s3
    - Run `exp build:status` and paste the url in a browser to download

Before you upload to the store, you need to set the correct metadata in app.json.
Then you build using the command-line exp. 
Because the XDE does not allow you to build the app within that GUI.

### Deploying, cont.
- Upload to the appropriate store
    - https://docs.expo.io/versions/latest/distribution/building-standalone-apps
    - https://docs.expo.io/versions/latest/distribution/app-stores
- Deploy new JS by republishing from the XDE or exp
    - Rebuild app and resubmit to store to change app metadata

### Testing
- The term “testing” generally refers to automated testing
- As an application grows in size, manual testing gets more
difficult
    - More complexity means more points of failure
- Adding a test suite ensures that you catch bugs before
they get shipped
- How do we know which parts of our app to test?

### Test Pyramid
- Methodology for determining test scale/granularity
- Unit tests
    - Test an individual unit of code (function/class/method)
- Integration/Service tests
    - Test the integration of multiple pieces of code working together,
independent of the UI
- UI/End-to-end tests
    - Test a feature thoroughly including the UI, network calls, etc.

### Unit Tests
- Test an individual unit of code (function/class/method)
- Very granular and easy to tell what is breaking
- The most basic test is a function that notifies you when
behavior is unexpected
- Testing frameworks give you additional benefits
    - Run all tests instead of failing on first error
    - Pretty output
    - Automatically watch for changes
    - Mocked functions

[:top: Top](#top)
#### console.assert
The most basic test is a function that notifies you when
behavior is unexpected

.01 testing/sum.js > no result is good
``` jsx
function sum(x, y) {
  return x + y
}

console.assert(sum(1,1) === 2, 'Error summing 1 and 1')
// ~/cs50m/myLearning/src4/before/testing/ $ node sum.js
// ~/cs50m/myLearning/src4/before/testing/ $
```
.02 sum.js, if error
``` jsx
/* eslint-disable no-console */
function sum(x, y) {
  return x + y
}

console.assert(sum(1,1) === 3, 'Error summing 1 and 1')
// ~/cs50m/myLearning/src4/before/testing/ $ node sum.js
// Assertion failed: Error summing 1 and 1
```
.03 sum.js more checks
``` jsx
/* eslint-disable no-console */
function sum(x, y) {
  return x + y
}

console.assert(sum(1,1) === 2, 'Error summing 1 and 1')
console.assert(sum(0,0) === 0, 'Error summing 0 and 0')
console.assert(sum(20,30) === 50, 'Error summing 20 and 30')
// ~/cs50m/myLearning/src4/before/testing/ $ node sum.js
// ~/cs50m/myLearning/src4/before/testing/ $
```
.04 sum.js, split files to sum.test.js. For `module.export` Same way of doing export default in ES6 for node
``` jsx
/* eslint-disable no-console */
function sum(x, y) {
  return x + y
}

module.exports = sum // just for node
```
.04b sum.**test.js**, for `require` same way of import in ES6 for node.
``` jsx
const sum = require('./sum.js')

console.assert(sum(1,1) === 2, 'Error summing 1 and 1')
console.assert(sum(0,0) === 0, 'Error summing 0 and 0')
console.assert(sum(20,30) === 50, 'Error summing 20 and 30')

//Ts-MacBook-Pro:testing twng$ node sum.test.js
//Ts-MacBook-Pro:testing twng$ 
```
[:top: Top](#top)

### Jest
- “Delightful JavaScript Testing”
- A testing framework by Facebook
- Install with `npm install --save-dev jest`
- Run with `npx jest` or by adding script to package.json
    - Will automatically find and run any files that end in `.test.js`(or any
other regex expression that you specify)

:point_right: after install expo minimum, and install all components. But *not* copy contacts files, not require to run Expo.

.05 installing jest  
`~/cs50m/myLearning/src4/before/ $ npm i -D jest`
[14:05]


.06 ~/cs50m/myLearning/src4/before/package.json adding jest to script 
``` json
,
  "scripts": {
    "test": "jest"
  }
}

```
Terminal
``` console
Ts-MacBook-Pro:Jul06 twng$ npm i -D jest
...
Ts-MacBook-Pro:Jul06 twng$ cd testing
Ts-MacBook-Pro:testing twng$ npx jest
 FAIL  ./sum.test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.

      at onResult (node_modules/@jest/core/build/TestScheduler.js:173:18)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        6.56 s
Ran all test suites.
```

.07 `~/cs50m/myLearning/src4/before/ $ npx jest` or  
.08 `~/cs50m/myLearning/src4/before/ $ npm run test` or short hand  
.08b `~/cs50m/myLearning/src4/before/ $ npm test` or shorted hand  
.08c `~/cs50m/myLearning/src4/before/ $ npm t`

[0:15:27] Rather than using console.assert, let's go ahead and use Jest.
We just replaced the console.assert ...

.09 sum.test.js skipped all 3 tests. > missing argument.
``` jsx
const sum = require('./sum.js')

test('sums 1 and 1')
test('sums 0 and 0')
test('sums 20 and 30')

// ~/cs50m/myLearning/src4/before/ $ npm t
```
.10 sum.test.js
``` jsx
/* global test, expect */

const sum = require('./sum.js')

test('sums 1 and 1', () => {
  expect(sum(1, 1)).toBe(2)
}) // .10

test('sums 0 and 0', () => {
  expect(sum(0, 0)).toBe(0)
}) //.10b

test('sums 20 and 30', () => {
  expect(sum(20, 30)).toBe(50)
}) //.10b
```
Terminals
``` console
Ts-MacBook-Pro:Jul06 twng$ npm test

> @ test /Users/twng/cs50m/JUl06
> jest

 PASS  testing/sum.test.js
  ✓ sums 1 and 1 (2 ms)
  ✓ sums 0 and 0
  ✓ sums 20 and 30
  ✓ sums 20 and 22 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        7.49 s
Ran all test suites.
```
#### npm test -- --watch
.11 add script to watch all flies   
Terminal left `$ npm test -- --watch`   
Terminal right edit the `sum.test.js`, the terminal will update automatically

.12 sum.test.js auto test with result
``` jsx
test('sums 20 and 22', () => {
  expect(sum(20, 22)).toBe(42)
}) //.12
```
.13 package.json, without git i used watchAll
``` jsx
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```
#### npm run test:watch
.13b `~/cs50m/myLearning/src4/before/ $ npm run test:watch`
``` console
         PASS  testing/sum.test.js
          ✓ sums 1 and 1 (2 ms)
          ✓ sums 0 and 0 (1 ms)
          ✓ sums 20 and 30
          ✓ sums 20 and 22

        Test Suites: 1 passed, 1 total
        Tests:       4 passed, 4 total
        Snapshots:   0 total
        Time:        2.291 s
        Ran all test suites.

        Watch Usage
         › Press f to run only failed tests.
         › Press o to only run tests related to changed files.
         › Press p to filter by a filename regex pattern.
         › Press t to filter by a test name regex pattern.
         › Press q to quit watch mode.
         › Press Enter to trigger a test run.

```
[:top: Top](#top) [22.10]

---
### Jest: Testing Redux Actions
- We can replace our functions with Jest’s `expect()`,
`toBe()`, and `toEqual()`
- We can use snapshots to compare the output of a function
to the previous output of the function
    - We get notified if the output changes
    - We don’t need to rewrite tests if the change was intended
- Which should we use?
    - Use `toBe()` for primitives
    - Use `toEqual()` for objects that shouldn’t change
    - Use `snapshots` for objects that may change

:point_right: Just copy all necessary files of contacts only, not run Expo.

.14 new redux/actions.test.js, add in actions `import * as actions`
``` jsx
import * as actions from './actions'

test('updateUser returns an action', () => {
  expect(actions.updateUser({name: 'test name'})).toBe({                        
    type: actions.UPDATE_USER, 
    payload: {name: 'test name'},
  })  
})
```
``` console
Ts-MacBook-Pro:Jul06 twng$ npm test

> @ test /Users/twng/cs50m/JUl06
> jest

 PASS  testing/sum.test.js (5.663 s)
 FAIL  before/redux/actions.test.js
  ● updateUser returns an action

    expect(received).toBe(expected) // Object.is equality

    If it should pass with deep equality, replace "toBe" with "toStrictEqual"

    Expected: {"payload": {"name": "test name"}, "type": "UPDATE_USER"}
    ...
```
update the correct checking code, chance `toEqual` from `toBe`:
``` jsx
  expect(actions.updateUser({name: 'test name'})).toEqual({ 
  ...
```
$ npm test
``` console
...
 PASS  testing/sum.test.js
 PASS  before/redux/actions.test.js (8.788 s)

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        18.676 s
Ran all test suites.
```
Add a few more tests ...
#### toMatchSnapshot
``` jsx
import * as actions from './actions'

test('updateUser returns an action', () => {
  expect(actions.updateUser({name: 'test name'})).toMatchSnapshot()
}) 
```
``` console
Ts-MacBook-Pro:Jul06 twng$ npm test

> @ test /Users/twng/cs50m/JUl06
> jest

 PASS  testing/sum.test.js (6.101 s)
 PASS  before/redux/actions.test.js (9.844 s)
 › 1 snapshot written.

Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   1 written, 1 total
Time:        19.67 s
Ran all test suites.
Ts-MacBook-Pro:Jul06 twng$ 
```
[0:31:19] And now let's change it to see if the snapshot--   
action.js, maybe add debug flag
``` jsx
// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
  debug: false,
})    
```
``` console
Ts-MacBook-Pro:Jul06 twng$ npm test
...
 PASS  testing/sum.test.js
 FAIL  before/redux/actions.test.js (8.153 s)
  ● updateUser returns an action

    expect(received).toMatchSnapshot()

    Snapshot name: `updateUser returns an action 1`
...    
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `npm test -- -u` to update them.

```
[0:32:38] And so how do we let Jest know, hey, we meant for that to happen?
Update your snapshot.
#### npm test -- -u
``` console
Ts-MacBook-Pro:testing twng$ npm test -- -u
...
Snapshot Summary
 › 1 snapshot updated from 1 test suite.
```
[0:33:05] And so let's go ahead and revert our change.
``` jsx
// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
  //debug: false,                                                               
})
```
``` console
Ts-MacBook-Pro:testing twng$ npm test
...
 › 1 snapshot failed.
...
Ts-MacBook-Pro:testing twng$ npm t -- -u
Ts-MacBook-Pro:testing twng$ npm t
```
[0:33:46] So now let's add a few more tests just to make sure everything's working as expected.   
actions.test.js
``` jsx
import * as actions from './actions'

test('updateUser returns an action', () => {
  expect(actions.updateUser({name: 'test name'})).toMatchSnapshot()
})

test('updateUser returns an action when passed empty object', () => {
  expect(actions.updateUser({})).toMatchSnapshot()
})

test('updateUser returns an action when passed empty name', () => {
  expect(actions.updateUser({name: ''})).toMatchSnapshot()
})
```
``` console
Snapshot Summary
 › 2 snapshots written from 1 test suite.
```
[0:34:53] And maybe there's a better way to go ahead and group them together.   
actions.test.js 
``` jsx
import * as actions from './actions'

describe('updateUser returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateUser({name: 'test name'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateUser({})).toMatchSnapshot()
  })

  it('handles empty name', () => {
    expect(actions.updateUser({name: ''})).toMatchSnapshot()
  })
})
```
#### npm test -- -u
update snapshot
``` console
Ts-MacBook-Pro:Jul06 twng$ npm test
...
Ts-MacBook-Pro:Jul06 twng$ npm test -- -u
...
Snapshot Summary
 › 3 snapshots removed from 1 test suite.
   ↳ before/redux/actions.test.js
       • updateUser returns an action 1
       • updateUser returns an action when passed empty name 1
       • updateUser returns an action when passed empty object 1
       ...
Ts-MacBook-Pro:Jul06 twng$ npm test
 PASS  before/redux/actions.test.js
 PASS  testing/sum.test.js
```

### Jest: Testing Async Redux Actions
- Async functions add multiple difficulties
    - We have to wait for the result before testing against the result
    - Our tests may rely on imported libs
    - Our tests may rely on external services
- If we return a Promise, Jest will wait for it to resolve
    - Jest also supports `async/await`
- Jest supports mocking functions
- Dependency injection
    - Pass functions on which other functions rely as arguments
    - Allows us to mock functions that rely on external services

[0:38:10] So what happens if we want to test this async action that we wrote?
#### Jest supports mocking functions
actions.test.js, > see that LOG_IN_SENT
``` jsx
})

describe('logInUser returns actions',() => {
  it('dispatches LOG_IN_SENT', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('', '')(mockDispatch)
    // mockDispatch.mock.calls all the args that the mock fn was invoked on
    console.log(mockDispatch.mock.calls)
  })
})
```
[0:48:26] We see that login was sent, which is great.   
$ npm test
``` console
...
 PASS  before/redux/actions.test.js (23.534s)
  ● Console

    console.log
      [
        [ { type: 'LOG_IN_SENT' } ],
        [ { type: 'LOG_IN_REJECTED', payload: 'fetch is not defined' } ]
      ]

      at _callee$ (before/redux/actions.test.js:22:13)
...
```
So rather than console.logging the mockDispatch.mock.calls,
we can actually expect it to be some value.   
[0:50:33] Well, we should probably use that .toEqual.
``` jsx
describe('logInUser returns actions',() => {
  it('dispatches LOG_IN_SENT', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('', '')(mockDispatch)
    // mockDispatch.mock.calls all the args that the mock fn was invoked on
    //console.log(mockDispatch.mock.calls)
    expect(mockDispatch.mock.calls[0][0]).toEqual({type: actions.LOG_IN_SENT})
  })  
})
```
And now we see that those do, in fact, passed.
``` console
Ts-MacBook-Pro:Jul06 twng$ npm test

> @ test /Users/twng/cs50m/JUl06
> jest

 PASS  testing/sum.test.js
 PASS  before/redux/actions.test.js

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   3 passed, 3 total
Time:        4.572 s
Ran all test suites.
```
[:top: Top](#top) 

#### Dependency injection
[0:52:07] Well, it allows us to mock the functions that rely on external services, which
is pretty nifty.
So rather than using login here, we can make
this [? pure ?] by taking the login function
as an argument in our logInUser.

actions.js, add `loginFn = login`, & changed to `await loginFn(`
``` jsx
// async action creator
export const logInUser = (username, password, loginFn = login) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await loginFn(username, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message})
  }
}   
```
actions.test.js
``` jsx
...
describe('logInUser returns actions',() => {
  it('dispatches LOG_IN_SENT', async () => {
    ...
  })
    
  it('dispatches LOG_IN_FULFILLED with correct creds', async () => {
    const mockDispatch = jest.fn()
    const mockLogin = (username, password) => {
      if (username === 'u' && password === 'p') {
        return 'thisIsATestToken'
      }
      throw new Error('incorrect creds')
    }

    await actions.logInUser('u', 'p', mockLogin)(mockDispatch)

    expect(mockDispatch.mock.calls[1][0]).toEqual({type: actions.LOG_IN_FULFILLED, payload: 'thisIsATestToken'})
    
    expect(mockDispatch.mock.calls[1]).toMatchSnapshot()
  })

})                                                                              
```
$ npm test [1:05:14]
``` console
...
Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   1 written, 3 passed, 4 total
Time:        16.134 s
Ran all test suites.
```
moved mockLogin and test LOG_IN_REJECTED.  see [after/redux/actions.test.js](#afterreduxactionstestjs)
``` jsx
...
describe('logInUser returns actions',() => {
  const errMessage = 'incorrect creds'
  const fakeToken = 'thisIsATestToken'
  const mockLogin = (username, password) => {
...
  })
  
  it('dispatches LOG_IN_FULFILLED with correct creds', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('u', 'p', mockLogin)(mockDispatch)

    expect(mockDispatch.mock.calls[1][0]).toEqual({type: actions.LOG_IN_FULFILLED, payload: 'thisIsATestToken'})
    expect(mockDispatch.mock.calls[1]).toMatchSnapshot()
  })  
  
  it('dispatches LOG_IN_REJECTED with incorrect creds', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('', '', mockLogin)(mockDispatch)

    expect(mockDispatch.mock.calls[1][0]).toEqual({type: actions.LOG_IN_REJECTED, payload: errMessage})
    expect(mockDispatch.mock.calls[1]).toMatchSnapshot()
  })
})  
```
$ npm test
``` console
...
Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   1 written, 4 passed, 5 total
Time:        12.273 s
Ran all test suites.
```
[:top: Top](#top) 
[1:08:40]

#### npx jest --verbose
[1:13:05] if you run Jest with a flag called verbose,
that's what triggers all of the tests to be enumerated.
And if we run with that --verbose flag, we then see all of the groupings
that we dictated in our test files.

``` console
Ts-MacBook-Pro:Jul06 twng$ npx jest --verbose
 PASS  testing/sum.test.js
  ✓ sums 1 and 1 (4 ms)
  ✓ sums 0 and 0
  ✓ sums 20 and 30
  ✓ sums 20 and 22

 PASS  before/redux/actions.test.js
  updateUser returns actions
    ✓ returns an action (9 ms)
    ✓ handles empty object
    ✓ handles empty name (1 ms)
  logInUser returns actions
    ✓ dispatches LOG_IN_SENT (3 ms)
    ✓ dispatches LOG_IN_FULFILLED with correct creds (2 ms)
    ✓ dispatches LOG_IN_REJECTED with incorrect creds (1 ms)

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   5 passed, 5 total
Time:        2.577 s, estimated 4 s
Ran all test suites.
```
And so if we wanted to show that entire enumeration of all the tests every time
``` jsx
,
  "scripts": {
    "test": "jest --verbose",
    "test:watch": "jest --watch --verbose"
  }
```
#### npm test
#### npm run test:watch
[:top: Top](#top) 

[1:14:47] So let's test our Redux reducers.

reducer.js
``` jsx
import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions'
...
```
reducer.test.js
``` jsx
import reducer from './reducer'
import * as actions from './actions'

const DEFAULT_STATE = { 
  user: {}, 
  contacts: [], 
}

describe('contact reducer', () => {
  it('successfully adds new user', () => {
    expect(reducer(DEFAULT_STATE, actions.addContact({
      name: 'test user',
      phone: '1234567890',
    }))).toMatchSnapshot()
  })  
})     
```
$ npm test
``` console
...
 PASS  before/redux/reducer.test.js
  contact reducer
    ✓ successfully adds new user (6 ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 3 passed, 3 total
Tests:       11 passed, 11 total
Snapshots:   1 written, 5 passed, 6 total
Time:        3.022 s
Ran all test suites.
```
[1:20:19] So let's test user, exclamation point.   
reducer.test.js
``` jsx
      name: 'test user!',
```
``` console
    -       "name": "test user",
    +       "name": "test user!",
...

› 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite.
```
reducer.test.js, add in more test, as [after/redux/reducer.test.js](#afterreduxreducertestjs)
``` jsx
      name: 'test user',
... 
})

describe('user reducer', () => {
  it('successfully updates user', () => {
    expect(reducer(DEFAULT_STATE, actions.updateUser({
      name: 'test user',
    }))).toMatchSnapshot()                                                                      
  })
})
```
$ npm test
``` console
...
 PASS  before/redux/reducer.test.js
  contact reducer
    ✓ successfully adds new user (5 ms)
  user reducer
    ✓ successfully updates user (1 ms)
...
Test Suites: 3 passed, 3 total
Tests:       12 passed, 12 total
Snapshots:   1 written, 6 passed, 7 total
```
[:top: Top](#top) 
[1:22:40]
### Integration Tests
- We can use Jest’s snapshot testing to test components
- `react-test-renderer`allows us to render components
outside the context of an app
    - https://reactjs.org/docs/test-renderer.html
- jest-expo has all the configuration you need
    - https://github.com/expo/jest-expo

we use the snapshot feature to test the output of React component

https://docs.expo.io/guides/testing-with-jest/   
To install jest-expo as a development dependency run: `yarn add jest-expo --dev` or `npm i jest-expo --save-dev`.
Then we need to add/update package.json to include:

! recd **error** ... skipped this installation.

[:top: Top](#top) 

### Code Coverage
- Metric for tracking how well-tested an application is
    - Statements: How many statements in the program have been executed?
    - Branches: How many of the possible code paths have been executed?
    - Functions: How many of the defined function been executed?
    - Lines: How many of the lines have been executed?
- Get coverage report by passing `--coverage` to jest

#### npm t -- --coverage
``` console
Ts-MacBook-Pro:Jul06 twng$ npm t -- --coverage
...
--------------|---------|----------|---------|---------|-------------------
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------|---------|----------|---------|---------|-------------------
All files     |   74.47 |    66.67 |      75 |      75 |                   
 before       |   33.33 |        0 |      25 |   38.46 |                   
  api.js      |   33.33 |        0 |      25 |   38.46 | 7-9,19-25         
 before/redux |   93.33 |       80 |     100 |      92 |                   
  actions.js  |     100 |      100 |     100 |     100 |                   
  reducer.js  |   85.71 |    77.78 |     100 |   83.33 | 19-21             
 testing      |     100 |      100 |     100 |     100 |                   
  sum.js      |     100 |      100 |     100 |     100 |                   
--------------|---------|----------|---------|---------|-------------------
Test Suites: 3 passed, 3 total
Tests:       12 passed, 12 total
Snapshots:   7 passed, 7 total
```
[:top: Top](#top) 

### End-To-End Tests
- There is currently no easy way to run automated e2e tests
in react native
- There is an awesome work-in-progress by Wix called
Detox
    - https://github.com/wix/detox
    - https://github.com/expo/with-detox-tests
    - Lacks Android support

### Thanks!

---
---
Source Code
---
[:top: Top](#top) 
[before/...](#before)
[after/...](#after) 
### before/...

#### before/package.json
``` yaml
{
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "scripts": {
    "lint": "eslint api.js screens/"
  },
  "dependencies": {
    "expo": "^25.0.0",
    "isomorphic-fetch": "^2.2.1",
    "prop-types": "^15.6.1",
    "react": "16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz",
    "react-native-vector-icons": "^4.5.0",
    "react-navigation": "2.0.0-beta.5",
    "react-redux": "^5.0.7",
    "redux": "^3.7.2",
    "redux-persist": "^5.9.1",
    "redux-thunk": "^2.2.0"
  },
  "devDependencies": {
    "eslint": "^4.19.1",
    "eslint-config-kensho": "^4.0.1",
    "eslint-plugin-react": "^7.7.0",
    "prettier": "^1.12.0"
  }
}

```
[:top: Top](#top) 
### before/redux/...
#### before/redux/actions.js
``` jsx
import {login} from '../api'

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

// async action creator
export const logInUser = (username, password) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await login(username, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message})
  }
}

```
#### before/redux/reducer.js
``` jsx
import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_SENT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
    case LOG_IN_FULFILLED:
      return merge(state, {token: action.payload})
    case LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload})
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export default reducer

```
#### before/redux/store.js  
``` jsx
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {addContact} from './actions'
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

  /*
const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    action(store.dispatch)
  } else {
    next(action)
  }
}
*/

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

/*
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))

store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'david m', phone: '5050505050'}))

console.log(store.getState())
*/

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)

---
### after/...
#### after/package.json
last updated: Jul07,'20. Skipped Integration, and remove `jest-expo'
``` yaml
{
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject",
    "test": "jest --verbose",
    "test:watch": "jest --watch --verbose"
  },
  "dependencies": {
    "expo": "~38.0.8",
    "expo-status-bar": "^1.0.2",
    "prop-types": "^15.7.2",
    "react": "~16.11.0",
    "react-dom": "~16.11.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-38.0.1.tar.gz",
    "react-native-vector-icons": "^7.0.0",
    "react-native-web": "~0.11.7",
    "react-navigation": "^2.0.0",
    "react-redux": "^5.0.7",
    "redux": "^4.0.5",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.8.6",
    "jest": "^26.1.0"
  },
  "private": true
}
```

[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/components/MyButton.js
``` jsx
import React from 'react'
import {Button} from 'react-native'
import PropTypes from 'prop-types'

const MyButton = props => <Button title="test" onPress={() => {}} color={props.color || 'green'} />

MyButton.propTypes = {
  color: PropTypes.string,
}

export default MyButton

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/components/MyButton.test.js
``` jsx
/* eslint-disable */

import React from 'react'
import {Button} from 'react-native'
import renderer from 'react-test-renderer'

import MyButton from './MyButton'

const getUnderlyingButton = testInstance => testInstance.root.findByType(Button)

describe('MyButton', () => {
  it('renders', () => {
    const button = renderer.create(<MyButton />).toJSON()
    expect(button).toMatchSnapshot()
  })

  it('correctly overrides default color', () => {
    const color = 'red'
    const button = getUnderlyingButton(renderer.create(<MyButton color={color} />))
    expect(button.props.color).toBe(color)

    const color2 = 'blue'
    const button2 = getUnderlyingButton(renderer.create(<MyButton color={color2} />))
    expect(button2.props.color).toBe(color2)
  })
})

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/actions.js
``` jsx
import {login} from '../api'

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

// async action creator
export const logInUser = (username, password, loginFn = login) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await loginFn(username, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message})
  }
}

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/actions.test.js
``` jsx
/* global jest, expect, describe, it */
/* eslint-disable */

import * as actions from './actions'

describe('updateUser returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateUser({name: 'test name'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateUser({})).toMatchSnapshot()
  })

  it('handles empty name', () => {
    expect(actions.updateUser({name: ''})).toMatchSnapshot()
  })
})

describe('logInUser returns actions', () => {
  const errMessage = 'incorrect creds'
  const fakeToken = 'thisIsATestToken'
  const mockLogin = (username, password) => {
    if (username === 'u' && password === 'p') {
      return fakeToken
    }
    throw new Error(errMessage)
  }

  it('dispatches LOG_IN_SENT', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('', '')(mockDispatch)
    // mockDispatch.mock.calls all the args that the mock fn was invoked on
    expect(mockDispatch.mock.calls[0][0]).toEqual({type: actions.LOG_IN_SENT})
  })

  it('dispatches LOG_IN_FULFILLED with correct creds', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('u', 'p', mockLogin)(mockDispatch)

    expect(mockDispatch.mock.calls[1][0]).toEqual({type: actions.LOG_IN_FULFILLED, payload: fakeToken})
    expect(mockDispatch.mock.calls[1]).toMatchSnapshot()
  })

  it('dispatches LOG_IN_REJECTED with incorrect creds', async () => {
    const mockDispatch = jest.fn()
    await actions.logInUser('', '', mockLogin)(mockDispatch)

    expect(mockDispatch.mock.calls[1][0]).toEqual({type: actions.LOG_IN_REJECTED, payload: errMessage})
    expect(mockDispatch.mock.calls[1]).toMatchSnapshot()
  })
})

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/reducer.js
``` jsx
import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_FULFILLED, LOG_IN_REJECTED} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
    case LOG_IN_FULFILLED:
      return merge(state, {token: action.payload})
    case LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload})
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export default reducer

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/redux/reducer.test.js
``` jsx
/* eslint-disable */

import reducer from './reducer'
import * as actions from './actions'

const DEFAULT_STATE = {
  user: {},
  contacts: [],
}

describe('contact reducer', () => {
  it('successfully adds new user', () => {
    expect(reducer(DEFAULT_STATE, actions.addContact({
      name: 'test user',
      phone: '1234567890',
    }))).toMatchSnapshot()
  })
})

describe('user reducer', () => {
  it('successfully updates user', () => {
    expect(reducer(DEFAULT_STATE, actions.updateUser({
      name: 'test user',
    }))).toMatchSnapshot()
  })
})

```

#### after/redux/store.js
Files ./after/redux/store.js and ./before/redux/store.js are identical

[:top: Top](#top) 
[before/...](#before)
[after/...](#after)
#### after/testing/sum.js
``` jsx
/* eslint-disable no-console */

function sum(x, y) {
  return x + y
}

module.exports = sum

```
#### after/testing/sum.test.js
``` jsx
/* global test, expect */

const sum = require('./sum.js')

test('sums 1 and 1', () => {
  expect(sum(1, 1)).toBe(2)
})

test('sums 0 and 0', () => {
  expect(sum(0, 0)).toBe(0)
})

test('sums 20 and 30', () => {
  expect(sum(20, 30)).toBe(50)
})

test('sums 20 and 22', () => {
  expect(sum(20, 22)).toBe(42)
})

```
[:top: Top](#top) 
[before/...](#before)
[after/...](#after)


---
myNote
---
#### my expo.io/ snacks: https://expo.io/snacks/@awesome2/. 

#### console.assert
The most basic test is a function that notifies you when
behavior is unexpected
``` jsx
/* eslint-disable no-console */
function sum(x, y) {
  return x + y
}

module.exports = sum // just for node
```
.04b sum.**test.js**, for `require` same way of import in ES6 for node.
``` jsx
const sum = require('./sum.js')

console.assert(sum(1,1) === 2, 'Error summing 1 and 1')
console.assert(sum(0,0) === 0, 'Error summing 0 and 0')
console.assert(sum(20,30) === 50, 'Error summing 20 and 30')

// ~/cs50m/myLearning/src4/before/testing/ $ node sum.test.js
// ~/cs50m/myLearning/src4/before/testing/ $ 
```
#### vim
open all files
``` console
Ts-MacBook-Pro:redux twng$ vim -o actions.*
```
### publishing https://expo.io/@awesome2/pomodoro-timer
use: https://github.com/alvinng222/cs50m/tree/12_Performance#beforepomodoro-timer   
ref: https://docs.expo.io/workflow/publishing/.   
use `rm -rf .expo`, and `expo publish`
``` console
        Ts-MacBook-Pro:my-app twng$ rm -rf .expo
        Ts-MacBook-Pro:my-app twng$ expo publish
        Publishing to channel 'default'...
        Starting Metro Bundler.
        Building iOS bundle
        Building Android bundle
        Building source maps
        Finished building JavaScript bundle in 8725ms.
        Building asset maps
        Finished building JavaScript bundle in 5022ms.
        Finished building JavaScript bundle in 0ms.
        Finished building JavaScript bundle in 0ms.
        Finished building JavaScript bundle in 343ms.
        Finished building JavaScript bundle in 1063ms.
        Analyzing assets
        Uploading assets
        Uploading /assets/icon.png
        Processing asset bundle patterns:
        - /Users/twng/cs50m/my-app/**/*
        Uploading JavaScript bundles
        Publish complete

        The manifest URL is: https://exp.host/@awesome2/pomodoro-timer (​https://exp.host/@awesome2/pomodoro-timer/index.exp?sdkVersion=38.0.0​). Learn more. (​https://expo.fyi/manifest-url​)
        The project page is: https://expo.io/@awesome2/pomodoro-timer (​https://expo.io/@awesome2/pomodoro-timer​). Learn more. (​https://expo.fyi/project-page​)
        Ts-MacBook-Pro:my-app twng$ 
```
#### before/pomodoro-timer/app.json
last updated Aug 17, 2020.   
ref: https://github.com/alvinng222/cs50m/tree/12_Performance#beforepomodoro-timerappjson
``` yaml
{
  "expo": {
    "name": "pomodoro-timer",
    "description": "Timer that tracks time working and break time.",
    "slug": "pomodoro-timer",
    "privacy": "public",
    "sdkVersion": "38.0.0",
    "platforms": ["android"],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "bundleIdentifier": "com.atronee.pomodoro",
      "supportsTablet": true
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "android": {
      "package": "com.atronee.pomodoro"
    }
  }
}
```
#### before/pomodoro-timer/package.json
last updated Aug 17, 2020.   
``` yaml
{
  "name": "myApp-pomodoro-timer",
  "version": "1.0.0",
  "main": "./node_modules/expo/AppEntry.js",
  "author": "T W <twng@atrone.com>",
  "scripts": {
    "prebuild": "rm -rf lib || true",
    "build": "mkdir lib && babel --copy-files --out-dir lib/ --ignore node_modules,package.json,app.json,package-lock.json .",
    "prepublish": "npm run build",
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "expo": "~38.0.8",
    "expo-status-bar": "^1.0.2",
    "prop-types": "^15.7.2",
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

[:top: Top](#top)

---
to master branch: [CS50M](https://github.com/alvinng222/cs50m/tree/master)  
back to previous: [12_Performance](https://github.com/alvinng222/cs50m/tree/12_Performance).  

---
