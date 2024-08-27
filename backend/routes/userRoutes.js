
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

userRouter.get("/", authService.verifyJWT, authService.verifyADM, getUsers);
userRouter.get("/:id", authService.verifyJWT, viewProfile);
userRouter.post("/", createUser);
userRouter.delete("/", authService.verifyJWT, deleteUser);
userRouter.put("/:id", updateProfile);
userRouter.post("/login", userLogin);

export default userRouter;