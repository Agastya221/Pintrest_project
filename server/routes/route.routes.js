import express  from "express";
const Router = express.Router()
import upload from "../middleware/multer.middleware.js";
import RegisterUser from "../controllers/User.controller.js";


Router.route("/register").post(
    upload.fields([
    {
            name: "Avatar",
            maxCount : 1 
    }
    ]),
  RegisterUser);


export default Router