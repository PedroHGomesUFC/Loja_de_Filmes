import userService from "../services/services.js"

export function getUsers(req, res) {
    const userService = new userService();
    console.log(userService.getAll());
    res.render("verUsuarios",{
        pageTitle: 'User list',
        users: userService.getAll()
        
    })
}