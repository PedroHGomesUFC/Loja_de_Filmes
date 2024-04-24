import userService from "../services/services.js"


const userServices = new userService()

export function getUsers() {
    return userServices.getAll()
}

export function createUser(userName, email, password) {
    return userServices.createUser(userName, email, password)
}

export function deleteUser(id) {
    console.log('estou dentro da controller')
    const users = userServices.getAll();

    const index = users.findIndex(u => u.id == id);

    if (index !== -1){
        console.log('entrei no if e vou executar a função da service')
        return [userServices.deleteUser(id), "Usuário deletado."]
    } else {
        return [userServices.getAll(), 'Nenhum usuário foi deletado.']
    }
}

export function viewProfile(req, res, id){
    const __user = userService(id)
    if (user !== undefined){
        res.render("viewProfile", {
            pageTitle: 'Profile',
            user: __user
        })
    }
}