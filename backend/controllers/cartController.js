import {CartServices} from "../services/cartServices.js";

const cartServices = new CartServices();

export async function addToCart(req, res){
    const movie_id = req.body.movie_id;
    const user_id = req.body.user_id;
    res.send(await cartServices.addToCart(movie_id, user_id));
}


export async function getCart(_, res){
    res.send(await cartServices.getCart())
}