import { Router } from "express";
import { AuthService } from "../services/authServices.js";
import {
    getUsers,
    createUser,
    deleteUser,
    viewProfile,
    updateProfile,
    userLogin
} from "../controllers/userController.js";

const authService = new AuthService();

const userRouter = Router()

userRouter.get("/getUsers", authService.verifyJWT, getUsers);
userRouter.get("/viewProfile/:id", authService.verifyJWT, viewProfile)
userRouter.post("/createUser", createUser);
userRouter.delete("/deleteUser", authService.verifyJWT, deleteUser);
userRouter.put("/updateUser/:id", updateProfile);
userRouter.post("/login", userLogin);

export default userRouter;