;
import { BaseOrderAttributes } from './order.interface';
import Order from '../models/order.model';
import Product from '../models/product.model';

export const createOrder = async (orderInput: BaseOrderAttributes) => {
  const items = await Promise.all(orderInput.items.map(async item => {
    const product = await Product.findByPk(item.product_id);
    if (!product)
      throw new Error(`Product with id (${item.product_id}) does not exist.`);

    if (product.qty_in_stock < item.quantity)
      throw new Error(`Insufficient stock for Product (${product.name}). Available quantity: ${product.qty_in_stock}`);

    return {
      product,
      quantity: item.quantity
    };
  }));

  const order = await Order.create();

  await Promise.all(items.map(item => {
    return order.addProduct(item.product, { through: { quantity: item.quantity } })
      .then(() => {
        // Update quantity in stock.
        return item.product.decrement('qty_in_stock', {by: item.quantity});
      })
    ;
  }));

  return order.reload({
    include: {
      model: Product,
      attributes: {
        exclude: ['qty_in_stock', 'createdAt', 'updatedAt']
      }
    }
  });
};
