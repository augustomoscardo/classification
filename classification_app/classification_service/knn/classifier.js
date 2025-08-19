import embedImg from "./embedder.js"
import { cos_sim } from "@huggingface/transformers"

function compare(testEmbedding, knowledgeBase) {
  let distances = []

  for (const embedding of knowledgeBase) {
    const distance = cos_sim(testEmbedding, embedding.embedding)

    distances.push({
      distance,
      class: embedding.class
    })
  }

  return distances
}

function getKNearestNeighbors(distances, k) {
  const sortedDistances = distances.sort((a, b) => b.distance - a.distance)

  return sortedDistances.slice(0, k)
}

function countClasses(knn) {
  const classCount = {}

  for (const n of knn) {
    classCount[n.class] = classCount[n.class] ? classCount[n.class] + 1 : 1
  }

  return classCount
}

function getMaxClass(classCount) {
  let maxClass = null
  let maxClassCount = 0

  for (const cls in classCount) {
    if (classCount[cls] > maxClassCount) {
      maxClassCount = classCount[cls]
      maxClass = cls
    }
  }

  return maxClass
}

export default async function knnClassifier(path, k, knowledgeBase) {
  const embedding = await embedImg(path)
  const distances = compare(embedding, knowledgeBase)
  const knn = getKNearestNeighbors(distances, k)
  const classCount = countClasses(knn)
  const predictedClass = getMaxClass(classCount)

  return predictedClass
}