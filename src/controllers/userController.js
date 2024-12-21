import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/userModel.js";
// import asyncHandler from "express-async-handler";

//generating the token
function generateJwt(id) {
  return jsonwebtoken.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
}

//create user controller
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      const token = generateJwt(user._id);
      res.cookie("usertoken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json({
        id: user._id,
        name,
        email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: token,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//list all user controller
const listUsers = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//get a user controller
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//update a user controller
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const currentUser = await User.findById(req.user._id);

    if (currentUser._id.toString() !== id) {
      return res
        .status(401)
        .json({ message: "You can only edit your own data" });
    }

    const userUpdated = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return res.status(200).json(userUpdated);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const currentUser = await User.findById(req.user._id);

    if (currentUser._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "You can only delete your own data" });
    }

    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ id: id, message: `User with ${id} id deleted` });
  } catch (err) {
    return res.status(400).json({ message: "User data deletion unsuccessful" });
  }
};

export default {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};
