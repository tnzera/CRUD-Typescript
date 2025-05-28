import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @ManyToMany(() => Reservation, (reservation) => reservation.player)
  reservations?: Reservation[];
}
