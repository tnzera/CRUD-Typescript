import { Request, Response } from "express";
import { ReservationService } from "../services/ReservationService";

export class ReservationController {
  private service: ReservationService;

  constructor(service: ReservationService) {
    this.service = service;
  }

  insert = async (req: Request, res: Response): Promise<void> => {
    const { reservationTime, durationMinutes, player, pitch } = req.body;
    try {
      const newReservation = await this.service.insert({
        reservationTime,
        durationMinutes,
        player,
        pitch,
      });
      res.status(201).json(newReservation);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    const reservation = await this.service.list();
    res.json(reservation);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const reservation = await this.service.findById(id);
      res.json(reservation);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const reservation = await this.service.delete(id);
      res.json(reservation);
    } catch (err: any) {
      if (err.id && err.msg) {
        res.status(err.id).json({ error: err.msg });
      } else {
        console.error("Error deleting reservation:", err.message);
        res.status(500).json({
          error: "An error occored while trying to delete reservation.",
        });
      }
    }
  };
}
