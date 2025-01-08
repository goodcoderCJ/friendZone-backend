import express from "express";
import userController from "../controllers/userController.js";

import authMiddle from "../middleware/authMiddle.js";

const router = express.Router();

//@desc create user route 
//@route POST "/api/users"
//@access Public
router.post("/", userController.createUser);

//@desc list all users 
//@route route GET "/api/users"
//@access Private
router.get("/", authMiddle.userAuthorization, userController.listUsers);

//@desc get a single particular user 
//@route GET "/api/users/:id"
//access Private
router.get("/:id", authMiddle.userAuthorization, userController.getUser);

//@desc update a single particular user 
//@route PATCH "/api/users/:id"
//@access Private
router.patch("/:id", authMiddle.userAuthorization, userController.updateUser);

//@desc delete a single particular user 
//@route DELETE "/api/users/:id"
//@access Private
router.delete("/:id", authMiddle.userAuthorization, userController.deleteUser);

export default router;
