import express from "express";
import {
  createUser,
  generateHashedPassword,
  getUserByName,
} from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  // db.user.insertOne(data)

  const useFromDB = await getUserByName(username);
  console.log(useFromDB);

  if (useFromDB) {
    response.status(400).send({ message: "Username already exists" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ message: "Password must be at least 8 characters" });
  } else {
    const hashedPasswird = await generateHashedPassword(password);
    const result = await createUser({
      username: username,
      password: hashedPasswird,
    });

    response.send(result);
  }
});

router.post("/login", async function (request, response) {
  const { username, password } = request.body;
  // db.user.insertOne(data)

  const useFromDB = await getUserByName(username);
  console.log(useFromDB);

  if (!useFromDB) {
    response.status(401).send({ message: "Invalid credentials" });
  } else {
    const storedDBPassword = useFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);

    if (isPasswordCheck) {
      const token = jwt.sign({ id: useFromDB._id }, process.env.SECRET_KEY);
      response.send({ message: "Sucessfull login", token: token });
    } else {
      response.status(401).send({ message: "Invalid credentials" });
    }
  }
});

export default router;
