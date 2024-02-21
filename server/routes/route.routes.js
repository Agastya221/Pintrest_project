import express  from "express";
const Router = express.Router()
import upload from "../middleware/multer.middleware.js";
import {RegisterUser, loginUser,logoutUser} from "../controllers/User.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


Router.route("/register").post(
    upload.fields([
    {
            name: "Avatar",
            maxCount : 1 
    }
    ]),
  RegisterUser);
Router.route("/login").post(loginUser);
Router.route("/logout").post(verifyJWT, logoutUser);


export default Router