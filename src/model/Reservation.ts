import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => Player, (player) => player.reservations, {
    eager: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "playerId" })
  player?: Player;

  @ManyToOne(() => Pitch, (pitch) => pitch.reservations, {
    eager: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "pitchId" })
  pitch?: Pitch;
}
