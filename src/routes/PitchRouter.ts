import { Router } from "express";
import { PitchController } from "../controller/PitchController";

export const PitchRouter = (controller: PitchController): Router => {
  const router = Router();

  router.get("/", controller.list);
  router.get("/:id", controller.findById);
  router.post("/", controller.insert);
  router.delete("/:id", controller.delete);

  return router;
};
