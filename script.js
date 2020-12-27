const App = () => {
  const [text, setText] = React.useState(`
# Markdown 
 
## Type markdown in the editor and preview
  
You can type \`<p><p>\` code like that
  
And a code block
\`\`\`
const a = () => {console.log}
\`\`\`
  
Bold text **A bold text**
  
Lists: 
- item1
- item2 
  
Here is a [Link to FCC](https://www.freecodecamp.org/)
  
> A blockQuote
  
Image:

![Cat](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)
  `)

  // OPTIONAL BONUS (you do not need to make this test pass): My markdown previewer interprets carriage returns and renders them as <br> (line break) elements (HINT: read the Marked.js docs for this one!).

  const handleKey = (e) => {
    let textInput = e.target.value
    document.getElementById('preview').innerHTML = marked(textInput)
    setText(textInput)
  }

  React.useEffect(() => {
    marked.setOptions({
      breaks: true,
    })
    document.getElementById('editor').value = text
    document.getElementById('preview').innerHTML = marked(text)
  }, [])

  return (
    <div className='app'>
      <div className='container'>
        <h1>Markdown Editor</h1>
        <textarea
          id='editor'
          onKeyUp={(e) => handleKey(e)}
          placeholder='Type your markdown here...'
        ></textarea>
        <h3>Markdown previewer</h3>
        <div id='preview'></div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
