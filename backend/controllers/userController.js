import userService from "../services/userServices.js"
const userServices = new userService()


export async function getUsers(_, res) {
    try {
        const users = await userServices.getAll();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: error })
    }
}


export async function viewProfile(req, res) {
    try {
        const userId = req.params.id;
        const user = await userServices.viewProfile(parseInt(userId));
        res.status(200).json({
            user: user,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            err: error,
        })
    }
}


export function createUser(req, res) {
    if (!req.body.username) {
        return res.send({
            msg: 'Coloque o seu nome'
        })
    }
    else if (!req.body.email) {
        return res.send({
            msg: 'Coloque o seu email'
        })
    }
    else if (!req.body.password) {
        return res.send({
            msg: 'Coloque o seu senha'
        })
    }
    else if (!req.body.bio) {
        return res.send({
            msg: 'Coloque o seu bio'
        })
    }
    userServices.createUser([req.body.username, req.body.email, req.body.password, req.body.bio])
    res.json({
        msg: 'Novo usuário cadastrado',
        user: ['Nome: ' + req.body.username, 'email: ' +  req.body.email, 'Senha: ' + req.body.password, 'bios: ' + req.body.bio]
    })
}



export function deleteUser(req, res) {
    const userId = req.body.id;
    if (!userId) {
        res.status(400).json({ msg: 'ID de usuário não fornecido' });
    }

    userServices.deleteUser(userId).then(msg => {
        res.json({
            msg: msg
        });
    }).catch(error => {
        res.status(404).json({
            msg: 'Erro ao deletar o usuário',
            error: error
        });
    });
}


export async function updateProfile(req, res) {
    try {
        const user = await userServices.updateProfile(
            [req.body.username,
            req.body.email,
            req.body.bio,
            req.params.id]
        )
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(404).json({
            error: error
        });
    }

}

export async function userLogin(req, res) {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (!userEmail) {
        res.status(400).json({ msg: 'email não fornecido' });
        return;
    }

    if (!userPassword) {
        res.status(400).json({ msg: 'senha não fornecida' });
        return;
    }

    try {
        const login = await userServices.userLogin(userEmail, userPassword);
        res.status(200).json(login);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'não foi possivel fazer o login', error });
    }
}