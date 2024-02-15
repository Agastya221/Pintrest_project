import User from "../models/User.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";


const generateRefreshandAccessToken = async (user_id) => {
     const user = await User.findById(user_id)
     const accessToken =  user.generateAccessToken()
     const refreshToken =  user.generateRefreshToken()
     user.refreshToken = refreshToken
     await user.save({validatebeforeSave: false})
     
    return {accessToken, refreshToken}
}

const RegisterUser = async (req, res) => {
    // All fields validation 
    // Check if user already exists
    // save user to database
    try {
        const { username, fullName, Avatar, email, password } = req.body;

        if ([username, fullName, Avatar, email, password].some(field => field?.trim() === "")) return res.status(400).send("All fields are required")

        const Userexist = await User.findOne({ $or: [{ username }, { email }] })
        if (Userexist) return res.status(400).send("User already exists")

        const avatarLocalPath = req.files?.Avatar[0].path;
        if (!avatarLocalPath) {
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
        if (!createdUser) return res.status(400).send("User not created")

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

const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email) return res.status(401).send("Username and email are required")

        const user = await User.findOne({ $or: [{ username }, { email }] })

        if (!user) return res.status(400).send("User not found")

        const isValidPassword = await user.isValidPassword(password)
        if(!isValidPassword) return res.status(400).send("Invalid password")

        const {accessToken, refreshToken} = await generateRefreshandAccessToken(user._id)

        const options = {
            httpOnly: true,
            secure : true,
        }

    return res.status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken",refreshToken, options)
    .json(
        new ApiResponse(200,{
            user: refreshToken,accessToken, 
        }, "Login successful")
    )


    } catch {
        return res.status(500).json(
            {
                message: "Something went wrong in login",
            }
        )
    }
}

export default RegisterUser

