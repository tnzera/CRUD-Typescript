import { Repository } from "typeorm";
import { Reservation } from "../model/Reservation";

export class ReservationService {
  private reservationRepository: Repository<Reservation>;

  constructor(reservationRepository: Repository<Reservation>) {
    this.reservationRepository = reservationRepository;
  }

  async insert(reservation: Reservation): Promise<Reservation> {
    if (
      !reservation.pitch ||
      !reservation.reservationTime ||
      !reservation.durationMinutes ||
      !reservation.player ||
      reservation.player.length <= 0
    ) {
      throw {
        id: 400,
        msg: "Missing required fields: player (must be a non-empty array), pitch, reservationTime, and durationMinutes are required.",
      };
    }
    return await this.reservationRepository.save(reservation);
  }

  async list(): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      relations: {
        player: true,
        pitch: true,
      },
    });
  }

  async findById(id: number): Promise<Reservation> {
    let reservation = await this.reservationRepository.findOne({
      relations: {
        player: true,
        pitch: true,
      },
      where: {
        id: id,
      },
    });
    if (!reservation) {
      throw { id: 404, msg: `Reservation with id ${id} not found.` };
    }
    return reservation;
  }

  async delete(id: number): Promise<Reservation> {
    const reservationToDelete = await this.findById(id);
    await this.reservationRepository.remove(reservationToDelete);
    return reservationToDelete;
  }
}
