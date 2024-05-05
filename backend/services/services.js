import userModel from "../models/user.js";

class userService {
    constructor() {
        this.myUsers = [
            new userModel("joaozinho", "joao@gmail.com", "235656","minha bio", 1),
            new userModel("maria", "maria@gmail.com", "235656","minha bio", 2),
            new userModel("gton", "jgton@gmail.com", "235656","minha bio", 3),
            new userModel("ueliton", "ueliton@gmail.com", "235656","minha bio", 4),
            new userModel("marin", "karin@gmail.com", "235656","minha bio", 5)
        ];
    }

    getAll() {
        return this.myUsers;
    }

    createUser(userName, email, password, bio) {
        const nextId = this.myUsers.length + 1;
        return  this.myUsers.push(new userModel(userName, email, password, bio, nextId));
    }

    deleteUser(id) {
        this.myUsers.splice(id -1, 1)[0];
        return this.getAll()
    }

    viewProfile(id){        
        const index = this.myUsers.findIndex(u => u.id === id);
        const user = this.myUsers[index];
        if(user) {
            return user
        }
        return false
    }

    updateProfile(id, username, email, bio) {
        const userIndex = this.myUsers.findIndex(user => user.id === parseInt(id));
        if (userIndex !== -1) {
            this.myUsers[userIndex].userName = username;
            this.myUsers[userIndex].email = email;
            this.myUsers[userIndex].bio = bio;
            return "Usuário alterado"
        } else {
            return "Usuário não encontrado"
        }
    }
    
}

export default userService;