import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Pitch {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name?: string;

  @OneToMany(() => Reservation, (reservation) => reservation.pitch)
  reservations?: Reservation[];
}
