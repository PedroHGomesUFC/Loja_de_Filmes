import { Router } from "express";
import { AuthService } from "../services/authServices.js";
import {addToCart, getCart} from '../controllers/cartController.js'
import {
    getMovies,
    createMovie,
    deleteMovie,
    viewMovie,
    updateMovie
} from "../controllers/movieController.js";
const authService = new AuthService();

const movieRouter = Router();

movieRouter.get("/", authService.verifyJWT,  getMovies);    //Esse auth.Services é 
//somente um teste para saber o login está funcionando, 
//caso ele esteja logado ele consegue ver os filmes na página principal, e 
//que de fato está funcionando
movieRouter.get("/:id", viewMovie);
movieRouter.post("/", createMovie);
movieRouter.delete("/", deleteMovie);
movieRouter.put("/:id", updateMovie);
movieRouter.post('/addToCart', addToCart);
movieRouter.get('/getCart/:id', getCart);

export default movieRouter;