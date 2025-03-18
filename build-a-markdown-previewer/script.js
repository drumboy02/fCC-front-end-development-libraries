import React, { useState, useEffect } from "https://esm.sh/react"
import ReactDOM, { createRoot } from "https://esm.sh/react-dom/client"

marked.setOptions({ breaks: true })

const INITIAL_TEXT = 
`# Heading 1
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
## Heading 2
[hyperlinks](https://www.freecodecamp.org)
\`<div id=\"root\">inline code</div>\`
\`\`\`
// code blocks
const handleChange = (e) => {\n  setMarkupText(e.target.value)
}
\`\`\`
- list item 1
- list item 2
1. numbered list item
> blockquote with **bold text**
`

const App = () => {
  const [markupText, setMarkupText] = useState(INITIAL_TEXT)
  
  return (
    <div className="app-container">
      <Editor setMarkupText={setMarkupText} />
      <Previewer markupText={markupText} />
    </div>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<App />)

const Editor = ({ setMarkupText }) => {
  const handleChange = (e) => {
    setMarkupText(e.target.value)
  }
  
  return (
    <textarea 
      id="editor"
      rows="16"
      cols="48"
      defaultValue={INITIAL_TEXT}
      onChange={handleChange}
    />
  )
}

const Previewer = ({ markupText }) => {
  const output = marked.parse(markupText)
  
  return (
    <div 
      id="preview"
      dangerouslySetInnerHTML={{__html: output}}
    />
  )
}

