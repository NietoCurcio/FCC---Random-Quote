# 25 + 5 Clock - freeCodeCamp

This project is all about Asynchronous Programming.

> Final Project in Front-end Libraries, freeCodeCamp

<img src="https://github.com/NietoCurcio/FCC-Front-End-Libraries/blob/main/.github/screenshot1.png?raw=true" width="750" alt="25 + 5 Clock">

## React and Redux - State, Effects and asynchronicity

The challenge of this project is how to handle the async programming that is required, since we are dealing with a clock that can reset, update session, update break and await for 1 second till the next state update.

You can think of Async Programming like things happening at the same time, one thing can gets longer than another but the program will run normally, it will not stop to await one process that takes time, but this process when `resolved` or `rejected` will notify the program to use it's `promised` result. Since async programming is about handle processes that takes time, it is directly related to promises, a promise is a process that its result will be available in some point in the future. A good example that I use in my mind to think about asynchronicity is cooking, if you have to prepare a juice and a steak you have to approachs:

- 1, put the steak in the pan, await 4 minutes so it gets prepared (the steak can get two results, a good steak or a bad steak) and then make the juice.

- 2, put the steak in the pan, make the juice while the steak is getting prepared, finish the juice and handle the result of the steak, a good or a bad result.

The second approach is async (and faster)! You're doing more than one thing at a time.

An example of asynchronous programming is the following code:

```
const startRun = () => {
    setTimeoutRef(
      setTimeout(() => {
        updateTimeLeft()
      }, 1000)
    )
  }

  React.useEffect(() => {
    if (clock.running) startRun()
    else clearTimeout(timeoutRef)
  }, [clock.running, clock.timeLeft])

  const handleRun = () => {
    toggleRunning()
  }

  React.useEffect(() => {
    convertTime(clock.timeLeft)
    if (clock.timeLeft === 0) {
      document.querySelector('#beep').play()
      setTimeout(() => {
        updateLabel()
      }, 1000)
    }
  }, [clock.timeLeft, convertTime])
```

`startRun` is a function that set the reference to the timeout callback, so that we can clearTimeout after, when necessary in our code. This function runs the action `updateTimeLeft` after 1 second. `updateTimeLeft` just send an action type to the reducer that decrement the `timeLeft` in our state.

```
const startRun = () => {
    setTimeoutRef(
      setTimeout(() => {
        updateTimeLeft()
      }, 1000)
    )
  }
```

```
case UPDATE_TIME_LEFT:
    return {
    ...state,
    timeLeft: state.timeLeft !== 0 ? state.timeLeft - 1 : state.timeLeft,
}
```

If the timeLeft is 0, we do nothing and the update to the clock will be handled by another action type `UPDATE_LABEL`, checking if it should update using break length or session length.

Following the code we have an effect, this effect is concerned about the clock running state, that tracks the running and timeLeft state from clock, it checks whether the clock is running or not, if it's, continue running, and the reference will be updated in the state. Studying and reading documentations I've realized that the appropriate here to store the reference of setTimeout callback would be use the useRef() react hook, since updates in the state with useState makes a re-render in the component, it works because effects lives longer, it's closure is created when the function was created so it can access its environment of variables, but again, today I think that useRef would be a better approach.

```
React.useEffect(() => {
    if (clock.running) startRun()
    else clearTimeout(timeoutRef)
  }, [clock.running, clock.timeLeft])
```

`handleRun` just handle when the user click in the "pause or play" button and invoke the `toggleRunning` action, its reducer updates the state of `clock.running`.

The last effect tracks the time left in the clock state, convertTime is action that will convert seconds to minutes, a readbable time left, it checks if the time has reached 0 and notice that we have to wait 1 second before to trigger the `updateLabel` action, to update timeLeft, so it uses the length configured in the break length. This 1 second is important, otherwise the test will not pass, it shouldn't instantly update the state of time, but continues in the same "rhythm", second after second, for example, if the state it's 3 seconds remaining and the break length is 5 minutes, after updateLabel is invoked should have passed 4 seconds (the time from 0 to 5 minutes).

```
React.useEffect(() => {
    convertTime(clock.timeLeft)
    if (clock.timeLeft === 0) {
      document.querySelector('#beep').play()
      setTimeout(() => {
        updateLabel()
      }, 1000)
    }
  }, [clock.timeLeft, convertTime])
```

This was an incredible project to understand more about asynchronous programming, update and read state that can be updated after some time.

## Sass

This project is using sass preprocessor to create the css file, sass allow us to build styles in a more flexible way like use of mixins, nested selectors '&' selector and so on.

## freeCodeCamp - Front-end Libaries

This course teaches you how to use HTML, Javascript, CSS, Sass, Bootstrap, React, Redux and Jquery to build Web applications.

## [Linkedln](https://www.linkedin.com/in/felipe-antonio-nieto-curcio-9b865116a/)
