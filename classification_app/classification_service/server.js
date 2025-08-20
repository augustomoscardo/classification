import { init as knnInit, classify as knnclassify } from "./knn/api.js";
import { classify as llmClassify } from "./llm/api.js";
import express from "express"
import cors from "cors"

const app = express()
const port = 3333

await knnInit()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.post("/classify", async (req, res) => {
  const { method, imgPath, k } = req.body

  let result = null

  if (method === "llm") {
    const kVariable = k ? k : 5

    result = await llmClassify(imgPath, kVariable)
  } else if (method === "knn") {
    const kVariable = k ? k : 5

    result = await knnclassify(imgPath, kVariable)
  } else {
    res.status(400).send({ error: "No method found." })
  }

  res.status(200).send({ category: result })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})