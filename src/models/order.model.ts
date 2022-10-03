
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, NonAttribute, Association } from 'sequelize';
import sequelize from '../config/db';
import Product from './product.model';

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare status: string;
  declare itmes?: NonAttribute<Product[]>;

  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;

  declare public static associations: { 
    products: Association<Order, Product>;
  };
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'pending',
    allowNull: false
  }
}, {
  sequelize
});

export default Order;
