import User from "../models/User.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";


const  RegisterUser = async(req, res)=>{
    // All fields validation 
    // Check if user already exists
    // save user to database
    try {
        const { username, fullName, Avatar, email, password } = req.body;
        console.log("Request Body:", req.body);

        if([username, fullName, Avatar, email, password].some(field => field?.trim() === "")) return res.status(400).send("All fields are required")

        const Userexist = await User.findOne({ $or : [{ username }, { email }] })
        if(Userexist) return res.status(400).send("User already exists")

        const avatarLocalPath =  req.files?.Avatar[0].path;
    console.log(avatarLocalPath)
    if(!avatarLocalPath){
        return res.status(400).send("Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("Uploaded avatar:", avatar);
    if (!avatar) {
        return res.status(400).send("Avatar file upload failed");
    }
      const user = await User.create({
            username,
            fullName,
            Avatar: avatar.url,
            email, 
            password,
            
        })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
        if(!createdUser) return res.status(400).send("User not created")

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User created successfully")
        )

    } catch (error) {
       return res.status(500).json(
        {
            message: "Something went wrong in user creation",
            error: error.message
        }
       )
    }
    



    
    



}

export default RegisterUser

