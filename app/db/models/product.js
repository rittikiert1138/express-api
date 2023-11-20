module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "product",
    {
      productId: {
        type: Sequelize.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        field: "productId",
      },
      productName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "productName",
      },
      productPrice: {
        type: Sequelize.STRING(7),
        allowNull: false,
        field: "productPrice",
      },
      productThumbnail: {
        type: Sequelize.INTEGER(3),
        allowNull: true,
        field: "productThumbnail",
      },
    },
    {
      tableName: "product",
    }
  );

  return product;
};
