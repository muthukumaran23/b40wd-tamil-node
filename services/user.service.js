import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPasswird = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPasswird);
  return hashedPasswird;
}

// db.movies.insertOne(data)
export async function createUser(data) {
  return await client.db("person").collection("users").insertOne(data);
}

export async function getUserByName(username) {
  return await client
    .db("person")
    .collection("users")
    .findOne({ username: username });
}
