import { Users } from "./userModel.js";
import { Store } from "./storeModel.js";
import { Ratings } from "./ratingsModel.js";

Users.hasOne(Store, {
  foreignKey: "storeOwnerId",
  as: "store",
});

Store.belongsTo(Users, {
  foreignKey: "storeOwnerId",
  as: "owner",
});

Users.hasMany(Ratings, {
  foreignKey: "userId",
  as: "ratings",
});

Ratings.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Store.hasMany(Ratings, {
  foreignKey: "storeId",
  as: "ratings",
});

Ratings.belongsTo(Store, {
  foreignKey: "storeId",
  as: "store",
});