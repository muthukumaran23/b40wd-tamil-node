import { client } from "../index.js";

export async function updateMovieById(id, data) {
  return await client
    .db("person")
    .collection("details")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client.db("person").collection("details").deleteOne({ id: id });
}
export async function createMovies(data) {
  return await client.db("person").collection("details").insertMany(data);
}
export async function getMovieById(id) {
  return await client.db("person").collection("details").findOne({ id: id });
}
export async function getMovies(request) {
  return await client
    .db("person")
    .collection("details")
    .find(request.query)
    .toArray();
}
