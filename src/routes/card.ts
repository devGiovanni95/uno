import { Router } from "express";
import CardController from "../controllers/card/card.controller";

const cardRoute = Router();

cardRoute.post("/cards", CardController.store);
cardRoute.get("/cards", CardController.findAll);
cardRoute.get("/cards/:id", CardController.findById);
cardRoute.put("/cards/:id", CardController.update);
cardRoute.delete("/cards/:id", CardController.delete);

export default cardRoute;
