import { Type } from "@google/genai"

const prompt = `
  Identifique se a imagem contém gatos ou cachorros.
  Retorne uma das seguintes categorias de acordo com o conteúdo da imagem:
  'cat' caso a imagem contenha um ou mais gatos ou
  'dog' caso a imagem contenha um ou mais cachorros
  também retorne a cor do animal identificado.
`

const outputConfig = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          enum: ["dog", "cat"]
        }
      }
    }
  }
}

export { prompt, outputConfig }