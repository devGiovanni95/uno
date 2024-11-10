import { Router } from "express";
import UserController from "../controllers/user";

const userRoute = Router();

userRoute.post("/users", UserController.store);
userRoute.get("/users", UserController.findAll);
userRoute.get("/users/:id", UserController.findById);
userRoute.put("/users/:id", UserController.update);
userRoute.delete("/users/:id", UserController.delete);

export default userRoute;
