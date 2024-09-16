import {CartServices} from "../services/cartServices.js";

const cartServices = new CartServices();

export async function addToCart(req, res){
    const movie_id = req.body.movie_id;
    const user_id = req.body.user_id;
    res.send(await cartServices.addToCart(movie_id, user_id));
}


export async function getCart(req, res) {
    const id = req.params.id;  // Pegando o user_id do parâmetro de rota
    
    try {
        const cartItems = await cartServices.getCart(id);
        res.json(cartItems);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteMovieCart(req, res) {
    const id = req.params.id;
    const movie_id = req.body.movie_id;
    try {
        const cartMovies = await cartServices.deleteMovieCart(movie_id, id);
        res.status(200).send('Apagado com sucesso')
    }
    catch(error) {
        res.status(500).send(error)
    }
}