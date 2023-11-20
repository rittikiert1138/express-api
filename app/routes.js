const { Router } = require("express");

const {
  productController,
  productTypeController,
  userController,
} = require("./controller");

const routes = new Router();

// User route
routes.get("/user", userController.getUsers);
routes.get("/user/:user_id", userController.getUser);
routes.post("/user", userController.createUser);
routes.put("/user/:user_id", userController.updateUser);
routes.delete("/user/:user_id", userController.deleteUser);
//User auth
routes.post("/user/login", userController.loginUser);

// Product route
routes.get("/product-type", productTypeController.getTypes);
routes.get("/product-type/:type_id", productTypeController.getType);
routes.post("/product-type", productTypeController.createType);
routes.put("/product-type/:type_id", productTypeController.updateType);
routes.delete("/product-type/:type_id", productTypeController.deleteType);
// routes.get("/product/:product_id", productController.getProduct);
// routes.post("/product", productController.createProduct);
// routes.put("/product/:product_id", productController.updateProduct);
// routes.delete("/product/:product_id", productController.deleteProduct);

routes.get("/product", productController.getProducts);
routes.get("/product/:product_id", productController.getProduct);
routes.post("/product", productController.createProduct);
routes.put("/product/:product_id", productController.updateProduct);
routes.delete("/product/:product_id", productController.deleteProduct);

export default routes;
