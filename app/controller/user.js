const db = require("../db/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = db;

export const getUsers = async (req, res) => {
  try {
    let users = await user.findAll();

    res.json({
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    let userId = req.params.user_id;
    let _user = await user.findOne({ where: { user_id: userId } });

    res.json({
      user: _user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  try {
    let checkDuplicate = await user.findOne({
      where: { email: req.body.email },
    });

    if (checkDuplicate == null) {
      // const salt = bcrypt.genSaltSync(10);
      let genPassword = bcrypt.hashSync(req.body.password, 5);
      await user.create({
        ...req.body,
        password: genPassword,
      });
      res.json({ msg: "Create user successfully" });
    } else {
      res.status(400).json({ msg: "This email already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    let checkDuplicate = await user.findOne({
      where: {
        userId: {
          [Op.ne]: req.params.user_id,
        },
        email: {
          [Op.eq]: req.body.email,
        },
      },
    });

    if (checkDuplicate == null) {
      await user.update(req.body, {
        where: {
          userId: req.params.user_id,
        },
      });

      res.json({ msg: "Update user successfully" });
    } else {
      res.status(400).json({ msg: "This email already exists" });
    }
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

    res.json({ msg: "Delete user successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    // await user.destroy({
    //   where: {
    //     user_id: req.params.user_id,
    //   },
    // });

    console.log("req.body", req.body);

    let _user = await user.findOne({ where: { email: req.body.email } });

    // res.json(_user);

    console.log("_user", _user);

    if (_user != null) {
      let checkPassword = bcrypt.compareSync(req.body.password, _user.password);
      res.json({
        check: checkPassword,
      });
      // const match = await bcrypt.compare(req.body.password, _user.password);

      // res.json(match);
      // bcrypt.compare(req.body.password, _user.password).then(function (result) {
      //   console.log("check", result);
      //   // result == false
      // });
    } else {
      res.json({ msg: "This email does not exist" });
    }

    // let _user = await user.findOne({
    //   where: { email: req.body.email },
    // });
    // let checkPassword = bcrypt.compareSync(myPlaintextPassword, hash);

    res.json(_user);
  } catch (error) {
    console.log(error);
  }
};
