import { useState } from "react"
import { CaptionedImage } from "./components/CaptionedImage"

import "./App.css"

function App() {
  const [imgSrc, setImgSrc] = useState(null)
  const [textInput, setTextInput] = useState(null)
  const [selectValue, setSelectValue] = useState("llm")
  const [method, setMethod] = useState("llm")

  function classify() {
    setImgSrc(textInput)
    setMethod(selectValue);
  }

  function clearFields() {
    setImgSrc(null);
    setTextInput('');
  }

  return (
    <>
      <h1>Cat or Dog?</h1>
      <input className="img-path-input" onChange={e => setTextInput(e.target.value)} value={textInput} />
      Method: <select onChange={e => setSelectValue(e.target.value)}>
        <option value="llm">LLM</option>
        <option value="knn">KNN</option>
      </select>
      <div>
        <button className="classify-button" onClick={classify}>Classify!</button>
        <button className="reset-button" onClick={clearFields}>Reset</button>
      </div>
      {
        imgSrc !== null ? <CaptionedImage imgSrc={imgSrc} method={method}></CaptionedImage> : null
      }
    </>
  )
}

export default App
