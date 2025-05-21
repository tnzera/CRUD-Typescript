import { DataSource } from "typeorm";
import { Pitch } from "./model/Pitch";
import { Player } from "./model/Player";
import { Reservation } from "./model/Reservation";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "fute",
  synchronize: true,
  logging: true,
  entities: [Pitch, Player, Reservation],
  migrations: [],
  subscribers: [],
});
