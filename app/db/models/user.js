module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      user_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      firstname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "firstname",
      },
      lastname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "lastname",
      },
      email: { type: Sequelize.STRING(50), allowNull: false, field: "email" },
      password: {
        type: Sequelize.STRING(50),
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
