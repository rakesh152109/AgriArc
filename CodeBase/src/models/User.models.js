import  mongoose ,{Schema} from "mongoose" ;
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema =  new Schema(
    {
    username:{
        type:String ,
        require :true ,
        unique:true, 
        lowercase:true ,
        trim:true ,
        index:true , // db se search me ane lag jaye 
    } ,
    email:{
        type:String ,
        require :true ,
        unique:true, 
        lowercase:true ,
        trim:true ,

    },
    fullName:{
        type:String ,
        require:true , 
        trim:true ,
        index:true 
    },
    profileImage:{
        type:String ,
        
    },
    password:{
        type:String,
        required:[true , "Password is required "]
    },
    refreshToken:{
        type:String ,
    }



    },
    {timestamps:true}
    
    )


    // bcrypt ( used for ahasing)

    userSchema.pre("save" ,async function(next){

        if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10)
    next();

    })

    userSchema.methods.isPasswordCorrect = async function(password){

        return await bcrypt.compare(password , this.password)
        // this.password is data base password 
    }


userSchema.methods.generateAccessToken = function (){

    return jwt.sign(
      {
        _id:this._id ,
        email:this.email,
        fullName:this.fullName,
        username:this.username
      },
      process.env.ACCESS_TOKEN_SECRET ,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }


    )
}


userSchema.methods.generateRefreshToken = function (){

    return jwt.sign(
      {
        _id:this._id ,
        
      },
      process.env.REFRESH_TOKEN_SECRET ,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }


    )
}


const User = mongoose.model("User", userSchema)

export {User};