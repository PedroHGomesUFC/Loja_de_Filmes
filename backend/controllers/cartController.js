import {CartServices} from "../services/cartServices.js";

const cartServices = new CartServices();

export async function addToCart(req, res){
    res.send(await cartServices.addToCart(parseInt(req.body.movie_id)))
}


export async function getCart(_, res){
    res.send(await cartServices.getCart())
}
