import { createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai"
import fs from "node:fs"

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const embeddings = JSON.parse(fs.readFileSync("../nearest_neighbors/embeddings.json"))
const testEmbeddings = embeddings.filter(e => e.split === "test").map(e => "../nearest_neighbors" + e.path.slice(1))

const image = await genai.files.upload({
  file: testEmbeddings[0],
  config: {
    mimeType: "image/jpeg"
  }
})

const response = await genai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: createUserContent([
    createPartFromUri(image.uri, image.mimeType),
    "Faça uma descrição da imagem acima"
  ])
})

console.log(response.text);
