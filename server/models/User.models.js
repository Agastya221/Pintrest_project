import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    Avatar: String,
    email: String,
    post:[],
    password: String, // Hashed password
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  },{timestamps: true});
userSchema.pre("save", async function(next) {
    if(isModified("password")) return next()
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password)
} 

const User = mongoose.model("User", userSchema)

export default User;