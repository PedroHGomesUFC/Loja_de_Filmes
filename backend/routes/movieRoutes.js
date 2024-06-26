import { Router } from "express";
import {
    getMovies,
    createMovie,
    deleteMovie,
    viewMovie,
    updateMovie
} from "../controllers/movieController.js";

const movieRouter = Router();

movieRouter.get("/getMovies", getMovies);
movieRouter.get("/viewMovie/:id", viewMovie);
movieRouter.post("/createMovie", createMovie);
movieRouter.delete("/deleteMovie", deleteMovie);
movieRouter.put("/updateMovie/:id", updateMovie);

export default movieRouter;