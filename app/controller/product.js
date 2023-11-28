const db = require("../db/index.js");
const { Op } = require("sequelize");
const fs = require("fs");
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
      where: { productId: productId },
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

    let body = req.body;
    let media1;

    if (checkDuplicate == null) {
      if (req.files.productThumbnail) {
        let file1 = req.files.productThumbnail;

        media1 = "thumbnail_" + Date.now() + "." + file1.mimetype.split("/")[1];

        body.productThumbnail = media1;

        file1.mv(`${__dirname}/../public/${media1}`);
      }

      await product.create(body);

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

    let getProduct = await product.findOne({
      where: { productId: req.params.product_id },
    });

    let body = req.body;
    let media1;

    if (checkDuplicate == null) {
      if (req.files) {
        if (req.files.productThumbnail) {
          let file1 = req.files.productThumbnail;
          if (
            fs.existsSync(
              `${__dirname}/../../public/thumbnail/${getProduct.productThumbnail}`
            )
          ) {
            fs.unlinkSync(
              `${__dirname}/../../public/thumbnail/${getProduct.productThumbnail}`
            );
          }

          media1 =
            "thumbnail_" + Date.now() + "." + file1.mimetype.split("/")[1];

          body.productThumbnail = media1;

          file1.mv(`${__dirname}/../../public/thumbnail/${media1}`);
        }
      } else {
        body.productThumbnail = getProduct.productThumbnail;
      }
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
    let getProduct = await product.findOne({
      where: { productId: req.params.product_id },
    });

    if (
      fs.existsSync(
        `${__dirname}/../../public/thumbnail/${getProduct.productThumbnail}`
      )
    ) {
      fs.unlinkSync(
        `${__dirname}/../../public/thumbnail/${getProduct.productThumbnail}`
      );
    }
    await product.destroy({
      where: {
        productId: req.params.product_id,
      },
    });

    res.json({
      msg: "Delete product successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const upload = async (req, res) => {
  try {
    console.log("body", req.body);

    res.json({
      msg: "Delete product successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
