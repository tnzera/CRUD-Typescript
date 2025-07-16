import { Request, Response } from "express";
import { PlayerService } from "../services/PlayerService";

export class PlayerController {
  private service: PlayerService;

  constructor(service: PlayerService) {
    this.service = service;
  }

  insert = async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;
    try {
      const newPlayer = await this.service.insert({ name, email });
      res.status(201).json(newPlayer);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    const players = await this.service.list();
    res.json(players);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const player = await this.service.findById(id);
      res.json(player);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    try {
      const newPlayer = await this.service.update(id, { name, email });
      res.json(newPlayer);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const player = await this.service.delete(id);
      res.json(player);
    } catch (err: any) {
      if (err.id && err.msg) {
        res.status(err.id).json({ error: err.msg });
      } else {
        console.error("Cant delete player:", err.message);
        res.status(500).json({
          error: "Cant delete player while active reservation exists.",
        });
      }
    }
  };
}
