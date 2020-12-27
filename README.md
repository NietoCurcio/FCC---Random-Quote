# Random Quote

> My Front-End project in Front-End Libraries at freeCodeCamp. 

<p align="center">
  <img src="https://github.com/NietoCurcio/FCC-Random-Quote/blob/master/randomQuoteImage.png?raw=true" width="750" alt="random Quote">
</p>

## React
I'm using React methods such as ReactDOM.render(), to render my App component within the div with id="root" setted up in my html file.
Also React Hooks like useState, to save the state of messages available in my application, that state is updated making a request with axios to get
an array of messages. It also makes use of useEffect hooks, one time to get the data with axios, and a second time to once the virtual DOM has detected that
there was an update in the state, make additional updates in the state, based on the data that was setted in the App state.

## CSS
A css using a little of transitio and flexbox

## HTML

Using React to make an app that shows a different quote every time the user click in the "New Quote" button. Some CDN links were necessary to make my projects works, like 
React and ReactDOM, provided in [React's documentations](https://reactjs.org/docs/cdn-links.html){:target="_blank"}, [axios](https://cdnjs.com/libraries/axios){:target="_blank"} to make the request to fetch
the array of messages, [Babel](https://babeljs.io/en/setup#installation){:target="_blank"} preprocessor to transpile the JSX returned by the function App component in the script.js file and
[Font Awesome](https://cdnjs.com/libraries/font-awesome){:target="_blank"} as well.

The project is in Live at Codepen - [Random Quote Machine](https://codepen.io/FelipeNieto/full/rNMYqwJ){:target="_blank"}
