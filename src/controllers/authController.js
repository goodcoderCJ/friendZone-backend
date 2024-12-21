import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

//generate user token
function generateJwt(id) {
  return jsonwebtoken.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const fetchedUser = await User.findOne({ email });
    const passwordCompare = bcryptjs.compare(password, fetchedUser.password);

    if (fetchedUser && passwordCompare) {
      const token = generateJwt(fetchedUser.id);
      res.cookie("usertoken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res
        .status(200)
        .json({
          id: fetchedUser.id,
          name: fetchedUser.name,
          email: fetchedUser.email,
          message: "Signed in sucessfully",
          token: token,
        });
    } else {
      res.status(400).json({ message: "Data does not match" });
    }
  } catch (err) {
    res.status(401).json({ message: "User data not found " });
  }
};

const signOut = async (req, res) => {
  res.clearCookie("usertoken");
  res.status(200).json({ message: "User signed out successfully" });
};

export default {
  signIn,
  signOut,
};
