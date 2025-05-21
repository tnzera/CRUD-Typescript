import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @OneToMany(() => Reservation, (reservation) => reservation.player)
  reservations?: Reservation[];
}
