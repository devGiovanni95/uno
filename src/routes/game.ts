import { Router } from "express";
import GameController from "../controllers/game";

const gameRouter = Router();

gameRouter.post("/games", GameController.store);
gameRouter.get("/games", GameController.findAll);
gameRouter.get("/games/:id", GameController.findById);
gameRouter.put("/games/:id", GameController.update);
gameRouter.delete("/games/:id", GameController.delete);

export default gameRouter;
