# Random Quote

> My Front-End project in Front-End Libraries at freeCodeCamp. 

<p align="center">
  <img src="https://github.com/NietoCurcio/FCC-Random-Quote/blob/master/quoteMachineImage.png?raw=true" width="750" alt="random Quote">
</p>

## React
I'm using React methods such as ReactDOM.render(), to render my App component within the div with id="root" setted up in my html file.
Also React Hooks like useState, to save the state of messages available in my application, that state is updated making a request with axios to get
an array of messages. It also makes use of useEffect hooks, one time to get the data with axios, and a second time for once the virtual DOM has detected that
there was an update in the state, make additional updates based on the data that was setted in the App state.

## CSS
A css file using flexbox to align elements on the screen and make the transition in some of them.

## HTML

Using React to make an app that shows a different quote every time that the user click in the "New Quote" button. Some CDN links were necessary to make my project works, like 
React and ReactDOM, provided in [React's documentations](https://reactjs.org/docs/cdn-links.html), [axios](https://cdnjs.com/libraries/axios) to make the request to fetch
the messages' data, [Babel](https://babeljs.io/en/setup#installation) preprocessor to transpile the JSX returned by the function App Component in the script.js file and
[Font Awesome](https://cdnjs.com/libraries/font-awesome) as well.

The project is Live at Codepen - [Random Quote Machine](https://codepen.io/FelipeNieto/full/rNMYqwJ)
