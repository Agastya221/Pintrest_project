import jwt  from "jsonwebtoken";
import User from "../models/User.models.js"


export const  verifyJWT = async(req, res, next)=>{
   try {
       const Token = req.cookies.accessToken || req.headers("Authorization").replace("Bearer ", "")
       const DecodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET)
       const user = await User.findById(DecodedToken._id)
        req.user = user
        next()


   } catch (error) {
       return res.status(401).send("Invalid Token")
   }
}