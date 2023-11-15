module.exports = ( sequelize , Sequelize ) => {
    const player = sequelize.define(
      'player',
      {
  // ด้านล่างเป็นการตั้งค่า attribute ของ table นะครับ
  // ชื่อตัวแปรที่เราใช้เรียกแทน: { type: Sequelize.STRING(50), allowNull: false, field: 'ชื่อของ attribute' } 
  // สามารถใส่ option เพิ่มเติมได้นะครับเช่น primaryKey: true อะไรแบบนี้ 
  // แล้วก็อันนี้สำคัญ ** ไม่จำเป็นต้องสร้าง attribute ที่เป็น FK จาก table อื่นนะครับ เพราะเราจะไปกำหนด relation กันใน file index
          pid: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'pid' },
          name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
          age: { type: Sequelize.INTEGER(11), allowNull: false, field: 'age' },
          position: { type: Sequelize.STRING(50), allowNull: false, field: 'position' },
      },
      {
          tableName: 'player' 
      }
    );
    
    return player;
  }