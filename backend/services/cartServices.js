import { DatabaseConnection } from "../database/database.js";

export class CartServices {
    constructor() {
        this.dbConnection = DatabaseConnection.getDbConnection()
    }

    async addToCart(movie_id, user_id) {
        const buyList = await new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) as count FROM cart WHERE movie_id = ?`
            this.dbConnection.get(query, movie_id, (err, row) => {
                if(err) {
                    reject(err)
                }
                resolve(row.count > 0)
            })
        })
    if(buyList) {
        return 'Filme já está na lista'
    }

        return new Promise((resolve, reject) => {
            const query = `INSERT INTO cart (movie_id, user_id)  VALUES (?, ?)`;
            const values = [movie_id, user_id];
            this.dbConnection.run(query, values, (err, rows) =>{
                if (err){
                    reject(err)
                }
                resolve(rows)
            })
        })
    }

    async getCart(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT movie_id FROM cart WHERE cart.user_id = ?`;
            this.dbConnection.all(query, id, (err, rows) =>{
                if (err){
                    reject("Erro ao buscar filmes no carrinho: " + err); // Erro mais claro
                } else {
                    resolve(rows); // Retornar somente os resultados
                }
            });
        });
    }
    async deleteMovieCart(movie_id, user_id) {
        return new Promise((resolve, reject) => {
            const values = [movie_id, user_id];
            console.log(values)
            const query = `DELETE FROM cart WHERE movie_id = ? AND user_id = ?;`
            this.dbConnection.run(query, values, (err, rows) =>{
                if(err) {
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            });
        });
    }
}