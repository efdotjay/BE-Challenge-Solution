
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare qty_in_stock: number;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: DataTypes.FLOAT.ZEROFILL,
  qty_in_stock: DataTypes.INTEGER.ZEROFILL
  
}, {
  sequelize
});

export default Product;
