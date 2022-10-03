
import express, {Request, Response} from 'express';
import { BaseOrderAttributes } from './order.interface';
import { createOrder } from './order.service';

const cache: any = {};

export const orderRouter = express.Router();

orderRouter.post('/', async (req: Request, res: Response) => {
  try {
    const idempotenceKey = req.headers['x-idempotence-key'] as string;
    if (cache[idempotenceKey])
      return res.status(304).json(cache[idempotenceKey]);

    const data = req.body as BaseOrderAttributes;
    if (!Array.isArray(data.items))
      throw new Error('Invalid Input data');
    const order = await createOrder(data);
    res.json(order);

    cache[idempotenceKey] = order;
  }
  catch(err){
    res.send((err as Error).message);
  }
});
