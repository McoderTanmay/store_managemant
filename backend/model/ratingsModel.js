import { db_config } from "./config";
import { DataTypes } from "sequelize";

export const Ratings = db_config.define("ratings", {
  ratingId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ratingValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "Rating value must be at least 1.",
      },
      max: {
        args: [5],
        msg: "Rating value must not exceed 5.",
      },
    },
  },
}, {
  tableName: "ratings",
});