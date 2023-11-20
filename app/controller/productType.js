const db = require("../db/index.js");
const { product_type } = db;

export const getTypes = async (req, res) => {
  try {
    let types = await product_type.findAll();

    res.json({
      product_type: types,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getType = async (req, res) => {
  try {
    let typeId = req.params.type_id;

    let type = await product_type.findOne({
      where: { typeId: typeId },
    });

    res.json({
      product_type: type,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createType = async (req, res) => {
  try {
    let checkDuplicate = await product_type.findOne({
      where: { typeName: req.body.typeName },
    });

    if (checkDuplicate == null) {
      await product_type.create(req.body);

      res.json({
        msg: "Create product type successfully",
      });
    } else {
      res.status(400).json({ msg: "This type name already exists" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateType = async (req, res) => {
  try {
    await product_type.update(req.body, {
      where: {
        typeId: req.params.type_id,
      },
    });

    res.json({
      msg: "Update product type successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteType = async (req, res) => {
  try {
    await product_type.destroy({
      where: {
        typeId: req.params.type_id,
      },
    });

    res.json({
      msg: "Delete product type successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
