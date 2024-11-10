import { Request, Response } from "express";
import Card from "../model/card";
import User from "../model/user";
import Game from "../model/game";

export default class CardController {

  // Criar um novo Card
  static async store(req: Request, res: Response) {
    const { value, quantity, color, userId, gameIds } = req.body;

    if (!value || !quantity || !color) {
      return res.status(400).json({ error: "Os campos 'value', 'quantity' e 'color' são obrigatórios" });
    }

    const card = new Card();
    card.value = value;
    card.quantity = quantity;
    card.color = color;

    // Relacionamento com User
    if (userId) {
      const user = await User.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      card.user = user;
    }

    // Relacionamento com Games
    if (gameIds && Array.isArray(gameIds)) {
      const games = await Game.findByIds(gameIds);
      card.games = games;
    }

    await card.save();
    return res.status(201).json(card);
  }

  // Listar todos os Cards
  static async findAll(req: Request, res: Response) {
    try {
      const cards = await Card.find({ relations: ["user", "games"] });
      return res.json(cards);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar os Cards" });
    }
  }

  // Obter um Card específico pelo ID
  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const card = await Card.findOne({ where: { id: Number(id) }, relations: ["user", "games"] });
    if (!card) {
      return res.status(404).json({ error: "Card não encontrado" });
    }
    return res.json(card);
  }

  // Atualizar um Card
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { value, quantity, color, userId, gameIds } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const card = await Card.findOneBy({ id: Number(id) });
    if (!card) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    card.value = value ?? card.value;
    card.quantity = quantity ?? card.quantity;
    card.color = color ?? card.color;

    // Atualizar relacionamento com User
    if (userId) {
      const user = await User.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      card.user = user;
    }

    // Atualizar relacionamento com Games
    if (gameIds && Array.isArray(gameIds)) {
      const games = await Game.findByIds(gameIds);
      card.games = games;
    }

    await card.save();
    return res.json(card);
  }

  // Excluir um Card
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const card = await Card.findOneBy({ id: Number(id) });
    if (!card) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    await card.remove();
    return res.status(204).send();
  }
}
