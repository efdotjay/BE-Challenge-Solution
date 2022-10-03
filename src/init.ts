
import db from './config/db';
import Order from './models/order.model';
import OrderItem from './models/order-item.model';
import Product from './models/product.model';

export default async () => {
  Order.belongsToMany(Product, { through: OrderItem });
  Product.belongsToMany(Order, { through: OrderItem });

  await db.sync({ force: true });

  return Product.bulkCreate([
    {
      name: 'Optical mouse',
      price: 20,
      qty_in_stock: 100
    },
    {
      name: 'Keyboard',
      price: 200,
      qty_in_stock: 100
    },
    {
      name: 'Earphones',
      price: 450,
      qty_in_stock: 100
    },
    {
      name: 'Key ring',
      price: 50,
      qty_in_stock: 100
    },
    {
      name: 'Table lamp',
      price: 4550,
      qty_in_stock: 100
    }
  ]);
};
