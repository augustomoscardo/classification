import { init as knnInit, classify as knnclassify } from "./knn/api.js";
import { classify as llmClassify } from "./llm/api.js";

import express from "express"

const app = express()
const port = 3333

await knnInit()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.post("/classify", async (req, res) => {
  const method = req.body.method
  const imgPath = req.body.imgPath

  let result = null

  if (method === "llm") {
    result = await llmClassify(imgPath)
  } else if (method === "knn") {
    result = await knnclassify(imgPath, 5)
  } else {
    res.send({ error: "No method found." })
  }

  res.send({ category: result })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})