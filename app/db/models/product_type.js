module.exports = (sequelize, Sequelize) => {
  const productType = sequelize.define(
    "productType",
    {
      typeId: {
        type: Sequelize.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        field: "typeId",
      },
      typeName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: "typeName",
      },
    },
    {
      tableName: "product_type",
    }
  );

  return productType;
};
