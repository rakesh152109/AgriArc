import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials:true,
}))


// express configuration 

app.use(express.urlencoded({extended:true ,limit:"20kb"}))
app.use(express.json({
    limit:"20kb"
}))
app.use(express.static("public")) ; 


app.use(cookieParser());


//  ROutes 
import userRouter from './routes/user.routes.js' ;

app.use("/api/v1/users", userRouter)


//  http://127.0.0.1:8000/api/v1/users/register


export {app} ;