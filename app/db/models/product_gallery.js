module.exports = (sequelize, Sequelize) => {
  const productGallery = sequelize.define(
    "productGallery",
    {
      galleryId: {
        type: Sequelize.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        field: "galleryId",
      },
      path: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: "typeName",
      },
    },
    {
      tableName: "product_gallery",
    }
  );

  return productGallery;
};
