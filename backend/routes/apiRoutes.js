import { Router } from "express";
import userServices from "../services/services.js"
import{
    getUsers
} from "../controllers/controller.js";

const userRouter = Router()

userRouter.get("/verUsuarios", getUsers)

export default userRouter;