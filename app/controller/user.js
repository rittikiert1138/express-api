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
    let _user = await user.findOne({ where: { userId: userId } });

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
      let genPassword = await bcrypt.hash(req.body.password, 10);
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
        userId: req.params.user_id,
      },
    });

    res.json({ msg: "Delete user successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    let { password, email } = req.body;
    let _user = await user.findOne({ where: { email: email } });
    if (_user) {
      let checkPassword = await bcrypt.compare(password, _user.password);

      if (checkPassword) {
        let token = jwt.sign(
          {
            userId: _user.lastName,
            firstName: _user.firstName,
            email: _user.email,
            phone: _user.phone,
          },
          "auth login",
          { expiresIn: "2h" }
        );

        res.json({
          token: token,
        });
      } else {
        res.json({
          msg: "รหัสผ่านไม่ถูกต้อง",
        });
      }
    } else {
      res.json({
        msg: "ไม่มีผู้ใช้งานนี้อยู่ในระบบ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
