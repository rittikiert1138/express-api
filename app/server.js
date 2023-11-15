// import express from 'express';
const routes = require("./routes");
const config = require("./config/constants");
const db = require("./db/index.js");
const express = require("express");

// สร้าง instance express ไว้ในตัวแปร app
const app = express();

app.use(express.json());

db.sequelize.sync();

// กำหนด middleware โดยใช้ Path Pattern
// ทุก request จะต้องมี path ที่ขึ้นต้นด้วย ค่าที่เรา config ไว้ในไฟล์ constants
app.use(config.prefix, routes);

// run instance web server โดยใช้ port ที่อยู่ในไฟล์ constants ของเรา
app.listen(config.port, () => {
  console.log(`
    Port: ${config.port}
    Env: ${app.get("env")}
  `);
});

// app.get('/playerInfo', async (req, res) => {
//   info =  await player.findAll();
//   res.json(info);
// });

// app.get('/playerInfo/:id', async (req, res) => {
//   id =  req.params.id;
//   info =  await player.findOne({
//     //attributes: ['name', ['tid','team'] , 'age'], สามารถเลือกเฉพาะ attributes ที่ต้องการได้ และ ['tid','team'] เขียนเป็น sql ก็จะได้ แบบนี้ครับ tid AS team
//     where: { pid: id }
//   });
//   if(!info){
//     res.sendStatus(500);
//   }else{
//     res.json(info);
//   }

// });

// app.post('/playerInfo', async (req, res) => {
//   data  =  req.body.data;
//   console.log('ss',req.body.data)
//   info =  await player.create({
//     name: data.name,
//     age: data.age,
//     position: data.position,
//     tid: data.tid,
//   });
//   if(!info){
//     res.sendStatus(500);
//   }else{
//     res.status(200).json(info);
//   }
// });

// app.put('/playerInfo/:id', async (req, res) => {
//   id =  req.params.id;
//   info =  await player.update({ position: 'ST' },{
//     where: { pid: id }
//   });
//   if(!info){
//     res.sendStatus(500);
//   }else{
//     res.sendStatus(200);
//   }
// });

// app.delete('/playerInfo/:id', async (req, res) => {
//   id =  req.params.id;
//   info =  await player.destroy({
//     where: { pid: id }
//   });
//   if(!info){
//     res.sendStatus(500);
//   }else{
//     res.sendStatus(200);
//   }
// });

// app.use((_req, res) => {
//   res.sendStatus(501);
// });

// app.use(config.prefix, routes);

// app.listen(config.port, () => {
//   console.log(`
//     Port: ${config.port}
//     Env: ${app.get("env")}
//   `);
// });
