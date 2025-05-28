import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Player } from "./Player";
import { Pitch } from "./Pitch";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "timestamp with time zone" })
  reservationTime?: Date;

  @Column()
  durationMinutes?: number;

  @ManyToMany(() => Player)
  @JoinTable()
  player?: Player[];

  @ManyToOne(() => Pitch, (pitch) => pitch.reservations)
  pitch?: Pitch;
}
