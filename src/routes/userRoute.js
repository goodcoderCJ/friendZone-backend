import express from "express";
import userController from "../controllers/userController.js";

import authMiddle from "../middleware/authMiddle.js";

const router = express.Router();

//@ create user route POST "/api/user"
router.post("/", userController.createUser);

//@ list all users route GET "/api/user"
router.get("/", authMiddle.userAuthorization, userController.listUsers);

//@ get a single particular user GET "/api/user/:id"
router.get("/:id", authMiddle.userAuthorization, userController.getUser);

//@ update a single particular user PUT "/api/user/:id"
router.put("/:id", authMiddle.userAuthorization, userController.updateUser);

//@ delete a single particular user DELETE "/api/user/:id"
router.delete("/:id", authMiddle.userAuthorization, userController.deleteUser);

export default router;
