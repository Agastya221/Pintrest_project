import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongooseaggragatePaginate from "mongoose-aggregate-paginate-v2";
import 'dotenv/config'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim:true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    Avatar: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true,
        trim:true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    password: {
        type: String,
        required: true,
    }, //password is Hashed before save
    refreshToken: {
        type: String,
    },

    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],

    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],


}, { timestamps: true });

userSchema.plugin(mongooseaggragatePaginate)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.generateAccessToken = async function () {
   return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCES_TOKEN_SECRET,{
            expiresIn: process.env.ACCES_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

export default User;