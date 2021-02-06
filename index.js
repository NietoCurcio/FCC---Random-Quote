import * as React from 'https://cdn.skypack.dev/react@17.0.1'
import * as ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1'
import * as redux from 'https://cdn.skypack.dev/redux@4.0.5'
import * as reactRedux from 'https://cdn.skypack.dev/react-redux@7.2.2'
import reduxThunk from 'https://cdn.skypack.dev/redux-thunk@2.3.0'

const ACTION = 'ACTION'
const RESET = 'RESET'
const BREAK_UPDATE = 'BREAK_UPDATE'
const SESSION_UPDATE = 'SESSION_UPDATE'
const RUN_UPDATE = 'RUN_UPDATE'
const UPDATE_TIME_LEFT = 'UPDATE_TIME_LEFT'
const UPDATE_LABEL = 'UPDATE_LABEL'
const CONVERT_TIME = 'CONVERT_TIME'

const actionCreator = (newMessage) => {
  return {
    type: ACTION,
    payload: newMessage,
  }
}

const resetState = () => {
  return {
    type: RESET,
  }
}

const breakLengthUpdate = (update) => {
  return {
    type: BREAK_UPDATE,
    payload: update,
  }
}

const convertTime = (time) => {
  let converted
  if (time == 3600) converted = '60:00'
  else converted = new Date(time * 1000).toISOString().substr(14, 5)
  return {
    type: CONVERT_TIME,
    payload: converted,
  }
}

const sessionLengthUpdate = (update) => (dispatch) => {
  dispatch({
    type: SESSION_UPDATE,
    payload: update,
  })
}

const toggleRunning = () => async (dispatch) => {
  dispatch({ type: RUN_UPDATE })
  return 0
}

const updateTimeLeft = () => ({
  type: UPDATE_TIME_LEFT,
})

const updateLabel = () => {
  return {
    type: UPDATE_LABEL,
  }
}

const initialState = {
  mode: 'Session',
  timeLeft: 1500,
  breakLength: 5,
  sessionLength: 25,
  running: false,
  timeConverted: '25:00',
}

const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION':
      return { ...state }
    case RESET:
      // return {...state, breakLength: 5, sessionLength: 25, timeLeft: 1500, mode: 'Session', timeConverted: "25:00" }
      return {
        ...state,
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 1500,
        mode: 'Session',
        timeConverted: '25:00',
        running: false,
      }
    case BREAK_UPDATE:
      let updateBreak = state.breakLength + action.payload
      return { ...state, breakLength: updateBreak }
    case SESSION_UPDATE:
      let updateSession = state.sessionLength + action.payload
      let updateTime = state.sessionLength + action.payload
      updateTime = updateTime * 60
      return { ...state, sessionLength: updateSession, timeLeft: updateTime }
    case RUN_UPDATE:
      return { ...state, running: !state.running }
    case UPDATE_TIME_LEFT:
      return {
        ...state,
        timeLeft: state.timeLeft !== 0 ? state.timeLeft - 1 : state.timeLeft,
      }
    case UPDATE_LABEL:
      let mode = state.mode
      return {
        ...state,
        mode: mode === 'Session' ? 'Break' : 'Session',
        // timeLeft: 60 * (mode === "Session" ? state.breakLength : state.sessionLength * 60)
        timeLeft:
          60 * (mode === 'Session' ? state.breakLength : state.sessionLength),
      }
    case CONVERT_TIME:
      return {
        ...state,
        timeConverted: action.payload,
      }
    default:
      return state
  }
}

const rootReducer = redux.combineReducers({
  clock: clockReducer,
})
// I know that is only one reducer, this is educational purpose

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [reduxThunk]
const store = redux.createStore(
  rootReducer,
  composeEnhancers(redux.applyMiddleware(...middleware))
)

const Provider = reactRedux.Provider

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ClockConnected />
      </div>
    </Provider>
  )
}

