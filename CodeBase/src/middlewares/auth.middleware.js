import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from '../models/User.models.js'


export const verifyJWT = asyncHandler(async (req, res, next) => {

//  get toeken from user via cookies 
//  if toeken is not throw error
// jwt se verify karo real token aur token ko vo agar raheaga then  toekn decode ho jayega
//  and we will access id , from id we will get user and then remove password and refreshtoken
// then add user into req 

  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");


  if(!token){
    // throw new ApiError(401 , "Unauthorized request")
    res.status(401).json(new ApiError(401 , "Unauthorized request"))
  }

  const decodedToken = jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id).select("-password -refreshToken");

  if(!user){
    // throw new ApiError(401 , "Invalid Access Token")
    res.status(401).json(new ApiError(401 , "Invalid Access Token"))
  }
  req.user= user;

  next();


  } catch (error) {

    // throw new ApiError(401 ,error?.message || "invalid Acces Token")
    res.status(401).json(new ApiError(401 ,error?.message || "invalid Acces Token"))
  }
});
