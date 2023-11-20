const { Sequelize } = require("sequelize");

//อันนี้เป็นส่วนที่ใช้ในการบอก Sequelize ว่าเราจะ connect ไปที่ไหน
const sequelize = new Sequelize(
  "learning_api", // นี่เป็นชื่อ DB ของเรานะครับ
  "root", // user ที่ใช้สรการเข้าไปยัง db
  "", // password
  {
    host: "localhost", // host ของ db ที่เราสร้างเอาไว้
    port: 3306,
    dialect: "mysql", // 'mysql' | 'mariadb' | 'postgres' | 'mssql'   พวกนี้ใช่ก็ใช้ได้นะจ๊ะ
    define: {
      timestamps: false, //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ส่วนนี้เป็นการ import model ของ table ใน database เข้ามาเพื่อตั้งต่า relation นะครับ
db.product = require("./models/product")(sequelize, Sequelize);
db.product_type = require("./models/product_type")(sequelize, Sequelize);
// db.product_gallery = require("./models/product_gallery")(sequelize, Sequelize);
db.user = require("./models/user")(sequelize, Sequelize);

db.product_type.hasMany(db.product, {
  foreignKey: { name: "typeId", field: "typeId" },
});

db.product.belongsTo(db.product_type, { foreignKey: "typeId" });

// db.product_gallery.hasMany(db.product, {
//   foreignKey: { name: "galleryId", field: "galleryId" },
// });

// db.product.belongsTo(db.product_gallery, { foreignKey: "galleryId" });

// db.team.hasMany(db.player, {
//   foreignKey: { name: "tid", field: "tid" },
// });
// db.player.belongsTo(db.team, { foreignKey: "tid" });

module.exports = db;
