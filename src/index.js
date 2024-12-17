import express from "express";
import path from "path";
import dotenv from "dotenv"; 
import dbConnect from "./dbConnection/dbConnect.js";
import cors from "cors";
import compress from "compression";
import errorHandler from "./middleware/errorMiddle.js";
import usersRoute from "./routes/userRoute.js" ;
import authRoute from "./routes/authRoute.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(compress());
//User API for user related functions CREATE,POST,PUT,DELETE
app.use("/api/users",usersRoute);
// USer API for authentication SIGNIN, SIGNOUT
app.use("/api/auth", authRoute);
app.use(errorHandler);

const port = process.env.PORT || 3000

const currentWorkDir = process.cwd();
app.use("/dist", express.static(path.join(currentWorkDir,"dist")));
dbConnect();
app.listen(port, ()=>{
   
    console.log(`App running on ${port}`);
})