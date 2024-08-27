import jwt from 'jsonwebtoken';
import { DatabaseConnection } from "../database/database.js";

const SECRET = 'PIU24';

export class AuthService {
    constructor() {
        this.dbConnection = DatabaseConnection.getDbConnection();
    }

    userToken(userId) {
        const token = jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
        return { auth: true, token };
    }

    verifyJWT(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            req.userId = decoded.userId;
            next();
        });
    }

    logout(res) {
        return res.json({ auth: false, token: null });
    }

    verifyADM = (req, res, next) => {
        const query = 'SELECT * FROM USERS WHERE id = ? AND adm = ?';
        const values = [req.userId, true];

        this.dbConnection.get(query, values, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Erro ao verificar usuário");
            }
            else if (!user.adm) {
                return res.status(403).json("Não autorizado");
            }

            next();
        });
    }
}

export default AuthService;