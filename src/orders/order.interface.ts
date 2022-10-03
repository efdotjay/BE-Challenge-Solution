
export interface BaseOrderAttributes {
  items: {
    product_id: number;
    quantity: number;
  }[];
}

export type OrderStatus = 'pending' | 'fulfilled' | 'canceled';

export interface OrderAttributes extends BaseOrderAttributes {
  id: number;
  status: OrderStatus;
}
