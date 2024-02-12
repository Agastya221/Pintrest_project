import express  from "express";
const Router = express.Router()
import upload from "../middleware/multer.middleware";


Router.route("/").get(
    upload.fields({
            name: Avatar,
            maxCount : 1
    }
         
    )
);