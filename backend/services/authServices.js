import jwt from 'jsonwebtoken';

const SECRET = 'PIU24';

export class AuthService {
    constructor() {}

    userToken(userId) {
        const token = jwt.sign({ userId }, SECRET, { expiresIn: 3000 });
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
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            req.userId = decoded.userId;
            next();
        });
    }

    logout(res) {
        return res.json({ auth: false, token: null });
    }
}

export default AuthService;