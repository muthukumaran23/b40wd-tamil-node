// const express = require("express"); // "type": "commonjs" // 3rd party package impoart
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js";

dotenv.config();

// env - environment variables

const app = express();

const PORT = process.env.PORT; // Auto assign PORT

// Connection
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dail
await client.connect(); // call
console.log("Mongo is connected !!!");

// XML JSON Text
// middleware - express.json() (inbuilt middleware) - JSON -> Object
//app.use -> Intercepts -> applies express.js() (Inbuilt middleware)
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩 !!!!");
});

app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`)); // App start

export { client };
