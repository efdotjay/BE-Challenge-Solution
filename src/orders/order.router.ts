
import express, {Request, Response} from 'express';
import { BaseOrderAttributes } from './order.interface';
import { PaymentDetails } from './payment.interface';
import { createOrder } from './order.service';

const cache: any = {};

export const orderRouter = express.Router();

orderRouter.post('/', async (req: Request, res: Response) => {
  try {
    const idempotenceKey = req.headers['x-idempotence-key'] as string;
    if (cache[idempotenceKey])
      return res.status(201).json(cache[idempotenceKey]);

    const {cardNo, expiryDate, cvc, items} = req.body as BaseOrderAttributes & PaymentDetails;

    if (!cardNo || !expiryDate || !cvc)
      throw new Error('Incomplete payment details.');

    if (!Array.isArray(items))
      throw new Error('Invalid Input data');

    const order = await createOrder({items});

    res.status(201).json(order);
    if (idempotenceKey)
      cache[idempotenceKey] = order;
  }
  catch(err){
    res.send((err as Error).message);
  }
});
