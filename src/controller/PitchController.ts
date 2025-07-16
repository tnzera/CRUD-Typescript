import { Request, Response } from "express";
import { PitchService } from "../services/PitchService";

export class PitchController {
  private service: PitchService;

  constructor(service: PitchService) {
    this.service = service;
  }

  insert = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;
    try {
      const newPitch = await this.service.insert({ name, imageUrl });
      res.status(201).json(newPitch);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    const pitchs = await this.service.list();
    res.json(pitchs);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const pitch = await this.service.findById(id);
      res.json(pitch);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const pitch = await this.service.delete(id);
      res.json(pitch);
    } catch (err: any) {
      if (err.id && err.msg) {
        res.status(err.id).json({ error: err.msg });
      } else {
        console.error("Error trying to delete pitch:", err.message);
        res.status(500).json({
          error: "Cant delete pitch while reservation is active.",
        });
      }
    }
  };
}
