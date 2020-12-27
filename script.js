// import axios from 'https://cdn.skypack.dev/axios@0.21.1'

const App = () => {
  const [quotes, setQuotes] = React.useState(null)
  const [quoteSelected, setQuoteSelected] = React.useState({
    message: '',
    author: '',
  })
  const url =
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

  const setRandomMessage = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuoteSelected({ message: quote.quote, author: quote.author })
  }

  React.useEffect(async () => {
    const response = await axios.get(url)
    setQuotes(response.data.quotes)
  }, [])
  React.useEffect(() => {
    if (quotes != null) setRandomMessage()
  }, [quotes])

  const handleClick = (e) => {
    setRandomMessage()
  }

  return (
    <div className='container'>
      <section id='quote-box'>
        <h1 id='text'>{quoteSelected.message}</h1>
        <h2 id='author'>{quoteSelected.author}</h2>
        <div className='btn-container'>
          <a
            id='tweet-quote'
            target='_blank'
            href='https://twitter.com/intent/tweet'
          >
            <i
              style={{ color: '#4C6EF5' }}
              className='fab fa-twitter fa-2x'
            ></i>
          </a>
          <button id='new-quote' onClick={(e) => handleClick(e)}>
            New quote
          </button>
        </div>
      </section>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
