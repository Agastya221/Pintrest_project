import User from "../models/User.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js";

export default  RegisterUser = async()=>{
    // All fields validation 
    // Check if user already exists
    // save user to database
    try {
        const { username, fullName, Avatar, email, password } = req.body;

        if([username, fullName, Avatar, email, password].some(field => field?.trim() === "")) return res.status(400).send("All fields are required")

        const Userexist = User.findOne({ $or : [{ username }, { email }] })
        if(Userexist) return res.status(400).send("User already exists")

    const avatarLocalPath = req.files?.avatar[0].path
    if(!avatarLocalPath){
        return res.status(400).send("Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        return res.status(400).send("Avatar file is required")
    }
        User.create({
            fullName,
            avatar: avatar.url,
            email, 
            password,
            username
        })

    } catch (error) {
        
    }
    



    
    



}

