import express from "express";

import authController from "../controllers/authController.js";



const router = express.Router();
//@ signIn User route POST
router.post("/signin",authController.signIn);
// @ signOut User rout GET
router.get("/signout",authController.signOut);

export default router;