import { Request, Response } from "express";
import User from "../model/user";
import Card from "../model/card";
import Game from "../model/game";

export default class UserController {
  
  // Criar um novo User
  static async store(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O nome é obrigatório" });
    }

    const user = new User();
    user.name = name;

    await user.save();
    return res.status(201).json(user);
  }

  // Listar todos os Users
  static async findAll(req: Request, res: Response) {
    try {
      const users = await User.find({ relations: ["cards", "games"] });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar os Usuários" });
    }
  }

  // Obter um User específico pelo ID
  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const user = await User.findOne({ where: { id: Number(id) }, relations: ["cards", "games"] });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.json(user);
  }

  // Atualizar um User
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const user = await User.findOneBy({ id: Number(id) });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.name = name ?? user.name;

    await user.save();
    return res.json(user);
  }

  // Excluir um User
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "O id é obrigatório" });
    }

    const user = await User.findOneBy({ id: Number(id) });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.remove();
    return res.status(204).send();
  }
}
