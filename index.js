// const express = require("express"); // "type": "commonjs" // 3rd party package impoart
import express, { response } from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import { auth } from "./middleware/auth.js";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

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
app.use(cors());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩 !!!!");
});

app.use("/movies", moviesRouter);
app.use("/user", userRouter);

//  http://localhost:4000/mobiles

app.get("/mobiles", auth, async (request, response) => {
  //get data from atlas
  // db.mobiles.find({});

  // Cursor
  const mobiles = await client
    .db("person")
    .collection("mobiles")
    .find({})
    .toArray();

  response.send(mobiles);
});

// /mobiles - POST

app.post("/mobiles", auth, async (request, response) => {
  const data = request.body;
  // db.mobiles.insertMany(data);

  const result = await client
    .db("person")
    .collection("mobiles")
    .insertMany(data);

  response.send(result);
});

const ROLE_ID = {
  ADMIN: "0",
  NORMAL_USER: "1",
};

app.delete("/mobiles/:id", auth, async function (request, response) {
  const { id } = request.params;
  // db.mobiles.deletOne({ _id: '100' })
  const { roleId } = request;
  // console.log(request.roleId);

  if (roleId === ROLE_ID.ADMIN) {
    const result = await client
      .db("person")
      .collection("mobiles")
      .deleteOne({ _id: new ObjectId(id) });

    console.log(result);
    result.deletedCount > 0
      ? response.send({ message: "mobile deleted successfully" })
      : response.status(404).send({ message: "mobile not found" });
  } else {
    response.status(401).send({ message: "Unauthorized" });
  }
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`)); // App start

export { client };

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.NORMAL_MATLER_USER,
      pass: process.env.NORMAL_MAILER_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"zoyaz 👻" <zoyaz1832@gmail.com>', // sender address
    to: "tvm.muthukumaran007@gmail.com, pulsarpavuns786@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
