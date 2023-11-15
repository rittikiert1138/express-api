const db = require("../db/index.js");
const { user } = db;

export const getUsers = async (req, res) => {
  try {
    let users = await user.findAll();

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    let userId = req.params.user_id;
    let _user = await user.findOne({ where: { user_id: userId } });

    res.json(_user);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  try {
    await user.create(req.body);

    res.json("create success");
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    await user.update(req.body, {
      where: {
        user_id: req.params.user_id,
      },
    });

    res.json("update success");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await user.destroy({
      where: {
        user_id: req.params.user_id,
      },
    });

    res.json("delete success");
  } catch (error) {
    console.log(error);
  }
};
