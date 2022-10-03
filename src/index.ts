import * as dotenv from "dotenv";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

import express from "express";
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';

const PORT: number = parseInt(process.env.PORT);

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
