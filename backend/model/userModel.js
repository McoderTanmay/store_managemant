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
      allowNull: false,
      validate: {
        len: {
          args: [8, 16],
          msg: "Password must be between 8 and 16 characters.",
        },
        isValidPassword(value) {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          if (!hasUpperCase || !hasSpecialChar) {
            throw new Error(
              "Password must include at least one uppercase letter and one special character."
            );
          }
        },
      },
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