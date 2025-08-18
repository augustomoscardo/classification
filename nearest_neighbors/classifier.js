import { cos_sim } from "@huggingface/transformers";
import fs from "fs"

const embeddings = JSON.parse(fs.readFileSync("./embeddings.json"))


const trainEmbeddings = embeddings.filter(e => e.split === "train")
const testEmbeddings = embeddings.filter(e => e.split === "test")

function compare(testEmbedding) {
  let distances = []

  for (const trainEmbedding of trainEmbeddings) {
    const distance = cos_sim(testEmbedding.embedding, trainEmbedding.embedding)

    distances.push({
      distance,
      class: trainEmbedding.class
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

function knnClassifier(testEmbedding, k) {
  const distances = compare(testEmbedding)
  const knn = getKNearestNeighbors(distances, k)
  const classCount = countClasses(knn)
  const predictedClass = getMaxClass(classCount)

  return predictedClass
}

function calculateAccuracy(results) {
  let nCorrect = 0

  for (const result of results) {
    if (result.predictedClass === result.trueClass) {
      nCorrect++
    }
  }

  return nCorrect / results.length
}

let predictedClasses = []

for (const testEmbedding of testEmbeddings) {
  const predictedClass = knnClassifier(testEmbedding, 5)

  predictedClasses.push({
    predictedClass,
    trueClass: testEmbedding.class,
    path: testEmbedding.path
  })
}

console.log(calculateAccuracy(predictedClasses));
console.log(predictedClasses.filter(p => p.predictedClass !== p.trueClass));