const Clock = (props) => {
  const {
    clock,
    actionCreator,
    resetState,
    breakLengthUpdate,
    sessionLengthUpdate,
    toggleRunning,
    updateTimeLeft,
    updateLabel,
    convertTime,
  } = props

  // const [intervalRef, setIntervalRef] = React.useState()
  const [timeoutRef, setTimeoutRef] = React.useState()

  const handleReset = (e) => {
    clearTimeout(timeoutRef)
    document.getElementById('beep').load()
    document.getElementById('beep').pause()
    // clearInterval(intervalRef)
    resetState()
  }

  const breakUpdate = (e, aux) => {
    if (!clock.running) {
      if (aux === 'decre_break' && clock.breakLength > 1) {
        breakLengthUpdate(-1)
      } else if (aux === 'incre_break' && clock.breakLength < 60) {
        breakLengthUpdate(1)
      }
    }
  }

  const sessionUpdate = (e, aux) => {
    if (!clock.running) {
      if (aux === 'decre_session' && clock.sessionLength > 1) {
        sessionLengthUpdate(-1)
      } else if (aux === 'incre_session' && clock.sessionLength < 60) {
        sessionLengthUpdate(1)
      }
    }
  }
  //   double reference issues omg, since setInterval reference has to be stored to clear it later
  //   and also, run function is a dependency in useEffect, we have to use the useCallback hook
  //   to keep run reference, change it only whether its dependencies has changed, in this case, there's no dependency, so will be always the same ref.
  //   I think updateTimeLeft would be a dependecy, but it's out of the component scope and it neves changes, its a pure function without side effects
  //   Otherwise, the run reference would change each time the component is rendered, and if the dependency has been changed, the Effect wrongly runs

  // const handleRun = () => {
  //   toggleRunning()
  //   if(clock.running) {
  //    clearInterval(intervalRef)
  //   } else {
  //    setIntervalRef(setInterval(() => {
  //      updateTimeLeft()
  //     }, 1000))
  //   }
  // }

  // const startRun = () => {
  //   setTimeout(() => {
  //     updateTimeLeft()
  //   }, 1000)
  // }
  // React.useEffect(() => {
  //   if(clock.running) startRun()
  // }, [clock.timeLeft])
  // const handleRun = () => {
  //   toggleRunning()
  //   if(!clock.running) {
  //     startRun()
  //   }
  // }
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

  return (
    <div id="clock">
      <div>
        <div id="session-menu">
          <div id="session-label">Session Length</div>
          <button
            id="session-increment"
            onClick={(e) => sessionUpdate(e, 'incre_session')}
          >
            <i class="fas fa-plus"></i>
          </button>
          <button
            id="session-decrement"
            onClick={(e) => sessionUpdate(e, 'decre_session')}
          >
            <i class="fas fa-minus"></i>
          </button>
          <div id="session-length">{clock.sessionLength}</div>
        </div>
        <div id="break-menu">
          <div id="break-label">Break Length</div>
          <button
            id="break-increment"
            onClick={(e) => breakUpdate(e, 'incre_break')}
          >
            <i class="fas fa-plus"></i>
          </button>
          <button
            id="break-decrement"
            onClick={(e) => breakUpdate(e, 'decre_break')}
          >
            <i class="fas fa-minus"></i>
          </button>
          <div id="break-length">{clock.breakLength}</div>
        </div>
      </div>
      <div className="second-column">
        <div id="display">
          <div id="timer-label">{clock.mode}</div>
          <div id="time-left">{clock.timeConverted}</div>
        </div>
        <div id="buttons">
          <div id="start_stop" onClick={(e) => handleRun(e)}>
            <i class="fas fa-play"></i>
            <i class="fas fa-pause"></i>
          </div>
          <div id="reset" onClick={(e) => handleReset(e)}>
            <i class="fas fa-redo-alt"></i>
          </div>
          {/*<audio src="http://trekcore.com/audio/aliensounds/borg_computer_beep.mp3" id="beep"></audio>*/}
          <audio
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            id="beep"
          ></audio>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  clock: state.clock,
})
const mapDispatchToProps = {
  actionCreator,
  resetState,
  breakLengthUpdate,
  sessionLengthUpdate,
  toggleRunning,
  updateTimeLeft,
  updateLabel,
  convertTime,
}
// const mergeProps = (stateProps, dispatchProps, ownProps) => {
// }
// https://stackoverflow.com/questions/36521731/react-redux-mapdispatchtoprops-not-receiving-mapstatetoprops/36525962#36525962 mergeProps is nice to know
const ClockConnected = reactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock)
// in a react application we would 'export default' it, so the App would already
// get the connect component

ReactDOM.render(<App />, document.getElementById('root'))
