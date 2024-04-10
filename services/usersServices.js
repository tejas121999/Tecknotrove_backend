const { Users } = require("../models");
const bcrypt = require("bcrypt");
// const { createTokens } = require("../middleware/JWT");

const getAllUsers = async (req, res) => {
  try {
    const data = await Users.findAll({
      where: {
        isDelete: false,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const createUsers = async (req, res) => {
  try {
    const createUSer = await Users.create(req);
    return createUSer;
  } catch (error) {
    return error;
  }
};

const updateUsers = async (req, res) => {
  try {
    const updateUser = await Users.update(req, {
      where: {
        id: req.id,
      },
    });
    return updateUser;
  } catch (error) {
    return error;
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await Users.findOne({
      where: {
        id: req.id,
        isDelete: false,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const data = await Users.findOne({
      where: {
        username: req.username,
        isDelete: false,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  getAllUsers,
  createUsers,
  updateUsers,
  getUserById,
  deleteUser,
  getUserByUserName,
};
