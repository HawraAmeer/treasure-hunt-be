module.exports = (sequelize, DataTypes) =>
  sequelize.define("Thing", {
    name: { type: DataTypes.STRING, allowNull: false },
    isTreasure: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
