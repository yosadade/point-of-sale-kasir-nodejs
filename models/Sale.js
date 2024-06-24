// models/Sale.js
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Sale;
};
