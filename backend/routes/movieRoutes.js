import { Router } from "express";
import {addToCart, getCart} from '../controllers/cartController.js'
import {
    getMovies,
    createMovie,
    deleteMovie,
    viewMovie,
    updateMovie
} from "../controllers/movieController.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", viewMovie);
movieRouter.post("/", createMovie);
movieRouter.delete("/", deleteMovie);
movieRouter.put("/:id", updateMovie);
movieRouter.post('/addToCart', addToCart);
movieRouter.get('/getCart', getCart);

export default movieRouter;