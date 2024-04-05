// import { v2 } from "cloudinary";
import { v2 as cloudinary} from "cloudinary";
import fs from 'fs';

          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

const uploadOnCloud = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file to the cloudinary
    const res =  await   cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // file has been uploaded successfully 
        // console.log("file is uploaded successfully", res)
        

        fs.unlinkSync(localFilePath); // sabhone ke bad 

        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove temporary file which are locally saved ad the upload operation got failed 
        return null;
    }

}

export { uploadOnCloud };