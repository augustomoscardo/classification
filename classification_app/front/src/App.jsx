import { useState } from "react"

function App() {
  const [imgSrc, setImgSrc] = useState(null)
  const [textInput, setTextInput] = useState(null)

  function classifiy() {
    setImgSrc(textInput)
  }

  return (
    <>
      <h1>Cat or Dog?</h1>
      <input onChange={e => setTextInput(e.target.value)} style={{ width: "100%" }} />
      <button onClick={classifiy}>Classify!</button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img
          src={imgSrc}
          style={{ height: "200px", marginTop: "20px" }}
        />
        <span>Caption</span>
      </div>
    </>
  )
}

export default App
