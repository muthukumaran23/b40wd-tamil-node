import jwt from "jsonwebtoken";
// custom middleware

export const auth = (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    request.roleId = request.header("roleId");
    console.log("token", token);
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    response.status(401).send({ message: err.message });
  }
};
