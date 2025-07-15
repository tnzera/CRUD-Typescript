import { Player } from "./model/Player";
import { PlayerRouter } from "./routes/PlayerRouter";
import { PlayerService } from "./services/PlayerService";
import { PlayerController } from "./controller/PlayerController";
import { AppDataSource } from "./data-source";
import { PitchService } from "./services/PitchService";
import { PitchRouter } from "./routes/PitchRouter";
import { PitchController } from "./controller/PitchController";
import { Pitch } from "./model/Pitch";
import { Reservation } from "./model/Reservation";
import { ReservationService } from "./services/ReservationService";
import { ReservationController } from "./controller/ReservationController";
import { ReservationRouter } from "./routes/ReservationRouter";
import express from "express";
import cors from "cors";

AppDataSource.initialize()
  .then((async) => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/public", express.static("public"));

    const playerRepository = AppDataSource.getRepository(Player);
    const playerService = new PlayerService(playerRepository);
    const playerController = new PlayerController(playerService);

    const pitchRepository = AppDataSource.getRepository(Pitch);
    const pitchService = new PitchService(pitchRepository);
    const pitchController = new PitchController(pitchService);

    const reservationRepository = AppDataSource.getRepository(Reservation);
    const reservationService = new ReservationService(reservationRepository);
    const reservationController = new ReservationController(reservationService);

    app.use("/api/player", PlayerRouter(playerController));
    app.use("/api/Pitch", PitchRouter(pitchController));
    app.use("/api/reservation", ReservationRouter(reservationController));

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
