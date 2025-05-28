import { Router } from "express";
import { PlayerController } from "../controller/PlayerController";

export const PlayerRouter = (controller: PlayerController): Router => {
  const router = Router();

  router.get("/", controller.list);
  router.get("/:id", controller.findById);
  router.post("/", controller.insert);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};
