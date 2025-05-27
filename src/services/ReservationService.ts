import { Repository } from "typeorm";
import { Reservation } from "../model/Reservation";

export class ReservationService {
  private reservationRepository: Repository<Reservation>;

  constructor(reservationRepository: Repository<Reservation>) {
    this.reservationRepository = reservationRepository;
  }

  async inserir(reservation: Reservation): Promise<Reservation> {
    if (
      !reservation.player ||
      !reservation.pitch ||
      !reservation.reservationTime ||
      !reservation.durationMinutes
    ) {
      throw {
        id: 400,
        msg: "Missing required fields: player, pitch, reservationTime, and durationMinutes are required.",
      };
    }
    reservation.reservationTime = new Date();
    return await this.reservationRepository.save(reservation);
  }

  async list(): Promise<Reservation[]> {
    return await this.reservationRepository.find();
  }

  async findById(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      relations: {
        player: true,
        pitch: true,
      },
      where: {
        id: id,
      },
    });
    if (!reservation) {
      throw { status: 404, message: `Reservation with id ${id} not found.` };
    }
    return reservation;
  }

  async delete(id: number): Promise<Reservation> {
    const reservationToDelete = await this.findById(id);
    await this.reservationRepository.remove(reservationToDelete);
    return reservationToDelete;
  }
}
