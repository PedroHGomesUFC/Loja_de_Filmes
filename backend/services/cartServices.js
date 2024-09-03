import { DatabaseConnection } from "../database/database.js";
import {rand} from "../utils/randInt.js"

export class CartServices {
    constructor() {
        this.dbConnection = DatabaseConnection.getDbConnection()
    }

    addToCart(movie_id, user_id) {
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

    getCart() {
        return new Promise((resolve, reject) => {
            const query = `SELECT movie_id FROM cart WHERE user_id = ?`;
            this.dbConnection.all(query, id, (err, rows) =>{
                if (err){
                    reject(err)
                }
                resolve(rows, query)
            })
        });
    }
}