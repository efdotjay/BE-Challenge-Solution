import * as dotenv from "dotenv";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

import express from "express";
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { orderRouter } from './orders/order.router';
import init from './init';

(async () => {
  await init();

  const PORT: number = parseInt(process.env.PORT as string);

  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/orders', orderRouter);

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
  
})();
