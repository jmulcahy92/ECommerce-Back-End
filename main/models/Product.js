// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // product id; referenced by ProductTag model
    // integer, not null, primary key, auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // name of this product
    // string, not null
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // price of this product
    // decimal (precision of 5 digits overall, 2 digits after decimal)
    // not null, validates that value is decimal
    price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    // how much of this product in stock
    // integer, not null, default value of 10, validates that value is numeric
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    // what category the product falls under; references Category model's id
    // integer
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
