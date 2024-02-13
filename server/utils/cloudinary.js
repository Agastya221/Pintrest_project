import {v2 as cloudinary } from "cloudinary"
import fs from "fs"
import 'dotenv/config'
          
cloudinary.config({ 
  cloud_name: 'agastya', 
  api_key: '191463775297268', 
  api_secret: 'YbRWQq8Ndq4hOkmgmHEgUaNzZNo' 
});

const uploadOnCloudinary = async(localFliePath)=>{
    try {
        if(!localFliePath) return null
        console.log("Uploading to Cloudinary...");
      const response = await cloudinary.uploader.upload(localFliePath,{
        resource_type: "auto",
      })
      console.log("uploaded on cloudinary",response.url);
      return response  
    } catch (error) {
        fs.unlinkSync(localFliePath)
        console.log("error on uploading on cloudinary",error);
        return null   
    }
}


export default uploadOnCloudinary