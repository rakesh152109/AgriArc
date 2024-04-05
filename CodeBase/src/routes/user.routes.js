import { Router } from "express";
import { logInUser, logOutUser, registerUser  ,deleteUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/register").post(
  upload.single("profileImage"),
  registerUser
);
router.route("/login").post(logInUser)
router.route("/logout").post(verifyJWT , logOutUser)
router.route("/delete").post(verifyJWT , deleteUser)

export default router;
