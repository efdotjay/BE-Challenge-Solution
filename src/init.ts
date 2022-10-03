
import db from './config/db';
import Order from './models/order.model';
import OrderItem from './models/order-item.model';
import Product from './models/product.model';

export default () => {
  Order.belongsToMany(Product, { through: OrderItem });
  Product.belongsToMany(Order, { through: OrderItem });

  return db.sync({ force: true });
};
