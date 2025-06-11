import { db_config } from "./config.js";
import { DataTypes } from "sequelize";

export const Store = db_config.define("store", {
  storeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 400],
        msg: "Address must not exceed 400 characters.",
      },
    },
  },
  storeOwnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 5.0,
    },
  },
},{
    tableName:"stores",
  });

