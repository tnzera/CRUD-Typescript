import { Router } from "express";
import { PitchController } from "../controller/PitchController";
import { upload } from "../middleware/upload";

export const PitchRouter = (controller: PitchController): Router => {
  const router = Router();

  router.get("/", controller.list);
  router.get("/:id", controller.findById);
  router.post("/", upload.single("pitchImage"), controller.insert);
  router.delete("/:id", controller.delete);

  return router;
};
