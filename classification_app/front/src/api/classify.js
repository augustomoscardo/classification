export default async function classificationRequest(method, imgSrc) {
  return fetch("http://localhost:3333/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ method: method, imgPath: imgSrc })
  }).then(resp => resp.json());
}