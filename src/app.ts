import { AppDataSource } from "./data-source";
import express from "express";

AppDataSource.initialize()
  .then((async) => {
    const app = express();
    app.use(express.json());

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
