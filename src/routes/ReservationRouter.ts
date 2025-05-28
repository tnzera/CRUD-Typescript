import { Router } from "express";
import { ReservationController } from "../controller/ReservationController";

export const ReservationRouter = (
  controller: ReservationController
): Router => {
  const router = Router();

  router.get("/", controller.list);
  router.get("/:id", controller.findById);
  router.post("/", controller.insert);
  router.delete("/:id", controller.delete);

  return router;
};
