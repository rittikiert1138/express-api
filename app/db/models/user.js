module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      userId: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        field: "userId",
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "firstName",
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "lastName",
      },
      email: { type: Sequelize.STRING(50), allowNull: false, field: "email" },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: "password",
      },
      phone: { type: Sequelize.STRING(15), allowNull: false, field: "phone" },
    },
    {
      tableName: "user",
    }
  );

  return user;
};
