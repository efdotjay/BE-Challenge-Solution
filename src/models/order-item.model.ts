
import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import sequelize from '../config/db';
import Product from './product.model';
import Order from './order.model';

class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
  declare quantity: number;
  declare ProductId: ForeignKey<Product['id']>;
  declare OrderId: ForeignKey<Order['id']>;
}

OrderItem.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
});

export default OrderItem;
