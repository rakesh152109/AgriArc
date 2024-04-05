import mongoose from "mongoose";
import { DB_NAME } from '../constants.js' ;

const connectDB = async ()=>{
try {
    
    const instance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
  
 console.log(`Mongo DB Connected Successfully !!:${instance.connection.host}`)
    
} catch (error) {
    console.log("Mongo Db Connection Error" , error)
    process.exit(1);
}
}

export {connectDB};