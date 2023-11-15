const { Router } = require("express");

const userController = require("./controller/user.js");

const routes = new Router();

// สร้าง routing โดยใช้ HTTP GET
routes.get("/user", userController.getUsers);
routes.get("/user/:user_id", userController.getUser);
routes.post("/user", userController.createUser);
routes.put("/user/:user_id", userController.updateUser);
routes.delete("/user/:user_id", userController.deleteUser);

export default routes;
