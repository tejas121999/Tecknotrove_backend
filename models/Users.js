const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }

  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        field: "name",
      },
      username: {
        type: DataTypes.STRING,
        field: "username",
      },
      password: {
        type: DataTypes.STRING,
        field: "password",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: "isActive",
        defaultValue: true,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        field: "isDelete",
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
      timestamps: true,
    }
  );
  return Users;
};
