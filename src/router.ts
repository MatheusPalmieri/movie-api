import { Router, Request, Response } from "express";
import {
  createMovie,
  getMovie,
  getMovies,
  removeMovie,
  updateMovie,
} from "./controllers/movieControllers";

// Validations
import { validate } from "./middleware/handleValidation";
import { movieCreateValidation } from "./middleware/movieValidation";

const router = Router();

export default router
  .get("/ping", (req: Request, res: Response) => {
    res.status(200).send("Server running!");
  })
  .post("/movie", movieCreateValidation(), validate, createMovie)
  .get("/movie/:id", getMovie)
  .get("/movie", getMovies)
  .delete("/movie/:id", removeMovie)
  .patch("/movie/:id", movieCreateValidation(), validate, updateMovie);
