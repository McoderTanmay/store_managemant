import { db_config } from "./config.js";
import { DataTypes } from "sequelize";

export const Users = db_config.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [20, 60],
          msg: "Name must be between 20 and 60 characters.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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
    role: {
      type: DataTypes.ENUM("user", "admin", "store_owner"),
      allowNull: false,
      
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);