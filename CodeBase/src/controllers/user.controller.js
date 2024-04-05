import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { uploadOnCloud } from "../utils/cloudinary.js";

const optionsForCookie = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  //  middleware called upload use in userroute
  //get user details from frontend
  //  validation - not empty
  //  check if user already exists : username , email
  //  check for profile image & if exits then Uplod on clound
  //  create use with User,create   & remove password & refreshtoken field
  //  check if user is created and give response

  // console.log( req.file);

  let { fullName, email, username, password } = req.body;
  if (
    [username, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    // throw new ApiError(400, "All the fields are required");
    res.status(400).json(new ApiError(400, "All the fields are required"));
  }

  const userExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExist) {
    // throw new ApiError(409 , "User already Exist With this Username Or Email")
    res
      .status(400)
      .json(
        new ApiError(400, "User already Exist With this Username Or Email")
      );
  }

  let ImgUrl;
  if (req?.file?.path) {
    let Image = await uploadOnCloud(req?.file?.path);
    ImgUrl = Image.secure_url;
  }

  const user = await User.create({
    fullName,
    profileImage:
      ImgUrl ||
      "https://res.cloudinary.com/niteshdk11/image/upload/v1712225022/Assests/WhatsApp_Image_2024-04-04_at_15.23.36_090e3920_bdejlr.jpg",
    email,
    password,
    username: username?.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    // throw new ApiError(500 , "SOmething Went while regestring the user")
    res
      .status(500)
      .json(new ApiError(500, "SOmething Went while regestring the user"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    // throw new ApiError(400 , "something went wrong while generating tokens")
    res
      .status(400)
      .json(new ApiError(400, "something went wrong while generating tokens"));
  }
};

const logInUser = asyncHandler(async (req, res) => {
  // req,body se data and validate
  // find use rby useranme or passwrod  if not exitst give error
  //  check the passo , if not throe error
  // generate refresh and access token
  // remove password and refresh token from res
  // give response with status cookie and data

  const { username, email, password } = req.body;

  if (!username && !email) {
    // throw new ApiError(400 , "Username or Email is Required ")
    res.status(400).json(new ApiError(400, "Username or Email is Required "));
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    // throw new ApiError(400 , "User does not exist")
    res.status(400).json(new ApiError(400, "User does not exist"));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    // throw new ApiError(400 , "Password Is Invalid")
    res.status(400).json(new ApiError(400, "Password Is Invalid"));
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const logInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, optionsForCookie)
    .cookie("refreshToken", refreshToken, optionsForCookie)
    .json(
      new ApiResponse(
        200,
        { user: logInUser, refreshToken, accessToken },
        "User Logged In Successfully "
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //unset kardo refresh token ko
      },
    },
    {
      new: true, // yaha par hii sare changes ho jayege
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", optionsForCookie)
    .clearCookie("refreshToken", optionsForCookie)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

// first cresate middleware fpr auth  if user login then only log out

const deleteUser = asyncHandler(async (req, res) => {
  
  let user = await User.findById(req.user._id);
  if (!user) {
    res.status(200).json(new ApiResponse(400, "User does not exist")); // throw new ApiError(400 , "User does not exist")
  }

  user = await User.findByIdAndDelete(req.user._id);

  res
    .status(200)
    .clearCookie("accessToken", optionsForCookie)
    .clearCookie("refreshToken", optionsForCookie)
    .json(new ApiResponse(200, {}, "User Deleted Successfully"));

})



export { registerUser, logInUser, logOutUser  , deleteUser};
