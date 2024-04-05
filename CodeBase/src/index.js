import dotenv from "dotenv" ;
dotenv.config({path:"./.env"});
import {connectDB} from './db/index.js'
import {app} from './app.js'


const port =process.env.PORT || 4000 ;

connectDB()
.then(()=>{

    app.listen(port ,()=>{

        console.log("listening on PORT " ,port )
    })
    
}).catch((err)=>{
    console.log("connection failed !!!" , err)
})


