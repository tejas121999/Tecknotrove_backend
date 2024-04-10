const services = require("../services/usersServices");
const bcrypt = require("bcrypt");
const { createTokens } = require("../middleware/JWT");

exports.registerUser = async (req, res) => {
  try {
    const { user } = req.body;
    const findUser = await services.getUserByUserName(user);
    if (findUser) {
      return res.status(200).json({ message: "User already exists" });
    } else {
      await bcrypt.hash(user.password, 10).then(async (hash) => {
        user.password = hash;
        await services
          .createUsers(user)
          .then((result) => {
            const accessToken = createTokens(result);
            return res.status(200).json({
              message: "User Created successfully",
              result,
              accessToken,
            });
          })
          .catch((err) => {
            return res.status(400).json({ error: err });
          });
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { user } = req.body;
    const findUser = await services.getUserByUserName(user);
    if (!findUser) {
      return res.status(404).json({ message: "User not exists" });
    } else {
      const dbPassword = findUser.password;
      bcrypt.compare(user.password, dbPassword).then((match) => {
        if (!match) {
          res.status(400).json({
            error: "Wrong Credential!",
          });
        } else {
          const accessToken = createTokens(findUser);
          if (accessToken) {
            return res.status(200).json({
              message: "User Login Successful",
              accessToken,
              findUser,
            });
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.getDetails = async (req, res) => {
  try {
    const { user } = req.body;
    const findUser = await services.getUserById(user);
    if (!findUser) {
      return res.status(404).json({ message: "data not exists" });
    } else {
      return res.status(200).json({ findUser });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
