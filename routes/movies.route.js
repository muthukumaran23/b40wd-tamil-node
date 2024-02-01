import express from "express";
import {
  getMovies,
  getMovieById,
  createMovies,
  deleteMovieById,
  updateMovieById,
} from "../services/movies.service.js";

const router = express.Router();

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);

  // db.movies.find({})

  // Cursor - Pagination | Cursor -> Array | toArray()
  const movies = await getMovies(request);
  //console.log(movies);

  response.send(movies);
});

// http://localhost:400/movies - movies (data)
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // db.movies.findOne({ id: '100' })

  //const movie = movies.find((mv) => mv.id == id);
  const movie = await getMovieById(id);

  console.log("movie", movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie not found" });
});

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  // db.movies.insertMany(data)

  const result = await createMovies(data);

  response.send(result);
});

router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // db.movies.deletOne({ id: '100' })

  //const movie = movies.find((mv) => mv.id == id);
  const result = await deleteMovieById(id);

  console.log("movie", result);
  result.deletedCount > 0
    ? response.send({ message: "movie deleted successfully" })
    : response.status(404).send({ message: "movie not found" });
});

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  // db.movies.updateOne({ id: '99' }, {$set: {rating: 9}})

  console.log(id);

  const result = await updateMovieById(id, data);

  console.log(result);

  response.send(result);
});

export default router;
