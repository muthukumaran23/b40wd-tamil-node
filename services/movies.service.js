import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function updateMovieById(id, data) {
  return await client
    .db("person")
    .collection("details")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client
    .db("person")
    .collection("details")
    .deleteOne({ _id: ObjectId(id) });
}
export async function createMovies(data) {
  return await client.db("person").collection("details").insertMany(data);
}
export async function getMovieById(id) {
  console.log("*****", id);
  return await client
    .db("person")
    .collection("details")
    .findOne({ _id: ObjectId(id) });
}
export async function getMovies(request) {
  return await client
    .db("person")
    .collection("details")
    .find(request.query)
    .toArray();
}
