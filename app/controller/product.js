const db = require("../db/index.js");
const { Op } = require("sequelize");
const { product, product_type } = db;

export const getProducts = async (req, res) => {
  try {
    let products = await product.findAll({
      include: product_type,
    });

    res.json({
      products: products,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    let productId = req.params.product_id;

    let product = await product.findOne({
      where: { product_id: productId },
      include: product_type,
    });

    res.json({
      product: product,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    let checkDuplicate = await product.findOne({
      where: { productName: req.body.productName },
    });

    console.log("checkDuplicate", checkDuplicate);

    if (checkDuplicate == null) {
      await product.create(req.body);

      res.json({
        msg: "Create product successfully",
      });
    } else {
      res.status(400).json({ msg: "This product name already exists" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let checkDuplicate = await product.findOne({
      where: {
        productId: {
          [Op.ne]: req.params.product_id,
        },
        productName: {
          [Op.eq]: req.body.productName,
        },
      },
    });

    if (checkDuplicate == null) {
      await product.update(req.body, {
        where: {
          productId: req.params.product_id,
        },
      });

      res.json({
        msg: "Update product successfully",
      });
    } else {
      res.status(400).json({ msg: "This product name already exists" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await product.destroy({
      where: {
        product_id: req.params.product_id,
      },
    });

    res.json({
      msg: "Delete product successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getList = async (req, res) => {
  try {
    // await product.destroy({
    //   where: {
    //     product_id: req.params.product_id,
    //   },
    // });

    let lists = product_type.findAll();

    res.json({
      status: "success",
      data: lists,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
